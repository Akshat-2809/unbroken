"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const CHAIN = [
  ["Requirement", "customer need", "Email"],
  ["Commitment", "commercial", "Excel"],
  ["Operation", "on the ground", "Calls"],
  ["Exception", "costs, documents", "WhatsApp"],
  ["Billing", "collections", "Report"],
  ["Relationship", "continuing", ""],
];

/** One shipment's journey: starts fragmented, joins up after a moment unless the visitor has chosen a view. */
export function Journey() {
  const [broken, setBroken] = useState(true);
  const touched = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!touched.current) setBroken(false);
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  const show = (next: boolean) => {
    touched.current = true;
    setBroken(next);
  };

  return (
    <div className={styles.flow}>
      <div className={styles.flowtop}>
        <span className="lab" style={{ color: "#A7AAA4" }}>The business journey · one shipment</span>
        <div className={styles.toggle} role="group" aria-label="View">
          <button type="button" className={broken ? styles.on : ""} aria-pressed={broken} onClick={() => show(true)}>Fragmented</button>
          <button type="button" className={broken ? "" : `${styles.on} ${styles.z}`} aria-pressed={!broken} onClick={() => show(false)}>Unbroken</button>
        </div>
      </div>
      <div className={`${styles.track} ${broken ? styles.broken : ""}`}>
        <div className={styles.pulse} aria-hidden="true"><i /></div>
        {CHAIN.map(([label, sub, gap], i) => (
          <Fragment key={label}>
            <div className={styles.node}>
              <span className={styles.dot} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}><b><span>{label}</span></b><span>{sub}</span></div>
            </div>
            {i < CHAIN.length - 1 && (
              <div className={styles.conn} aria-hidden="true">
                <span className={styles.a} />
                <span className={styles.b} />
                <span className={styles.chip}>{gap}</span>
                <svg className={styles.gapx} viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="#FF5A36" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className={styles.flowcap}>
        <span>{broken ? "Every time information moves between people, departments or systems, context can be lost." : "Continuity of information. Continuity of context. From the ground to management."}</span>
        <span className="ill" style={{ color: "#A7AAA4" }}>Illustration · the problem, not the product</span>
      </div>
    </div>
  );
}
