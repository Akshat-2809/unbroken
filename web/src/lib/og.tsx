import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Unbroken — Make all your technology work as one business.";

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M8 5 V18 a8 8 0 0 0 16 0 V5" fill="none" stroke="#C8F031" strokeWidth="4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="3.2" fill="#ECEDEA" />
      <circle cx="24" cy="5" r="3.2" fill="#ECEDEA" />
    </svg>
  );
}

/** Shared by opengraph-image and twitter-image. */
export function renderOgImage() {
  // Sync read keeps the image prerendered at build time (async fs would make it dynamic).
  const archivo = readFileSync(join(process.cwd(), "assets/Archivo-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0E0F11", fontFamily: "Archivo", color: "#FFFFFF", overflow: "hidden" }}>
        {/* the hero's grid */}
        {Array.from({ length: 14 }, (_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: i * 48, height: 1, background: "rgba(236,237,234,.06)" }} />
        ))}
        {Array.from({ length: 26 }, (_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: i * 48, width: 1, background: "rgba(236,237,234,.06)" }} />
        ))}

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#ECEDEA" }}>
            <Mark size={68} />
            <span style={{ fontSize: 46, letterSpacing: "-0.02em" }}>unbrokenops</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            <span>Make all your technology</span>
            <span>work as</span>
            <span style={{ color: "#C8F031" }}>one business.</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 800 }] },
  );
}

export function renderAppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0E0F11" }}>
        <Mark size={132} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
