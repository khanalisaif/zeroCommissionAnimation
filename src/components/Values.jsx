import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, BarChart2, Zap, Heart, Eye, Globe, Anchor } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We act with honesty and transparency in every transaction. Zero hidden costs, period.', color: '#0057FF' },
  { icon: BarChart2, title: 'Simplicity', desc: 'We make the complex financial world simple and accessible for everyone.', color: '#00C853' },
  { icon: Zap, title: 'Performance', desc: 'Fast processing and quick disbursements so you get your funds when you need them.', color: '#0038A8' },
  { icon: Heart, title: 'Customer First', desc: 'Our clients are at the center of everything we do. We strive to exceed expectations.', color: '#009B41' },
  { icon: Eye, title: 'Transparency', desc: 'Clear communication throughout. You always know exactly where your application stands.', color: '#0057FF' },
  { icon: Globe, title: 'Accessibility', desc: 'Financial solutions tailored to diverse needs across different sectors and backgrounds.', color: '#00C853' },
]

export default function Values() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })

      st('.val-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.val-h2',   { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      st('.val-cta',  { y: 30, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' })

      const cards = sectionRef.current?.querySelectorAll('.val-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: { amount: 0.5 }, ease: 'back.out(1.3)', scrollTrigger: { trigger: cards[0], start: 'top 82%' } }
        )

        cards.forEach(card => {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, scale: 1.04, duration: 0.4, ease: 'power2.out', zIndex: 10 })
          })
          card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)', zIndex: 1 }))
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="values" className="py-28 relative overflow-hidden bg-[var(--c-bg-alt)]">
      <AnimatedBG variant="dark" />
      <div className="dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-20">
          <div className="val-chip section-chip mb-5 mx-auto">
            <Anchor size={14} /> Our Core Values
          </div>
          <h2 className="val-h2 font-display font-black leading-tight mb-4 text-grad-mixed" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            <AnimatedWordText text="Principles That Drive Us" />
          </h2>
          <p className="text-[var(--c-muted)] max-w-2xl mx-auto text-lg">
            <GSAP3DText text="The foundational values governing every interaction and service we provide to our clients." />
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-20 preserve-3d" style={{ perspective: '1000px' }}>
          {values.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="val-card glass-card p-8 group cursor-default">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: `${color}15`, color }}>
                <Icon size={24} />
              </div>
              <div className="h-0.5 w-10 rounded-full mb-5 transition-all duration-500 group-hover:w-full" style={{ background: color }}></div>
              <h3 className="font-display font-bold text-[var(--c-text)] text-xl mb-3" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = color} onMouseLeave={e => e.target.style.color = 'var(--c-text)'}>{title}</h3>
              <p className="text-[var(--c-muted)] text-sm leading-relaxed">
                <GSAP3DText text={desc} />
              </p>
            </div>
          ))}
        </div>

        <div className="val-cta relative overflow-hidden rounded-[24px] p-10 md:p-14 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--c-blue), var(--c-blue-dark), var(--c-green))' }}>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-lg"></div>
          <div className="relative z-10">
            <p className="font-display font-black text-2xl md:text-3xl mb-3">
              <GSAP3DText text="Ready to Get a Zero Commission Loan?" />
            </p>
            <p className="text-white/80 mb-8 text-lg">
              <GSAP3DText text="Apply today and experience transparent, fast, and fee-free financing." />
            </p>
            <a href="#contact" className="btn-primary bg-white hover:bg-slate-100 inline-flex px-10 py-4 text-base shadow-xl" style={{ background: '#fff', color: 'var(--c-blue)' }}>
              Apply Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
