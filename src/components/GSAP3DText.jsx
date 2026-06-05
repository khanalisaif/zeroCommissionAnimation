import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAP3DText({ text, className }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!text || !containerRef.current) return

    const words = containerRef.current.querySelectorAll('.word-3d')
    
    const ctx = gsap.context(() => {
      gsap.fromTo(words, 
        {
          opacity: 0,
          rotateX: -80,
          y: 30,
          z: -50,
          transformOrigin: '50% 50% -30px'
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text])

  if (!text) return null

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={className} style={{ perspective: '1200px', display: 'inline-block' }}>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="word-3d" 
          style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'pre-wrap' }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
