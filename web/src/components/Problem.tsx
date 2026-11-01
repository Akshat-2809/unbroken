import { ScrollTrigger } from "./ScrollTrigger";
import styles from "./Problem.module.css";

const SYSTEMS = [
  ["Transport", "TMS"],
  ["Warehouse", "WMS"],
  ["Business", "ERP"],
  ["Sales", "CRM"],
  ["Tracking", "GPS"],
  ["Reports", "BI"],
];
const GLUE = ["Excel", "Email", "Calls"];
const TASKS = [
  "Someone prepares an Excel sheet.",
  "Someone reconciles two reports.",
  "Someone calls another department for an update.",
  "Someone searches through an email chain.",
  "Someone checks whether a particular charge was approved.",
  "Someone manually consolidates information for management.",
];

export function Problem() {
  return (
    <section className="sec" id="problem" data-sec="1">
      <div className="wrap">
        <div className="shead rv">
          <span className="num">01 · The problem</span>
          <h2 className="h2">We digitised functions, not the business.</h2>
          <p className="lede">Transportation has its systems. Warehousing has its own. Sales works on another platform, finance elsewhere, and customer communication is spread across emails, calls and WhatsApp. Each may do its job well. The business doesn&apos;t run as separate departments.</p>
        </div>
        <ScrollTrigger className={styles.silo} activeClassName={styles.go} at={0.72}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className={styles.sys} aria-label="Systems a logistics business already runs">
              {SYSTEMS.map(([what, name]) => (
                <div className={styles.box} key={name}><span>{what}</span><b>{name}</b></div>
              ))}
              {GLUE.map((name) => (
                <div className={`${styles.box} ${styles.manual}`} key={name}><span>Glue</span><b>{name}</b></div>
              ))}
            </div>
            <span className="ill">Outlined in orange: what people use to connect the rest</span>
          </div>
          <div className={styles.pile}>
            <span className="lab" style={{ marginBottom: 4 }}>Fragmentation&apos;s hidden cost</span>
            {TASKS.map((task, i) => (
              <div className={styles.task} key={task}><span className={styles.n}>H-0{i + 1}</span><p>{task}</p></div>
            ))}
            <p className={styles.sum}>Each seems insignificant on its own. Across hundreds or thousands of transactions, <b>it becomes an operating model.</b></p>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
