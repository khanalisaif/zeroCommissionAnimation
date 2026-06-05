import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook', color: '#1877f2' },
  { icon: Instagram, href: '#', label: 'Instagram', color: '#e1306c' },
  { icon: Twitter, href: '#', label: 'Twitter', color: '#1da1f2' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0a66c2' },
]
const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Values', href: '#values' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact Us', href: '#contact' },
]
const serviceLinks = ['Home Loan', 'Business Loan', 'Vehicle Loan', 'Education Loan', 'Personal Loan', 'Loan Against Property']

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = footerRef.current?.querySelectorAll('.ft-col')
      if (cols) {
        gsap.fromTo(cols,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 88%' } }
        )
      }
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden pt-20 pb-8 bg-[#1A1F36]">

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0057FF] via-[#00C853] to-[#0038A8]"></div>

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #0057FF, transparent)', filter: 'blur(80px)' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="ft-col lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 mb-6 group w-max">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0057FF] to-[#0038A8] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <path d="M4 14L10 6L16 14L10 22L4 14Z" fill="white"/>
                  <path d="M12 14L18 6L24 14L18 22L12 14Z" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </div>
              <span className="font-display font-black text-white text-lg tracking-tight">
                Zero<span className="text-[#00C853]">Commission</span>
              </span>
            </a>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Your trusted partner for all financial needs. Fast, secure, and reliable loan services with zero commission.
            </p>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" style={{ background: color }}></div>
                  <Icon size={16} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="ft-col">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/50 hover:text-[#00C853] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#00C853] group-hover:w-3 transition-all duration-300 rounded-full"></span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="ft-col">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s}>
                  <a href="#services" className="text-white/50 hover:text-[#0057FF] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#0057FF] group-hover:w-3 transition-all duration-300 rounded-full"></span>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Us</h3>
            <div className="space-y-4">
              <a href="tel:+919999838802" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#0057FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0057FF]/40 transition-colors">
                  <Phone size={14} className="text-[#0057FF]" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">Phone</div>
                  <div className="text-white/70 text-sm mt-0.5 group-hover:text-white transition-colors">+91 9999838802</div>
                </div>
              </a>
              <a href="mailto:zerocommission@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#00C853]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00C853]/40 transition-colors">
                  <Mail size={14} className="text-[#00C853]" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">Email</div>
                  <div className="text-white/70 text-sm mt-0.5 group-hover:text-white transition-colors break-all">zerocommission@gmail.com</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">Office</div>
                  <div className="text-white/70 text-sm mt-0.5 leading-relaxed">WZA495, Old Pankha Rd,<br />Milap Nagar, New Delhi — 110059</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 py-10 border-b border-white/10">
          {[
            { label: '5★ Rated by Clients', icon: '★', col: '#F59E0B' },
            { label: 'Zero Commission Always', icon: '₹', col: '#00C853' },
            { label: '24H Loan Approval', icon: '⚡', col: '#0057FF' },
            { label: 'RBI Compliant Process', icon: '🔒', col: '#0038A8' },
          ].map(({ label, icon, col }) => (
            <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white/10 transition-colors">
              <span style={{ color: col }}>{icon}</span>
              <span className="text-white/60 text-xs font-semibold">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Zero Commission. All rights reserved. Designed with ❤ in New Delhi.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(l => (
              <a key={l} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
