import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView, slideUp } from '../utils'

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'Full-stack web applications, native and cross-platform mobile apps for Android and iOS, and intelligent chatbot integrations. If it needs to be built, scaled, or secured — I\'m in.',
  },
   {
    q: 'What type of projects do you take on?',
    a: 'Timelines depend on scope. A one-page site can be delivered in 7 days. A multi-page CMS project typically takes 3–6 weeks. We always align expectations at the start of every project.'
  },
  {
    q: 'What is your main tech stack?',
    a: 'My core is the MERN stack for full-stack web, paired with C and Python for lower-level and scripting work. On the cloud side I work across AWS, Azure, and Google Cloud. For databases I use both SQL and MongoDB depending on what the project demands. My design tools are Figma and Framer, and for project management and collaboration I use Jira, Confluence, Trello, and Bitbucket. Version control with Git, and on the AI side I work with TensorFlow and Google AI Studio.'
  },
  {
    q: 'Can you handle both design and build?',
    a: 'Yes — that\'s one of my core strength. I can bridge creative direction and technical execution in one seamless workflow, so there\'s no handoff gap between design and development.'
  },
  {
    q: 'Are you open to internship or junior role opportunities?',
    a: 'Absolutely. I see every opportunity as a chance to learn, grow, and sharpen my skills alongside people who push the standard higher. I bring real project experience, a security mindset, and the hunger to contribute from day one.'
  },
  {
    q: "Can you bring my ideas to life?",
    a: 'Yes. Send it.'
  },
]

function FAQItem({ faq, index, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={slideUp} custom={index}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
    >
      <div style={{ borderTop: '1px solid rgba(187,187,187,0.2)' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: '100%', background: 'none', border: 'none',
            padding: '24px 0', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 24
          }}
        >
          <p style={{
            fontFamily: "'Inter Display', sans-serif",
            fontSize: 19, fontWeight: 500, color: '#fff',
            textAlign: 'left', maxWidth: 470
          }}>{faq.q}</p>

          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ flexShrink: 0 }}
          >
            <svg viewBox="0 0 256 256" width="18" height="18" style={{ fill: '#fff', display: 'block' }}>
              <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                fontFamily: "'Inter Display', sans-serif",
                fontSize: 17, fontWeight: 400, color: '#999',
                lineHeight: '1.5', paddingBottom: 24, maxWidth: 580
              }}>{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  const [headRef, headInView] = useInView()
  const [listRef, listInView] = useInView()

  return (
    <section style={{ background: '#000', paddingTop: 130 }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Help Center ヘルプ" right="Clarifications" />

        <div style={{ padding: '0 24px', display: 'flex', gap: 80, flexWrap: 'wrap', paddingTop: 60 }}>
          {/* Sticky heading */}
          <div ref={headRef} style={{ flex: '0 0 auto', position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
            <motion.h1
              variants={slideUp} initial="hidden" animate={headInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: "'Inter Display', sans-serif",
                fontSize: 'clamp(52px, 8vw, 208px)',
                fontWeight: 600, letterSpacing: '-0.05em',
                lineHeight: '90%', color: '#fff',
                mixBlendMode: 'difference'
              }}
            >FAQ.</motion.h1>
          </div>

          {/* FAQ list */}
          <div ref={listRef} style={{ flex: '1 1 400px' }}>
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} inView={listInView} />
            ))}
            <div style={{ borderTop: '1px solid rgba(187,187,187,0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
