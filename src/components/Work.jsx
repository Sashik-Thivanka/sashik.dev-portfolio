import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel, BodyText, PillButton, Line, Marquee } from './UI'
import { useInView, slideUp } from '../utils'
import { projects } from '../data/projects'

function ProjectCard({ project, height = 390, aspectRatio, onWorkClick }) {
  const [hovered, setHovered] = useState(false)

  const imageBoxStyle = aspectRatio
    ? { width: '100%', aspectRatio, borderRadius: 10, overflow: 'hidden', position: 'relative', background: '#111' }
    : { width: '100%', height,      borderRadius: 10, overflow: 'hidden', position: 'relative', background: '#111' }

  return (
    <div
      onClick={() => onWorkClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', width: '100%', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Image container */}
        <div style={imageBoxStyle}>
          {/* Main bg */}
          <img src={project.bg} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />

          {/* Outer image darken */}
          <motion.div
            animate={{ opacity: hovered ? 0.42 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />

          {/* Inner image remains visible and scales on hover */}
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1, y: hovered ? 2 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              zIndex: 2
            }}
          >
            <div style={{ width: '50%', height: '50%', borderRadius: 10, overflow: 'hidden', boxShadow: '0 18px 30px rgba(0,0,0,0.28)' }}>
              <img src={project.inner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          {/* White top strip with reveal animation */}
          <div
            style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              background: '#fff',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transform: hovered ? 'translate3d(0, -50%, 0) scale(1)' : 'translate3d(0, -46%, 0) scale(0.98)',
              transformOrigin: 'center center',
              opacity: hovered ? 1 : 0,
              filter: hovered ? 'blur(0px)' : 'blur(5px)',
              transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.36s ease, filter 0.36s ease',
              transitionDelay: hovered ? '140ms' : '0ms',
              willChange: 'transform, opacity',
              zIndex: 4
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                background: '#000',
                transformOrigin: 'left center',
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: hovered ? '220ms' : '0ms'
              }}
            />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0,
              textTransform: 'uppercase',
              color: '#000',
              textAlign: 'center',
              width: '100%'
            }}>{project.title} ({project.id})</span>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{
            fontFamily: "'Inter Display', sans-serif",
            fontSize: 19, fontWeight: 500, color: '#fff'
          }}>{project.title}</p>
          <p style={{
            fontFamily: "'Inter Display', sans-serif",
            fontSize: 19, fontWeight: 500, color: '#fff'
          }}>({project.id})</p>
        </div>
      </div>
    </div>
  )
}

export default function Work({ onWorkClick }) {
  const [ref, inView] = useInView()

  return (
    <section id="work" className="work-section" style={{ background: '#000', paddingTop: 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Featured Projects" right="Creative Development" />

        {/* Marquee */}
        <div style={{ overflow: 'hidden', marginTop: 0 }}>
          <Marquee
            items={['Featured Projects©', 'Featured Projects©', 'Featured Projects©']}
            speed={10}
            bg="transparent"
            color="#fff"
            fontSize={150}
            fontFamily="'Inter Display', sans-serif"
            uppercase={false}
          />
        </div>

        <Line />

        {/* Body + button */}
        <div className="work-intro" style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 570 }}>
          <BodyText muted>
          Every project is a chance to solve real problems with clean code, turning complex requirements into{' '}
            <strong style={{ color: '#fff' }}>secure, scalable systems</strong> built with logic and intent.
          </BodyText>
          <PillButton href="#work">See Works</PillButton>
        </div>

        {/* Scattered project layout */}
        <div ref={ref} className="work-scatter-grid" style={{ padding: '0 24px 20px' }}>
          <motion.div className="work-item work-item-01" variants={slideUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
            <ProjectCard project={projects[0]} height={410} onWorkClick={onWorkClick} />
          </motion.div>

          <motion.div className="work-item work-item-02" variants={slideUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
            <ProjectCard project={projects[1]} height={320} onWorkClick={onWorkClick} />
          </motion.div>

          <motion.div className="work-item work-item-03" variants={slideUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
            <ProjectCard project={projects[2]} aspectRatio="3/2" onWorkClick={onWorkClick} />
          </motion.div>

          <motion.div className="work-item work-item-04" variants={slideUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}>
            <ProjectCard project={projects[3]} height={400} onWorkClick={onWorkClick} />
          </motion.div>

          <motion.div className="work-item work-item-05" variants={slideUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}>
            <ProjectCard project={projects[4]} height={410} onWorkClick={onWorkClick} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
