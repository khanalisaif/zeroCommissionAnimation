import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Sandeep Rathor', title: 'CEO & Founder',
    desc: 'Visionary leader with over a decade of experience in the financial sector, dedicated to making loans accessible and transparent for everyone.',
    initials: 'SR', color: '#0057FF', bg: 'from-[var(--c-blue)] to-[var(--c-blue-dark)]',
  },
  {
    name: 'Pervaz Ansari', title: 'Director',
    desc: 'Driving strategic growth and partnerships, ensuring Zero Commission remains the most trusted name in the loan facilitation market.',
    initials: 'PA', color: '#00C853', bg: 'from-[var(--c-green)] to-[var(--c-green-dark)]',
  },
  {
    name: 'Mustafa Hasan', title: 'Tech Head',
    desc: 'Leading our digital infrastructure and technological innovations to deliver seamless, ultra-fast online loan experiences for every client.',
    initials: 'MH', color: '#0038A8', bg: 'from-[var(--c-blue-dark)] to-[var(--c-blue)]',
  },
]

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const left = sectionRef.current?.querySelector('.team-left')
      const cards = sectionRef.current?.querySelectorAll('.team-card')
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 85%' } })

      st(left, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })

      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.9, rotateY: 15 },
          { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 0.9, stagger: 0.15, ease: 'back.out(1.3)', scrollTrigger: { trigger: cards[0], start: 'top 82%' } }
        )

        cards.forEach(card => {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, scale: 1.04, duration: 0.4, ease: 'power2.out', zIndex: 10 })
          })
          card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', zIndex: 1 }))
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="team" className="py-28 relative overflow-hidden bg-[var(--c-bg-alt)]">
      <AnimatedBG variant="blue" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 xl:gap-16 items-center">
          
          <div className="team-left lg:col-span-2">
            <div className="inline-flex items-center gap-2 section-chip mb-5">
              <Users size={14} /> Our Team
            </div>
            <h2 className="font-display font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              <div className="text-[var(--c-text)]"><AnimatedWordText text="Meet the Experts Behind" /></div>
              <div className="text-grad-mixed"><AnimatedWordText text="Zero Commission" /></div>
            </h2>
            <p className="text-[var(--c-muted)] leading-relaxed mb-8 max-w-sm">
              <GSAP3DText text="Our leadership team brings decades of financial expertise and technological innovation — united to provide you with the best loan experience." />
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Industry Leaders', color: '#0057FF' },
                { label: 'Client-Focused Approach', color: '#00C853' },
                { label: '10+ Years Combined Experience', color: '#0038A8' }
              ].map(i => (
                <div key={i.label} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[var(--c-border)] shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: i.color }}></div>
                  <span className="text-slate-700 font-semibold text-sm">{i.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-3 gap-5 preserve-3d" style={{ perspective: '1000px' }}>
              {team.map(member => (
                <div key={member.name} className="team-card flex flex-col overflow-hidden group cursor-default rounded-[24px] glass-card">
                  <div className={`relative h-40 flex items-center justify-center bg-gradient-to-br ${member.bg} overflow-hidden`}>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <span className="font-display font-black text-white text-2xl">{member.initials}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="h-0.5 w-8 rounded-full mb-4 transition-all duration-500 group-hover:w-full" style={{ background: member.color }}></div>
                    <h3 className="font-display font-bold text-[var(--c-text)] text-lg mb-1">{member.name}</h3>
                    <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: member.color }}>{member.title}</div>
                    <p className="text-[var(--c-muted)] text-sm leading-relaxed flex-1">
                      <GSAP3DText text={member.desc} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
