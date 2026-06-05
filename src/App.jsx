import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Percent, Zap, Users, Eye, Headphones, Coins, MapPin, Clock, Briefcase, ShieldCheck } from 'lucide-react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Values from './components/Values'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

gsap.registerPlugin(ScrollTrigger)

const tickerItems = [
  { label: 'Zero Commission — Always', icon: Percent },
  { label: 'Fast Loan Approval', icon: Zap },
  { label: '10,000+ Satisfied Clients', icon: Users },
  { label: 'Transparent Process', icon: Eye },
  { label: 'Dedicated Support', icon: Headphones },
  { label: 'No Hidden Fees', icon: Coins },
  { label: 'Trusted in New Delhi', icon: MapPin },
  { label: '24-Hour Approval', icon: Clock },
  { label: 'Expert Loan Managers', icon: Briefcase },
  { label: '100% Secure', icon: ShieldCheck },
]

function Ticker() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const doubled = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 4

    tweenRef.current = gsap.fromTo(track,
      { x: 0 },
      { x: -totalWidth, duration: 40, ease: 'none', repeat: -1 }
    )

    const onEnter = () => gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.8 })
    const onLeave = () => gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 })

    track.parentElement?.addEventListener('mouseenter', onEnter)
    track.parentElement?.addEventListener('mouseleave', onLeave)

    return () => {
      tweenRef.current?.kill()
      track.parentElement?.removeEventListener('mouseenter', onEnter)
      track.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const colors = ['#0057FF', '#00C853', '#0038A8', '#009B41']

  return (
    <div className="relative py-5 overflow-hidden border-y border-[#E5EAF2] bg-[#F7F9FC]">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F7F9FC] to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F7F9FC] to-transparent"></div>

      <div ref={trackRef} className="flex items-center gap-4 w-max px-4">
        {doubled.map((item, i) => {
          const Icon = item.icon
          const color = colors[i % colors.length]
          return (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#E5EAF2] shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-default group whitespace-nowrap">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${color}12`, color }}>
                <Icon size={13} />
              </div>
              <span className="text-[#1A1F36] font-semibold text-xs">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen font-body text-[#1A1F36] bg-white">
      <PageLoader />
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Team />
      <Services />
      <HowItWorks />
      <Values />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
