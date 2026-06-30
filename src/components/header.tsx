"use client";

import Link from "next/link";
import { useState } from "react";

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-toggle-icon">
      <path d="M4 7.5h16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 12h16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 16.5h16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-toggle-icon">
      <path d="M6 6 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className={`site-nav${open ? " is-open" : ""}`}>
        <div className="site-nav-top">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            <span className="brand-glyph">ಕ</span>
            <span className="brand-word">For Kannada</span>
          </Link>

          <button
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="nav-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div className={`site-drawer${open ? " is-open" : ""}`}>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link className="on" href="/lessons" onClick={() => setOpen(false)}>
              Curriculum
            </Link>
            <Link href="/gradehub" onClick={() => setOpen(false)}>
              Grade Hub
            </Link>
            <Link href="/lessons?type=worksheet" onClick={() => setOpen(false)}>
              Worksheets
            </Link>
            <Link href="/lessons?type=gadegalu" onClick={() => setOpen(false)}>
              Gadegalu
            </Link>
            <Link href="/lessons?type=essay" onClick={() => setOpen(false)}>
              Essays
            </Link>
            <Link href="/lessons?type=letter" onClick={() => setOpen(false)}>
              Letters
            </Link>
            <Link href="/lessons?type=grammar" onClick={() => setOpen(false)}>
              Grammar
            </Link>
          </nav>

          <div className="nav-actions">
            <Link className="nav-search" href="/lessons" onClick={() => setOpen(false)}>
              Search
            </Link>
            <a className="nav-cta" href="#free-pack" onClick={() => setOpen(false)}>
              Get free pack
            </a>
          </div>
        </div>
      </div>

      <button
        aria-hidden={!open}
        className={`nav-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        tabIndex={-1}
        type="button"
      />
    </header>
  );
}
