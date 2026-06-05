import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PageLoader() {
  const loaderRef = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    if (!loader) return

    // Animate progress bar
    const progress = loader.querySelector('.loader-progress')
    const counter = loader.querySelector('.loader-counter')
    const logoText = loader.querySelector('.loader-logo')
    const tagline = loader.querySelector('.loader-tagline')

    gsap.set([progress, logoText, tagline], { opacity: 0 })
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left' })

    const tl = gsap.timeline()

    tl.to(logoText, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    tl.to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    tl.to(progress, { opacity: 1, duration: 0.3 }, '-=0.2')
    tl.to(progress, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' })

    // Count up
    let count = 0
    const interval = setInterval(() => {
      count += 2
      if (count > 100) count = 100
      if (counter) counter.textContent = count + '%'
      if (count >= 100) clearInterval(interval)
    }, 24)

    // Exit
    tl.to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        loader.style.display = 'none'
        clearInterval(interval)
      }
    })

    return () => {
      tl.kill()
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={loaderRef} className="page-loader fixed inset-0 flex flex-col items-center justify-center" style={{ background: '#fff', zIndex: 9999 }}>
      {/* Blue-green gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0057FF] via-[#00C853] to-[#0038A8]"></div>

      <div className="flex flex-col items-center gap-6 w-full max-w-xs px-8">
        {/* Logo */}
        <div className="loader-logo flex items-center gap-3" style={{ transform: 'translateY(20px)' }}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0057FF] to-[#0038A8] flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M4 14L10 6L16 14L10 22L4 14Z" fill="white"/>
              <path d="M12 14L18 6L24 14L18 22L12 14Z" fill="rgba(255,255,255,0.5)"/>
            </svg>
          </div>
          <span className="font-display font-black text-[#1A1F36] text-2xl tracking-tight">
            Zero<span className="text-[#0057FF]">Commission</span>
          </span>
        </div>

        <div className="loader-tagline text-[#6B7280] text-sm font-medium" style={{ transform: 'translateY(10px)' }}>
          Your Trusted Financial Partner
        </div>

        {/* Progress */}
        <div className="w-full">
          <div className="h-1.5 bg-[#E5EAF2] rounded-full overflow-hidden mb-2">
            <div className="loader-progress h-full bg-gradient-to-r from-[#0057FF] to-[#00C853] rounded-full"></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6B7280] text-xs">Loading...</span>
            <span className="loader-counter text-[#0057FF] text-xs font-bold">0%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
