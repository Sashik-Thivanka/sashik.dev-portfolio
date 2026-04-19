import React, { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './UI'
import { useInView, slideUp } from '../utils'
import { gsap } from 'gsap'

import s1 from '../assets/images/services/s1.webp'
import s2 from '../assets/images/services/s2.webp'
import s3 from '../assets/images/services/s3.webp'
import s4 from '../assets/images/services/s4.webp'
import s5 from '../assets/images/services/s5.webp'

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
    this.DOM.inner = this.DOM.el.querySelector('.services-trail__img-inner')
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
    this.images = [...container.querySelectorAll('.services-trail__img')].map(img => new ImageItem(img))
    this.imagesTotal = this.images.length
    this.imgPosition = 0
    this.zIndexVal = 1
    this.activeImagesCount = 0
    this.isIdle = true
    this.threshold = 80

    this.mousePos = { x: 0, y: 0 }
    this.lastMousePos = { x: 0, y: 0 }
    this.cacheMousePos = { x: 0, y: 0 }

    this.#raf = null
    this.#lastTimestamp = null

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
  #lastTimestamp
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

function ServicesImageTrail({ items, eventTargetRef }) {
  const trailRef = useRef(null)

  useEffect(() => {
    const target = eventTargetRef?.current
    if (!trailRef.current || !target) return

    let cancelled = false
    let instance = null

    // Preload images so the first few frames don't stutter.
    const preload = async () => {
      const loaders = (items ?? []).map((src) => new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = src
      }))
      await Promise.all(loaders)
      if (cancelled) return
      instance = new ImageTrailVariant2(trailRef.current, target)
    }

    preload()

    return () => {
      cancelled = true
      instance?.destroy?.()
    }
  }, [items, eventTargetRef])

  return (
    <div className="services-trail" aria-hidden="true">
      <div className="services-trail__content" ref={trailRef}>
        {items.map((url, i) => (
          <div className="services-trail__img" key={i}>
            <div className="services-trail__img-inner" style={{ backgroundImage: `url(${url})` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

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
  const sectionRef = useRef(null)

  const trailItems = useMemo(() => ([
    s1, s2, s3, s4, s5,
  ]), [])

  return (
    <section ref={sectionRef} style={{ background: '#000', paddingTop: 130, position: 'relative' }}>
      <style>{`
        .services-trail {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .services-trail__content {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 0;
          background: transparent;
          overflow: visible;
        }
        .services-trail__img {
          width: 190px;
          aspect-ratio: 1.1;
          border-radius: 15px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          overflow: hidden;
          will-change: transform, filter;
          pointer-events: none;
          box-shadow: 0 18px 38px rgba(0,0,0,0.42);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .services-trail__img-inner {
          background-position: 50% 50%;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          background-size: cover;
          position: absolute;
          top: calc(-1 * 20px / 2);
          left: calc(-1 * 20px / 2);
        }
        /* Keep your services content above the trail */
        .services-foreground {
          position: relative;
          z-index: 2;
        }
        @media (max-width: 900px) {
          .services-trail__img {
            width: 150px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .services-trail { display: none; }
        }
      `}</style>

      <ServicesImageTrail items={trailItems} eventTargetRef={sectionRef} />
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <div className="services-foreground">
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
            {['Build.', 'Scale.', 'Secure.', 'Optimize.'].map((item) => (
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
      </div>
    </section>
  )
}
