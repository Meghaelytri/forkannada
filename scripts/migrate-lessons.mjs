import fs from "node:fs/promises";

const DEFAULT_SOURCE_BASE = "https://forkannada.com";
const DEFAULT_LOCAL_BASE = "http://forkannada.local";
const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "admin@123";
const DEFAULT_TAXONOMIES = ["board", "grade", "lesson_type"];

const args = parseArgs(process.argv.slice(2));

const config = {
  sourceBase: args["source-base"] || process.env.SOURCE_WP_BASE || DEFAULT_SOURCE_BASE,
  localBase: args["local-base"] || process.env.LOCAL_WP_BASE || DEFAULT_LOCAL_BASE,
  username: args.username || process.env.WP_USERNAME || DEFAULT_USER,
  password: args.password || process.env.WP_PASSWORD || DEFAULT_PASSWORD,
  sourceSlug: args.slug || process.env.SOURCE_SLUG || "",
  sourceFile: args["source-file"] || process.env.SOURCE_FILE || "",
  limit: Number(args.limit || process.env.MIGRATION_LIMIT || 1),
  publish: args.publish === "true" || args.publish === "1" || process.env.MIGRATION_PUBLISH === "true",
  overwrite: args.overwrite === "true" || args.overwrite === "1" || process.env.MIGRATION_OVERWRITE === "true",
};

main().catch((error) => {
  console.error("\nMigration failed:");
  console.error(error?.stack || error?.message || error);
  process.exit(1);
});

async function main() {
  const localAuth = await loginToWordPress(config.localBase, config.username, config.password);
  const localNonce = await getAdminNonce(config.localBase, localAuth.cookieHeader);
  const localTerms = await loadLocalTerms(config.localBase, localAuth.cookieHeader, localNonce);

  const sourceLessons = await loadSourceLessons(config);
  const lessonsToProcess = sourceLessons.slice(0, Math.max(1, config.limit || 1));

  console.log(`Loaded ${sourceLessons.length} source lesson(s). Processing ${lessonsToProcess.length}.`);

  for (const lesson of lessonsToProcess) {
    const mapped = await upsertLesson({
      localBase: config.localBase,
      localAuth,
      localNonce,
      localTerms,
      sourceLesson: lesson,
      publish: config.publish,
      overwrite: config.overwrite,
    });

    console.log(
      JSON.stringify(
        {
          source: lesson.slug,
          localId: mapped.id,
          localSlug: mapped.slug,
          status: mapped.status,
          link: mapped.link,
          mediaId: mapped.featured_media || 0,
        },
        null,
        2
      )
    );
  }
}

async function loadSourceLessons(config) {
  if (config.sourceFile) {
    const raw = await fs.readFile(config.sourceFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  }

  const pageSize = 100;
  const collected = [];
  let page = 1;

  while (true) {
    const url = new URL(`${config.sourceBase}/wp-json/wp/v2/lesson`);
    url.searchParams.set("per_page", String(pageSize));
    url.searchParams.set("_embed", "1");
    url.searchParams.set("page", String(page));

    if (config.sourceSlug) {
      url.searchParams.set("slug", config.sourceSlug);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch source lessons: ${response.status} ${response.statusText}`);
    }

    const pageLessons = await response.json();
    if (!Array.isArray(pageLessons) || pageLessons.length === 0) {
      break;
    }

    collected.push(...pageLessons);

    const totalPages = Number(response.headers.get("x-wp-totalpages") || "1");
    if (page >= totalPages || config.sourceSlug) {
      break;
    }

    page += 1;
  }

  return collected;
}

async function upsertLesson({ localBase, localAuth, localNonce, localTerms, sourceLesson, publish, overwrite }) {
  const slug = sourceLesson.slug || slugify(stripTags(sourceLesson.title?.rendered || "lesson"));
  const existing = await findLessonBySlug(localBase, localAuth.cookieHeader, slug);
  const content = sourceLesson.content?.rendered || "";
  const excerpt =
    sourceLesson.excerpt?.rendered ||
    extractDescription(content) ||
    stripTags(sourceLesson.title?.rendered || "");
  const kannadaTitle = extractKannadaHeading(content) || stripTags(sourceLesson.title?.rendered || "");
  const englishTitle =
    normalizeCustomHeading(
      sourceLesson.meta?.english_title ||
        sourceLesson.english_title ||
        sourceLesson.acf?.english_title ||
        sourceLesson.meta?.lesson_english_title
    ) || stripTags(sourceLesson.title?.rendered || "");

  const localTermIds = mapLocalTermIds(sourceLesson, localTerms);
  const featuredMediaId = sourceLesson.featured_media
    ? await ensureFeaturedMedia({
        localBase,
        localAuth,
        localNonce,
        sourceLesson,
      })
    : 0;

  const payload = {
    title: kannadaTitle,
    slug,
    status: publish ? "publish" : "draft",
    content,
    excerpt,
    meta: {
      english_title: englishTitle,
    },
    board: localTermIds.board,
    grade: localTermIds.grade,
    lesson_type: localTermIds.lesson_type,
  };

  if (featuredMediaId) {
    payload.featured_media = featuredMediaId;
  }

  if (existing && existing.id && !overwrite) {
    const response = await fetch(`${localBase}/wp-json/wp/v2/lesson/${existing.id}`, {
      method: "PUT",
      headers: jsonHeaders(localAuth.cookieHeader, localNonce),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to update lesson ${slug}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }

  const response = await fetch(`${localBase}/wp-json/wp/v2/lesson`, {
    method: "POST",
    headers: jsonHeaders(localAuth.cookieHeader, localNonce),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to create lesson ${slug}: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

async function findLessonBySlug(localBase, cookieHeader, slug) {
  const url = new URL(`${localBase}/wp-json/wp/v2/lesson`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("per_page", "1");

  const response = await fetch(url, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return null;
  }

  const lessons = await response.json();
  return Array.isArray(lessons) && lessons.length ? lessons[0] : null;
}

async function loadLocalTerms(localBase, cookieHeader, nonce) {
  const result = {};

  for (const taxonomy of DEFAULT_TAXONOMIES) {
    const url = new URL(`${localBase}/wp-json/wp/v2/${taxonomy}`);
    url.searchParams.set("per_page", "100");

    const response = await fetch(url, {
      headers: {
        Cookie: cookieHeader,
        "X-WP-Nonce": nonce,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch local taxonomy ${taxonomy}: ${response.status} ${response.statusText}`);
    }

    const terms = await response.json();
    result[taxonomy] = Array.isArray(terms) ? terms : [];
  }

  return result;
}

function mapLocalTermIds(sourceLesson, localTerms) {
  const embeddedTerms = sourceLesson?._embedded?.["wp:term"] || [];
  const mapped = {};

  for (const taxonomy of DEFAULT_TAXONOMIES) {
    const sourceNames = embeddedTerms
      .flat()
      .filter((term) => term.taxonomy === taxonomy)
      .map((term) => term.name);

    mapped[taxonomy] = sourceNames
      .map((name) => findLocalTermId(localTerms[taxonomy] || [], name))
      .filter((id) => Number.isFinite(id));
  }

  return mapped;
}

function findLocalTermId(terms, name) {
  const normalized = normalize(name);
  const byName = terms.find((term) => normalize(term.name) === normalized);
  if (byName) return byName.id;

  const bySlug = terms.find((term) => normalize(term.slug) === normalized);
  return bySlug ? bySlug.id : undefined;
}

async function ensureFeaturedMedia({ localBase, localAuth, localNonce, sourceLesson }) {
  const media = sourceLesson?._embedded?.["wp:featuredmedia"]?.[0];
  const sourceUrl = media?.source_url || media?.guid?.rendered;
  if (!sourceUrl) return 0;

  const imageResponse = await fetch(sourceUrl);
  if (!imageResponse.ok) {
    return 0;
  }

  const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
  const bytes = await imageResponse.arrayBuffer();
  const filename = filenameFromUrl(sourceUrl, contentType);

  const form = new FormData();
  form.append("file", new Blob([bytes], { type: contentType }), filename);
  if (media?.title?.rendered) {
    form.append("title", stripTags(media.title.rendered));
  }
  if (media?.alt_text) {
    form.append("alt_text", media.alt_text);
  }

  const response = await fetch(`${localBase}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Cookie: localAuth.cookieHeader,
      "X-WP-Nonce": localNonce,
    },
    body: form,
  });

  if (!response.ok) {
    return 0;
  }

  const uploaded = await response.json();
  return uploaded?.id || 0;
}

function jsonHeaders(cookieHeader, nonce) {
  return {
    "Content-Type": "application/json",
    Cookie: cookieHeader,
    "X-WP-Nonce": nonce,
  };
}

async function loginToWordPress(baseUrl, username, password) {
  const loginPage = await fetch(`${baseUrl}/wp-login.php`);
  if (!loginPage.ok) {
    throw new Error(`Failed to load login page: ${loginPage.status} ${loginPage.statusText}`);
  }

  const loginResponse = await fetch(`${baseUrl}/wp-login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      log: username,
      pwd: password,
      redirect_to: `${baseUrl}/wp-admin/`,
      testcookie: "1",
      "wp-submit": "Log In",
    }),
    redirect: "manual",
  });

  const cookieHeader = combineCookies(loginResponse.headers.get("set-cookie") || "");
  if (!cookieHeader.includes("wordpress_logged_in_")) {
    throw new Error("Login did not return a WordPress authenticated cookie.");
  }

  return { cookieHeader };
}

async function getAdminNonce(baseUrl, cookieHeader) {
  const response = await fetch(`${baseUrl}/wp-admin/post-new.php?post_type=lesson`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to load admin editor: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const match = html.match(/wpApiSettings\s*=\s*\{[\s\S]*?"nonce":"([^"]+)"/);
  if (!match?.[1]) {
    throw new Error("Could not find wpApiSettings nonce in admin page.");
  }
  return match[1];
}

function extractDescription(html) {
  const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripTags(match[1]).trim());
  return paragraphs.find(Boolean) || "";
}

function extractKannadaHeading(html) {
  const blocks = [...html.matchAll(/<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((match) => stripTags(match[2]).trim());
  const kandBlocks = blocks.filter((block) => /[\u0C80-\u0CFF]/.test(block));
  const candidate = kandBlocks[0] || blocks[0] || "";
  if (!candidate) return "";
  return candidate.length > 80 ? candidate.slice(0, 80).replace(/\s+\S*$/, "") : candidate;
}

function normalizeCustomHeading(value) {
  const text = stripTags(value);
  return text ? text.replace(/\s+/g, " ").trim() : "";
}

function stripTags(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return stripTags(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(value) {
  return slugify(value);
}

function combineCookies(setCookieHeader) {
  if (!setCookieHeader) return "";

  const pieces = setCookieHeader
    .split(/,\s*(?=[A-Za-z0-9_%-]+=)/)
    .map((chunk) => chunk.split(";")[0].trim())
    .filter(Boolean);

  return pieces.join("; ");
}

function filenameFromUrl(url, contentType) {
  const pathname = new URL(url).pathname;
  const last = pathname.split("/").filter(Boolean).pop();
  if (last) return last;

  if (contentType.includes("png")) return "featured-image.png";
  if (contentType.includes("webp")) return "featured-image.webp";
  if (contentType.includes("gif")) return "featured-image.gif";
  return "featured-image.jpg";
}

function parseArgs(argv) {
  const result = {};
  for (const token of argv) {
    const trimmed = token.replace(/^--/, "");
    const [key, rawValue] = trimmed.split("=");
    result[key] = rawValue === undefined ? "true" : rawValue;
  }
  return result;
}
