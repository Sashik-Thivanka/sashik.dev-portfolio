import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrutalReveal({
  children,
  start = 'top 86%',
  distance = 28,
  duration = 0.8,
  delay = 0,
}) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set(el, {
        autoAlpha: 0,
        y: distance,
        filter: 'blur(4px)',
        willChange: 'transform, opacity, filter',
      })

      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power3.out',
        clearProps: 'filter,willChange,transform',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          invalidateOnRefresh: true,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [start, distance, duration, delay])

  return <div ref={wrapRef}>{children}</div>
}
