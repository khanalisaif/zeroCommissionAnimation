import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeartHandshake, Briefcase, Car, GraduationCap, Home, Bike, HeartPulse, Plane, CheckCircle2, ArrowRight } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: HeartHandshake, title: 'Personal Loan', desc: 'Quick funds for personal needs with minimal documentation and fast approval.', color: '#0057FF' },
  { icon: Briefcase, title: 'Business Loan', desc: 'Scale your enterprise with flexible financing and competitive interest rates.', color: '#00C853' },
  { icon: Car, title: 'Car Loan', desc: 'Drive your dream vehicle with optimized EMIs and hassle-free documentation.', color: '#0038A8' },
  { icon: GraduationCap, title: 'Education Loan', desc: 'Invest in your future with easy education financing and flexible repayment.', color: '#009B41' },
  { icon: Home, title: 'Home Loan', desc: 'Acquire your dream home with low interest rates and expert guidance.', color: '#0057FF' },
  { icon: Bike, title: 'Two-Wheeler Loan', desc: 'Quick two-wheeler financing with minimal paperwork and instant disbursal.', color: '#00C853' },
  { icon: HeartPulse, title: 'Medical Loan', desc: 'Emergency healthcare financing to ensure you get care when it matters most.', color: '#0038A8' },
  { icon: Plane, title: 'Travel Loan', desc: 'Finance your dream vacation with easy travel loans and flexible plans.', color: '#009B41' },
]

const highlights = [
  'Zero Commission — Always', 'Quick 24-Hour Processing',
  'Transparent Documentation', 'Dedicated Loan Manager',
  'Trusted Financial Partners', 'End-to-End Support',
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })
      st('.svc-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.svc-h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      st('.svc-banner', { scale: 0.96, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

      const cards = sectionRef.current?.querySelectorAll('.svc-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: { amount: 0.5 }, ease: 'back.out(1.3)', scrollTrigger: { trigger: cards[0], start: 'top 82%' } }
        )
      }

      const hlItems = sectionRef.current?.querySelectorAll('.hl-item')
      if (hlItems?.length) {
        gsap.fromTo(hlItems,
          { x: -25, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: hlItems[0], start: 'top 88%' } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-28 relative overflow-hidden bg-[var(--c-bg-light)]">
      <AnimatedBG variant="teal" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <div className="svc-chip section-chip mb-5">
            Our Services
          </div>
          <h2 className="svc-h2 font-display font-black leading-tight mb-4 text-grad-mixed" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            <AnimatedWordText text="Financial Solutions For Every Need" />
          </h2>
          <p className="text-[var(--c-muted)] max-w-2xl mx-auto text-lg">
            <GSAP3DText text="From personal needs to business growth — we connect you with the best lenders at zero broker commission." />
          </p>
        </div>

        <div className="svc-banner relative mb-16 overflow-hidden rounded-[24px] p-8 md:p-12 glass-card">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--c-blue)] via-[var(--c-green)] to-[var(--c-blue-dark)]"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[var(--c-bg-alt)] border border-[var(--c-border)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-slate-800">
                <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></span> Our Core Promise
              </div>
              <h3 className="font-display font-black text-slate-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Zero Commission Guarantee</h3>
              <p className="text-slate-600 text-base max-w-lg leading-relaxed">
                <GSAP3DText text="We do not charge any broker or intermediary fees. You only pay for your loan — nothing more, nothing less. Absolute transparency, always." />
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative text-center rounded-[20px] px-14 py-10 bg-white border border-[var(--c-border)] shadow-sm">
                <div className="font-display font-black text-7xl leading-none text-[var(--c-text)]">₹0</div>
                <div className="text-[#0057FF] font-bold text-sm tracking-widest uppercase mt-3">Broker Fee</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-16 preserve-3d" style={{ perspective: '1000px' }}>
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="svc-card glass-card p-6 rounded-[20px] group cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110" style={{ background: `${color}15`, color }}>
                <Icon size={22} />
              </div>
              <h3 className="font-display font-bold text-[var(--c-text)] text-lg mb-2">{title}</h3>
              <p className="text-[var(--c-muted)] text-sm leading-relaxed mb-5">
                <GSAP3DText text={desc} />
              </p>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color }}>
                Apply Now <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 rounded-b-[20px]" style={{ background: color }}></div>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] glass-card p-8 md:p-12 relative overflow-hidden">
          <h3 className="font-display font-bold text-center mb-10 text-slate-800 text-2xl">Why Choose Zero Commission?</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map(h => (
              <div key={h} className="hl-item flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-[var(--c-border)] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#00C853]/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={16} className="text-[#00C853]" />
                </div>
                <span className="text-slate-700 font-semibold text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
