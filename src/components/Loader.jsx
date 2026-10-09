function Loader({ text = 'Loading...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        gap: '16px',
        color: 'var(--color-heading)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(208, 158, 107, 0.2)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: '#666' }}>
        {text}
      </p>
    </div>
  )
}

export default Loader
