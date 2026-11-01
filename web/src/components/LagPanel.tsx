"use client";

import { useState } from "react";
import { ACCENT } from "@/lib/site";
import styles from "./Timing.module.css";

const COPY = {
  good: { color: ACCENT, bg: "#F2FBD3", tag: "Intelligence", verdict: "Something can still be done about it.", sub: "Making better decisions while transactions are still happening." },
  mid: { color: "#FFB23F", bg: "#FFF1D9", tag: "Getting late", verdict: "The window to act is closing.", sub: "Information is being collected and reconciled while the operation moves on." },
  late: { color: "#FF5A36", bg: "#FFE5DE", tag: "A report", verdict: "Useful for looking back.", sub: "Management is looking at what happened, not what is happening." },
};

function seenLabel(lag: number) {
  if (lag === 0) return "Seen as it happens";
  if (lag < 24) return `Seen ${lag} h later`;
  return `Seen ${Math.round((lag / 24) * 10) / 10} days later`;
}

/** The slider: how many hours after the exception the team finds out. */
export function LagPanel() {
  const [lag, setLag] = useState(72);
  const copy = lag <= 4 ? COPY.good : lag < 36 ? COPY.mid : COPY.late;
  const width = `${((lag / 72) * 100).toFixed(1)}%`;
  const seen = seenLabel(lag);

  return (
    <div className={styles.panel}>
      <div className={styles.tl} aria-hidden="true">
        <span className={styles.base} />
        <span className={styles.lag} style={{ width, background: copy.color }} />
        <span className={styles.mk} style={{ left: "0%" }}><span className={styles.first}>Exception happens</span><i style={{ background: "#FF5A36" }} /></span>
        <span className={styles.mk} style={{ left: width }}>
          <span className={styles.seen} style={{ top: 54, "--t": lag / 72 } as React.CSSProperties}><span>{seen}</span></span>
          <i style={{ background: "#0E0F11", boxShadow: `0 0 0 4px ${copy.color}` }} />
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 16 }}>
        <label htmlFor="lag" className="lab">When the team finds out</label>
        <input id="lag" className={styles.range} type="range" min={0} max={72} step={1} value={lag} onChange={(e) => setLag(Number(e.target.value))} aria-valuetext={seen} />
        <div className={styles.scale}><span>As it happens</span><span>1 day</span><span>2 days</span><span>3 days</span></div>
      </div>
      <div className={styles.verdict} style={{ background: copy.bg }} aria-live="polite">
        <span className="lab">{copy.tag}</span>
        <b>{copy.verdict}</b>
        <p style={{ color: "var(--ink2)" }}>{copy.sub}</p>
      </div>
      <span className="ill">Illustration</span>
    </div>
  );
}
