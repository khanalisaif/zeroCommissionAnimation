import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react'
import AnimatedBG from './AnimatedBG'
import AnimatedWordText from './AnimatedWordText'
import GSAP3DText from './GSAP3DText'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Office',
    lines: ['WZA495, Old Pankha Rd, Block B,', 'Milap Nagar, Rani Bagh,', 'New Delhi, Delhi — 110059'],
    color: '#0057FF',
    bg: 'from-[var(--c-blue)] to-[var(--c-blue-dark)]',
  },
  {
    icon: Phone,
    title: 'Call Us Anytime',
    lines: ['+91 9999838802'],
    href: 'tel:+919999838802',
    color: '#00C853',
    bg: 'from-[var(--c-green)] to-[var(--c-green-dark)]',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['zerocommission@gmail.com'],
    href: 'mailto:zerocommission@gmail.com',
    color: '#0038A8',
    bg: 'from-[var(--c-blue-dark)] to-[var(--c-blue)]',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', loan: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    gsap.to(formRef.current, {
      scale: 0.98, opacity: 0.7, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setSubmitted(true)
        gsap.to(formRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' })
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el, from, to) => el && gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' } })

      st('.ct-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
      st('.ct-h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      st('.ct-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 })

      const infoCards = sectionRef.current?.querySelectorAll('.ci-card')
      if (infoCards?.length) {
        gsap.fromTo(infoCards,
          { y: 40, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: infoCards[0], start: 'top 84%' } }
        )
      }

      st('.ct-map', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' })
      st('.ct-form', { x: 70, opacity: 0, rotateY: -8 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.1, ease: 'power3.out', delay: 0.1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const loanTypes = [
    'Home Loan', 'Business Loan', 'Personal Loan',
    'Vehicle Loan', 'Education Loan', 'Loan Against Property',
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-28 relative overflow-hidden bg-[var(--c-bg-alt)]">
      <AnimatedBG variant="blue" />
      <div className="dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" style={{ filter: 'invert(1)' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

        <div className="text-center mb-16">
          <div className="ct-chip section-chip mb-5 mx-auto">
            <MessageCircle size={13} /> Get In Touch
          </div>
          <h2 className="ct-h2 font-display font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            <div className="text-[var(--c-text)]"><AnimatedWordText text="Let's Talk About" /></div>
            <div className="text-grad-mixed"><AnimatedWordText text="Your Loan" /></div>
          </h2>
          <p className="ct-sub text-[var(--c-muted)] max-w-xl mx-auto text-lg">
            <GSAP3DText text="Our team is ready to help you find the perfect financial solution. Reach out today — zero fees, full support." />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start" style={{ perspective: '1200px' }}>

          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, title, lines, href, color, bg }) => (
              <div key={title} className="ci-card group relative overflow-hidden rounded-2xl glass-card border border-[var(--c-border)] p-6 flex items-start gap-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(180deg, ${color}, ${color}88)` }}></div>

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-[var(--c-text)] mb-1.5 text-base">{title}</div>
                  {lines.map((line, j) => (
                    <div key={j} className="text-[var(--c-muted)] text-sm leading-relaxed">
                      {href && j === 0
                        ? <a href={href} className="font-semibold transition-colors duration-200" style={{ color }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}><GSAP3DText text={line} /></a>
                        : <GSAP3DText text={line} />}
                    </div>
                  ))}
                </div>

                {href && (
                  <div className="ml-auto flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color }}>
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}

            <div className="ct-map rounded-2xl overflow-hidden border border-[var(--c-border)] shadow-sm relative z-10" style={{ height: '240px' }}>
              <iframe
                src="https://maps.google.com/maps?q=WZA495,%20Old%20Pankha%20Rd,%20Block%20B,%20Milap%20Nagar,%20Rani%20Bagh,%20New%20Delhi,%20Delhi%20%E2%80%94%20110059&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div ref={formRef} className="ct-form relative overflow-hidden rounded-[28px] bg-white border border-[var(--c-border)] shadow-xl"
            style={{ padding: '2.5rem' }}>

            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--c-blue)] via-[var(--c-blue-dark)] to-[var(--c-green)] rounded-t-[28px]"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,87,255,0.05), transparent)', filter: 'blur(30px)' }}></div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--c-green), var(--c-green-dark))' }}>
                    <CheckCircle2 size={44} className="text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(0,200,83,0.2)' }}></div>
                </div>
                <h3 className="font-display font-black text-2xl text-[var(--c-text)] mb-3">Application Submitted!</h3>
                <p className="text-[var(--c-muted)] mb-8 max-w-xs">Our team will review your application and contact you within 24 hours.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setSubmitted(false)}
                    className="text-[#0057FF] font-bold text-sm border border-[#0057FF] rounded-xl px-6 py-2.5 hover:bg-[#0057FF] hover:text-white transition-all">
                    Submit Another
                  </button>
                  <a href="#home" className="text-white font-bold text-sm rounded-xl px-6 py-2.5 text-center" style={{ background: 'linear-gradient(135deg, var(--c-blue), var(--c-blue-dark))' }}>
                    Back to Home
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div>
                    <h3 className="font-display font-black text-2xl text-[var(--c-text)]">Apply for a Loan</h3>
                    <p className="text-[var(--c-muted)] text-sm mt-1">Fill in your details — takes only 2 minutes</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-[#00C853] bg-[#00C853]/10 px-2.5 py-1 rounded-full border border-[#00C853]/20 uppercase tracking-wider">● Live</span>
                    <span className="text-[10px] text-[var(--c-muted)]">Zero Commission</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text', required: true },
                      { name: 'phone', label: 'Phone Number', placeholder: '+91 9999999999', type: 'tel', required: true },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">{field.label}</label>
                        <input
                          name={field.name} type={field.type}
                          value={form[field.name]} onChange={handleChange}
                          onFocus={() => setFocusedField(field.name)} onBlur={() => setFocusedField(null)}
                          required={field.required} placeholder={field.placeholder}
                          className="w-full rounded-xl px-4 py-3.5 text-sm text-slate-800 font-medium outline-none transition-all duration-200 placeholder:text-slate-500"
                          style={{
                            background: 'rgba(0,0,0,0.03)',
                            border: `2px solid ${focusedField === field.name ? '#0057FF' : 'rgba(0,0,0,0.1)'}`,
                            boxShadow: focusedField === field.name ? '0 0 0 4px rgba(0,87,255,0.15)' : 'none',
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      name="email" type="email"
                      value={form.email} onChange={handleChange}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl px-4 py-3.5 text-sm text-slate-800 font-medium outline-none transition-all duration-200 placeholder:text-slate-500"
                      style={{
                        background: 'rgba(0,0,0,0.03)',
                        border: `2px solid ${focusedField === 'email' ? '#0057FF' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(0,87,255,0.15)' : 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Loan Type</label>
                    <select
                      name="loan" value={form.loan} onChange={handleChange}
                      onFocus={() => setFocusedField('loan')} onBlur={() => setFocusedField(null)} required
                      className="w-full rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-200 appearance-none cursor-pointer"
                      style={{
                        background: 'rgba(0,0,0,0.03)',
                        border: `2px solid ${focusedField === 'loan' ? '#0057FF' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: focusedField === 'loan' ? '0 0 0 4px rgba(0,87,255,0.15)' : 'none',
                        color: form.loan ? '#1e293b' : '#64748B',
                      }}>
                      <option value="" style={{ color: '#000' }}>Select your loan type...</option>
                      {loanTypes.map(o => <option key={o} value={o} style={{ color: '#000' }}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Message <span className="text-slate-500 normal-case font-normal">(Optional)</span></label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                      rows={3} placeholder="Tell us about your requirements..."
                      className="w-full rounded-xl px-4 py-3.5 text-sm text-slate-800 font-medium outline-none transition-all duration-200 resize-none placeholder:text-slate-500"
                      style={{
                        background: 'rgba(0,0,0,0.03)',
                        border: `2px solid ${focusedField === 'message' ? '#0057FF' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(0,87,255,0.15)' : 'none',
                      }}
                    />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-3 text-white font-bold text-base py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, var(--c-blue), var(--c-blue-dark))',
                      boxShadow: '0 8px 30px rgba(0,87,255,0.3)',
                    }}>
                    <Send size={18} />
                    Submit Application
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1C4.24 1 2 3.24 2 6V7H1.5C1.22 7 1 7.22 1 7.5V12.5C1 12.78 1.22 13 1.5 13H12.5C12.78 13 13 12.78 13 12.5V7.5C13 7.22 12.78 7 12.5 7H12V6C12 3.24 9.76 1 7 1ZM7 2.5C8.93 2.5 10.5 4.07 10.5 6V7H3.5V6C3.5 4.07 5.07 2.5 7 2.5Z" fill="#94A3B8"/>
                    </svg>
                    <span className="text-[var(--c-muted)] text-xs">Your information is 100% secure and confidential</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
