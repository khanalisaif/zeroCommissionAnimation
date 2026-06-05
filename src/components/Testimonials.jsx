import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: 'Rahul Sharma', role: 'Business Owner, Delhi', initials: 'RS', rating: 5, color: '#0057FF', text: 'Zero Commission made getting a business loan incredibly easy. Their digital process is fast, and true to their name, there were absolutely zero hidden broker fees. Highly recommended!' },
  { name: 'Priya Mehta', role: 'Home Buyer, Noida', initials: 'PM', rating: 5, color: '#00C853', text: 'I was struggling to find a home loan with good interest rates until I found Zero Commission. Their team guided me through every step and the entire process was completely transparent.' },
  { name: 'Amit Verma', role: 'IT Professional, Gurgaon', initials: 'AV', rating: 5, color: '#0038A8', text: 'The 24-hour approval process is real! I applied for a personal loan and the amount was disbursed to my account within a day. No hidden charges, no unnecessary delays.' },
  { name: 'Sneha Kapoor', role: 'Student, New Delhi', initials: 'SK', rating: 5, color: '#009B41', text: 'Getting an education loan was so stressful before I contacted Zero Commission. Their transparent process and dedicated loan manager gave me complete peace of mind.' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const isAnimating = useRef(false)

  const animateCard = (dir) => {
    if (isAnimating.current) return
    isAnimating.current = true
    gsap.to(cardRef.current, {
      rotateY: dir * -40, opacity: 0, scale: 0.93, x: dir * -40, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        setCurrent(c => (c + dir + testimonials.length) % testimonials.length)
        gsap.fromTo(cardRef.current,
          { rotateY: dir * 40, opacity: 0, scale: 0.93, x: dir * 40 },
          { rotateY: 0, opacity: 1, scale: 1, x: 0, duration: 0.55, ease: 'back.out(1.4)', onComplete: () => { isAnimating.current = false } }
        )
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })
      
      st('.tm-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.tm-h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      st('.tm-main-card', { y: 50, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)', delay: 0.2 })
      
      const minis = sectionRef.current?.querySelectorAll('.tm-mini')
      if (minis?.length) gsap.fromTo(minis, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.4, scrollTrigger: { trigger: minis[0], start: 'top 88%' } })
      st('.tm-nav', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' })

      const interval = setInterval(() => animateCard(1), 5000)
      return () => clearInterval(interval)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-[var(--c-bg-alt)]">
      <AnimatedBG variant="blue" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <div className="tm-chip section-chip mb-5 mx-auto">
            Testimonials
          </div>
          <h2 className="tm-h2 font-display font-black text-grad-mixed" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            <AnimatedWordText text="What Our Clients Say" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center mb-12" style={{ perspective: '1200px' }}>

          <div className="hidden lg:flex flex-col gap-4">
            {testimonials.slice(0, 2).map((item, i) => (
              <div key={i}
                className={`tm-mini rounded-2xl p-5 cursor-pointer transition-all duration-300 border-l-4 ${current === i ? 'border-l-[var(--c-blue)] shadow-lg border-y-[var(--c-border)] border-r-[var(--c-border)] bg-white' : 'border-l-transparent border border-transparent opacity-60 hover:opacity-100 bg-white/50'}`}
                onClick={() => { if (!isAnimating.current) setCurrent(i) }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white" style={{ background: item.color }}>{item.initials}</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">{item.name}</div>
                    <div className="text-slate-500 text-xs">{item.role}</div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">"<GSAP3DText text={item.text} />"</p>
              </div>
            ))}
          </div>

          <div>
            <div ref={cardRef} className="tm-main-card rounded-[24px] glass-card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--c-blue)] via-[var(--c-blue-dark)] to-[var(--c-green)]"></div>
              <div className="absolute top-6 right-6 opacity-20">
                <Quote size={64} className="text-slate-200" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />)}
              </div>
              <p className="text-slate-700 text-lg leading-[1.8] mb-8 relative z-10">"<GSAP3DText text={t.text} />"</p>

              <div className="flex items-center gap-4 border-t border-[var(--c-border)] pt-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg text-white" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}>{t.initials}</div>
                <div>
                  <div className="font-display font-bold text-slate-800">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            {testimonials.slice(2, 4).map((item, i) => (
              <div key={i}
                className={`tm-mini rounded-2xl p-5 cursor-pointer transition-all duration-300 border-r-4 ${current === i + 2 ? 'border-r-[var(--c-blue)] shadow-lg border-y-[var(--c-border)] border-l-[var(--c-border)] bg-white' : 'border-r-transparent border border-transparent opacity-60 hover:opacity-100 bg-white/50'}`}
                onClick={() => { if (!isAnimating.current) setCurrent(i + 2) }}>
                <div className="flex items-center gap-3 mb-3 flex-row-reverse text-right">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white" style={{ background: item.color }}>{item.initials}</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">{item.name}</div>
                    <div className="text-slate-500 text-xs">{item.role}</div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 text-right">"<GSAP3DText text={item.text} />"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tm-nav flex items-center justify-center gap-5 glass-card w-max mx-auto px-6 py-3 rounded-full shadow-sm">
          <button onClick={() => animateCard(-1)} className="text-slate-500 hover:text-[var(--c-blue)] transition-colors p-1"><ChevronLeft size={20} /></button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { if (!isAnimating.current) setCurrent(i) }}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? 'var(--c-blue)' : 'rgba(0,0,0,0.1)' }} />
            ))}
          </div>
          <button onClick={() => animateCard(1)} className="text-slate-500 hover:text-[var(--c-blue)] transition-colors p-1"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
