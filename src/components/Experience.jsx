import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView, slideUp } from '../utils'
import logoUCSC       from '../assets/images/logos/ucsc.png'
import logoKarannagoda from '../assets/images/logos/karanagoda.png'
import logoUnicorn    from '../assets/images/logos/unicorn.png'
import logoAnanda     from '../assets/images/logos/ananda.png'
import logoGurukula   from '../assets/images/logos/gurukula.png'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const jobs = [
  {
    company: 'University of Colombo School of Computing', period: '2025 – present',
    role: 'Bsc. in Information Systems', location: 'Colombo, Sri Lanka',
    preview: logoUCSC,
  },
  {
    company: 'Karannagoda Enterprises', period: '2024 – 2025',
    role: 'System Administrator', location: 'Colombo, Sri Lanka',
    preview: logoKarannagoda,
  },
  {
    company: 'Unicorn Hatch', period: '2024 – 2025',
    role: 'Trainee Software Engineer', location: 'Auckland, New Zealand (Remote)',
    preview: logoUnicorn,
  },
  {
    company: 'Ananda College', period: '2022 – 2024',
    role: 'Student', location: 'Colombo, Sri Lanka',
    preview: logoAnanda,
  },
  {
    company: 'Gurukula College', period: '2010 – 2021',
    role: 'Student', location: 'Kelaniya, Sri Lanka',
    preview: logoGurukula,
  },
]

function ExperienceRow({ job, inView, index, last, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      variants={slideUp} custom={index}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMouse({ x: rect.width * 0.5, y: rect.height * 0.5 })
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      style={{ borderTop: '1px solid rgba(187,187,187,0.2)', padding: isMobile ? '16px 0' : '0', position: 'relative', minHeight: isMobile ? 'auto' : 64 }}
    >
      <div style={{ borderTop: 'none', height: isMobile ? 'auto' : '100%' }}>
        {isMobile ? (
          /* ── Mobile: stacked two-line layout ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#fff' }}>
                {job.company}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#666', flexShrink: 0 }}>
                {job.period}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: '#999' }}>
                {job.role}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: '#555', flexShrink: 0 }}>
                {job.location}
              </p>
            </div>
          </div>
        ) : (
          /* ── Desktop: 4-column grid for consistent alignment ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2.2fr) 150px minmax(0, 1.6fr) minmax(0, 1fr)',
            columnGap: 32,
            alignItems: 'center',
            minHeight: 64,
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 500, color: '#fff' }}>
              {job.company}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: '#666' }}>
              {job.period}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 500, color: '#fff' }}>
              {job.role}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: '#666', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {job.location}
            </p>
          </div>
        )}
      </div>

      {/* Hover image card — desktop only */}
      {!isMobile && (
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.92,
            x: mouse.x + 70,
            y: mouse.y - 74,
          }}
          transition={{
            x: { duration: 0.06, ease: 'linear' },
            y: { duration: 0.06, ease: 'linear' },
            opacity: { duration: 0.22, delay: hovered ? 0.18 : 0, ease: 'easeOut' },
            scale:   { duration: 0.22, delay: hovered ? 0.18 : 0, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            position: 'absolute', left: 0, top: 0,
            width: 196, height: 142,
            borderRadius: 10, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 20px 34px rgba(0,0,0,0.42)',
            pointerEvents: 'none', zIndex: 3,
          }}
        >
          <img
            src={job.preview} alt={job.company}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      )}

      {last && <div style={{ borderTop: '1px solid rgba(187,187,187,0.2)', marginTop: isMobile ? 16 : 20 }} />}
    </motion.div>
  )
}

export default function Experience() {
  const isMobile = useIsMobile()
  const [headRef, headInView] = useInView()
  const [listRef, listInView] = useInView()

  const stripItems = isMobile
    ? ['Global.', 'Creative.']
    : ['Global.', 'Creative Collabs.', 'Studio.', 'Creative Partnerships.']

  return (
    <section style={{ background: '#000', paddingTop: isMobile ? 80 : 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Journey" right="Foot prints" />

        <div style={{ padding: isMobile ? '28px 16px 0' : '40px 24px 0', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div ref={headRef} style={{ flex: '1 1 auto', display: 'flex', gap: isMobile ? 12 : 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <motion.h2
              variants={slideUp} initial="hidden" animate={headInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(42px, 8vw, 208px)',
                fontWeight: 600,
                letterSpacing: '-0.05em',
                lineHeight: '90%',
                color: '#fff',
                mixBlendMode: 'difference',
              }}
            >
              Journey
            </motion.h2>

            <motion.h3
              variants={slideUp} custom={1}
              initial="hidden" animate={headInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(20px, 4vw, 49px)',
                fontWeight: 500,
                letterSpacing: '-0.8px',
                lineHeight: '103%',
                color: '#fff',
                mixBlendMode: 'difference',
              }}
            >
              ({jobs.length})
            </motion.h3>
          </div>
        </div>

        <div style={{
          height: 26,
          width: '100%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          marginTop: 12,
        }}>
          {stripItems.map((item) => (
            <span key={item} style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#000',
            }}>
              {item}
            </span>
          ))}
        </div>

        <div ref={listRef} style={{ padding: isMobile ? '0 16px' : '0 24px', maxWidth: 1440 }}>
          {jobs.map((job, i) => (
            <ExperienceRow
              key={job.company}
              job={job}
              inView={listInView}
              index={i}
              last={i === jobs.length - 1}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Section end marker — three asterisks */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 48 : 72,
          padding: isMobile ? '40px 0 0' : '56px 0 0',
        }}>
          {['*', '*', '*'].map((ast, i) => (
            <span key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 80 : 120,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              {ast}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
