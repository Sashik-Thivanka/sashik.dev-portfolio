import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { SectionH3, PillButton } from './UI'
import video from '../assets/images/hero.gif'

const heroLines = [
  'Designing, building, and',
  'securing digital systems',
  'with deep logic',
  'and real-world impact.',
]

const stripItems = ['Code. ', 'Create. ', 'Conquer.']
const TYPEWRITER_WORDS = ['Code.', 'Create.', 'Conquer.']

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

export default function Hero() {
  const isMobile = useIsMobile()
  const [loaded, setLoaded] = useState(false)
  const [heroName, setHeroName] = useState('')
  const containerRef = useRef(null)
  const heroNameRef = useRef(null)
  const decodeTweenRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 30)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return

    const TYPE_SPEED   = 0.085  // seconds per character while typing
    const DELETE_SPEED = 0.048  // seconds per character while deleting
    const HOLD         = 1.4    // seconds to hold the completed word
    const PAUSE        = 0.25   // seconds of blank gap before the next word

    const tl = gsap.timeline({ repeat: -1 })

    TYPEWRITER_WORDS.forEach((word) => {
      // Type each character
      for (let i = 1; i <= word.length; i++) {
        tl.call(() => setHeroName(word.slice(0, i)), null, `+=${TYPE_SPEED}`)
      }
      // Hold at full word
      tl.to({}, { duration: HOLD })
      // Delete each character
      for (let i = word.length - 1; i >= 0; i--) {
        tl.call(() => setHeroName(word.slice(0, i)), null, `+=${DELETE_SPEED}`)
      }
      // Brief pause before next word
      tl.to({}, { duration: PAUSE })
    })

    decodeTweenRef.current = tl

    return () => { tl.kill() }
  }, [loaded])

  return (
    <section
      id="top"
      ref={containerRef}
      style={{
        background: '#000', width: '100%', maxWidth: 1480,
        margin: '0 auto', paddingTop: isMobile ? 70 : 90, overflow: 'hidden'
      }}
    >
      {/* Top content */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: isMobile ? '16px 16px 0' : '24px 24px 0',
        gap: isMobile ? 16 : 24,
      }}>
        {/* Reel on mobile goes first (above text) */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <img src={video} alt="Reel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        )}

        {/* Heading lines + CTA */}
        <div style={{ flex: '1 1 300px', maxWidth: isMobile ? '100%' : 540, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {heroLines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 45 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.04 }}
            >
              <SectionH3>{line}</SectionH3>
            </motion.div>
          ))}

          {/* Desktop-only CTA */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              style={{ marginTop: 32 }}
            >
              <PillButton href="#work">See Projects</PillButton>
            </motion.div>
          )}
        </div>

        {/* Reel on desktop (right side) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0.1, scale: 0.3, x: 280, y: -270 }}
            animate={{ opacity: loaded ? 1 : 0.1, scale: loaded ? 1 : 0.3, x: loaded ? 0 : 280, y: loaded ? 0 : -270 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
            style={{
              flex: '0 0 auto',
              width: 420,
              aspectRatio: '4 / 3',
              borderRadius: 10,
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <img src={video} alt="Reel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        )}
      </div>

      {/* Code / Create / Conquer strip */}
      <div style={{
        height: 26,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        marginTop: isMobile ? 16 : 24,
      }}>
        {stripItems.map(item => (
          <span key={item} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 700,
            color: '#000', letterSpacing: '0.02em'
          }}>
            {item}
          </span>
        ))}
      </div>

      {/* Bottom bar + Big title */}
      <div style={{ marginTop: isMobile ? 16 : 40 }}>
        <motion.div
          initial={{ opacity: 1, x: -1520 }}
          animate={{ opacity: 1, x: loaded ? 0 : -1520 }}
          transition={{ type: 'spring', stiffness: 220, damping: 48, delay: 0.22 }}
          style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }}
        />

        {/* Big name */}
        <div style={{ padding: '0 0', overflow: 'hidden', position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
          <motion.div
            ref={heroNameRef}
            initial={{ opacity: 1, scale: 0.6, y: -350 }}
            animate={{ opacity: 1, scale: loaded ? 1 : 0.6, y: loaded ? 0 : -350 }}
            transition={{ duration: 0.85, ease: [0.95, -0.02, 0.38, 1], delay: 0.1 }}
            style={{ padding: '8px 24px', overflow: 'hidden' }}
          >
            <h1 className="hero-title" style={{
              fontFamily: "'Inter Display', sans-serif",
              fontWeight: 600, letterSpacing: '-0.05em',
              lineHeight: '90%', color: '#fff',
              mixBlendMode: 'difference', whiteSpace: 'nowrap',
              width: '100%', textAlign: 'center'
            }}>
              {heroName}<span className="hero-cursor">|</span>
            </h1>
          </motion.div>

          {/* Loader overlay */}
          <motion.div
            initial={{ opacity: 0.9, x: 0 }}
            animate={{ opacity: 0.9, x: loaded ? -2000 : 0 }}
            transition={{ type: 'spring', bounce: 0.2, delay: 0.18, duration: 0.9 }}
            style={{
              position: 'absolute', inset: 0,
              background: '#000', zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 1, x: -1520 }}
          animate={{ opacity: 1, x: loaded ? 0 : -1520 }}
          transition={{ type: 'spring', stiffness: 220, damping: 48, delay: 0.22 }}
          style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }}
        />
      </div>
    </section>
  )
}
