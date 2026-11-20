"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, WorkView } from "@/lib/i18n";

/**
 * 메인 갤러리 (무한 릴)
 * - 자동으로 천천히 흐르고, 마우스·손가락으로 끌어서 돌릴 수 있습니다 (놓으면 관성).
 * - 카드 안 그림은 화면 위치에 따라 반대로 밀려 패럴랙스가 생깁니다.
 * - 마우스를 올린 작품은 카드처럼 떠오르며 커서 쪽으로 기울고, 빛이 따라 움직입니다.
 * - 바닥 거울 반사도 카드와 함께 움직입니다.
 */

const SETS = 4; // 작품 목록을 4번 이어 붙여 끊김 없이 돕니다
const SPEED = 42; // 자동 회전 속도 (px/초)

function Frame({ w, i, top }: { w: WorkView; i: number; top?: boolean }) {
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
      />
      {top && (
        <>
          <span className="glare" />
          <div className="card-info">
            <span className="card-status">{w.status}</span>
            <b>{w.title}</b>
            <span className="card-en">{w.en}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function HeroCarousel({ works, ui }: { works: WorkView[]; ui: Dict["ui"] }) {
  const n = works.length;
  const reel = Array.from({ length: SETS }, (_, s) => works.map((w, k) => ({ w, real: k, main: s === 1 }))).flat();

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctrl = useRef<{ step: (dir: number) => void }>({ step: () => {} });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const track = trackRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    const inners = cards.map((c) => Array.from(c.querySelectorAll<HTMLElement>(".card-inner")));

    let setW = 1; // 작품 한 바퀴의 가로 길이
    let pos = 0; // 한 바퀴 안에서의 위치 (0 ~ setW)
    let vel = 0; // 놓은 뒤 관성 속도 (px/초)
    let goal: number | null = null; // 이전/다음 버튼으로 이동할 목표
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastT = 0;
    let hovering = false;
    let last = -1;
    let prev = performance.now();
    let raf = 0;

    const centerOf = (k: number) => cards[k].offsetLeft + cards[k].offsetWidth / 2;
    const measure = () => {
      setW = cards[n].offsetLeft - cards[0].offsetLeft;
      const stand = cards[0].querySelector(".card-stand");
      if (stand && floorRef.current) {
        floorRef.current.style.top = `${stand.getBoundingClientRect().bottom - wrap.getBoundingClientRect().top}px`;
      }
    };
    // 시작할 때 1번 작품(두 번째 묶음)이 화면 가운데
    const base = () => centerOf(n) - window.innerWidth / 2;
    const wrapPos = () => {
      pos = ((pos % setW) + setW) % setW;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (goal !== null) {
        const d = goal - pos;
        pos += d * Math.min(1, dt * 7);
        if (Math.abs(d) < 0.5) {
          pos = goal;
          goal = null;
        }
      } else if (!dragging) {
        if (Math.abs(vel) > 4) {
          pos += vel * dt;
          vel *= Math.pow(0.04, dt); // 관성 감속
        } else {
          vel = 0;
          if (!hovering && !reduce && !document.hidden) pos += SPEED * dt;
        }
      }
      if (goal === null) wrapPos();

      const x = base() + pos;
      track.style.transform = `translate3d(${-x}px,0,0)`;

      const vw = window.innerWidth;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((card, i) => {
        const d = (centerOf(i) - x - vw / 2) / vw;
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
        if (!reduce && Math.abs(d) < 1.6) {
          const shift = Math.max(-1, Math.min(1, d)) * card.offsetWidth * 0.12;
          inners[i].forEach((el) => (el.style.transform = `translate3d(${shift}px,0,0)`));
        }
      });
      const real = best % n;
      if (real !== last) {
        last = real;
        setActive(real);
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${(((pos % setW) + setW) % setW) / setW})`;
      raf = requestAnimationFrame(tick);
    };

    // ── 마우스를 올린 카드: 떠오르며 커서 쪽으로 기울기 ──
    let hovered: HTMLElement | null = null;
    const clearHover = () => {
      if (hovered) hovered.classList.remove("is-hover");
      hovered = null;
      track.classList.remove("has-hover");
    };
    const onHover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || dragging) return;
      hovering = true;
      const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
      if (card !== hovered) {
        clearHover();
        if (card) {
          hovered = card;
          card.classList.add("is-hover");
          track.classList.add("has-hover");
        }
      }
      if (!hovered) return;
      const r = hovered.querySelector(".card-stand > .card-frame")!.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      hovered.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
      hovered.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
      hovered.style.setProperty("--mx", `${px * 100}%`);
      hovered.style.setProperty("--my", `${py * 100}%`);
    };
    const onLeave = () => {
      hovering = false;
      clearHover();
    };

    // ── 드래그 ──
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = 0;
      vel = 0;
      goal = null;
      lastX = e.clientX;
      lastT = performance.now();
      wrap.classList.add("is-dragging");
      clearHover();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const t = performance.now();
      if (dx !== 0) {
        if (moved === 0 && Math.abs(dx) > 2 && !wrap.hasPointerCapture(e.pointerId)) wrap.setPointerCapture(e.pointerId);
        pos -= dx;
        moved += Math.abs(dx);
        vel = (-dx / Math.max(1, t - lastT)) * 1000 * 0.9;
      }
      lastX = e.clientX;
      lastT = t;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove("is-dragging");
      if (performance.now() - lastT > 80) vel = 0;
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId);
    };
    // 드래그한 뒤에는 클릭으로 처리되지 않게
    const onClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    // 트랙패드 좌우 스와이프
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        goal = null;
        pos += e.deltaX;
      }
    };

    ctrl.current.step = (dir: number) => {
      const cw = setW / n;
      const from = goal ?? pos;
      goal = Math.round(from / cw) * cw + dir * cw;
      vel = 0;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("load", measure);
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    wrap.addEventListener("click", onClick, true);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("pointermove", onHover);
    track.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", measure);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("click", onClick, true);
      wrap.removeEventListener("wheel", onWheel);
      track.removeEventListener("pointermove", onHover);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, [n]);

  const cur = works[active];
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className="hero" id="ips" aria-roledescription="carousel" aria-label={ui.carousel}>
      <div className="hero-stage">
        <p className="hero-word" aria-hidden>
          {cur.en}
        </p>

        <div className="track-wrap" ref={wrapRef}>
          <div className="floor" ref={floorRef} aria-hidden />
          <div className="track" ref={trackRef}>
            {reel.map(({ w, real, main }, k) => (
              <div
                className="card"
                key={`${k}-${w.id}`}
                ref={(el) => {
                  cardRefs.current[k] = el;
                }}
                aria-hidden={!main || undefined}
              >
                <div className="card-cap">
                  <b>{w.title}</b>
                  <span>{w.genre}</span>
                </div>
                <div className="card-stand">
                  <Frame w={w} i={real} top />
                  <div className="mirror" aria-hidden>
                    <Frame w={w} i={real} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="hint" aria-hidden>
          {ui.drag}
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
            <button aria-label={ui.prev} onClick={() => ctrl.current.step(-1)}>
              ←
            </button>
            <button aria-label={ui.next} onClick={() => ctrl.current.step(1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
