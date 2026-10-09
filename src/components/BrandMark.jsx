function BrandMark({ className = '' }) {
  return <svg className={`brand-mark ${className}`} viewBox="0 0 120 80" role="img" aria-label="Sage GFX infinity mark" focusable="false"><defs><linearGradient id="sage-infinity-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f019bd"/><stop offset="48%" stopColor="#9939f2"/><stop offset="100%" stopColor="#00d4f3"/></linearGradient></defs><path d="M60 40C43 20 34 12 24 12a28 28 0 1 0 0 56c12 0 21-10 36-28s24-28 36-28a28 28 0 1 1 0 56c-10 0-19-8-36-28Z" fill="none" stroke="url(#sage-infinity-gradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default BrandMark
