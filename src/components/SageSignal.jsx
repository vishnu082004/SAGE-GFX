import { useEffect, useRef } from 'react'

const LOGO_PATH = 'M60 40C43 20 34 12 24 12a28 28 0 1 0 0 56c12 0 21-10 36-28s24-28 36-28a28 28 0 1 1 0 56c-10 0-19-8-36-28Z'

function SageSignal({ active = true, reducedMotion = false, onProgress }) {
  const canvasRef = useRef(null)
  const rootRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !root || !ctx) return undefined
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', LOGO_PATH)
    const totalLength = path.getTotalLength()
    const nodes = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 - Math.PI / 2
      return { x: .5 + Math.cos(angle) * .35, y: .5 + Math.sin(angle) * .34, on: false }
    })
    const particles = Array.from({ length: window.innerWidth < 700 ? 54 : 90 }, () => ({
      x: Math.random(), y: Math.random(), vx: 0, vy: 0, seed: Math.random() * 10,
    }))
    const pointer = { x: .5, y: .5, tx: .5, ty: .5, active: false, lastX: .5, lastY: .5, speed: 0 }
    let width = 0, height = 0, dpr = 1, raf = 0, visible = true, disposed = false
    let last = performance.now()
    const logoPoints = Array.from({ length: 125 }, (_, i) => {
      const point = path.getPointAtLength((i / 125) * totalLength)
      return { x: point.x / 120, y: point.y / 80 }
    })
    const resize = () => {
      const rect = root.getBoundingClientRect()
      width = rect.width; height = rect.height; dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (event) => {
      const rect = root.getBoundingClientRect()
      pointer.tx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
      pointer.ty = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
      pointer.active = true
    }
    const stop = () => { pointer.active = false }
    root.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', stop)
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !reducedMotion) { last = performance.now(); raf = requestAnimationFrame(draw) } })
    visibility.observe(root)

    function draw(now) {
      if (disposed || !visible || reducedMotion || !active) return
      const dt = Math.min((now - last) / 16.7, 2); last = now
      ctx.clearRect(0, 0, width, height)
      const px = pointer.x * width, py = pointer.y * height
      pointer.x += (pointer.tx - pointer.x) * .15; pointer.y += (pointer.ty - pointer.y) * .15
      pointer.speed = Math.min(1, Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY) * 32)
      pointer.lastX = pointer.x; pointer.lastY = pointer.y
      const cx = width * .5, cy = height * .49, scale = Math.min(width * .48, height * .72)
      const progress = progressRef.current

      // Ambient field gently follows the signal and gathers into the real mark geometry.
      particles.forEach((p, i) => {
        if (progress >= 1) {
          const target = logoPoints[i % logoPoints.length]
          const tx = cx + (target.x - .5) * scale * 1.72
          const ty = cy + (target.y - .5) * scale * 1.72
          p.vx += (tx - p.x) * .0011 * dt; p.vy += (ty - p.y) * .0011 * dt
        } else if (progress > .55 && i < 52) {
          const target = logoPoints[i % logoPoints.length]
          const tx = cx + (target.x - .5) * scale * 1.72
          const ty = cy + (target.y - .5) * scale * 1.72
          p.vx += (tx - p.x) * .00038 * dt; p.vy += (ty - p.y) * .00038 * dt
        }
        const dx = p.x - px, dy = p.y - py, distance = Math.max(8, Math.hypot(dx, dy))
        if (pointer.active && progress < 1 && distance < 110) {
          const force = (1 - distance / 110) * (.22 + pointer.speed * .55)
          p.vx += (dx / distance) * force * dt; p.vy += (dy / distance) * force * dt
        }
        p.vx += Math.sin(now * .00045 + p.seed) * .006 * dt
        p.vy += Math.cos(now * .0004 + p.seed * 1.7) * .006 * dt
        p.vx *= .965; p.vy *= .965; p.x += p.vx * dt; p.y += p.vy * dt
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        const alpha = progress >= 1 && i < 52 ? .64 : .22 + (i % 5) * .035
        ctx.beginPath(); ctx.arc(p.x, p.y, i % 9 === 0 ? 1.7 : 1, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? `rgba(0,212,243,${alpha})` : `rgba(220,58,204,${alpha})`; ctx.fill()
      })

      let activated = 0
      nodes.forEach((node, i) => {
        const nx = node.x * width, ny = node.y * height
        if (pointer.active && Math.hypot(px - nx, py - ny) < (window.innerWidth < 700 ? 56 : 43)) node.on = true
        if (node.on) activated++
        if (i > 0 && node.on && nodes[i - 1].on) {
          ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nodes[i - 1].x * width, nodes[i - 1].y * height)
          ctx.strokeStyle = 'rgba(99,145,234,.42)'; ctx.lineWidth = 1; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(nx, ny, node.on ? 3.5 : 1.4, 0, Math.PI * 2)
        ctx.fillStyle = node.on ? '#21d2eb' : 'rgba(179,197,229,.32)'; ctx.fill()
        if (node.on) { ctx.beginPath(); ctx.arc(nx, ny, 8 + Math.sin(now * .004) * 2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(24,202,237,.26)'; ctx.stroke() }
      })
      const next = Math.max(progress, activated / nodes.length * .7)
      if (next !== progress) { progressRef.current = next; onProgress?.(next) }
      if (activated === nodes.length && progress < 1) {
        progressRef.current = Math.min(1, Math.max(progress, next) + .006 * dt)
        if (progressRef.current === 1) onProgress?.(1)
      }
      if (pointer.active && progress < 1) {
        ctx.beginPath(); ctx.arc(px, py, 3 + pointer.speed * 2, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'; ctx.shadowBlur = 15; ctx.shadowColor = '#14cde9'; ctx.fill(); ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(draw)
    }
    if (active && !reducedMotion) raf = requestAnimationFrame(draw)
    return () => {
      disposed = true; cancelAnimationFrame(raf); resizeObserver.disconnect(); visibility.disconnect()
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', stop)
    }
  }, [active, reducedMotion, onProgress])

  return <div ref={rootRef} className="sage-signal-field" aria-hidden="true"><canvas ref={canvasRef} /></div>
}

export default SageSignal
