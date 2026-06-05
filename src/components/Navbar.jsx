import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#values', label: 'Our Values' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const mobileRef = useRef(null)
  const mounted = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.8 }
    )
  }, [])

  useEffect(() => {
    const menu = mobileRef.current
    if (!menu) return
    if (menuOpen) {
      menu.style.display = 'block'
      gsap.fromTo(menu, { opacity: 0, y: -10, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' })
      gsap.fromTo(menu.querySelectorAll('a'), { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'power2.out' })
    } else {
      gsap.to(menu, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', onComplete: () => { menu.style.display = 'none' } })
    }
  }, [menuOpen])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          opacity: 0,
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5EAF2' : 'none',
          padding: scrolled ? '1rem 0' : '1.5rem 0',
          boxShadow: scrolled ? '0 2px 24px rgba(0,87,255,0.06)' : 'none',
        }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">

          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--c-blue)] to-[var(--c-blue-dark)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                <path d="M4 14L10 6L16 14L10 22L4 14Z" fill="white"/>
                <path d="M12 14L18 6L24 14L18 22L12 14Z" fill="rgba(255,255,255,0.5)"/>
              </svg>
            </div>
            <span className="font-display font-black text-[var(--c-text)] text-lg tracking-tight">
              Zero<span className="text-gradient-blue">Commission</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <a key={href} href={href}
                className="relative text-[var(--c-muted)] hover:text-[var(--c-text)] font-semibold text-sm transition-colors duration-200 group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--c-blue)] group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:flex btn-primary px-5 py-2.5 text-sm">
              Apply Now →
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl border border-[var(--c-border)] text-[var(--c-text)] hover:bg-[var(--c-bg-light)] transition-colors">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div ref={mobileRef}
        className="fixed top-[70px] left-4 right-4 z-40 bg-white rounded-2xl border border-[var(--c-border)] shadow-xl p-5 md:hidden"
        style={{ display: 'none', opacity: 0 }}>
        <div className="flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-[var(--c-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-light)] font-semibold text-sm transition-all">
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="mt-2 btn-primary justify-center text-sm py-3">
            Apply Now →
          </a>
        </div>
      </div>
    </>
  )
}
