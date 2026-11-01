import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found — Unbroken",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.logo} href="/" aria-label="Unbroken home">
          <LogoMark />
          <b>unbrokenops</b>
        </Link>
        <span className="lab" style={{ color: "#A7AAA4" }}>Error 404</span>
        <h1 className={styles.big}>404</h1>
        <p className={styles.note}>This link is broken. The rest of the site isn&apos;t.</p>
        <Link className="btn btn-z" href="/">Back to home</Link>
      </div>
    </main>
  );
}
