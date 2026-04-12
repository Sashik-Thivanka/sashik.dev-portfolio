import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { gsap } from 'gsap'
import signatureSvgRaw from '../assets/images/signature.svg?raw'

const SignatureAnimation = forwardRef(function SignatureAnimation(
  {
    delay = 0.5,
    duration = 3,
    color = '#ffffff',
    strokeWidth = 8,
    scrollControlled = false,
    onComplete,
  },
  ref
) {
  const containerRef = useRef(null)
  const tlRef = useRef(null)
  const pathsRef = useRef([])
  const pathLengthsRef = useRef([])

  // Segments: each path occupies an overlapping window in [0, 1]
  const SEGMENTS = [
    { start: 0.0,  end: 0.42 },
    { start: 0.35, end: 0.73 },
    { start: 0.62, end: 0.93 },
  ]

  const initPaths = () => {
    if (!containerRef.current) return
    const svgEl = containerRef.current.querySelector('svg')
    const allPaths = Array.from(containerRef.current.querySelectorAll('path'))
    const pathEls = allPaths.slice(0, 3)
    if (!svgEl || !pathEls.length) return

    svgEl.removeAttribute('width')
    svgEl.removeAttribute('height')
    gsap.set(svgEl, { width: '100%', height: 'auto', display: 'block' })

    const lengths = []
    pathEls.forEach((path) => {
      const length = path.getTotalLength()
      lengths.push(length)
      gsap.set(path, {
        stroke: color,
        strokeWidth,
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })

    pathsRef.current = pathEls
    pathLengthsRef.current = lengths
  }

  // Expose imperative API for scroll-controlled mode
  useImperativeHandle(ref, () => ({
    initScroll: () => {
      initPaths()
    },
    updateProgress: (p) => {
      const paths = pathsRef.current
      const lengths = pathLengthsRef.current
      if (!paths.length) return

      paths.forEach((path, i) => {
        const seg = SEGMENTS[i]
        if (!seg) return
        const sp = Math.max(0, Math.min(1, (p - seg.start) / (seg.end - seg.start)))
        gsap.set(path, { strokeDashoffset: lengths[i] * (1 - sp) })
      })

      // Flood fill after all strokes complete
      const fillStart = 0.93
      if (p > fillStart) {
        const fp = Math.max(0, Math.min(1, (p - fillStart) / (1 - fillStart)))
        paths.forEach((path) => {
          gsap.set(path, { fill: color, attr: { 'fill-opacity': fp } })
        })
      } else {
        paths.forEach((path) => {
          gsap.set(path, { fill: 'none', attr: { 'fill-opacity': 0 } })
        })
      }
    },
  }))

  // Time-based animation (non-scroll mode)
  const runAnimation = (animDelay, doneCb) => {
    if (!containerRef.current) return null
    initPaths()
    const pathEls = pathsRef.current
    if (!pathEls.length) return null

    const len1 = pathLengthsRef.current[0]
    const len2 = pathLengthsRef.current[1] || len1
    const len3 = pathLengthsRef.current[2] || len1

    const tl = gsap.timeline({ delay: animDelay, onComplete: doneCb })
    tl.to(pathEls[0], { strokeDashoffset: 0, duration, ease: 'power1.inOut' })
      .to(pathEls[1], { strokeDashoffset: 0, duration: duration * (len2 / len1), ease: 'power2.out' }, '-=0.4')
      .to(pathEls[2], { strokeDashoffset: 0, duration: duration * (len3 / len1), ease: 'power2.inOut' }, '-=0.3')
      .to(pathEls, { fill: color, duration: 0.6, ease: 'power2.inOut' }, '+=0.05')
    return tl
  }

  useEffect(() => {
    if (scrollControlled) return
    tlRef.current?.kill()
    tlRef.current = runAnimation(delay, onComplete)
    return () => { tlRef.current?.kill() }
  }, [scrollControlled, delay, duration, color, strokeWidth, onComplete])

  const replay = () => {
    if (scrollControlled) return
    tlRef.current?.kill()
    tlRef.current = runAnimation(0, undefined)
  }

  return (
    <div
      ref={containerRef}
      style={{ cursor: scrollControlled ? 'default' : 'pointer', width: 'min(84vw, 420px)' }}
      onClick={scrollControlled ? undefined : replay}
      title={scrollControlled ? undefined : 'Click to replay'}
      aria-label="Signature"
      dangerouslySetInnerHTML={{ __html: signatureSvgRaw }}
    />
  )
})

export default SignatureAnimation
