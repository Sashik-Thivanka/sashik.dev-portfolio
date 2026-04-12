import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView } from '../utils'

import frame1 from '../assets/images/about/Frame1.jpeg'
import frame2 from '../assets/images/about/Frame2.jpeg'
import frame3 from '../assets/images/about/Frame3.jpeg'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const REVEAL_TEXT = "Engineering secure, scalable systems with clean code and technical depth. Every solution built with structure, intent, and the discipline to get it right."

function RevealText({ text, inView, isMobile }) {
  const words = text.split(' ')
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(20px, 3.5vw, 45px)',
      fontWeight: 500,
      lineHeight: '1.1',
      letterSpacing: isMobile ? '-0.5px' : '-2.1px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0 0.3em',
    }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ color: 'rgb(102,102,102)' }}
          animate={{ color: inView ? '#fff' : 'rgb(102,102,102)' }}
          transition={{ duration: 0.4, delay: i * 0.03 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

export default function AboutLong() {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView(0.1)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yImg1 = useTransform(scrollYProgress, [0, 1], [80,  -80])
  const yImg2 = useTransform(scrollYProgress, [0, 1], [40, -120])
  const yImg3 = useTransform(scrollYProgress, [0, 1], [ 0,  -60])

  return (
    <section style={{ background: '#000', paddingTop: isMobile ? 80 : 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Developer Portfolio" right="Tech Innovator" />

        {isMobile ? (
          /* ── Mobile layout: text first, image strip below ── */
          <div style={{ padding: '32px 16px 0' }}>
            <div ref={ref}>
              <RevealText text={REVEAL_TEXT} inView={inView} isMobile />
            </div>

            {/* Image row */}
            <div style={{
              display: 'flex',
              gap: 10,
              marginTop: 32,
              overflowX: 'auto',
              paddingBottom: 4,
              scrollbarWidth: 'none',
            }}>
              {[frame1, frame2, frame3].map((src, i) => (
                <div key={i} style={{
                  flexShrink: 0,
                  width: 110,
                  height: 160,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop layout: parallax floating images ── */
          <div ref={containerRef} style={{ position: 'relative', padding: '60px 24px 0', minHeight: 340 }}>
            {/* Parallax image 1 */}
            <motion.div style={{
              y: yImg1,
              position: 'absolute', top: 60, left: 116,
              width: 76, height: 111,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <img src={frame1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Parallax image 2 */}
            <motion.div style={{
              y: yImg2,
              position: 'absolute', top: 100, right: 24,
              width: 144, height: 209,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <img src={frame2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Parallax image 3 */}
            <motion.div style={{
              y: yImg3,
              position: 'absolute', top: 200, left: 286,
              width: 85, height: 124,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <img src={frame3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Reveal text — centered */}
            <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <RevealText text={REVEAL_TEXT} inView={inView} isMobile={false} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
