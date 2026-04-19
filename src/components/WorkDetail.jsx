import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from './Nav'
import { SectionLabel, Line, Marquee } from './UI'
import { projects } from '../data/projects'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

/* ─── small meta row with a thin divider beneath ─── */
function MetaRow({ label, value }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline',
        justifyContent: 'space-between', padding: '15px 0',
        gap: 16,
      }}>
        <span style={{
          fontFamily: "'Inter Display', sans-serif",
          fontSize: 13, fontWeight: 700,
          letterSpacing: '0.07em', textTransform: 'uppercase',
          color: 'rgba(153,153,153,0.7)',
          flexShrink: 0,
        }}>{label}</span>
        <span style={{
          fontFamily: "'Inter Display', sans-serif",
          fontSize: 15, fontWeight: 600,
          color: '#fff', textAlign: 'right',
        }}>{value}</span>
      </div>
      <div style={{ height: 1, background: 'rgba(187,187,187,0.12)' }} />
    </div>
  )
}

/* ─── mini project card used in "More Works" ─── */
function MoreCard({ project, onWorkClick, cardHeight = 390 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onWorkClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Image area */}
        <div style={{
          width: '100%', height: cardHeight, borderRadius: 10, overflow: 'hidden',
          position: 'relative', background: '#111',
        }}>
          <img
            src={project.bg} alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />

          {/* Darken overlay */}
          <motion.div
            animate={{ opacity: hovered ? 0.42 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 1, pointerEvents: 'none' }}
          />

          {/* Inner card */}
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1, y: hovered ? 2 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', zIndex: 2,
            }}
          >
            <div style={{ width: '50%', height: '50%', borderRadius: 10, overflow: 'hidden', boxShadow: '0 18px 30px rgba(0,0,0,0.28)' }}>
              <img src={project.inner} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* White strip reveal */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            background: '#fff', padding: '10px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hovered ? 'translate3d(0,-50%,0) scale(1)' : 'translate3d(0,-46%,0) scale(0.98)',
            opacity: hovered ? 1 : 0,
            filter: hovered ? 'blur(0px)' : 'blur(5px)',
            transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.36s ease, filter 0.36s ease',
            transitionDelay: hovered ? '140ms' : '0ms',
            zIndex: 4,
          }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 2,
              background: '#000', transformOrigin: 'left center',
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: hovered ? '220ms' : '0ms',
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', color: '#000', textAlign: 'center', width: '100%',
            }}>
              {project.title} ({project.id})
            </span>
          </div>
        </div>

        {/* Caption row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: "'Inter Display', sans-serif", fontSize: 19, fontWeight: 500, color: '#fff' }}>
            {project.title}
          </p>
          <p style={{ fontFamily: "'Inter Display', sans-serif", fontSize: 19, fontWeight: 500, color: '#fff' }}>
            ({project.id})
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Back button ─── */
function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: hovered ? '#fff' : 'rgba(153,153,153,0.7)',
        transition: 'color 0.2s',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to Works
    </button>
  )
}

/* ─── Main WorkDetail component ─── */
export default function WorkDetail({ project, onBack, onWorkClick }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [project.id])

  const moreWorks = projects.filter(p => p.id !== project.id).slice(0, 2)

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ background: '#000', minHeight: '100vh', color: '#fff' }}
    >
      <Nav />

      {/* ── Page body offset for fixed nav ── */}
      <div style={{ paddingTop: 88 }}>

        {/* ── Top bar: back button + project id ── */}
        <div style={{
          padding: isMobile ? '20px 16px' : '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <BackButton onClick={onBack} />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(153,153,153,0.5)',
          }}>
            Project {project.id} / 05
          </span>
        </div>

        <SectionLabel left={`© ${project.tag} — ${project.date}`} right="Selected Work" />

        {/* ── Marquee title ── */}
        <div style={{ overflow: 'hidden', marginTop: 0 }}>
          <Marquee
            items={[`${project.title} /`, `${project.title} /`, `${project.title} /`]}
            speed={14}
            bg="transparent"
            color="#fff"
            fontSize={isMobile ? 48 : 110}
            fontFamily="'Inter Display', sans-serif"
            uppercase={false}
          />
        </div>

        <div style={{ padding: isMobile ? '0 16px' : '0 24px' }}>
          <Line />
        </div>

        {/* ── Two-column layout (stacks on mobile) ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 0 : 60,
          padding: isMobile ? '0 16px' : '0 24px',
          alignItems: 'flex-start',
        }}>

          {/* Left: sticky info panel (static on mobile) */}
          <div style={{
            width: isMobile ? '100%' : 340,
            flexShrink: 0,
            position: isMobile ? 'static' : 'sticky',
            top: 94,
            paddingTop: isMobile ? 32 : 48,
            paddingBottom: isMobile ? 36 : 60,
            borderBottom: isMobile ? '1px solid rgba(187,187,187,0.12)' : 'none',
          }}>
            {/* Date badge */}
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(153,153,153,0.6)', marginBottom: 14,
            }}>
              {project.date}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: isMobile ? 15 : 16, fontWeight: 500, lineHeight: '1.6',
              color: 'rgba(200,200,200,0.85)',
              marginBottom: 32,
              maxWidth: isMobile ? '100%' : 'none',
            }}>
              {project.description}
            </p>

            {/* Meta rows */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ height: 1, background: 'rgba(187,187,187,0.12)' }} />
              <MetaRow label="Category" value={project.category} />
              <MetaRow label="Client"   value={project.client} />
              <MetaRow label="Duration" value={project.duration} />
              <MetaRow label="Location" value={project.location} />
            </div>

            {/* Contributors */}
            {project.contributors?.length > 0 && (
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: 'rgba(153,153,153,0.7)',
                  marginBottom: 12,
                }}>
                  Other Contributors
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.contributors.map((name, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: `hsl(${(i * 67 + 200) % 360}, 45%, 32%)`,
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 10, fontWeight: 700,
                          color: '#fff', textTransform: 'uppercase',
                        }}>
                          {name.charAt(0)}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: "'Inter Display', sans-serif",
                        fontSize: 14, fontWeight: 500,
                        color: 'rgba(210,210,210,0.9)',
                      }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: stacked project images */}
          <div style={{
            flex: 1,
            paddingTop: isMobile ? 28 : 48,
            paddingBottom: 60,
            width: isMobile ? '100%' : 'auto',
          }}>
            {project.images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: isMobile ? 240 : 580,
                  borderRadius: isMobile ? 8 : 10,
                  overflow: 'hidden',
                  marginBottom: i < project.images.length - 1 ? (isMobile ? 12 : 20) : 0,
                  background: '#111',
                }}
              >
                <img
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.04)',
                    display: 'block',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── More Works section ── */}
        <div style={{ marginTop: isMobile ? 60 : 100 }}>
          <SectionLabel left="© Selected Projects" right="Next Projects" />

          <div style={{ overflow: 'hidden' }}>
            <Marquee
              items={['More Projects©', 'More Projects©', 'More Projects©']}
              speed={10}
              bg="transparent"
              color="#fff"
              fontSize={isMobile ? 70 : 150}
              fontFamily="'Inter Display', sans-serif"
              uppercase={false}
            />
          </div>

          <div style={{ padding: isMobile ? '0 16px' : '0 24px' }}>
            <Line />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 16 : 24,
            padding: isMobile ? '28px 16px 80px' : '40px 24px 100px',
          }}>
            {moreWorks.map(p => (
              <MoreCard
                key={p.id}
                project={p}
                onWorkClick={onWorkClick}
                cardHeight={isMobile ? 220 : 390}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
