import styles from "./Observations.module.css";

const OBSERVATIONS = [
  ["01", "Software does not remove operational complexity by itself.", "A process can be digitised and still require people to manually connect the information around it. That gap is easy to miss when software is viewed one function at a time."],
  ["02", "Timing changes the value of information.", "An operational problem identified after closure is useful for reporting. The same problem identified while there is still time to act is much more useful to the business."],
  ["03", "AI needs business context before it becomes useful.", "An answer without the right operational context can create more work rather than less. Intelligence is only as useful as the context available to it."],
];

export function Observations() {
  return (
    <section className="sec" id="observations" data-sec="3" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="shead rv">
          <span className="num">03 · Observations</span>
          <h2 className="h2">A few things that keep coming back.</h2>
          <p className="lede">Not management principles. Observations from years in operations and enterprise technology.</p>
        </div>
        <div className={`${styles.obs} rv`}>
          {OBSERVATIONS.map(([n, title, body]) => (
            <div className={styles.ob} key={n}>
              <span className={styles.big}>{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
