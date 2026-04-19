import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel, Marquee } from './UI'
import { useInView, slideUp } from '../utils'
import { volunteeringItems } from '../data/volunteering'

import genzipher from '../assets/images/events/3-0.webp'
import aiForum from '../assets/images/events/1-1.webp'
import hourOfAI from '../assets/images/events/3-1.webp'
import blitz2 from '../assets/images/events/4-1.webp'
import edexEduExpo from '../assets/images/events/50.webp'
import oration2026 from '../assets/images/events/7-1.webp'
import akhankara from '../assets/images/events/5-2.webp'
import techDayWorkshopSeries26 from '../assets/images/events/80.webp'

gsap.registerPlugin(ScrollTrigger)

const CONFIG = {
  layerGap: 2500,
  lerp: 0.07,
  itemWidth: 560,
  itemHeight: 420,
  itemLabelHeight: 48,
  sideOffset: 470,
}

const IMAGE_POOL = [
  { name: 'Sri Lanka AI Forum', src: aiForum },
  { name: 'Sri Lanka AI Forum', src: aiForum },
  { name: 'GenZipher 1.0', src: genzipher },
  { name: 'Hour of AI', src: hourOfAI },
  { name: 'Blitz 2.0', src: blitz2 },
  { name: 'Edex Edu Expo 2026', src: edexEduExpo },
  { name: 'Oration 2026', src: oration2026 },
  { name: 'Akhankara', src: akhankara },
  { name: 'Tech Day Workshop Series 26', src: techDayWorkshopSeries26 },
 
  //{ name: 'Volunteer Research Sprint', src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80' },
  //{ name: 'Local Makers Network', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80' },
]

const contentLayerCount = IMAGE_POOL.length
const totalLayerCount = Math.max(contentLayerCount, 6)
const visibleDepth = 3 * CONFIG.layerGap
const exitPoint = 1500
const initialScroll = 750
const finalScroll = (totalLayerCount - 1) * CONFIG.layerGap + exitPoint + 350

function imageSrc(imageNumber) {
  return IMAGE_POOL[(imageNumber - 1) % IMAGE_POOL.length].src
}

function imageName(imageNumber) {
  return IMAGE_POOL[(imageNumber - 1) % IMAGE_POOL.length].name
}

function calculateOverlay(z) {
  if (z > exitPoint) return 1
  if (z > 0) return z / exitPoint
  if (z > -visibleDepth) {
    const progress = Math.abs(z) / visibleDepth
    return progress * progress
  }
  return 1
}

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

function volunteeringThumb(item) {
  if (item.images?.length) return item.images[0]
  return item.src
}

export default function Volunteering({ onItemClick }) {
  const isMobile = useIsMobile()
  const [headRef, headInView] = useInView()
  const spotlightRef = useRef(null)
  const carouselRef = useRef(null)
  const layerRefs = useRef([])
  const overlayRefs = useRef([])
  const targetScrollRef = useRef(initialScroll)
  const currentScrollRef = useRef(initialScroll)

  const layers = useMemo(
    () => Array.from({ length: totalLayerCount }, (_, i) => ({
      key: i,
      baseZ: -i * CONFIG.layerGap,
      imageNumber: (i % contentLayerCount) + 1,
      side: i % 2 === 0 ? 'right' : 'left',
    })),
    []
  )

  useEffect(() => {
    if (isMobile) return

    const spotlight = spotlightRef.current
    if (!spotlight) return

    let pinTrigger

    const endDistance = totalLayerCount * 520

    pinTrigger = ScrollTrigger.create({
      trigger: spotlight,
      start: 'top top',
      end: `+=${endDistance}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetScrollRef.current = gsap.utils.interpolate(initialScroll, finalScroll, self.progress)
      },
    })

    const tick = () => {
      currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * CONFIG.lerp

      layers.forEach((layer, i) => {
        const layerEl = layerRefs.current[i]
        const overlayEl = overlayRefs.current[i]
        if (!layerEl || !overlayEl) return

        const z = layer.baseZ + currentScrollRef.current
        const backBoost = z < -1200
          ? gsap.utils.clamp(1, 1.55, gsap.utils.mapRange(-visibleDepth, -1200, 1.55, 1, z))
          : 1
        const frontBoost = z > -500
          ? gsap.utils.clamp(1, 2.4, gsap.utils.mapRange(-500, exitPoint, 1, 2.4, z))
          : 1
        const depthScale = Math.max(backBoost, frontBoost)

        const overlay = calculateOverlay(z)

        gsap.set(layerEl, {
          z,
          scale: depthScale,
          visibility: overlay >= 1 ? 'hidden' : 'visible',
        })

        gsap.set(overlayEl, {
          opacity: Math.min(1, Math.max(0, overlay)),
        })
      })
    }

    targetScrollRef.current = initialScroll
    currentScrollRef.current = initialScroll
    gsap.ticker.add(tick)
    ScrollTrigger.refresh()

    return () => {
      pinTrigger?.kill()
      gsap.ticker.remove(tick)
    }
  }, [layers, isMobile])

  useEffect(() => {
    if (!isMobile) return
    const el = carouselRef.current
    if (!el) return

    // If the user scrolls over the carousel directly, map vertical wheel to horizontal.
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return

    const spotlight = spotlightRef.current
    const carousel = carouselRef.current
    if (!spotlight || !carousel) return

    const build = () => {
      const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth)
      // Keep the pinned tail short to avoid “empty space” after the last card.
      const endDistance = maxScroll + 140

      const t = ScrollTrigger.create({
        trigger: spotlight,
        start: 'top top',
        end: `+=${endDistance}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          carousel.scrollLeft = maxScroll * self.progress
        },
      })

      return () => t.kill()
    }

    let cleanup = build()
    ScrollTrigger.refresh()

    const onResize = () => {
      cleanup?.()
      cleanup = build()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cleanup?.()
    }
  }, [isMobile])

  return (
    <section data-section="volunteering" style={{ background: '#000', paddingTop: isMobile ? 96 : 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto', paddingBottom: isMobile ? 16 : 0 }}>
        <SectionLabel left="© Volunteering Work" right="Community Impact" />

        <div
          ref={headRef}
          style={{
            padding: isMobile ? '28px 16px 0' : '40px 24px 0',
            display: 'flex',
            gap: isMobile ? 14 : 24,
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <motion.h1
            variants={slideUp}
            initial="hidden"
            animate={headInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: isMobile ? 'clamp(44px, 12vw, 96px)' : 'clamp(52px, 8vw, 208px)',
              fontWeight: 600,
              letterSpacing: '-0.05em',
              lineHeight: '90%',
              color: '#fff',
              mixBlendMode: 'difference',
            }}
          >
            Volunteering
          </motion.h1>
          <motion.h3
            variants={slideUp}
            custom={1}
            initial="hidden"
            animate={headInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: isMobile ? 18 : 'clamp(24px, 4vw, 49px)',
              fontWeight: 500,
              letterSpacing: '-0.8px',
              lineHeight: '103%',
              color: '#fff',
              mixBlendMode: 'difference',
            }}
          >
            ({contentLayerCount})
          </motion.h3>
        </div>

        <div style={{
          minHeight: 26,
          width: '100%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '8px 12px' : '0 24px',
          marginTop: 20,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? 6 : 0,
        }}>
          {['Guide.', 'Build.', 'Uplift.', 'Sustain.'].map((item) => (
            <span key={item} style={{
              flex: isMobile ? '1 1 42%' : 1,
              textAlign: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 10 : 12,
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#000',
            }}>
              {item}
            </span>
          ))}
        </div>

        <div
          ref={spotlightRef}
          style={{
            position: 'relative',
            width: '100%',
            height: isMobile ? '100svh' : '100svh',
            backgroundColor: '#000',
            perspective: isMobile ? undefined : 1000,
            overflow: isMobile ? 'hidden' : 'hidden',
            marginTop: 22,
            paddingBottom: 0,
            display: isMobile ? 'flex' : undefined,
            flexDirection: isMobile ? 'column' : undefined,
            justifyContent: isMobile ? 'center' : undefined,
          }}
        >
          <div style={{
            position: isMobile ? 'relative' : 'absolute',
            inset: isMobile ? undefined : 0,
            zIndex: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            minHeight: isMobile ? 56 : undefined,
            overflow: 'hidden',
          }}
          >
            <Marquee
              items={['Volunteering Works©', 'Volunteering Works©', 'Volunteering Works©']}
              speed={10}
              bg="transparent"
              color="#fff"
              fontSize={isMobile ? 52 : 150}
              fontFamily="'Inter Display', sans-serif"
              uppercase={false}
            />
          </div>

          {isMobile ? (
            <div
              ref={carouselRef}
              style={{
                position: 'relative',
                zIndex: 2,
                marginTop: 12,
                paddingLeft: 16,
                paddingRight: 16,
                display: 'flex',
                gap: 14,
                overflowX: 'hidden',
                overflowY: 'hidden',
                scrollSnapType: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollbarGutter: 'stable',
                scrollPaddingLeft: 16,
                scrollPaddingRight: 16,
                overscrollBehaviorX: 'contain',
                paddingBottom: 8,
                // Let cards render edge-to-edge on small screens (no fade mask cropping).
                touchAction: 'pan-y',
              }}
            >
              {volunteeringItems.map((item, idx) => (
                <button
                  type="button"
                  key={`${item.id}-${idx}`}
                  onClick={() => onItemClick?.(item)}
                  style={{
                    flex: '0 0 auto',
                    width: 'calc(100vw - 32px)',
                    maxWidth: 420,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 3',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  >
                    <img
                      src={volunteeringThumb(item)}
                      alt={item.name}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div style={{
                    marginTop: 10,
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    letterSpacing: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                  >
                    {item.name}
                  </div>
                  {item.date ? (
                    <div style={{
                      marginTop: 4,
                      color: 'rgba(255,255,255,0.55)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                    >
                      {item.date}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformStyle: 'preserve-3d',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
            >
              {layers.map((layer, i) => (
                <div
                  key={layer.key}
                  ref={(el) => {
                    layerRefs.current[i] = el
                  }}
                  style={{ position: 'absolute' }}
                >
                  <div
                    className="volunteering-tunnel-item"
                    onClick={() => {
                      const item = volunteeringItems[(layer.imageNumber - 1) % volunteeringItems.length]
                      onItemClick?.(item)
                    }}
                    style={{
                      position: 'absolute',
                      width: CONFIG.itemWidth,
                      height: CONFIG.itemHeight + CONFIG.itemLabelHeight,
                      left: layer.side === 'right'
                        ? `${CONFIG.sideOffset}px`
                        : `${-CONFIG.sideOffset - CONFIG.itemWidth}px`,
                      top: `${-(CONFIG.itemHeight + CONFIG.itemLabelHeight) / 2}px`,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: CONFIG.itemHeight, borderRadius: 10, overflow: 'hidden' }}>
                      <img
                        src={imageSrc(layer.imageNumber)}
                        alt={imageName(layer.imageNumber)}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="volunteering-tunnel-image"
                      />
                    </div>

                    <div style={{
                      marginTop: 10,
                      color: '#fff',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 22,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: 0,
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {imageName(layer.imageNumber)}
                    </div>

                    <div
                      ref={(el) => {
                        overlayRefs.current[i] = el
                      }}
                      style={{
                        position: 'absolute',
                        inset: `0 0 ${CONFIG.itemLabelHeight}px 0`,
                        backgroundColor: '#000',
                        opacity: 0.45,
                        borderRadius: 10,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}