import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoSrc from '../assets/images/website_loader.png'

function LogoMark() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'flex-start' }}>
      <img
        src={logoSrc}
        alt="ST"
        style={{ width: 180, height: 'auto', display: 'block' }}
      />

      {/* Blinking camera recording dot — sits at the foot of the T */}
      <span
        className="preloader-dot"
        style={{
          position: 'absolute',
          bottom: 29,
          right: 17,
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#ef4444',
          display: 'block',
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const barRef       = useRef(null)

  useEffect(() => {
    const MIN_MS = 2800      // always show for at least 2.8 s
    const start  = Date.now()
    let killed   = false

    const obj = { pct: 0 }

    // Animate bar from 0 → 88 % during the load window
    const tween = gsap.to(obj, {
      pct: 88,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (barRef.current) barRef.current.style.width = `${obj.pct}%`
      },
    })

    const finish = () => {
      if (killed) return
      killed = true
      tween.kill()

      // Rush bar to 100 %
      gsap.to(obj, {
        pct: 100,
        duration: 0.28,
        ease: 'power1.out',
        onUpdate: () => {
          if (barRef.current) barRef.current.style.width = `${obj.pct}%`
        },
        onComplete: () => {
          // Short pause, then fade out
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.55,
            delay: 0.18,
            ease: 'power2.inOut',
            onComplete: () => onComplete?.(),
          })
        },
      })
    }

    const onLoaded = () => {
      const elapsed   = Date.now() - start
      const remaining = Math.max(0, MIN_MS - elapsed)
      setTimeout(finish, remaining)
    }

    const fallback = setTimeout(finish, 5000) // hard cap

    if (document.readyState === 'complete') {
      onLoaded()
    } else {
      window.addEventListener('load', onLoaded, { once: true })
    }

    return () => {
      killed = true
      tween.kill()
      clearTimeout(fallback)
      window.removeEventListener('load', onLoaded)
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          30000,
        background:      '#000',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             52,
      }}
    >
      <LogoMark />

      {/* Progress track + label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width:          200,
          height:         1,
          background:     'rgba(255,255,255,0.1)',
          position:       'relative',
          overflow:       'hidden',
          borderRadius:   1,
        }}>
          <div
            ref={barRef}
            style={{
              position:     'absolute',
              left: 0, top: 0, bottom: 0,
              width:        '0%',
              background:   '#fff',
              borderRadius: 1,
              transition:   'width 0.08s linear',
            }}
          />
        </div>

        <p style={{
          fontFamily:     "'Inter', sans-serif",
          fontSize:       10,
          fontWeight:     700,
          letterSpacing:  '0.2em',
          textTransform:  'uppercase',
          color:          'rgba(255,255,255,0.3)',
        }}>
          Loading
        </p>
      </div>
    </div>
  )
}
