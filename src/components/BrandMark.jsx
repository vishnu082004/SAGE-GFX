function BrandMark({ className = '', variant = 'default', ...props }) {
  const footerMark = variant === 'footer'
  const viewBox = footerMark ? '0 0 216 96' : '0 0 120 80'

  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox={viewBox}
      role="img"
      aria-label="Sage GFX infinity mark"
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient id="sage-infinity-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f019bd" />
          <stop offset="48%" stopColor="#9939f2" />
          <stop offset="76%" stopColor="#304cff" />
          <stop offset="100%" stopColor="#00d4f3" />
        </linearGradient>
      </defs>
      {footerMark ? (
        <>
          <ellipse className="brand-mark-path" cx="70" cy="48" rx="45" ry="32" fill="none" stroke="url(#sage-infinity-gradient)" strokeWidth="25" />
          <ellipse className="brand-mark-path" cx="146" cy="48" rx="45" ry="32" fill="none" stroke="url(#sage-infinity-gradient)" strokeWidth="25" />
        </>
      ) : (
        <>
          <circle className="brand-mark-path" cx="38" cy="40" r="27" fill="none" stroke="url(#sage-infinity-gradient)" strokeWidth="14" />
          <circle className="brand-mark-path" cx="82" cy="40" r="27" fill="none" stroke="url(#sage-infinity-gradient)" strokeWidth="14" />
        </>
      )}
    </svg>
  )
}

export default BrandMark
