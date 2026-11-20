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
  // 화면 양옆이 비지 않도록 앞에는 마지막 작품들, 뒤에는 첫 작품들을 이어 붙입니다 (필름 릴처럼)
  const PAD = Math.min(3, n);
  const reel = [
    ...works.slice(n - PAD).map((w, k) => ({ w, real: n - PAD + k, clone: true })),
    ...works.map((w, k) => ({ w, real: k, clone: false })),
    ...works.slice(0, PAD).map((w, k) => ({ w, real: k, clone: true })),
  ];
  const secRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // 실제 작품 i 의 카드가 화면 가운데에 올 때의 트랙 이동량
  const centerOf = (i: number) => {
    const card = cardRefs.current[PAD + i];
    return card ? card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2 : 0;
  };

  useEffect(() => {
    const sec = secRef.current!;
    const track = trackRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    const inners = cards.map((c) => Array.from(c.querySelectorAll<HTMLElement>(".card-inner")));
    let start = 0; // 1번 작품이 가운데일 때
    let max = 0; // 마지막 작품이 가운데가 될 때까지의 거리
    let cur = 0;
    let target = 0;
    let last = -1;
    let raf = 0;

    const measure = () => {
      start = centerOf(0);
      max = Math.max(0, centerOf(n - 1) - start);
      sec.style.height = `${window.innerHeight + max}px`;
      const stand = cards[0]?.querySelector(".card-stand");
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
      const x = start + cur;
      track.style.transform = `translate3d(${-x}px,0,0)`;

      const vw = window.innerWidth;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((card, i) => {
        const d = (card.offsetLeft + card.offsetWidth / 2 - x - vw / 2) / vw;
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
        if (!reduce) {
          const shift = Math.max(-1, Math.min(1, d)) * card.offsetWidth * 0.12;
          inners[i].forEach((el) => (el.style.transform = `translate3d(${shift}px,0,0)`));
        }
      });
      const real = reel[best]?.real ?? 0;
      if (real !== last) {
        last = real;
        setActive(real);
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${max ? cur / max : 0})`;
      if (hintRef.current) hintRef.current.style.opacity = cur > 40 ? "0" : "1";
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    sec.addEventListener("wheel", onWheel, { passive: false });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.removeEventListener("scroll", onScroll);
      sec.removeEventListener("wheel", onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    const sec = secRef.current;
    if (!sec) return;
    const j = (i + n) % n;
    window.scrollTo({ top: sec.offsetTop + Math.max(0, centerOf(j) - centerOf(0)), behavior: "smooth" });
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
            {reel.map(({ w, real, clone }, k) => (
              <div
                className="card"
                key={`${k}-${w.id}`}
                ref={(el) => { cardRefs.current[k] = el; }}
                aria-hidden={clone || undefined}
              >
                <div className="card-cap">
                  <b>{w.title}</b>
                  <span>{w.genre}</span>
                </div>
                <div className="card-stand">
                  <Frame w={w} i={real} />
                  <div className="mirror" aria-hidden>
                    <Frame w={w} i={real} />
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
