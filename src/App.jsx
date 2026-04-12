import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import SplashScreen from './components/SplashScreen'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import WorkDetail from './components/WorkDetail'
import VolunteeringDetail from './components/VolunteeringDetail'
import Services from './components/Services'
import AboutLong from './components/AboutLong'
import Experience from './components/Experience'
import Volunteering from './components/Volunteering'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

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
          <WorkDetail
            key={`work-detail-${selectedWork.id}`}
            project={selectedWork}
            onBack={handleBack}
            onWorkClick={handleWorkClick}
          />
        )}

        {/* Volunteering detail view */}
        {contentReady && !selectedWork && selectedVolunteering && (
          <VolunteeringDetail
            key={`vol-detail-${selectedVolunteering.id}`}
            item={selectedVolunteering}
            onBack={handleVolunteerBack}
            onItemClick={handleVolunteerClick}
          />
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
            <About />
            <Work onWorkClick={handleWorkClick} />
            <Services />
            <AboutLong />
            <Experience />
            <Volunteering onItemClick={handleVolunteerClick} />
            <FAQ />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
