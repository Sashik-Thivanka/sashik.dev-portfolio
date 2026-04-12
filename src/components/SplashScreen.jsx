import React, { useRef } from 'react'
import { gsap } from 'gsap'
import SignatureAnimation from './SignatureAnimation'

export default function SplashScreen({ onComplete, onFadeStart }) {
  const containerRef = useRef(null)

  const handleDone = () => {
    // Start cross-fading hero in, then fade the splash out
    onFadeStart?.()
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: 'power2.inOut',
      onComplete: () => onComplete?.(),
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignatureAnimation
        color="#fff"
        strokeWidth={8}
        delay={0.4}
        duration={3}
        onComplete={handleDone}
      />
    </div>
  )
}
