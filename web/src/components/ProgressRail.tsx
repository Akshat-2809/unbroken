"use client";

import { useSyncExternalStore } from "react";
import { getScrollState, SERVER_SCROLL_STATE, subscribeScroll } from "@/lib/scrollStore";
import { SECTIONS } from "./sections";
import styles from "./Nav.module.css";

const getServerState = () => SERVER_SCROLL_STATE;
const noSubscribe = () => () => {};

/** The continuity rail under the nav. On the other pages it stays an empty line. */
export function ProgressRail({ home }: { home: boolean }) {
  const { prog } = useSyncExternalStore(home ? subscribeScroll : noSubscribe, home ? getScrollState : getServerState, getServerState);

  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.fill} style={{ width: `${(prog * 100).toFixed(2)}%` }} />
      {SECTIONS.map((sec, i) => {
        const at = (i + 1) / 7;
        return <span key={sec.n} className={`${styles.tick} ${prog >= at ? styles.p : ""}`} style={{ left: `${at * 100}%` }} />;
      })}
    </div>
  );
}
