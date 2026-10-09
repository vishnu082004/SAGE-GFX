import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowRight, FiRotateCw, FiX } from 'react-icons/fi'

const TARGET = 10

function SageRunnerGame({ onClose, onLaunch, inline = false }) {
  const canvasRef = useRef(null)
  const closeRef = useRef(null)
  const returnFocusRef = useRef(document.activeElement)
  const playerRef = useRef({ x: .18, y: .5 })
  const keysRef = useRef(new Set())
  const scoreRef = useRef(0)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const complete = score >= TARGET

  useEffect(() => {
    if (inline) return undefined
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll('.sage-runner-dialog[role="dialog"] button:not(:disabled)')]
        if (!controls.length) return
        if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus() }
        else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      returnFocusRef.current?.focus?.()
    }
  }, [inline, onClose])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined
    let width = 1
    let height = 1
    let dpr = 1
    let frame = 0
    let last = 0
    let elapsed = 0
    const player = playerRef.current
    const shards = Array.from({ length: 7 }, (_, index) => ({ x: .48 + index * .19, y: .18 + Math.random() * .64, phase: index * .8, taken: false, respawnAt: 0 }))
    const stars = Array.from({ length: 56 }, (_, index) => ({
      x: ((index * 73 + 19) % 997) / 997,
      y: ((index * 137 + 43) % 613) / 1000,
      size: index % 9 === 0 ? 1.8 : index % 3 === 0 ? 1.2 : .7,
      alpha: .18 + ((index * 17) % 55) / 100,
    }))
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(bounds.width, 1); height = Math.max(bounds.height, 1)
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, .04); last = now; elapsed += dt
      if (scoreRef.current < TARGET) {
        if (keysRef.current.has('arrowleft') || keysRef.current.has('a')) player.x -= dt * .65
        if (keysRef.current.has('arrowright') || keysRef.current.has('d')) player.x += dt * .65
        if (keysRef.current.has('arrowup') || keysRef.current.has('w')) player.y -= dt * .65
        if (keysRef.current.has('arrowdown') || keysRef.current.has('s')) player.y += dt * .65
        player.x = Math.max(.04, Math.min(.96, player.x)); player.y = Math.max(.1, Math.min(.9, player.y))
        shards.forEach((shard) => {
          if (shard.taken) {
            if (elapsed >= shard.respawnAt && scoreRef.current < TARGET) { shard.taken = false; shard.x = 1.03 + Math.random() * .4; shard.y = .12 + Math.random() * .76 }
            return
          }
          shard.x -= dt * .16
          if (Math.abs(shard.x - player.x) < .035 && Math.abs(shard.y - player.y) < .065) {
            shard.taken = true
            shard.respawnAt = elapsed + .65
            scoreRef.current += 1
            setScore(scoreRef.current)
          }
          if (shard.x < -.04) { shard.x = 1.03 + Math.random() * .4; shard.y = .12 + Math.random() * .76 }
        })
      }
      context.clearRect(0, 0, width, height)
      const wash = context.createLinearGradient(0, 0, width, height)
      wash.addColorStop(0, '#060c1c'); wash.addColorStop(.52, '#0a102a'); wash.addColorStop(1, '#100b24')
      context.fillStyle = wash; context.fillRect(0, 0, width, height)
      const nebula = context.createRadialGradient(width * .5, height * .56, 0, width * .5, height * .56, width * .62)
      nebula.addColorStop(0, 'rgba(31,59,143,.2)'); nebula.addColorStop(.55, 'rgba(101,24,142,.1)'); nebula.addColorStop(1, 'rgba(4,8,22,0)')
      context.fillStyle = nebula; context.fillRect(0, 0, width, height)
      stars.forEach((star) => {
        context.beginPath(); context.fillStyle = `rgba(153,207,255,${star.alpha})`
        context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2); context.fill()
      })
      // A distant signal ring anchors the field while the floor grid gives the game a sense of depth.
      context.save(); context.translate(width * .52, height * .54); context.scale(1, .35)
      context.strokeStyle = 'rgba(29,190,239,.2)'; context.lineWidth = 1.2
      context.beginPath(); context.ellipse(0, 0, width * .24, height * .2, 0, 0, Math.PI * 2); context.stroke()
      context.strokeStyle = 'rgba(205,54,221,.13)'; context.beginPath(); context.ellipse(0, 0, width * .34, height * .29, 0, 0, Math.PI * 2); context.stroke(); context.restore()
      const horizon = height * .68
      const floor = context.createLinearGradient(0, horizon, 0, height)
      floor.addColorStop(0, 'rgba(12,75,142,.11)'); floor.addColorStop(.44, 'rgba(7,19,50,.24)'); floor.addColorStop(1, 'rgba(29,12,58,.08)')
      context.fillStyle = floor; context.fillRect(0, horizon, width, height - horizon)
      context.save(); context.beginPath(); context.rect(0, horizon, width, height - horizon); context.clip()
      context.lineWidth = 1
      for (let line = -8; line <= 8; line += 1) {
        context.strokeStyle = line % 4 === 0 ? 'rgba(23,205,241,.32)' : 'rgba(64,132,211,.15)'
        context.beginPath(); context.moveTo(width * .52, horizon); context.lineTo(width * (.52 + line * .19), height); context.stroke()
      }
      for (let step = 1; step <= 8; step += 1) {
        const progress = step / 8
        const y = horizon + (height - horizon) * progress * progress
        context.strokeStyle = step === 1 ? 'rgba(223,48,218,.3)' : 'rgba(36,154,225,.17)'
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke()
      }
      context.restore()
      shards.forEach((shard) => {
        if (shard.taken) return
        const x = shard.x * width; const y = (shard.y + Math.sin(elapsed * 2 + shard.phase) * .01) * height
        context.save(); context.translate(x, y); context.rotate(Math.PI / 4); context.shadowColor = '#11ddff'; context.shadowBlur = 18; context.fillStyle = '#30d8f4'; context.fillRect(-6, -6, 12, 12); context.restore()
      })
      context.save(); context.translate(player.x * width, player.y * height); context.shadowColor = '#d62cf7'; context.shadowBlur = 22
      context.strokeStyle = '#49e3ff'; context.lineWidth = 6; context.lineCap = 'round'; context.beginPath()
      context.moveTo(-18, 0); context.bezierCurveTo(-11, -17, -4, -17, 0, 0); context.bezierCurveTo(6, 17, 14, 17, 18, 0); context.bezierCurveTo(14, -17, 6, -17, 0, 0); context.bezierCurveTo(-4, 17, -11, 17, -18, 0); context.stroke(); context.restore()
      if (!inline) frame = requestAnimationFrame(draw)
    }
    const onKey = (event) => {
      const key = event.key.toLowerCase()
      if (['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d'].includes(key)) { event.preventDefault(); keysRef.current.add(key) }
    }
    const onKeyUp = (event) => keysRef.current.delete(event.key.toLowerCase())
    const movePlayer = (event) => {
      if (scoreRef.current >= TARGET) return
      const bounds = canvas.getBoundingClientRect()
      player.x = Math.max(.04, Math.min(.96, (event.clientX - bounds.left) / bounds.width))
      player.y = Math.max(.1, Math.min(.9, (event.clientY - bounds.top) / bounds.height))
    }
    resize()
    if (inline) {
      const previewObserver = new ResizeObserver(() => { resize(); draw(performance.now()) })
      previewObserver.observe(canvas)
      draw(performance.now())
      return () => previewObserver.disconnect()
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas)
    window.addEventListener('keydown', onKey); window.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('pointerdown', movePlayer); canvas.addEventListener('pointermove', movePlayer)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame); observer.disconnect()
      window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('pointerdown', movePlayer); canvas.removeEventListener('pointermove', movePlayer)
      keysRef.current.clear()
    }
  }, [inline, round])

  const restart = () => { scoreRef.current = 0; playerRef.current = { x: .18, y: .5 }; setScore(0); setRound((value) => value + 1) }
  const dialog = <div className={inline ? 'sage-runner-inline' : 'sage-runner-overlay'} onClick={() => { if (inline) onLaunch?.() }} onMouseDown={(event) => { if (!inline && event.target === event.currentTarget) onClose() }}>
    <section className={inline ? 'sage-runner-dialog sage-runner-dialog--inline' : 'sage-runner-dialog'} role={inline ? undefined : 'dialog'} aria-modal={inline ? undefined : 'true'} aria-labelledby="sage-runner-title">
      <header className="sage-runner-header"><div><span className="sage-runner-status"><i /> Sage Runner / Interactive</span><h2 id="sage-runner-title">Collect the Sage signal</h2></div>{!inline && <button ref={closeRef} type="button" className="sage-runner-close" onClick={onClose} aria-label="Close Sage Runner"><FiX /></button>}</header>
      <div className={`sage-runner-field${inline ? ' sage-runner-field--preview' : ''}`}><canvas ref={canvasRef} aria-label={inline ? 'Sage Runner preview. Press Play Sage Runner to start the full-screen game.' : `Sage Runner game field. ${score} of ${TARGET} signal shards collected.`} />{inline && <div className="sage-runner-preview-start"><span>YOUR SIGNAL IS READY</span><button type="button" onClick={onLaunch}>Play Sage Runner <FiArrowRight aria-hidden="true" /></button><small>Collect 10 shards. Use keys, pointer or touch.</small></div>}{complete && <div className="sage-runner-win"><span>Signal restored</span><strong>Great run!</strong><p>You collected all {TARGET} Sage shards.</p><button type="button" onClick={restart}>Play again <FiRotateCw /></button></div>}</div>
      <footer className="sage-runner-footer"><div><span>SHARDS</span><strong>{String(score).padStart(2, '0')}<i> / {TARGET}</i></strong></div><p>Move with <b>W A S D</b> or <b>arrow keys</b>. You can also move your pointer or swipe on the field.</p><span className="sage-runner-live"><i /> LIVE</span></footer>
    </section>
  </div>
  return inline ? dialog : createPortal(dialog, document.body)
}

export default SageRunnerGame
