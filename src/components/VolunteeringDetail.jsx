import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from './Nav'
import { SectionLabel, Line, Marquee } from './UI'
import { volunteeringItems } from '../data/volunteering'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

/* ─── meta row with thin divider ─── */
function MetaRow({ label, value }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline',
        justifyContent: 'space-between', padding: '15px 0', gap: 16,
      }}>
        <span style={{
          fontFamily: "'Inter Display', sans-serif",
          fontSize: 13, fontWeight: 700,
          letterSpacing: '0.07em', textTransform: 'uppercase',
          color: 'rgba(153,153,153,0.7)', flexShrink: 0,
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

/* ─── impact badge ─── */
function ImpactBadge({ value }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '10px 18px',
      border: '1.5px solid rgba(255,255,255,0.18)',
      borderRadius: 4,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11, fontWeight: 800,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#fff',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: '#ef4444', flexShrink: 0,
        boxShadow: '0 0 6px 2px rgba(239,68,68,0.45)',
      }} />
      {value}
    </div>
  )
}

/* ─── mini card for "More Volunteering" ─── */
function MoreCard({ item, onItemClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onItemClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          width: '100%', aspectRatio: '2 / 3', borderRadius: 10,
          overflow: 'hidden', position: 'relative', background: '#111',
        }}>
          <img
            src={item.src} alt={item.name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          <motion.div
            animate={{ opacity: hovered ? 0.45 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 1, pointerEvents: 'none' }}
          />
          {/* Hover label */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            padding: '12px 16px',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.36s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 2,
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', color: '#fff', letterSpacing: '0.08em',
            }}>
              View Details →
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: "'Inter Display', sans-serif", fontSize: 16, fontWeight: 500, color: '#fff' }}>
            {item.name}
          </p>
          <p style={{ fontFamily: "'Inter Display', sans-serif", fontSize: 14, fontWeight: 500, color: '#666' }}>
            {item.id}
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
      Back to Volunteering
    </button>
  )
}

/* ─── Main VolunteeringDetail component ─── */
export default function VolunteeringDetail({ item, onBack, onItemClick }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [item.id])

  const moreItems = volunteeringItems.filter(v => v.id !== item.id).slice(0, 2)

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ background: '#000', minHeight: '100vh', color: '#fff' }}
    >
      <Nav />

      <div style={{ paddingTop: 88 }}>

        {/* ── Top bar ── */}
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
            Vol. {item.id} / 12
          </span>
        </div>

        <SectionLabel left={`© Volunteering — ${item.date}`} right="Community Work" />

        {/* ── Marquee title ── */}
        <div style={{ overflow: 'hidden' }}>
          <Marquee
            items={[`${item.name} /`, `${item.name} /`, `${item.name} /`]}
            speed={14}
            bg="transparent"
            color="#fff"
            fontSize={isMobile ? 44 : 100}
            fontFamily="'Inter Display', sans-serif"
            uppercase={false}
          />
        </div>

        <div style={{ padding: isMobile ? '0 16px' : '0 24px' }}>
          <Line />
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : '340px minmax(0, 1fr)',
          columnGap: isMobile ? undefined : 60,
          rowGap: isMobile ? 0 : undefined,
          padding: isMobile ? '0 16px' : '0 24px',
          alignItems: 'flex-start',
          overflow: 'visible',
        }}>

          {/* Left: sticky info panel */}
          <div style={{
            width: '100%',
            flexShrink: 0,
            alignSelf: 'flex-start',
            position: isMobile ? 'static' : 'sticky',
            top: 110,
            paddingTop: isMobile ? 32 : 48,
            paddingBottom: isMobile ? 36 : 60,
            borderBottom: isMobile ? '1px solid rgba(187,187,187,0.12)' : 'none',
          }}>
            {/* Date */}
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(153,153,153,0.6)', marginBottom: 14,
            }}>
              {item.date}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: isMobile ? 15 : 16, fontWeight: 500, lineHeight: '1.6',
              color: 'rgba(200,200,200,0.85)', marginBottom: 32,
            }}>
              {item.description}
            </p>

            {/* Meta rows */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ height: 1, background: 'rgba(187,187,187,0.12)' }} />
              <MetaRow label="Role"         value={item.role} />
              <MetaRow label="Organisation" value={item.organization} />
              <MetaRow label="Duration"     value={item.duration} />
              <MetaRow label="Location"     value={item.location} />
            </div>

            {/* Impact badge */}
            <ImpactBadge value={item.impact} />
          </div>

          {/* Right: stacked images */}
          <div style={{
            flex: 1,
            paddingTop: isMobile ? 28 : 48,
            paddingBottom: 60,
            width: isMobile ? '100%' : 'auto',
            minWidth: 0,
          }}>
            {item.images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: isMobile ? 240 : 560,
                  borderRadius: isMobile ? 8 : 10,
                  overflow: 'hidden',
                  marginBottom: i < item.images.length - 1 ? (isMobile ? 12 : 20) : 0,
                  background: '#111',
                }}
              >
                <img
                  src={src}
                  alt={`${item.name} — view ${i + 1}`}
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.04)',
                    display: 'block',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── More Volunteering section ── */}
        <div style={{ marginTop: isMobile ? 60 : 100 }}>
          <SectionLabel left="© Community Work 奉仕活動" right="More Volunteering" />

          <div style={{ overflow: 'hidden' }}>
            <Marquee
              items={['More Volunteering©', 'More Volunteering©']}
              speed={12}
              bg="transparent"
              color="#fff"
              fontSize={isMobile ? 60 : 130}
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
            {moreItems.map(v => (
              <MoreCard
                key={v.id}
                item={v}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
