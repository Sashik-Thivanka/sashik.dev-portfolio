import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView, slideUp } from '../utils'
import { gsap } from 'gsap'
import trailE1        from '../assets/images/logos/E1.webp'
import trailE2        from '../assets/images/logos/E2.webp'
import trailE3        from '../assets/images/logos/E3.webp'
import trailE4        from '../assets/images/logos/E4.webp'
import trailE5        from '../assets/images/logos/E5.webp'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const jobs = [
  {
    company: 'University of Colombo School of Computing', period: '2025 – present',
    role: 'Bsc. in Information Systems', location: 'Colombo, Sri Lanka',
  },
  {
    company: 'Karannagoda Enterprises', period: '2024 – 2025',
    role: 'System Administrator', location: 'Colombo, Sri Lanka',
  },
  {
    company: 'Unicorn Hatch', period: '2024 – 2025',
    role: 'Trainee Software Engineer', location: 'Auckland, New Zealand (Remote)',
  },
  {
    company: 'Ananda College', period: '2022 – 2024',
    role: 'Student', location: 'Colombo, Sri Lanka',
  },
  {
    company: 'Gurukula College', period: '2010 – 2021',
    role: 'Student', location: 'Kelaniya, Sri Lanka',
  },
]

function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

function getLocalPointerPos(e, rect) {
  let clientX = 0
  let clientY = 0
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  return { x: clientX - rect.left, y: clientY - rect.top }
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.hypot(dx, dy)
}

class ImageItem {
  DOM = { el: null, inner: null }
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 }
  rect = null
  #onResize = null

  constructor(DOM_el) {
    this.DOM.el = DOM_el
    this.DOM.inner = this.DOM.el.querySelector('.experience-trail__img-inner')
    this.getRect()
    this.initEvents()
  }

  initEvents() {
    this.#onResize = () => {
      gsap.set(this.DOM.el, this.defaultStyle)
      this.getRect()
    }
    window.addEventListener('resize', this.#onResize)
  }

  destroy() {
    if (this.#onResize) window.removeEventListener('resize', this.#onResize)
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect()
  }
}

class ImageTrailVariant2 {
  constructor(container, eventTarget) {
    this.container = container
    this.eventTarget = eventTarget ?? container
    this.images = [...container.querySelectorAll('.experience-trail__img')].map(img => new ImageItem(img))
    this.imagesTotal = this.images.length
    this.imgPosition = 0
    this.zIndexVal = 1
    this.activeImagesCount = 0
    this.isIdle = true
    this.threshold = 70

    this.mousePos = { x: 0, y: 0 }
    this.lastMousePos = { x: 0, y: 0 }
    this.cacheMousePos = { x: 0, y: 0 }

    this.#raf = null

    this.#handlePointerMove = (ev) => {
      const rect = this.eventTarget.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(ev, rect)
    }

    this.eventTarget.addEventListener('mousemove', this.#handlePointerMove)
    this.eventTarget.addEventListener('touchmove', this.#handlePointerMove, { passive: true })

    const initRender = (ev) => {
      const rect = this.eventTarget.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(ev, rect)
      this.cacheMousePos = { ...this.mousePos }
      this.lastMousePos = { ...this.mousePos }

      this.#raf = requestAnimationFrame(() => this.render())

      this.eventTarget.removeEventListener('mousemove', initRender)
      this.eventTarget.removeEventListener('touchmove', initRender)
    }
    this.eventTarget.addEventListener('mousemove', initRender)
    this.eventTarget.addEventListener('touchmove', initRender, { passive: true })
    this.#initRender = initRender
  }

  #raf
  #handlePointerMove
  #initRender

  destroy() {
    this.eventTarget.removeEventListener('mousemove', this.#handlePointerMove)
    this.eventTarget.removeEventListener('touchmove', this.#handlePointerMove)
    this.eventTarget.removeEventListener('mousemove', this.#initRender)
    this.eventTarget.removeEventListener('touchmove', this.#initRender)
    if (this.#raf) cancelAnimationFrame(this.#raf)
    this.images.forEach(img => img.destroy())
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos)
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1)
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1)

    if (distance > this.threshold) {
      this.showNextImage()
      this.lastMousePos = { ...this.mousePos }
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1
    }

    this.#raf = requestAnimationFrame(() => this.render())
  }

  showNextImage() {
    ++this.zIndexVal
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0
    const img = this.images[this.imgPosition]

    gsap.killTweensOf(img.DOM.el)
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)',
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)',
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2,
        },
        0.45
      )
  }

  onImageActivated() {
    this.activeImagesCount++
    this.isIdle = false
  }

  onImageDeactivated() {
    this.activeImagesCount--
    if (this.activeImagesCount === 0) this.isIdle = true
  }
}

function ExperienceImageTrail({ items, eventTargetRef }) {
  const trailRef = useRef(null)

  useEffect(() => {
    const target = eventTargetRef?.current
    if (!trailRef.current || !target) return
    const instance = new ImageTrailVariant2(trailRef.current, target)
    return () => instance.destroy()
  }, [items, eventTargetRef])

  return (
    <div className="experience-trail" aria-hidden="true">
      <div className="experience-trail__content" ref={trailRef}>
        {items.map((url, i) => (
          <div className="experience-trail__img" key={i}>
            <div className="experience-trail__img-inner" style={{ backgroundImage: `url(${url})` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperienceRow({ job, inView, index, last, isMobile }) {
  return (
    <motion.div
      variants={slideUp} custom={index}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      style={{ borderTop: '1px solid rgba(187,187,187,0.2)', padding: isMobile ? '16px 0' : '0', position: 'relative', minHeight: isMobile ? 'auto' : 64 }}
    >
      <div style={{ borderTop: 'none', height: isMobile ? 'auto' : '100%' }}>
        {isMobile ? (
          /* ── Mobile: stacked two-line layout ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#fff' }}>
                {job.company}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#666', flexShrink: 0 }}>
                {job.period}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: '#999' }}>
                {job.role}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: '#555', flexShrink: 0 }}>
                {job.location}
              </p>
            </div>
          </div>
        ) : (
          /* ── Desktop: 4-column grid for consistent alignment ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2.2fr) 150px minmax(0, 1.6fr) minmax(0, 1fr)',
            columnGap: 32,
            alignItems: 'center',
            minHeight: 64,
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 500, color: '#fff' }}>
              {job.company}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: '#666' }}>
              {job.period}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 500, color: '#fff' }}>
              {job.role}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: '#666', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {job.location}
            </p>
          </div>
        )}
      </div>

      {last && <div style={{ borderTop: '1px solid rgba(187,187,187,0.2)', marginTop: isMobile ? 16 : 20 }} />}
    </motion.div>
  )
}

export default function Experience() {
  const isMobile = useIsMobile()
  const [headRef, headInView] = useInView()
  const [listRef, listInView] = useInView()
  const sectionRef = useRef(null)

  const trailItems = useMemo(() => ([
    trailE1,
    trailE2,
    trailE3,
    trailE4,
    trailE5,
  ]), [])

  const stripItems = isMobile
    ? ['Impact.', 'Collaborate.']
    : ['Impact.', 'Collaborate.', 'Expand.', 'Lead.']

  return (
    <section ref={sectionRef} style={{ background: '#000', paddingTop: isMobile ? 80 : 130, position: 'relative' }}>
      <style>{`
        .experience-trail {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .experience-trail__content {
          width: 100%;
          height: 100%;
          position: relative;
          background: transparent;
          overflow: visible;
        }
        .experience-trail__img {
          width: 170px;
          aspect-ratio: 1.25;
          border-radius: 12px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          overflow: hidden;
          will-change: transform, filter;
          pointer-events: none;
          box-shadow: 0 18px 38px rgba(0,0,0,0.42);
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.03);
        }
        .experience-trail__img-inner {
          background-position: 50% 50%;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          top: calc(-1 * 20px / 2);
          left: calc(-1 * 20px / 2);
          filter: contrast(105%);
        }
        .experience-foreground {
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) {
          .experience-trail__img {
            width: 140px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .experience-trail { display: none; }
        }
      `}</style>

      {!isMobile && <ExperienceImageTrail items={trailItems} eventTargetRef={sectionRef} />}

      <div className="experience-foreground" style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel left="© Journey" right="Foot prints" />

        <div style={{ padding: isMobile ? '28px 16px 0' : '40px 24px 0', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div ref={headRef} style={{ flex: '1 1 auto', display: 'flex', gap: isMobile ? 12 : 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <motion.h2
              variants={slideUp} initial="hidden" animate={headInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(42px, 8vw, 208px)',
                fontWeight: 600,
                letterSpacing: '-0.05em',
                lineHeight: '90%',
                color: '#fff',
                mixBlendMode: 'difference',
              }}
            >
              Journey
            </motion.h2>

            <motion.h3
              variants={slideUp} custom={1}
              initial="hidden" animate={headInView ? 'visible' : 'hidden'}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(20px, 4vw, 49px)',
                fontWeight: 500,
                letterSpacing: '-0.8px',
                lineHeight: '103%',
                color: '#fff',
                mixBlendMode: 'difference',
              }}
            >
              ({jobs.length})
            </motion.h3>
          </div>
        </div>

        <div style={{
          height: 26,
          width: '100%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          marginTop: 12,
        }}>
          {stripItems.map((item) => (
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

        <div ref={listRef} style={{ padding: isMobile ? '0 16px' : '0 24px', maxWidth: 1440 }}>
          {jobs.map((job, i) => (
            <ExperienceRow
              key={job.company}
              job={job}
              inView={listInView}
              index={i}
              last={i === jobs.length - 1}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Section end marker — three asterisks */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 48 : 72,
          padding: isMobile ? '40px 0 0' : '56px 0 0',
        }}>
          {['*', '*', '*'].map((ast, i) => (
            <span key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 80 : 120,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              {ast}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
