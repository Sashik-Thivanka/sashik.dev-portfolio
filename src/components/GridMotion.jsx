import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import './GridMotion.css'

const isImageLike = (value) => {
  if (typeof value !== 'string') return false
  if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('blob:')) return true
  return /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value)
}

const GridMotion = ({ items = [], gradientColor = 'black', maxMoveAmount = 260 }) => {
  const rowRefs = useRef([])
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)

  const combinedItems = useMemo(() => {
    const totalItems = 28
    const defaults = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`)
    return (items?.length ? items : defaults).slice(0, totalItems)
  }, [items])

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handlePointerMove = (e) => {
      // Touch support (uses the first touch point)
      const clientX = e.touches?.[0]?.clientX ?? e.clientX
      if (typeof clientX === 'number') mouseXRef.current = clientX
    }

    const updateMotion = () => {
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (!row) return
        const direction = index % 2 === 0 ? 1 : -1
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('touchmove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      gsap.ticker.remove(updateMotion)
    }
  }, [maxMoveAmount])

  return (
    <div className="gridMotion-root">
      <section
        className="gridMotion-intro"
        style={{ background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` }}
      >
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="gridMotion-row" ref={(el) => { rowRefs.current[rowIndex] = el }}>
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex]
                return (
                  <div key={itemIndex} className="gridMotion-item">
                    <div className="gridMotion-itemInner">
                      {isImageLike(content) ? (
                        <div className="gridMotion-img" style={{ backgroundImage: `url(${content})` }} />
                      ) : (
                        <div className="gridMotion-content">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="gridMotion-fullview" />
      </section>
    </div>
  )
}

export default GridMotion

