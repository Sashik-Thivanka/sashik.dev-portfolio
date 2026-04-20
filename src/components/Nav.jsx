import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RollingText } from './UI'
import StaggeredMenu from './StaggeredMenu'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const quickLinks = [
  { label: 'Home,', href: '#top' },
  { label: 'Projects,', href: '#work' },
  { label: 'About,', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const mobileMenuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#top' },
  { label: 'Projects', ariaLabel: 'View projects section', link: '#work' },
  { label: 'About', ariaLabel: 'Learn more about me', link: '#about' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
]

const mobileSocialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/sashikdevx/' },
  { label: 'GitHub', link: 'https://github.com/Sashik-Thivanka' },
  { label: 'Stack Overflow', link: 'https://stackoverflow.com/users/24842082/sashik-thivanka' },
]

export default function Nav() {
  const isMobile = useIsMobile()
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      if (currentScroll <= 0) {
        setHidden(false)
        return
      }
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true)
      } else if (currentScroll < lastScroll) {
        setHidden(false)
      }
      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  if (isMobile) {
    return (
      <StaggeredMenu
        position="right"
        items={mobileMenuItems}
        socialItems={mobileSocialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#111111"
        changeMenuColorOnOpen
        colors={['#101010', '#1f1f1f']}
        logoText="Sashik dev"
        logoHref="#top"
        accentColor="#e5000a"
        isFixed
      />
    )
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -90 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        y: hidden ? -90 : (visible ? 0 : -90)
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 55, delay: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', zIndex: 10,
        background: '#000',
      }}
    >
      <nav style={{
        display: 'flex', alignItems: 'center',
        padding: '26px 24px',
      }}>
        <div style={{ flex: 1 }}>
          <a href="#top" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 400,
            letterSpacing: '-0.3px', color: '#fff',
            mixBlendMode: 'difference'
          }}>
            Sashik <sup style={{ fontSize: 12, fontWeight: 400, letterSpacing: '-0.3px', color: '#fff', mixBlendMode: 'difference' }}>dev</sup>
          </a>
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#fff'
            }}>
              Quick Links
            </span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {quickLinks.map(l => (
                <a key={l.label} href={l.href}>
                  <RollingText style={{ fontFamily: "'Inter', sans-serif" }}>
                    {l.label}&nbsp;
                  </RollingText>
                </a>
              ))}
            </div>
          </div>
        </div>

        {!isMobile && (
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', color: '#fff'
              }}>
                From Sri Lanka
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12, fontWeight: 700, color: '#999'
              }}>
                Software Developer & Tech Innovator
              </span>
            </div>
          </div>
        )}
      </nav>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ 
          width: '100%', 
          height: 1, 
          background: 'rgba(187,187,187,0.2)',
          transformOrigin: 'left'
        }} 
      />
    </motion.header>
  )
}
