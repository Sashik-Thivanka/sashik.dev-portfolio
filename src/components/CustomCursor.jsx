import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cursorEffect from '../assets/images/cursor_effect.png'

export default function CustomCursor() {
  const [enabled,    setEnabled]    = useState(false)
  const [visible,    setVisible]    = useState(false)
  const [imageReady, setImageReady] = useState(true)
  const [pos,        setPos]        = useState({ x: -200, y: -200 })
  const [pillLabel,  setPillLabel]  = useState(null)   // null = no pill

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')

    const apply = () => {
      const active = mq.matches
      setEnabled(active)
      document.body.classList.toggle('custom-cursor-enabled', active)
    }

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    // Walk up the DOM looking for clickable elements.
    // We check inline style.cursor (not computed) because the global
    // `cursor: none !important` makes getComputedStyle always return 'none'.
    const isClickable = (el) => {
      const tag = el.tagName?.toLowerCase()
      return (
        tag === 'a' ||
        tag === 'button' ||
        el.getAttribute('role') === 'button' ||
        el.style?.cursor === 'pointer'
      )
    }

    const onOver = (e) => {
      let el = e.target
      while (el && el !== document.body) {
        // Check for a custom label first
        const label = el.getAttribute?.('data-cursor-label')
        if (label) {
          setPillLabel(label)
          return
        }
        if (isClickable(el)) {
          setPillLabel('More')
          return
        }
        el = el.parentElement
      }
      setPillLabel(null)
    }

    apply()
    mq.addEventListener('change', apply)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)

    return () => {
      mq.removeEventListener('change', apply)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
      transition={{
        x: { type: 'spring', stiffness: 420, damping: 32 },
        y: { type: 'spring', stiffness: 420, damping: 32 },
        opacity: { duration: 0.18 },
      }}
      style={{
        position: 'fixed', left: 0, top: 0,
        pointerEvents: 'none', zIndex: 9999,
      }}
    >
      <AnimatePresence mode="wait">
        {pillLabel ? (
          /* ── pill cursor ── inverted colours (white bg, black text) */
          <motion.div
            key={pillLabel}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: 'translate(-50%, -50%)',
              background: '#fff',
              color: '#000',
              padding: '9px 20px',
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
            }}
          >
            {pillLabel}
          </motion.div>
        ) : (
          /* ── Default spinning circle cursor ── */
          <motion.div
            key="circle"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginLeft: -43, marginTop: -43, width: 86, height: 86 }}
          >
            {imageReady ? (
              <motion.img
                src={cursorEffect}
                alt=""
                onError={() => setImageReady(false)}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
                style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.45) inset',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
