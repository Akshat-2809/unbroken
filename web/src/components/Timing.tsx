import { LagPanel } from "./LagPanel";
import styles from "./Timing.module.css";

export function Timing() {
  return (
    <section className="sec" id="timing" data-sec="2">
      <div className="wrap">
        <div className="shead rv">
          <span className="num">02 · Timing</span>
          <h2 className="h2">The same exception. Two very different things.</h2>
          <p className="lede">An exception discovered three days later is a report. The same exception identified while something can still be done about it is intelligence.</p>
        </div>
        <div className={styles.ri}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 18, color: "var(--ink2)" }}>Drag to choose when the team finds out.</p>
            <p style={{ fontSize: 18, color: "var(--ink2)" }}>By the time information has been collected, reconciled and presented, management may be looking at what happened instead of what is happening.</p>
          </div>
          <LagPanel />
        </div>
      </div>
    </section>
  );
}
