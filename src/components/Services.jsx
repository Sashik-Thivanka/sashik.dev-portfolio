import React from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView, slideUp } from '../utils'

const services = [
  {
    id: '01',
    name: 'Full-Stack Innovation',
    desc: 'Developing high-performance applications with the MERN stack. I transform complex technical requirements into fast, secure, and production-ready software optimized for the modern web.',
  },
  {
    id: '02',
    name: 'System Design',
    desc: 'Architecting scalable, distributed systems from the ground up. I focus on high-concurrency, load balancing, and structural integrity to ensure software remains resilient under heavy technical demand.',
  },
  {
    id: '03',
    name: 'AI & Intelligent Integration',
    desc: 'Bridging the gap between raw data and actionable intelligence. I integrate custom AI protocols and LLMs to automate complex workflows and enhance core system capabilities.',
  },
  {
    id: '04',
    name: 'Secure Development',
    desc: 'Integrating security-first principles into the development lifecycle. I focus on writing clean, defensive code and researching vulnerabilities to build safer, more reliable applications.',
    last: true
  },
]

function ServiceRow({ service, inView, index }) {
  return (
    <motion.div
      variants={slideUp} custom={index}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{ borderTop: '1px solid rgba(187,187,187,0.2)', padding: '34px 0' }}
    >
      <div
        className="service-row-content"
        style={{
          display: 'grid',
          gridTemplateColumns: '90px minmax(200px, 320px) minmax(280px, 1fr)',
          columnGap: 64,
          alignItems: 'start'
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 30, fontWeight: 700, color: '#fff',
          lineHeight: 1, textAlign: 'left'
        }}>{service.id}</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 19, fontWeight: 500, color: '#fff', textAlign: 'left'
        }}>{service.name}</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 400, color: '#999', lineHeight: 1.55, textAlign: 'left'
        }}>{service.desc}</p>
      </div>
      {service.last && <div style={{ marginTop: 24, borderTop: '1px solid rgba(187,187,187,0.2)' }} />}
    </motion.div>
  )
}

export default function Services() {
  const [headRef, headInView] = useInView()
  const [listRef, listInView] = useInView()

  return (
    <section style={{ background: '#000', paddingTop: 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Services" right="Digital Crafts" />

        <div ref={headRef} style={{ padding: '40px 24px 0', display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <motion.h1
            variants={slideUp} initial="hidden" animate={headInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: 'clamp(52px, 8vw, 208px)',
              fontWeight: 600, letterSpacing: '-0.05em',
              lineHeight: '90%', color: '#fff',
              mixBlendMode: 'difference'
            }}
          >Services</motion.h1>
          <motion.h3
            variants={slideUp} custom={1} initial="hidden" animate={headInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: "'Inter Display', sans-serif",
              fontSize: 'clamp(24px, 4vw, 49px)',
              fontWeight: 500, letterSpacing: '-0.8px',
              lineHeight: '103%', color: '#fff',
              mixBlendMode: 'difference'
            }}
          >(6)</motion.h3>
        </div>

        <div style={{
          background: '#fff',
          color: '#000',
          height: 26,
          padding: '0 24px',
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {['Precise.', 'Structured.', 'Focused.', 'Visual Language.'].map((item) => (
            <span key={item} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#000'
          }}>
              {item}
            </span>
          ))}
        </div>

        <div ref={listRef} style={{ padding: '0 24px', maxWidth: 920, marginLeft: 'auto', marginTop: 18 }}>
          {services.map((s, i) => (
            <ServiceRow key={s.name} service={s} inView={listInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
