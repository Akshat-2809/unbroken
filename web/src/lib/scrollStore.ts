/** Shared client state for the nav: which section is current, and how far down the page we are. */
export type ScrollState = { cur: number; prog: number };

export const SERVER_SCROLL_STATE: ScrollState = { cur: 0, prog: 0 };

let state = SERVER_SCROLL_STATE;
let raf = 0;
const listeners = new Set<() => void>();

function measure() {
  raf = 0;
  const vh = window.innerHeight || 800;
  const secs = document.querySelectorAll("[data-sec]");
  let cur = 0;
  secs.forEach((sec) => {
    if (sec.getBoundingClientRect().top < vh * 0.4) cur = Number(sec.getAttribute("data-sec"));
  });
  const top = secs[0]?.getBoundingClientRect().top ?? 0;
  const end = document.querySelector("[data-foot]")?.getBoundingClientRect().top ?? 1;
  const prog = Math.max(0, Math.min(1, (vh * 0.4 - top) / Math.max(1, end - top)));
  const progMoved = Math.abs(prog - state.prog) > 0.003;
  if (cur === state.cur && !progMoved) return;
  state = { cur, prog: progMoved ? prog : state.prog };
  listeners.forEach((l) => l());
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(measure);
}

export function getScrollState() {
  return state;
}

export function subscribeScroll(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
