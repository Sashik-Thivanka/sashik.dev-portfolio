import React, { Suspense, lazy, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import SplashScreen from './components/SplashScreen'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'
import BrutalReveal from './components/BrutalReveal'

const WorkDetail = lazy(() => import('./components/WorkDetail'))
const VolunteeringDetail = lazy(() => import('./components/VolunteeringDetail'))
const AboutLong = lazy(() => import('./components/AboutLong'))
const Experience = lazy(() => import('./components/Experience'))
const Volunteering = lazy(() => import('./components/Volunteering'))
const FAQ = lazy(() => import('./components/FAQ'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  const [showPreloader, setShowPreloader]         = useState(true)
  const [showSplash, setShowSplash]               = useState(false)
  const [contentReady, setContentReady]           = useState(false)
  const [selectedWork, setSelectedWork]           = useState(null)
  const [selectedVolunteering, setSelectedVolunteering] = useState(null)
  const scrollToWorkRef        = useRef(false)
  const scrollToVolunteerRef   = useRef(false)

  const handleWorkClick = (project) => setSelectedWork(project)

  const handleBack = () => {
    scrollToWorkRef.current = true
    setSelectedWork(null)
  }

  const handleVolunteerClick = (item) => setSelectedVolunteering(item)

  const handleVolunteerBack = () => {
    scrollToVolunteerRef.current = true
    setSelectedVolunteering(null)
  }

  return (
    <>
      {/* Stage 1 — Preloader: waits for all assets, then hands off to splash */}
      {showPreloader && (
        <Preloader onComplete={() => { setShowPreloader(false); setShowSplash(true) }} />
      )}

      {/* Stage 2 — Splash: signature animation, then crossfades into hero */}
      {showSplash && (
        <SplashScreen
          onFadeStart={() => setContentReady(true)}
          onComplete={() => setShowSplash(false)}
        />
      )}

      <AnimatePresence mode="wait">
        {/* Work detail view */}
        {contentReady && selectedWork && (
          <Suspense fallback={null}>
            <WorkDetail
              key={`work-detail-${selectedWork.id}`}
              project={selectedWork}
              onBack={handleBack}
              onWorkClick={handleWorkClick}
            />
          </Suspense>
        )}

        {/* Volunteering detail view */}
        {contentReady && !selectedWork && selectedVolunteering && (
          <Suspense fallback={null}>
            <VolunteeringDetail
              key={`vol-detail-${selectedVolunteering.id}`}
              item={selectedVolunteering}
              onBack={handleVolunteerBack}
              onItemClick={handleVolunteerClick}
            />
          </Suspense>
        )}

        {/* Main portfolio */}
        {contentReady && !selectedWork && !selectedVolunteering && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() => {
              if (scrollToWorkRef.current) {
                scrollToWorkRef.current = false
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }
              if (scrollToVolunteerRef.current) {
                scrollToVolunteerRef.current = false
                document.querySelector('section[data-section="volunteering"]')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden' }}
          >
            <CustomCursor />
            <Nav />
            <Hero />
            <BrutalReveal>
              <About />
            </BrutalReveal>
            <BrutalReveal delay={0.03}>
              <Work onWorkClick={handleWorkClick} />
            </BrutalReveal>
            <BrutalReveal delay={0.04}>
              <Services />
            </BrutalReveal>
            <Suspense fallback={null}>
              <BrutalReveal delay={0.05}>
                <AboutLong />
              </BrutalReveal>
            </Suspense>
            <Suspense fallback={null}>
              <BrutalReveal delay={0.06}>
                <Experience />
              </BrutalReveal>
            </Suspense>
            <Suspense fallback={null}>
              <Volunteering onItemClick={handleVolunteerClick} />
            </Suspense>
            <Suspense fallback={null}>
              <BrutalReveal delay={0.08}>
                <FAQ />
              </BrutalReveal>
            </Suspense>
            <Suspense fallback={null}>
              <BrutalReveal delay={0.09}>
                <Footer />
              </BrutalReveal>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
