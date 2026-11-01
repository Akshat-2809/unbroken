import { CONTACT_EMAIL, FOUNDER_LINKEDIN } from "@/lib/site";
import { TalkForm } from "./TalkForm";
import styles from "./Talk.module.css";

export function Talk() {
  return (
    <section className="sec" id="talk" data-sec="6" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="shead rv">
          <span className="num">06 · Talk</span>
          <h2 className="h2">Work in logistics, travel or enterprise software?</h2>
          <p className="lede">Rajat would like to hear how you see fragmentation in your own operations.</p>
        </div>
        <div className={styles.ct}>
          <TalkForm />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ fontSize: 18, color: "var(--ink2)" }}>Prefer email? Write to</p>
            <a className={styles.mail} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16 }}>Or message Rajat on LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
