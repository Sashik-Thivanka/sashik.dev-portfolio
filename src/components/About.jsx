// about section

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel, SectionH3, PillButton } from './UI'
import { useInView, slideUp } from '../utils'
import { FaLinkedinIn, FaGithub, FaStackOverflow } from 'react-icons/fa'
import { SiGmail, SiCredly } from 'react-icons/si'

const socialLinks = [
  {
    icon: <FaLinkedinIn />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sashikdevx/',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/Sashik-Thivanka',
  },
  {
    icon: <SiGmail />,
    label: 'Email',
    href: 'mailto:sashikthivankaofficial@gmail.com',
  },
  {
    icon: <SiCredly />,
    label: 'Credly',
    href: 'https://www.credly.com/users/sashik-thivanka',
  },
  {
    icon: <FaStackOverflow />,
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/24842082/sashik-thivanka',
  },
]

const aboutStripItems = ['Code.', 'Create.', 'Conquer.']

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

function SocialCard({ icon, label, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      data-cursor-label={label}
      style={{
        flex: '1 1 0',
        border: '1px solid rgba(187,187,187,0.2)',
        borderRadius: 10,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minWidth: 0,
        textDecoration: 'none',
        color: '#fff',
        transition: 'background 0.2s, border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(187,187,187,0.2)'
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1, display: 'flex' }}>{icon}</span>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
      }}>
        {label}
      </span>
    </a>
  )
}

export default function About() {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView()

  return (
    <section
      id="about"
      style={{
        background: '#000',
        width: '100%',
        maxWidth: 1480,
        margin: '0 auto',
        paddingTop: 80
      }}
    >
      <SectionLabel left="© About me" right="Software Developer" />

      <div
        ref={ref}
        style={{
          display: 'flex',
          gap: 80,
          padding: isMobile ? '32px 16px 42px' : '40px 24px 42px',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'visible',
        }}
      >

        {/* ✅ Unicorn via iframe (FINAL SOLUTION) */}
        <div
          style={{
            flex: '1 1 300px',
            minWidth: 300,
            maxWidth: 473,
            height: 620,
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <iframe
            src="https://www.unicorn.studio/embed/5SkAlD5L18s6QHytmSDY"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: 'block'
            }}
            allow="fullscreen"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div
          style={{
            flex: '1 1 280px',
            maxWidth: 540,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
            paddingTop: 50,
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <SectionH3
                style={{
                  fontSize: isMobile ? 'clamp(18px, 4.6vw, 22px)' : 'clamp(20px, 2.2vw, 28px)',
                  lineHeight: isMobile ? '1.35' : '1.28',
                  letterSpacing: isMobile ? '-0.3px' : '-0.8px',
                  mixBlendMode: 'normal',
                }}
              >
                <span style={{ display: 'block' }}>
                I’m a developer with a background in statistics, focused on building intelligent, scalable systems that solve real-world problems.
                </span>
                <span style={{ display: 'block', marginTop: 5 }}>
                I work at the intersection of AI, data, and decision-making designing solutions that are built to last and perform in real conditions.
                </span>
              </SectionH3>
            </motion.div>

            <motion.div
              variants={slideUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <PillButton href="#contact">Contact</PillButton>
            </motion.div>
          </div>

          {/* Social links grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {socialLinks.slice(0, 3).map((s) => (
                <SocialCard key={s.label} {...s} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {socialLinks.slice(3).map((s) => (
                <SocialCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
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
            zIndex: 2
          }}
        >
          {aboutStripItems.map(item => (
            <span
              key={item}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#000',
                letterSpacing: '0.02em'
              }}
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}