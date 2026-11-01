export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 5 V18 a8 8 0 0 0 16 0 V5" fill="none" stroke="var(--zest)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="3.2" fill="#ECEDEA" />
      <circle cx="24" cy="5" r="3.2" fill="#ECEDEA" />
    </svg>
  );
}
