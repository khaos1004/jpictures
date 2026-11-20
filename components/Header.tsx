"use client";

import { useEffect, useState } from "react";
import LogoMark from "./Logo";
import LangSwitch from "./LangSwitch";
import type { Dict, Locale } from "@/lib/i18n";

export default function Header({ lang, nav, ui }: { lang: Locale; nav: Dict["nav"]; ui: Dict["ui"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: nav.about },
    { href: "#ips", label: nav.ips },
    { href: "#business", label: nav.business },
    { href: "#pipeline", label: nav.pipeline },
    { href: "#contact", label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`hdr ${scrolled || open ? "is-solid" : ""}`}>
      <div className="wrap">
        <div className="hdr-in">
          <a href="#top" className="logo" onClick={() => setOpen(false)}>
            <LogoMark />
            <span className="wordmark">
              J <em>Pictures</em>
            </span>
          </a>
          <div className="hdr-right">
            <nav className="menu" aria-label="Main">
              {links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
            <LangSwitch lang={lang} label={ui.language} />
            <button className="burger" aria-label={ui.menu} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <nav className="mmenu wrap" aria-label={ui.menu}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
