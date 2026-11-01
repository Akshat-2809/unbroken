"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getScrollState, SERVER_SCROLL_STATE, subscribeScroll } from "@/lib/scrollStore";
import { SECTIONS } from "./sections";
import styles from "./Nav.module.css";

const getServerState = () => SERVER_SCROLL_STATE;

/** The "Jump to" command bar: names the current section and opens the list of sections. */
export function JumpMenu() {
  const { cur } = useSyncExternalStore(subscribeScroll, getScrollState, getServerState);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = cur === 0 ? null : SECTIONS[cur - 1];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // display: contents keeps the design's layout: the button and menu sit directly in .cmd
    <div ref={rootRef} style={{ display: "contents" }}>
      <button type="button" className={styles.cmdbtn} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <span>Jump to · <span className={styles.cur}>{current ? current.label : "Overview"}</span></span>
        <span className={styles.k}>{current ? current.n : "00"} / 06</span>
      </button>
      {open && (
        <div className={styles.menu}>
          <span className={styles.mh}>Sections</span>
          {SECTIONS.map((sec, i) => (
            <a key={sec.n} href={sec.href} onClick={() => setOpen(false)}>
              <span className={styles.n}>{sec.n}</span>
              <span>{sec.label}</span>
              <span className={styles.s}>{cur === i + 1 ? "here" : cur > i + 1 ? "passed" : ""}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
