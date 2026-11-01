import Link from "next/link";
import { JumpMenu } from "./JumpMenu";
import { LogoMark } from "./Logo";
import { ProgressRail } from "./ProgressRail";
import styles from "./Nav.module.css";

export function Nav({ home = false }: { home?: boolean }) {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.navin}`}>
        <Link className={styles.logo} href="/#top" aria-label="Unbroken home">
          <LogoMark />
          <b>unbrokenops</b>
        </Link>
        <div className={styles.cmd}>{home && <JumpMenu />}</div>
        <div className={styles.navr}>
          <Link className={`${styles.nlink} ${styles.hide}`} href="/#founder">Founder</Link>
          <Link className="btn btn-z" href="/#talk" style={{ minHeight: 44 }}>Talk to Rajat</Link>
        </div>
      </div>
      <ProgressRail home={home} />
    </header>
  );
}
