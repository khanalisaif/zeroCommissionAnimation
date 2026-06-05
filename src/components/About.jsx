import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Award, Clock, Target, CheckCircle, TrendingUp } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Users, val: '10,000+', label: 'Satisfied Clients', color: '#0057FF' },
  { icon: Award, val: '100%', label: 'Approval Rate', color: '#00C853' },
  { icon: Clock, val: '24 Hours', label: 'Processing Speed', color: '#0038A8' },
  { icon: Target, val: '₹0', label: 'Hidden Fees', color: '#009B41' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })
      st('.abt-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.abt-h2', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' })
      sectionRef.current?.querySelectorAll('.abt-p').forEach(p => st(p, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }))
      st('.abt-btn', { y: 20, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' })
      
      const card = sectionRef.current?.querySelector('.abt-card')
      st(card, { x: 70, opacity: 0, rotateY: 12 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' })

      sectionRef.current?.querySelectorAll('.abt-bar').forEach((bar, i) => {
        gsap.fromTo(bar, { width: '0%' }, { width: `${[98,99,100][i]}%`, duration: 1.6, delay: 0.3 + i * 0.15, ease: 'power2.inOut', scrollTrigger: { trigger: card, start: 'top 80%' } })
      })

      const statEls = sectionRef.current?.querySelectorAll('.abt-stat')
      if (statEls?.length) {
        gsap.fromTo(statEls, { y: 40, opacity: 0, scale: 0.88, rotateX: 20 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.5)', scrollTrigger: { trigger: statEls[0], start: 'top 88%' } })
      }
      if (card) gsap.to(card, { y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-28 relative overflow-hidden bg-[var(--c-bg-light)]">
      <AnimatedBG variant="green" />
      <div className="dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-20">
          <div className="abt-chip section-chip mb-4 mx-auto">About Us</div>
          <h2 className="abt-h2 font-display font-black leading-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}>
            <div className="text-[var(--c-text)]"><AnimatedWordText text="Focus on Your Goals," /></div>
            <div className="text-grad-mixed"><AnimatedWordText text="We Handle the Finance" /></div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">
          <div>
            <p className="abt-p text-[var(--c-muted)] text-lg leading-[1.8] mb-5"><GSAP3DText text="You focus on achieving your dreams. Our platform handles the entire loan process — from application to disbursement — with zero intermediary fees and complete transparency." /></p>
            <p className="abt-p text-[var(--c-muted)] leading-[1.8] mb-10"><GSAP3DText text="Whether you need funds for a new home, expanding your business, or securing a vehicle, Zero Commission connects you directly with the best lenders without any hidden costs." /></p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {['Zero Commission — Ever','Secure Digital Process','Algorithmic Loan Matching','Trusted Financial Partners'].map(f => (
                <div key={f} className="flex items-center gap-3 bg-white border border-[var(--c-border)] rounded-xl p-3 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-[#00C853] flex items-center justify-center flex-shrink-0"><CheckCircle size={12} className="text-white" /></div>
                  <span className="text-slate-700 font-semibold text-sm">{f}</span>
                </div>
              ))}
            </div>
            <a className="abt-btn btn-primary inline-flex px-8 py-4 text-base" href="#services">View Our Services →</a>
          </div>

          <div style={{ perspective: '1200px' }}>
            <div className="abt-card relative rounded-[24px] overflow-hidden p-8 bg-white border border-[var(--c-border)] shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--c-blue)] via-[var(--c-blue-dark)] to-[var(--c-green)] rounded-t-[24px]"></div>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--c-border)]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--c-blue),var(--c-blue-dark))' }}>
                  <TrendingUp size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-[var(--c-text)] font-display font-bold text-lg">Performance Stats</div>
                  <div className="text-[#00C853] text-xs font-bold mt-0.5">● Live & Updated</div>
                </div>
              </div>
              <div className="space-y-5 mb-8">
                {[
                  { label: 'Processing Velocity', color: '#0057FF', val: 98 },
                  { label: 'Client Satisfaction', color: '#00C853', val: 99 },
                  { label: 'Approval Accuracy',   color: '#0038A8', val: 100 },
                ].map(({ label, color, val }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-slate-800">{val}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100">
                      <div className="abt-bar h-full rounded-full shimmer" style={{ width: 0, background: `linear-gradient(90deg,${color},${color}99)` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl text-center border border-[var(--c-border)]" style={{ background: 'rgba(0,87,255,0.05)' }}>
                  <div className="font-display font-black text-3xl text-[#0057FF]">₹500Cr+</div>
                  <div className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-wider">Loans Disbursed</div>
                </div>
                <div className="p-4 rounded-xl text-center border border-[var(--c-border)]" style={{ background: 'rgba(0,200,83,0.05)' }}>
                  <div className="font-display font-black text-3xl text-[#00C853]">Tier 1</div>
                  <div className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-wider">Trust Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 preserve-3d">
          {stats.map(({ icon: Icon, val, label, color }) => (
            <div key={label} className="abt-stat glass-card p-6 text-center group cursor-default">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" style={{ background: `${color}15`, color }}>
                <Icon size={22} />
              </div>
              <div className="font-display font-black text-2xl mb-1 text-[var(--c-text)]">{val}</div>
              <div className="text-[var(--c-muted)] text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
