import styles from "./Status.module.css";

const DONE = ["Core platform built", "Major workflows working end-to-end", "Parts of the system working together"];

export function Status() {
  return (
    <section className={`sec ${styles.status}`} id="status" data-sec="4">
      <div className="wrap">
        <div className="shead rv">
          <span className="num">04 · Build status</span>
          <h2 className="h2" style={{ color: "#FFFFFF" }}>Not the foundation of an idea. A product that exists.</h2>
        </div>
        <div className={styles.st}>
          <div className={styles.checks}>
            {DONE.map((item) => (
              <div className={styles.ck} key={item}>
                <span className={`${styles.ring} ${styles.done}`} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0E0F11" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                </span>
                <span>{item}</span>
                <span className={`${styles.s} ${styles.z}`}>Done</span>
              </div>
            ))}
            <div className={styles.ck}>
              <span className={`${styles.ring} ${styles.wip}`} aria-hidden="true" />
              <span>Rigorous end-to-end UAT across real-world workflows</span>
              <span className={styles.s}>In progress</span>
            </div>
            <div className={styles.ck}>
              <span className={styles.ring} aria-hidden="true" style={{ boxShadow: "inset 0 0 0 2px #45484D" }} />
              <span>Out of stealth</span>
              <span className={styles.s}>When the time is right</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p className={styles.quote}>“There is still work to do, and I don&apos;t want to call it ready <em>before it is.</em>”</p>
            <p style={{ color: "#A7AAA4", fontSize: 18 }}>Still in stealth for a little longer. If you work in logistics, travel or enterprise software and want to talk, his DMs are open.</p>
            <a className="btn btn-z" href="#talk" style={{ alignSelf: "flex-start" }}>Start a conversation</a>
          </div>
        </div>
      </div>
    </section>
  );
}
