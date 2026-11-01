import Link from "next/link";
import { ARTICLE_URL, CONTACT_EMAIL, FOUNDER_LINKEDIN } from "@/lib/site";
import { FooterTalk } from "./FooterTalk";
import { LogoMark } from "./Logo";
import { ScrollTrigger } from "./ScrollTrigger";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.foot} data-foot="1">
      <div className={`wrap ${styles.fgrid}`}>
        <div className={styles.brand}>
          <Link className={styles.logo} href="/#top" aria-label="Unbroken home">
            <LogoMark size={34} />
            <span className={styles.wm}>unbrokenops</span>
          </Link>
          <p className={styles.motto}>Make all your technology work as one business.</p>
          <p className={styles.about}>AI-native enterprise platform for the logistics and supply chain industry.</p>
          <p className={styles.info}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21.5s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Gurugram, India
          </p>
        </div>

        <nav aria-labelledby="f-explore">
          <h2 className={styles.head} id="f-explore">Explore</h2>
          <ul className={styles.list}>
            <li><Link href="/#top">Home</Link></li>
            <li><Link href="/#problem">The problem</Link></li>
            <li><Link href="/#timing">Report vs intelligence</Link></li>
            <li><Link href="/#observations">Observations</Link></li>
            <li><Link href="/#status">Build status</Link></li>
            <li><Link href="/#founder">Founder</Link></li>
            <li><a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer">Read the article ↗</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="f-policies">
          <h2 className={styles.head} id="f-policies">Policies</h2>
          <ul className={styles.list}>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </nav>

        <div className={styles.raise}>
          <h2 className={styles.head}>Talk to Rajat</h2>
          <p className={styles.about}>Start with your work email. Rajat will be in touch.</p>
          <FooterTalk />
          <div className={styles.links}>
            <a className={styles.info} href={`mailto:${CONTACT_EMAIL}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {CONTACT_EMAIL}
            </a>
            <a className={styles.info} href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2.5" />
                <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5c0-1.8 1.2-3 2.6-3s2.4 1 2.4 3V17" />
              </svg>
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
      <ScrollTrigger className={styles.tray} activeClassName={styles.go} at={1} aria-hidden="true">
        <span className={styles.line} />
        <span className={styles.end} />
      </ScrollTrigger>
      <div className={styles.legal}>
        <span>© 2026 Unbroken</span>
        <Link href="/#top">Back to the top ↑</Link>
      </div>
    </footer>
  );
}
