import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel, RollingText, PillButton } from './UI'
import { useInView, slideUp } from '../utils'
import logoSrc from '../assets/images/website_loader.png'
import LogoLoop from './LogoLoop'
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

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const navLinks = [
  { label: 'Home',     href: '#top' },
  { label: 'Projects', href: '#work' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]


/** Same width/height rhythm as the original Framer strip (tall / wide / …), then repeat for extra slides. */
const galleryImgs = [
  { src: g1,  w: 132, h: 193 },
  { src: g2,  w: 154, h: 110 },
  { src: g3,  w: 150, h: 193 },
  { src: g4,  w: 165, h: 240 },
  { src: g5,  w: 154, h: 110 },
  { src: g6,  w: 132, h: 193 },
  { src: g7,  w: 190, h: 136 },
  { src: g8,  w: 190, h: 193 },
  { src: g9,  w: 132, h: 193 },
  { src: g10, w: 154, h: 110 },
  { src: g11, w: 150, h: 193 },
]

function Footer() {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView()

  return (
    <footer id="contact" style={{ background: '#000', paddingTop: 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Final Section " right="Community Wrap" />

        {/* Gallery strip */}
        <div style={{ overflow: 'hidden', padding: 0, marginTop: 0 }}>
          <LogoLoop
            logos={galleryImgs}
            speed={90}
            direction="left"
            gap={10}
            pauseOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Footer gallery"
            className="footer-gallery-loop"
            scaleOnHover
            renderItem={(img) => (
              <div
                style={{
                  width: img.w,
                  height: img.h,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 14px 30px rgba(0,0,0,0.25)',
                  transform: 'translateZ(0)',
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )}
          />
        </div>

        <div style={{
          height: 26,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          marginTop: 12,
        }}>
          {['Vision.', 'Drive.', 'Legacy.', 'Beyond.'].map((item) => (
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

        {/* CTA content */}
        <div style={{
          padding: '40px 24px', display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          gap: 32, textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'Inter Display', sans-serif",
            fontSize: 14, fontWeight: 400, color: '#999',
            maxWidth: 550, lineHeight: '1.5'
          }}>
            I build expressive, performance-driven websites by blending clean design and native
            development inside Framer to help creative teams and modern brands stand out with intention.
          </p>
          <PillButton href="#top">Back To Top</PillButton>
        </div>

        {/* ── Logo + Say Hi row ── */}
        <div style={{
          borderTop: '1px solid rgba(187,187,187,0.2)',
          margin: '0 24px',
          padding: isMobile ? '40px 0 32px' : '56px 0 48px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 48 : 40,
        }}>

          {/* Left — logo with blinking dot */}
          <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
            <img
              src={logoSrc}
              alt="Sashik Thivanka"
              style={{ width: isMobile ? 100 : 140, display: 'block' }}
            />
            <span style={{
              position: 'absolute',
              bottom: '15%',
              right: '6%',
              width: isMobile ? 14 : 20,
              height: isMobile ? 14 : 20,
              borderRadius: '50%',
              background: '#e5000a',
              boxShadow: '0 0 0 3px rgba(229,0,10,0.25)',
              display: 'block',
              animation: 'preloaderDot 1.1s ease-in-out infinite',
            }} />
          </div>

          {/* Center — Navigate + Socials grouped together */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              alignSelf: 'stretch',
            }}>
              {/* Left divider */}
              <div style={{ width: 1, background: 'rgba(187,187,187,0.2)', flexShrink: 0 }} />

              {/* Navigate column */}
              <div style={{
                width: 180,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', gap: 10,
                padding: '0 40px',
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(153,153,153,0.4)', marginBottom: 4 }}>
                  Navigate
                </p>
                {navLinks.map(l => (
                  <a key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                    <RollingText lineHeight={28} style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600 }}>
                      {l.label}
                    </RollingText>
                  </a>
                ))}
              </div>

              {/* Middle divider */}
              <div style={{ width: 1, background: 'rgba(187,187,187,0.2)', flexShrink: 0 }} />

              {/* Socials column */}
              <div style={{
                width: 180,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', gap: 10,
                padding: '0 40px',
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(153,153,153,0.4)', marginBottom: 4 }}>
                  Socials
                </p>
                {[
                  { label: 'LinkedIn',       href: 'https://www.linkedin.com/in/sashikdevx/' },
                  { label: 'GitHub',         href: 'https://github.com/Sashik-Thivanka' },
                  { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/24842082/sashik-thivanka' },
                  { label: 'Credly',         href: 'https://www.credly.com/users/sashik-thivanka' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <RollingText lineHeight={28} style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600 }}>
                      {s.label}
                    </RollingText>
                  </a>
                ))}
              </div>

              {/* Right divider */}
              <div style={{ width: 1, background: 'rgba(187,187,187,0.2)', flexShrink: 0 }} />
            </div>
          )}

          {/* Right — Say Hi CTA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: 16,
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(153,153,153,0.6)',
            }}>
              Got a project? Let's talk.
            </p>

            <a
              href="mailto:sashikthivankaofficial@gmail.com"
              data-cursor-label="Say Hi"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 'clamp(36px, 9vw, 56px)' : 'clamp(48px, 5vw, 80px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '3px solid #fff',
                paddingBottom: 4,
                transition: 'color 0.2s, border-color 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = '#999' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff' }}
            >
              Say Hi ↗
            </a>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(153,153,153,0.55)',
              letterSpacing: '0.01em',
            }}>
              sashikthivankaofficial@gmail.com
            </p>
          </div>
        </div>

        {/* ─ Bottom bar ─*/}
        <div style={{
          borderTop: '1px solid rgba(187,187,187,0.2)',
          margin: '0 24px',
          padding: '16px 0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(153,153,153,0.5)',
          }}>
            © 2026 Sashik Thivanka. 
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(153,153,153,0.5)',
          }}>
            Code. Create. Conquer.
          </span>
        </div>

      </div>
    </footer>
  )
}

export { Footer as default }
