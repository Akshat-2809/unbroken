import styles from "./Band.module.css";

export function Band() {
  return (
    <section className={styles.band}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span className="lab">From the founder&apos;s writing</span>
        <p className={styles.big}>The business journey is continuous. The information journey often isn&apos;t.</p>
      </div>
    </section>
  );
}
