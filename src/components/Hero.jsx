import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ShieldCheck, Clock, Zap, TrendingUp, Home, Briefcase, Car, GraduationCap } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const h = heroRef.current
    if (!h) return

    gsap.set('.hero-chip', { y: -30, opacity: 0 })
    gsap.set('.hero-h1-line', { y: 80, opacity: 0 })
    gsap.set('.hero-sub', { y: 30, opacity: 0 })
    gsap.set('.hero-cta-wrap', { y: 30, opacity: 0 })
    gsap.set('.hero-stats', { y: 30, opacity: 0 })
    gsap.set('.hero-card', { x: 80, opacity: 0, rotateY: -20 })
    gsap.set('.hero-float-tag', { scale: 0, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to('.hero-chip',     { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, 0)
    tl.to('.hero-h1-line',  { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, 0.2)
    tl.to('.hero-sub',      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.7)
    tl.to('.hero-cta-wrap', { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.9)
    tl.to('.hero-stats',    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.0)
    tl.to('.hero-card',     { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' }, 0.5)
    tl.to('.hero-float-tag',{ scale: 1, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.8)' }, 1.0)

    const scrollBar = document.querySelector('.scroll-bar')
    const onScroll = () => {
      if (scrollBar) {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        gsap.to(scrollBar, { scaleX: pct, duration: 0.1, ease: 'none' })
      }
    }
    window.addEventListener('scroll', onScroll)

    const onMouseMove = e => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy
      gsap.to('.hero-card', { rotateY: dx * 8, rotateX: -dy * 8, duration: 0.6, ease: 'power2.out' })
      gsap.to('.hero-float-tag-1', { x: dx * 18, y: dy * 12, duration: 0.8, ease: 'power2.out' })
      gsap.to('.hero-float-tag-2', { x: -dx * 14, y: -dy * 14, duration: 0.8, ease: 'power2.out' })
      gsap.to('.hero-float-tag-3', { x: dx * 10, y: -dy * 8, duration: 0.8, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      tl.kill()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const loanTypes = [
    { icon: Home, label: 'Home Loan', color: '#3B82F6' },
    { icon: Briefcase, label: 'Business Loan', color: '#10B981' },
    { icon: Car, label: 'Car Loan', color: '#8B5CF6' },
    { icon: GraduationCap, label: 'Education Loan', color: '#06B6D4' },
  ]

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[var(--c-bg-light)]">

      <div className="scroll-bar"></div>

      <AnimatedBG variant="blue" />

      <div className="morphing-blob w-[550px] h-[550px] -top-40 -left-32 bg-[#0057FF]/10"></div>
      <div className="morphing-blob w-[400px] h-[400px] bottom-0 right-0 bg-[#00C853]/10" style={{ animationDelay: '5s', borderRadius: '40% 60% 30% 70%' }}></div>
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-40"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="hero-chip section-chip mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></span>
              India's #1 Zero Commission Loan Platform
            </div>

            <h1 className="font-display font-black leading-[1.07] text-[var(--c-text)] mb-6" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
              <div className="overflow-hidden"><AnimatedWordText text="Your Goals." className="block" /></div>
              <div className="overflow-hidden"><AnimatedWordText text="Our Funding." className="block" /></div>
              <div className="overflow-hidden">
                <AnimatedWordText text="Zero Commission." className="block text-grad-blue" />
              </div>
            </h1>

            <p className="hero-sub text-[var(--c-muted)] text-lg leading-relaxed mb-8 max-w-lg" style={{ opacity: 1 }}>
              <GSAP3DText text="Apply online in 5 minutes — zero broker fees, instant verification, competitive interest rates across all loan categories." />
            </p>

            <div className="hero-cta-wrap flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn-primary text-base px-8 py-4">
                Apply For Loan <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className="btn-secondary text-base px-8 py-4">
                How It Works
              </a>
            </div>

            <div className="hero-stats grid grid-cols-2 gap-3 mb-8">
              {loanTypes.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl p-3.5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group glass-card">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: `${color}20`, color }}>
                    <Icon size={17} />
                  </div>
                  <span className="text-slate-800 font-semibold text-sm">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, text: '100% Secure', color: '#00C853' },
                { icon: Clock, text: '24hr Approval', color: '#0057FF' },
                { icon: Zap, text: 'Instant Process', color: '#0038A8' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[var(--c-muted)] font-semibold">
                  <Icon size={16} style={{ color }} /> {text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end" style={{ perspective: '1200px' }}>
            <div className="hero-card relative w-full max-w-[480px]">

              <div className="grad-border">
                <div className="relative bg-white rounded-[22px] p-8 overflow-hidden shadow-2xl border border-[var(--c-border)]">
                  <div className="scan-sweep"></div>

                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Loan Dashboard</div>
                      <div className="text-slate-800 font-display font-black text-xl">Zero Commission</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--c-blue), var(--c-blue-dark))' }}>
                      <TrendingUp size={22} className="text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { val: '₹0', label: 'Commission', col: '#0057FF', bg: 'rgba(0,87,255,0.1)' },
                      { val: '10K+', label: 'Clients', col: '#00C853', bg: 'rgba(0,200,83,0.1)' },
                      { val: '24H', label: 'Approval', col: '#0038A8', bg: 'rgba(0,56,168,0.1)' },
                    ].map(({ val, label, col, bg }) => (
                      <div key={label} className="text-center p-3 rounded-xl border border-slate-100" style={{ background: bg }}>
                        <div className="font-display font-black text-xl" style={{ color: col }}>{val}</div>
                        <div className="text-slate-500 text-xs mt-0.5 font-semibold">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: 'Processing Speed', val: 98, color: '#0057FF' },
                      { label: 'Client Satisfaction', val: 99, color: '#00C853' },
                      { label: 'Approval Rate', val: 100, color: '#0038A8' },
                    ].map(({ label, val, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-500">{label}</span>
                          <span className="text-slate-700">{val}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-full rounded-full shimmer" style={{ width: `${val}%`, background: color }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 flex items-center justify-between text-white" style={{ background: 'linear-gradient(135deg, var(--c-blue), var(--c-blue-dark))' }}>
                    <div>
                      <div className="font-bold text-sm">Ready to Apply?</div>
                      <div className="text-blue-100 text-xs mt-0.5">Get approved in 24 hours</div>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-float-tag hero-float-tag-1 float-a glass-card absolute -top-8 -left-10 px-4 py-3 flex items-center gap-3 z-20 shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-[#00C853]/20 flex items-center justify-center border border-[#00C853]/30">
                  <ShieldCheck size={18} className="text-[#00C853]" />
                </div>
                <div>
                  <div className="text-slate-800 font-bold text-xs">100% Safe</div>
                  <div className="text-slate-500 text-[10px]">Bank Grade Security</div>
                </div>
              </div>

              <div className="hero-float-tag hero-float-tag-2 float-b glass-card absolute -bottom-6 -left-6 px-4 py-3 flex items-center gap-3 z-20 shadow-lg">
                <div className="pulse-ring w-3 h-3 rounded-full bg-[#00C853] flex-shrink-0"></div>
                <div>
                  <div className="text-slate-800 font-bold text-xs">Live Processing</div>
                  <div className="text-slate-500 text-[10px]">1,240 loans today</div>
                </div>
              </div>

              <div className="hero-float-tag hero-float-tag-3 float-c glass-card absolute top-1/2 -right-10 px-4 py-3 flex items-center gap-3 z-20 shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-[#0057FF]/20 flex items-center justify-center border border-[#0057FF]/30">
                  <Clock size={18} className="text-[#0057FF]" />
                </div>
                <div>
                  <div className="text-slate-800 font-bold text-xs">24H Approval</div>
                  <div className="text-slate-500 text-[10px]">Fast Disbursement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
