import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardList, UploadCloud, ShieldCheck, ArrowRight } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Fill the Application',
    desc: 'Enter your basic details and loan requirements in our secure online form. Takes only 5 minutes.',
    color: '#0057FF',
  },
  {
    num: '02',
    icon: UploadCloud,
    title: 'Upload Documents',
    desc: 'Securely upload your KYC and financial documents digitally — no physical visits needed.',
    color: '#00C853',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Get Loan Approval',
    desc: 'Our system verifies your application and approves your loan within 24 hours.',
    color: '#0038A8',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })

      st('.hiw-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.hiw-h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })

      const cards = sectionRef.current?.querySelectorAll('.hiw-card')
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.9, rotateX: 20 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.3)', scrollTrigger: { trigger: cards[0], start: 'top 82%' } }
        )

        cards.forEach(card => {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            gsap.to(card, { rotateX: -y * 12, rotateY: x * 12, scale: 1.04, duration: 0.4, ease: 'power2.out' })
          })
          card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' }))
        })
      }

      const arrows = sectionRef.current?.querySelectorAll('.hiw-arrow')
      if (arrows?.length) {
        gsap.fromTo(arrows,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.2, delay: 0.6, ease: 'power2.out', scrollTrigger: { trigger: cards[0], start: 'top 82%' } }
        )
        gsap.to(arrows, { x: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-28 relative overflow-hidden bg-[var(--c-bg-light)]">
      <AnimatedBG variant="blue" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="hiw-chip section-chip mb-4 mx-auto">How It Works</div>
          <h2 className="hiw-h2 font-display font-black leading-tight text-grad-mixed" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)' }}>
            <AnimatedWordText text="Get Your Loan in 3 Simple Steps" />
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-4 preserve-3d" style={{ perspective: '1000px' }}>
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-6 md:gap-4 flex-1">
              <div className="hiw-card glass-card p-8 w-full flex-1 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[20px]" style={{ background: step.color }}></div>
                <div className="absolute top-6 right-6 font-display font-black text-6xl leading-none select-none transition-transform duration-500 group-hover:scale-110" style={{ color: `${step.color}15` }}>
                  {step.num}
                </div>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: `${step.color}15`, color: step.color }}>
                  <step.icon size={28} />
                </div>

                <h3 className="font-display font-bold text-[var(--c-text)] text-xl mb-3">{step.title}</h3>
                <p className="text-[var(--c-muted)] text-sm leading-relaxed">
                  <GSAP3DText text={step.desc} />
                </p>

                {idx === 0 && (
                  <a href="#contact" className="inline-flex items-center gap-2 mt-6 text-sm font-bold" style={{ color: step.color }}>
                    Apply Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              {idx < steps.length - 1 && (
                <div className="hiw-arrow hidden md:flex flex-col items-center justify-center flex-shrink-0">
                  <ArrowRight size={32} className="text-[var(--c-blue)] opacity-40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-[var(--c-border)] rounded-full px-6 py-3 shadow-sm">
            <ShieldCheck size={18} className="text-[#00C853]" />
            <span className="text-slate-700 text-sm font-semibold">All data is encrypted & protected under RBI guidelines</span>
          </div>
        </div>
      </div>
    </section>
  )
}
