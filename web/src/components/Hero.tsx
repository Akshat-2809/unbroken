import { Journey } from "./Journey";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" data-sec="0">
      <div className={`wrap ${styles.hin}`}>
        <span className="tag" style={{ color: "#A7AAA4" }}><i />In stealth · AI-native enterprise platform for logistics &amp; supply chain</span>
        <h1 className={styles.h1}>Make all your technology work as <span className={styles.z}>one business.</span></h1>
        <p className={styles.hlede}>Logistics businesses already run on plenty of software. <b>The problem is what happens between one process, one system and the next.</b> Unbroken is being built for that gap.</p>
        <div className={styles.hcta}>
          <a className="btn btn-z" href="#talk">Talk to Rajat</a>
          <a className="btn btn-o" href="#problem">Read the problem</a>
        </div>
        <Journey />
      </div>
    </section>
  );
}
