import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { SectionH3, PillButton } from './UI'
import GridMotion from './GridMotion'

import g1 from '../assets/images/gallery/g1.webp'
import g2 from '../assets/images/gallery/g2.webp'
import g3 from '../assets/images/gallery/g3.webp'
import g4 from '../assets/images/gallery/g4.webp'
import g5 from '../assets/images/gallery/g5.webp'
import g6 from '../assets/images/gallery/g6.webp'
import g7 from '../assets/images/gallery/g7.webp'
import g8 from '../assets/images/gallery/g8.webp'
import g9 from '../assets/images/gallery/g9.webp'
import g10 from '../assets/images/gallery/g10.webp'
import g11 from '../assets/images/gallery/g11.webp'

const heroTitle = 'Turning complex problems into intelligent systems.'
const heroParagraph = 'I design and build AI-powered, secure, and scalable solutions with real-world impact.'

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
        margin: '0 auto', paddingTop: isMobile ? 70 : 90, overflow: 'hidden',
        touchAction: 'pan-y'
      }}
    >
      {/* Top content */}
      <div
        style={{
          padding: isMobile ? '16px 16px 0' : '24px 24px 0',
          position: 'relative',
          zIndex: 2,
          paddingBottom: isMobile ? 26 + 18 : 26 + 24,
        }}
      >
        <div
          style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : '540px 1fr',
            gap: isMobile ? 16 : 48,
            alignItems: 'start',
          }}
        >
          {/* Mobile media goes first */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
              style={{
                width: '100%',
                height: 360,
                position: 'relative',
                marginBottom: 6,
                borderRadius: 14,
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              <GridMotion
                gradientColor="black"
                maxMoveAmount={180}
                items={[
                  g1, g2, g3, g4, g5, g6, g7,
                  g8, g9, g10, g11, g1, g2, g3,
                  g4, g5, g6, g7, g8, g9, g10,
                  g11, g1, g2, g3, g4, g5, g6,
                ]}
              />
            </motion.div>
          )}

          {/* Left: Heading + paragraph + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: isMobile ? 8 : 14 }}>
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 45 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <SectionH3>{heroTitle}</SectionH3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              style={{
                margin: '14px 0 0',
                fontFamily: "'Inter Display', sans-serif",
                fontSize: isMobile ? 16 : 18,
                fontWeight: 500,
                lineHeight: 1.35,
                color: 'rgba(255,255,255,0.78)',
                maxWidth: isMobile ? '100%' : 520,
              }}
            >
              {heroParagraph}
            </motion.p>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <PillButton href="#work">Explore Projects</PillButton>
                <motion.a
                  href="#volunteering"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 14px',
                    borderRadius: 259,
                    border: 'none',
                    fontFamily: "'Inter Display', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '-0.3px',
                    color: '#000',
                    background: '#fff',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, background 0.2s ease, color 0.2s ease',
                  }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Community Work
                </motion.a>
              </motion.div>
            )}
          </div>

          {/* Right: media frame (desktop only) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0.1, scale: 0.3, x: 220, y: -220 }}
              animate={{ opacity: loaded ? 1 : 0.1, scale: loaded ? 1 : 0.3, x: loaded ? 0 : 220, y: loaded ? 0 : -220 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
              style={{
                justifySelf: 'end',
                width: 560,
                height: 420,
                marginTop: 14,
                alignSelf: 'end',
                zIndex: 3,
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              <GridMotion
                gradientColor="black"
                maxMoveAmount={260}
                items={[
                  g1, g2, g3, g4, g5, g6, g7,
                  g8, g9, g10, g11, g1, g2, g3,
                  g4, g5, g6, g7, g8, g9, g10,
                  g11, g1, g2, g3, g4, g5, g6,
                ]}
              />
            </motion.div>
          )}
        </div>

        {/* Code / Create / Conquer strip (behind media, no negative margins) */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 26,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          zIndex: 1,
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
      </div>

      {/* Hero GridMotion styling (scoped) */}
      <style>{`
        /* Slight brutal overlay for legibility */
        .gridMotion-intro::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 40%, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.62) 70%);
          pointer-events: none;
          z-index: 3;
        }
      `}</style>

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
