import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
const HERO_IMAGE_SOURCES = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11]
const HERO_GRID_ITEMS = [
  g1, g2, g3, g4, g5, g6, g7,
  g8, g9, g10, g11, g1, g2, g3,
  g4, g5, g6, g7, g8, g9, g10,
  g11, g1, g2, g3, g4, g5, g6,
]

const preloadImage = (src) => new Promise((resolve) => {
  const img = new Image()
  img.decoding = 'sync'
  img.fetchPriority = 'high'
  img.src = src

  if (img.complete) {
    resolve()
    return
  }

  img.onload = () => resolve()
  img.onerror = () => resolve()
})

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
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const paragraphRef = useRef(null)
  const ctaRef = useRef(null)
  const stripRef = useRef(null)
  const topDividerRef = useRef(null)
  const heroNameRef = useRef(null)
  const loaderRef = useRef(null)
  const bottomDividerRef = useRef(null)
  const decodeTweenRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const failSafe = setTimeout(() => {
      if (!cancelled) setLoaded(true)
    }, 1400)

    Promise.all(HERO_IMAGE_SOURCES.map(preloadImage)).then(() => {
      if (!cancelled) setLoaded(true)
    })

    return () => {
      cancelled = true
      clearTimeout(failSafe)
    }
  }, [])

  // Set hidden initial states synchronously on first mount so there's no flash
  // of fully-rendered hero under the splash before GSAP takes over.
  useLayoutEffect(() => {
    const hasPlayed = sessionStorage.getItem('hero-intro-played') === '1'
    if (hasPlayed) return

    if (mediaRef.current) gsap.set(mediaRef.current, { opacity: 0, y: 32, scale: 0.94 })
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 48 })
    if (paragraphRef.current) gsap.set(paragraphRef.current, { opacity: 0, y: 28 })
    if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 20 })
    if (stripRef.current) gsap.set(stripRef.current, { y: 30 })
    if (topDividerRef.current) gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
    if (bottomDividerRef.current) gsap.set(bottomDividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
    if (heroNameRef.current) gsap.set(heroNameRef.current, { yPercent: 100, opacity: 0 })
    if (loaderRef.current) gsap.set(loaderRef.current, { xPercent: 0 })
  }, [])

  useLayoutEffect(() => {
    if (!loaded) return

    const ctx = gsap.context(() => {
      const hasPlayed = sessionStorage.getItem('hero-intro-played') === '1'
      if (hasPlayed) {
        if (heroNameRef.current) gsap.set(heroNameRef.current, { opacity: 1, yPercent: 0 })
        if (loaderRef.current) gsap.set(loaderRef.current, { xPercent: -110 })
        if (topDividerRef.current) gsap.set(topDividerRef.current, { scaleX: 1, transformOrigin: 'left center' })
        if (bottomDividerRef.current) gsap.set(bottomDividerRef.current, { scaleX: 1, transformOrigin: 'left center' })
        return
      }

      // Delay the whole intro so it plays AFTER the splash screen finishes
      // fading out (splash fade: 0.15s delay + 0.5s duration = 0.65s).
      const tl = gsap.timeline({
        delay: 0.72,
        defaults: { ease: 'power3.out' },
      })

      if (mediaRef.current) tl.to(mediaRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'expo.out' }, 0)
      if (titleRef.current) tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.72 }, 0.08)
      if (paragraphRef.current) tl.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.22)
      if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.52 }, 0.34)
      if (stripRef.current) tl.to(stripRef.current, { y: 0, duration: 0.55, ease: 'expo.out' }, 0.28)
      if (topDividerRef.current) tl.to(topDividerRef.current, { scaleX: 1, duration: 0.8 }, 0.4)
      if (heroNameRef.current) tl.to(heroNameRef.current, { opacity: 1, yPercent: 0, duration: 1.0, ease: 'power4.out' }, 0.5)
      if (loaderRef.current) tl.to(loaderRef.current, { xPercent: -110, duration: 1.0, ease: 'power3.inOut' }, 0.66)
      if (bottomDividerRef.current) tl.to(bottomDividerRef.current, { scaleX: 1, duration: 0.8 }, 0.82)

      sessionStorage.setItem('hero-intro-played', '1')
    }, containerRef)

    return () => ctx.revert()
  }, [loaded])

  useEffect(() => {
    if (!loaded) return

    const TYPE_SPEED   = 0.085  // seconds per character while typing
    const DELETE_SPEED = 0.048  // seconds per character while deleting
    const HOLD         = 1.4    // seconds to hold the completed word
    const PAUSE        = 0.25   // seconds of blank gap before the next word

    const hasPlayed = sessionStorage.getItem('hero-intro-played') === '1'
    // On first visit, wait for the intro timeline to reveal the big title before typing.
    const startDelay = hasPlayed ? 0 : 1.5

    const tl = gsap.timeline({ repeat: -1, delay: startDelay })

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
            <div
              ref={mediaRef}
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
                items={HERO_GRID_ITEMS}
                interactive={false}
              />
            </div>
          )}

          {/* Left: Heading + paragraph + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: isMobile ? 8 : 14 }}>
            <div ref={titleRef}>
              <SectionH3>{heroTitle}</SectionH3>
            </div>

            <p
              ref={paragraphRef}
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
            </p>

            {!isMobile && (
              <div
                ref={ctaRef}
                style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <PillButton href="#work">Explore Projects</PillButton>
                <a
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
                >
                  Community Work
                </a>
              </div>
            )}
          </div>

          {/* Right: media frame (desktop only) */}
          {!isMobile && (
            <div
              ref={mediaRef}
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
                items={HERO_GRID_ITEMS}
                interactive
              />
            </div>
          )}
        </div>

        {/* Code / Create / Conquer strip (behind media, no negative margins) */}
        <div
          ref={stripRef}
          style={{
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
        <div
          ref={topDividerRef}
          style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }}
        />

        {/* Big name */}
        <div style={{ padding: '0 0', overflow: 'hidden', position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
          <div
            ref={heroNameRef}
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
          </div>

          {/* Loader overlay */}
          <div
            ref={loaderRef}
            style={{
              position: 'absolute', inset: 0,
              background: '#000', zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        </div>

        <div
          ref={bottomDividerRef}
          style={{ width: '100%', height: 1, background: 'rgba(187,187,187,0.2)' }}
        />
      </div>
    </section>
  )
}
