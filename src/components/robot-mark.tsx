/** Line-drawn robot used as the site mark: square head, antenna, tank tracks. */
export function RobotMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" className={className} aria-hidden>
      <path d="M12 2.5v3" />
      <circle cx="12" cy="2" r="0.9" stroke="none" style={{ fill: "var(--accent)" }} />
      <rect x="5" y="5.5" width="14" height="9" />
      <circle cx="9.3" cy="10" r="1.3" />
      <circle cx="14.7" cy="10" r="1.3" />
      <path d="M8 14.5v2.5h8v-2.5" />
      <rect x="3.5" y="17" width="17" height="4.5" rx="2.25" />
      <circle cx="7" cy="19.25" r="0.6" fill="currentColor" />
      <circle cx="12" cy="19.25" r="0.6" fill="currentColor" />
      <circle cx="17" cy="19.25" r="0.6" fill="currentColor" />
    </svg>
  );
}
