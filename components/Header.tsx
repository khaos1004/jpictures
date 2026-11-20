"use client";

import { useEffect, useState } from "react";
import LogoMark from "./Logo";

const links = [
  { href: "#about", label: "ABOUT" },
  { href: "#ips", label: "OUR IPs" },
  { href: "#business", label: "BUSINESS" },
  { href: "#pipeline", label: "PIPELINE" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <nav className="menu" aria-label="주 메뉴">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href="#contact">CONTACT</a>
          </nav>
          <button className="burger" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mmenu wrap">
          {[...links, { href: "#contact", label: "CONTACT" }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
