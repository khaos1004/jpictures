"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, WorkView } from "@/lib/i18n";

/**
 * 메인 갤러리
 * - 휠(세로 스크롤)을 움직이면 카드 줄이 좌우로 부드럽게 흘러갑니다.
 * - 카드 안 그림은 카드보다 넓고 화면 중앙에서 멀어질수록 반대로 밀려 패럴랙스가 생깁니다.
 * - 카드 아래 바닥에는 거울 반사가 비치고, 반사에도 같은 패럴랙스가 적용됩니다.
 */

function Frame({ w, i }: { w: WorkView; i: number }) {
  return (
    <div className="card-frame">
      <span className="card-tag">{String(i + 1).padStart(2, "0")}</span>
      <div
        className="card-inner"
        style={{
          backgroundImage: w.image
            ? `url(${w.image})`
            : `radial-gradient(70% 60% at 38% 30%, ${w.colors[0]}, ${w.colors[1]} 78%)`,
          backgroundPosition: w.focus || "50% 25%",
        }}
      >
        {!w.image && (
          <div className="scene" aria-hidden>
            <span className="scene-sun" style={{ left: `${18 + (i % 3) * 22}%` }} />
            <span className="scene-horizon" />
            <span className="scene-word">{w.en}</span>
            <span className="tone" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroCarousel({ works, ui }: { works: WorkView[]; ui: Dict["ui"] }) {
  const n = works.length;
  const secRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sec = secRef.current!;
    const track = trackRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inners = cardRefs.current.map((c) => Array.from(c?.querySelectorAll<HTMLElement>(".card-inner") ?? []));
    let max = 0;
    let cur = 0;
    let target = 0;
    let last = -1;
    let raf = 0;

    const measure = () => {
      max = Math.max(0, track.scrollWidth - window.innerWidth);
      sec.style.height = `${window.innerHeight + max}px`;
      const stand = cardRefs.current[0]?.querySelector(".card-stand");
      if (stand && wrapRef.current && floorRef.current) {
        const top = stand.getBoundingClientRect().bottom - wrapRef.current.getBoundingClientRect().top;
        floorRef.current.style.top = `${top}px`;
      }
      onScroll();
    };
    const onScroll = () => {
      const top = sec.getBoundingClientRect().top;
      target = Math.min(max, Math.max(0, -top));
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaX);
      }
    };

    const tick = () => {
      cur += (target - cur) * (reduce ? 1 : 0.085);
      if (Math.abs(target - cur) < 0.05) cur = target;
      track.style.transform = `translate3d(${-cur}px,0,0)`;

      const vw = window.innerWidth;
      let best = 0;
      let bestD = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = (card.offsetLeft + card.offsetWidth / 2 - cur - vw / 2) / vw;
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
        if (!reduce) {
          const shift = Math.max(-1, Math.min(1, d)) * card.offsetWidth * 0.12;
          inners[i].forEach((el) => (el.style.transform = `translate3d(${shift}px,0,0)`));
        }
      });
      if (best !== last) {
        last = best;
        setActive(best);
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${max ? cur / max : 0})`;
      if (hintRef.current) hintRef.current.style.opacity = cur > 40 ? "0" : "1";
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    sec.addEventListener("wheel", onWheel, { passive: false });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      sec.removeEventListener("wheel", onWheel);
    };
  }, []);

  const goTo = (i: number) => {
    const sec = secRef.current;
    const card = cardRefs.current[(i + n) % n];
    if (!sec || !card) return;
    const x = card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2;
    window.scrollTo({ top: sec.offsetTop + Math.max(0, x), behavior: "smooth" });
  };

  const cur = works[active];
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className="hero" id="ips" ref={secRef} aria-label={ui.carousel}>
      <div className="hero-sticky">
        <p className="hero-word" aria-hidden>
          {cur.en}
        </p>

        <div className="track-wrap" ref={wrapRef}>
          <div className="floor" ref={floorRef} aria-hidden />
          <div className="track" ref={trackRef}>
            {works.map((w, i) => (
              <div className="card" key={w.id} ref={(el) => { cardRefs.current[i] = el; }}>
                <div className="card-cap">
                  <b>{w.title}</b>
                  <span>{w.genre}</span>
                </div>
                <div className="card-stand">
                  <Frame w={w} i={i} />
                  <div className="mirror" aria-hidden>
                    <Frame w={w} i={i} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="hint" ref={hintRef} aria-hidden>
          {ui.scroll}
        </p>

        <div className="wrap hero-bar">
          <p className="hb-idx" aria-live="polite">
            <b>{pad(active + 1)}</b> / {pad(n)}
            <span className="hb-title">{cur.title}</span>
          </p>
          <div className="progress">
            <i ref={barRef} />
          </div>
          <div className="hb-ctrl">
            <button aria-label={ui.prev} onClick={() => goTo(active - 1)}>
              ←
            </button>
            <button aria-label={ui.next} onClick={() => goTo(active + 1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
