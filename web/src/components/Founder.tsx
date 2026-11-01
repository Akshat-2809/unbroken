import Image from "next/image";
import founderPhoto from "@/assets/founder/rajat-bhatnagar.jpg";
import { FOUNDER_LINKEDIN } from "@/lib/site";
import { ScrollTrigger } from "./ScrollTrigger";
import styles from "./Founder.module.css";

const CAREER: [string, string, string, number, number][] = [
  ["American Express Global Business Travel", "2007 – 2012", "Business operations team lead, B2B clients, SLAs.", 2007.4, 2012.1],
  ["NIIT Technologies", "2013", "Business operations lead.", 2013, 2013.9],
  ["Product & strategic consulting · Logistics", "2013 – 2021", "B2B, B2C, warehousing, FTL, PTL, reverse logistics, ERP.", 2013.9, 2021.6],
  ["Swym", "2021 – 2022", "Lead, Product Implementation. SaaS for eCommerce.", 2021.7, 2022.4],
  ["IBS Software", "2022 – 2026", "Product Manager, then Lead Product Manager. Airline staff travel product.", 2022.4, 2026.2],
  ["Unbroken · Founder", "Apr 2026 –", "AI-native enterprise platform for logistics and supply chain.", 2026.25, 2026.9],
];
const FIRST_YEAR = 2007;
const SPAN = 2026.9 - FIRST_YEAR;

export function Founder() {
  return (
    <section className="sec" id="founder" data-sec="5">
      <div className="wrap">
        <div className="shead rv">
          <span className="num">05 · Founder</span>
          <h2 className="h2">22+ years. Operations first, then the software.</h2>
          <p className="lede">A career that began in operations, learning how businesses actually run, before years spent on the software used to run them.</p>
        </div>
        <ScrollTrigger className={styles.fd} activeClassName={styles.go} at={0.72}>
          <div className={styles.idcard}>
            <Image className={styles.photo} src={founderPhoto} alt="Rajat Bhatnagar" width={200} height={200} sizes="200px" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <h3 style={{ fontSize: 32 }}>Rajat Bhatnagar</h3>
              <span className="lab">Founder · Gurugram</span>
            </div>
            <div className={styles.facts}>
              <div><span>Now</span>Founder, since Apr 2026</div>
              <div><span>Before</span>IBS Software</div>
              <div><span>Study</span>PGCP Product Management, IIM Indore</div>
              <div><span>Writes on</span>Logistics, supply chain, AI</div>
            </div>
            <a href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>linkedin.com/in/rajatbhatnagar000 ↗</a>
          </div>
          <div className={styles.gantt}>
            <div className={styles.yrs}><span>2007</span><span>2012</span><span>2017</span><span>2022</span><span>2026</span></div>
            {CAREER.map(([where, when, what, from, to]) => (
              <div className={styles.grow} key={where}>
                <div className={styles.meta}><b><span>{where}</span></b><span>{when}</span></div>
                <div className={styles.gtrack}>
                  <span
                    className={`${styles.gbar} ${where.startsWith("Unbroken") ? styles.now : ""}`}
                    style={{ left: `${(((from - FIRST_YEAR) / SPAN) * 100).toFixed(2)}%`, width: `${Math.max(1.2, ((to - from) / SPAN) * 100).toFixed(2)}%` }}
                  />
                </div>
                <p style={{ fontSize: 14.5, color: "var(--ink2)" }}>{what}</p>
              </div>
            ))}
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
