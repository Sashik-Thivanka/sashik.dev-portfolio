import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Section label bar ── */
export function SectionLabel({ left, right }) {
  return (
    <div style={{
      width: '100%', padding: '0 20px',
      display: 'flex', flexDirection: 'column', gap: 0
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 0'
      }}>
        <span style={{
          fontFamily: "'Inter Display', sans-serif", fontSize: 13,
          fontWeight: 400, letterSpacing: 0, textTransform: 'uppercase',
          color: '#fff'
        }}>{left}</span>
        <span style={{
          fontFamily: "'Inter Display', sans-serif", fontSize: 13,
          fontWeight: 400, letterSpacing: 0, textTransform: 'uppercase',
          color: 'rgba(187,187,187,0.2)'
        }}>{right}</span>
      </div>
      <div style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }} />
    </div>
  )
}

/* ── Divider line ── */
export function Line() {
  return <div style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }} />
}

/* ── Rolling text button hover ── */
export function RollingText({ children, style = {}, lineHeight = 17 }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: 'hidden', height: lineHeight, cursor: 'pointer',
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 14, fontWeight: 600, ...style
      }}
    >
      <motion.div animate={{ y: hovered ? -lineHeight : 0 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}>
        <div style={{ color: 'rgba(153,153,153,1)', lineHeight: `${lineHeight}px` }}>{children}</div>
        <div style={{ color: '#fff', lineHeight: `${lineHeight}px` }}>{children}</div>
      </motion.div>
    </div>
  )
}

/* ── Pill button ── */
export function PillButton({ children, href = '#', dark = false }) {
  const [hovered, setHovered] = useState(false)

  const text = typeof children === 'string' ? children : null

  return (
    <motion.a
      href={href}
      onMouseEnter={() => {
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '8px 14px', borderRadius: 259,
        border: '2px solid #fff',
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px',
        color: hovered ? '#000' : '#fff',
        background: hovered ? '#fff' : 'transparent',
        overflow: 'hidden', position: 'relative',
        cursor: 'pointer', transition: 'color 0.25s, background 0.25s',
        textTransform: 'uppercase'
      }}
    >
      {text ? (
        <div style={{ overflow: 'hidden', height: 20, lineHeight: '20px' }}>
          <motion.div
            animate={{ y: hovered ? -20 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ lineHeight: '20px' }}>{text}</div>
            <div style={{ lineHeight: '20px' }}>{text}</div>
          </motion.div>
        </div>
      ) : children}
    </motion.a>
  )
}

/* ── Marquee ticker ── */
export function Marquee({ items, speed = 40, bg = '#fff', color = '#000', fontSize = 16, fontFamily = "'Inter Display', sans-serif", uppercase = true }) {
  const text = items.join('  ·  ') + '  ·  '
  return (
    <div style={{
      width: '100%', background: bg, overflow: 'hidden',
      padding: '18px 0', display: 'flex', gap: 0
    }}>
      <motion.div
        style={{ display: 'flex', whiteSpace: 'nowrap', gap: 60 }}
        animate={{ x: [0, -1200] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{
            fontFamily,
            fontSize, fontWeight: 600,
            color, letterSpacing: '0.02em', textTransform: uppercase ? 'uppercase' : 'none'
          }}>{text}</span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Big display heading ── */
export function DisplayHeading({ children, style = {} }) {
  return (
    <h1 style={{
      fontFamily: "'Inter Display', sans-serif",
      fontSize: 'clamp(52px, 8vw, 208px)',
      fontWeight: 600,
      letterSpacing: '-0.05em',
      lineHeight: '90%',
      color: '#fff',
      mixBlendMode: 'difference',
      ...style
    }}>{children}</h1>
  )
}

/* ── Section heading h3 ── */
export function SectionH3({ children, style = {} }) {
  return (
    <h3 style={{
      fontFamily: "'Inter Display', sans-serif",
      fontSize: 'clamp(24px, 4vw, 49px)',
      fontWeight: 500,
      letterSpacing: '-0.8px',
      lineHeight: '103%',
      color: '#fff',
      mixBlendMode: 'difference',
      ...style
    }}>{children}</h3>
  )
}

/* ── Body text ── */
export function BodyText({ children, muted = false, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Inter Display', sans-serif",
      fontSize: 19, fontWeight: 500,
      lineHeight: '1.33', letterSpacing: 0,
      color: muted ? '#999' : '#fff',
      ...style
    }}>{children}</p>
  )
}

/* ── Small label text ── */
export function LabelText({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Inter Display', sans-serif",
      fontSize: 14, fontWeight: 600,
      lineHeight: '17px', letterSpacing: 0,
      color: '#fff', ...style
    }}>{children}</p>
  )
}
