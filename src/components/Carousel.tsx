import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Scales to any number of items: scroll-snap track, arrows that disable at the ends,
   a progress bar + "1-3 / 12" counter, mouse drag, keyboard arrows, edge fades. */
export function Carousel({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [s, setS] = useState({ prev: false, next: false, first: 1, last: 1, total: 0, thumbW: 100, thumbL: 0 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const view = el.clientWidth;
    const left = el.scrollLeft;
    const max = el.scrollWidth - view;
    let first = -1;
    let last = 0;
    kids.forEach((k, i) => {
      if (k.offsetLeft + 4 >= left && first < 0) first = i;
      if (k.offsetLeft + k.offsetWidth <= left + view + 4) last = i;
    });
    if (first < 0) first = kids.length - 1;
    setS({
      prev: left > 4,
      next: max - left > 4,
      first: first + 1,
      last: Math.max(last, first) + 1,
      total: kids.length,
      thumbW: el.scrollWidth ? Math.min(100, (view / el.scrollWidth) * 100) : 100,
      thumbL: el.scrollWidth ? (left / el.scrollWidth) * 100 : 0,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", tick, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(tick) : null;
    ro?.observe(el);
    Array.from(el.children).forEach((k) => ro?.observe(k));
    tick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", tick);
      ro?.disconnect();
    };
  }, [update, children]);

  const smooth = () =>
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  /* jump to the next/previous item edge instead of an arbitrary distance */
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    let target: number;
    if (dir === 1) {
      const k = kids.find((c) => c.offsetLeft > left + 8);
      target = k ? k.offsetLeft : el.scrollWidth;
    } else {
      /* land so the previous page ends where this one starts */
      const goal = left - el.clientWidth + 8;
      const k = kids.find((c) => c.offsetLeft >= goal);
      target = k && k.offsetLeft < left - 8 ? k.offsetLeft : 0;
    }
    el.scrollTo({ left: target, behavior: smooth() });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") (e.preventDefault(), step(1));
    else if (e.key === "ArrowLeft") (e.preventDefault(), step(-1));
    else if (e.key === "Home") (e.preventDefault(), track.current?.scrollTo({ left: 0, behavior: smooth() }));
    else if (e.key === "End")
      (e.preventDefault(), track.current?.scrollTo({ left: track.current.scrollWidth, behavior: smooth() }));
  };

  /* mouse drag (touch and trackpads already scroll natively) */
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current;
    if (!el || (e.target as HTMLElement).closest("button, a, input")) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: el.scrollLeft };
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.x;
      if (!drag.current.moved && Math.abs(dx) > 5) {
        drag.current.moved = true;
        el.classList.add("is-dragging");
      }
      if (drag.current.moved) el.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.classList.remove("is-dragging");
      drag.current.down = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  /* a drag shouldn't count as a click on a video */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const range = s.first === s.last ? `${s.first}` : `${s.first}-${s.last}`;
  return (
    <div className={`carousel ${className}`} data-prev={s.prev} data-next={s.next}>
      <div
        ref={track}
        className="media-rail"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
      {s.total > 0 && (
        <div className="carousel-controls">
          <div className="carousel-progress" aria-hidden="true">
            <span style={{ width: `${s.thumbW}%`, left: `${s.thumbL}%` }} />
          </div>
          <span className="carousel-count" aria-live="polite">
            {range} / {s.total}
          </span>
          <div className="gallery-arrows">
            <button type="button" className="arrow-control" aria-label={`Previous ${label}`} disabled={!s.prev} onClick={() => step(-1)}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="arrow-control" aria-label={`Next ${label}`} disabled={!s.next} onClick={() => step(1)}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
