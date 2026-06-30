<?php
/**
 * Plugin Name: For Kannada - Post to Lesson Migration
 * Description: Migrates imported default posts into the Lesson CPT, preserving content and mapping categories to Lesson taxonomies.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', function () {
    add_management_page(
        'For Kannada Migration',
        'For Kannada Migration',
        'manage_options',
        'for-kannada-migration',
        'for_kannada_render_migration_page'
    );
});

add_action('admin_post_for_kannada_run_migration', 'for_kannada_run_migration');

function for_kannada_render_migration_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have permission to view this page.'));
    }

    $result = isset($_GET['fk_result']) ? json_decode(wp_unslash($_GET['fk_result']), true) : null;
    ?>
    <div class="wrap">
        <h1>For Kannada Migration</h1>
        <p>Migrates imported default posts into the <code>lesson</code> CPT using core WordPress functions.</p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <?php wp_nonce_field('for_kannada_run_migration'); ?>
            <input type="hidden" name="action" value="for_kannada_run_migration" />
            <p>
                <button type="submit" class="button button-primary">Run migration</button>
            </p>
        </form>
        <?php if (is_array($result)) : ?>
            <h2>Summary</h2>
            <ul>
                <li>Created lessons: <?php echo esc_html((string) ($result['created'] ?? 0)); ?></li>
                <li>Skipped duplicates: <?php echo esc_html((string) ($result['skipped'] ?? 0)); ?></li>
                <li>Assigned taxonomy count: <?php echo esc_html((string) ($result['assigned_taxonomy_count'] ?? 0)); ?></li>
            </ul>
        <?php endif; ?>
    </div>
    <?php
}

function for_kannada_run_migration() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have permission to run this migration.'));
    }

    check_admin_referer('for_kannada_run_migration');

    $summary = for_kannada_migrate_posts_to_lessons();

    wp_safe_redirect(add_query_arg('fk_result', rawurlencode(wp_json_encode($summary)), admin_url('tools.php?page=for-kannada-migration')));
    exit;
}

function for_kannada_migrate_posts_to_lessons() {
    $summary = [
        'created' => 0,
        'skipped' => 0,
        'assigned_taxonomy_count' => 0,
    ];

    $posts = get_posts([
        'post_type' => 'post',
        'post_status' => 'any',
        'numberposts' => -1,
        'orderby' => 'ID',
        'order' => 'ASC',
    ]);

    foreach ($posts as $post) {
        if (!$post instanceof WP_Post) {
            continue;
        }

        $slug = $post->post_name ?: sanitize_title($post->post_title);
        if ($slug === '') {
            continue;
        }

        $existing = get_posts([
            'post_type' => 'lesson',
            'name' => $slug,
            'post_status' => 'any',
            'numberposts' => 1,
            'fields' => 'ids',
        ]);

        if (!empty($existing)) {
            $summary['skipped']++;
            continue;
        }

        $lesson_id = wp_insert_post([
            'post_type' => 'lesson',
            'post_status' => $post->post_status,
            'post_title' => $post->post_title,
            'post_content' => $post->post_content,
            'post_excerpt' => $post->post_excerpt,
            'post_name' => $slug,
            'post_author' => $post->post_author,
            'post_date' => $post->post_date,
            'post_date_gmt' => $post->post_date_gmt,
        ], true);

        if (is_wp_error($lesson_id) || !$lesson_id) {
            continue;
        }

        $english_title = for_kannada_extract_english_title($post);
        if ($english_title !== '') {
            update_post_meta($lesson_id, 'english_title', $english_title);
        }

        $taxonomy_map = for_kannada_map_post_categories_to_lesson_taxonomies($post->ID);
        foreach ($taxonomy_map as $taxonomy => $terms) {
            if (empty($terms)) {
                continue;
            }

            $result = wp_set_object_terms($lesson_id, $terms, $taxonomy, false);
            if (!is_wp_error($result)) {
                $summary['assigned_taxonomy_count'] += count((array) $terms);
            }
        }

        $thumbnail_id = get_post_thumbnail_id($post->ID);
        if ($thumbnail_id) {
            set_post_thumbnail($lesson_id, $thumbnail_id);
        }

        $summary['created']++;
    }

    return $summary;
}

function for_kannada_map_post_categories_to_lesson_taxonomies($post_id) {
    $terms = wp_get_post_terms($post_id, 'category', ['fields' => 'all']);
    $mapped = [
        'board' => [],
        'grade' => [],
        'lesson_type' => [],
    ];

    foreach ($terms as $term) {
        $name = strtolower(trim($term->name));
        $slug = strtolower(trim($term->slug));
        $label = $name . ' ' . $slug;

        if (preg_match('/\b(cbse|icse|state|kseeb|ncert)\b/', $label)) {
            $mapped['board'][] = for_kannada_find_lesson_term('board', $term->name);
        }

        if (preg_match('/\b(class\s*[1-9]|class\s*10|1st\s*standard|2nd\s*standard|3rd\s*standard|4th\s*standard|5th\s*standard|6th\s*standard|7th\s*standard|8th\s*standard|9th\s*standard|10th\s*standard)\b/', $label)) {
            $mapped['grade'][] = for_kannada_find_lesson_term('grade', $term->name);
        }

        if (preg_match('/\b(poem|worksheet|grammar|story|essay|letter|gadegalu|q[-\s]?papers?)\b/', $label)) {
            $mapped['lesson_type'][] = for_kannada_find_lesson_term('lesson_type', $term->name);
        }
    }

    foreach ($mapped as $taxonomy => $values) {
        $mapped[$taxonomy] = array_values(array_filter(array_unique(array_filter($values))));
    }

    return $mapped;
}

function for_kannada_find_lesson_term($taxonomy, $candidate_name) {
    $term = get_term_by('name', $candidate_name, $taxonomy);
    if ($term && !is_wp_error($term)) {
        return (int) $term->term_id;
    }

    $term = get_term_by('slug', sanitize_title($candidate_name), $taxonomy);
    if ($term && !is_wp_error($term)) {
        return (int) $term->term_id;
    }

    return 0;
}

function for_kannada_extract_english_title(WP_Post $post) {
    $candidates = [
        get_post_meta($post->ID, 'english_title', true),
        get_post_meta($post->ID, 'lesson_english_title', true),
        get_post_meta($post->ID, 'lesson_title_english', true),
        get_post_meta($post->ID, '_english_title', true),
    ];

    foreach ($candidates as $candidate) {
        $value = trim(wp_strip_all_tags((string) $candidate));
        if ($value !== '') {
            return $value;
        }
    }

    return '';
}
