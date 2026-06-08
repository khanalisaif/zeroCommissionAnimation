/**
 * HERO.JSX — Ultra Premium Edition
 * Three.js 3D floating geometry + GSAP entrance/parallax/magnetic animations
 * Light theme · Brand colors: #0057FF · #0038A8 · #00C853
 *
 * Install deps:
 *   npm install gsap three lucide-react
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import {
  ArrowRight, ShieldCheck, Clock, Zap,
  Home, Briefcase, Car, GraduationCap,
  TrendingUp, CheckCircle2, Activity
} from 'lucide-react'

/* ─── BRAND TOKENS ─── */
const C = {
  blue:    '#0057FF',
  blueDark:'#0038A8',
  green:   '#00C853',
  bg:      '#F0F5FF',
  surface: '#FFFFFF',
  text:    '#0B1437',
  muted:   '#64748B',
  border:  '#E2E8F4',
}

/* ══════════════════════════════════════════════
   THREE.JS — FLOATING 3D GEOMETRY CANVAS
══════════════════════════════════════════════ */
function ThreeCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene    = new THREE.Scene()
    const W = el.clientWidth, H = el.clientHeight
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const mBlueWire  = new THREE.MeshBasicMaterial({ color: 0x0057FF, wireframe: true, transparent: true, opacity: 0.20 })
    const mGreenWire = new THREE.MeshBasicMaterial({ color: 0x00C853, wireframe: true, transparent: true, opacity: 0.16 })
    const mDarkWire  = new THREE.MeshBasicMaterial({ color: 0x0038A8, wireframe: true, transparent: true, opacity: 0.12 })
    const mBlueFace  = new THREE.MeshPhongMaterial({ color: 0x0057FF, transparent: true, opacity: 0.05, side: THREE.DoubleSide })
    const mGreenFace = new THREE.MeshPhongMaterial({ color: 0x00C853, transparent: true, opacity: 0.05, side: THREE.DoubleSide })

    scene.add(new THREE.AmbientLight(0xffffff, 1.4))
    const d1 = new THREE.DirectionalLight(0x0057FF, 1.8); d1.position.set(5, 8, 5); scene.add(d1)
    const d2 = new THREE.DirectionalLight(0x00C853, 1.2); d2.position.set(-5,-3, 4); scene.add(d2)

    const shapes = []
    const addShape = (geo, wireMat, faceMat, x, y, z, scale, sx, sy, sz) => {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(geo, faceMat))
      g.add(new THREE.Mesh(geo, wireMat))
      g.position.set(x, y, z)
      g.scale.setScalar(0)
      scene.add(g)
      shapes.push({ g, finalScale: scale, sx, sy, sz })
    }

    // Each shape is placed far from others — no overlap
    // Top-right area — big Blue Icosahedron
    addShape(new THREE.IcosahedronGeometry(1, 1), mBlueWire,  mBlueFace,   9.0,  3.5, -6, 2.0, 0.003, 0.005, 0.002)
    // Top-left area — Green Icosahedron
    addShape(new THREE.IcosahedronGeometry(1, 1), mGreenWire, mGreenFace, -9.5,  4.0, -8, 1.6, 0.004, 0.003, 0.006)
    // Center-right — small Dark Icosahedron
    addShape(new THREE.IcosahedronGeometry(1, 0), mDarkWire,  mBlueFace,   6.5, -4.5, -5, 1.0, 0.006, 0.002, 0.004)
    // Left-middle — Blue Torus (ring)
    addShape(new THREE.TorusGeometry(1, 0.3, 14, 32), mBlueWire,  mBlueFace,  -7.0, -1.5, -7, 1.5, 0.005, 0.008, 0.003)
    // Far right-bottom — Green Torus
    addShape(new THREE.TorusGeometry(1, 0.22, 10, 28), mGreenWire, mGreenFace, 11.0, -3.0, -9, 1.1, 0.007, 0.004, 0.009)
    // Top-center — large Dark Torus (behind content, deep z)
    addShape(new THREE.TorusGeometry(1, 0.4, 18, 36), mDarkWire,  mBlueFace,   1.0,  6.5,-12, 2.0, 0.002, 0.006, 0.004)
    // Far left-bottom — Green Octahedron
    addShape(new THREE.OctahedronGeometry(1, 0), mGreenWire, mGreenFace,-11.5, -3.0,-10, 1.4, 0.008, 0.003, 0.005)
    // Right-bottom — Blue Octahedron
    addShape(new THREE.OctahedronGeometry(1, 0), mBlueWire,  mBlueFace,   3.5, -6.0, -7, 1.2, 0.004, 0.009, 0.003)
    // Top far-left — Green Tetrahedron
    addShape(new THREE.TetrahedronGeometry(1, 0), mDarkWire, mGreenFace, -4.5,  6.0, -9, 1.3, 0.006, 0.005, 0.007)
    // Bottom-center — Blue Cone (replaces messy TorusKnot)
    addShape(new THREE.ConeGeometry(0.8, 1.8, 6, 1), mBlueWire, mBlueFace, 0.5, -5.5, -6, 1.4, 0.004, 0.006, 0.003)

    const dotPos = []
    for (let i = 0; i < 240; i++) dotPos.push((Math.random()-.5)*36, (Math.random()-.5)*24, (Math.random()-.5)*12-6)
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3))
    scene.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x0057FF, size: 0.07, transparent: true, opacity: 0.30 })))

    shapes.forEach(({ g, finalScale }, i) => {
      gsap.to(g.scale, { x: finalScale, y: finalScale, z: finalScale, duration: 1.4, delay: 0.4 + i * 0.1, ease: 'back.out(1.6)' })
    })

    let mx = 0, my = 0
    const onMouse = e => { mx = (e.clientX / window.innerWidth - .5) * 2; my = (e.clientY / window.innerHeight - .5) * 2 }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let raf
    const clock = new THREE.Clock()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      shapes.forEach(({ g, sx, sy, sz }, i) => {
        g.rotation.x += sx; g.rotation.y += sy; g.rotation.z += sz
        g.position.y += Math.sin(t * 0.55 + i) * 0.0025
      })
      camera.position.x += (mx * 2.2 - camera.position.x) * 0.035
      camera.position.y += (-my * 1.4 - camera.position.y) * 0.035
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />
}

/* ══════════════════════════════════════════════
   DONUT CHART
══════════════════════════════════════════════ */
function RingChart({ principal, interest }) {
  const total = principal + interest
  const pPct  = total > 0 ? principal / total : 0.7
  const r = 40, cx = 50, cy = 50, sw = 9, circ = 2 * Math.PI * r
  const pDash = circ * pPct, iDash = circ * (1 - pPct)
  return (
    <svg width={100} height={100} className="flex-shrink-0 hidden sm:block">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEF2FF" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.blue} strokeWidth={sw}
        strokeDasharray={`${pDash} ${circ - pDash}`} strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 0.55s cubic-bezier(0.22,1,0.36,1)', filter: `drop-shadow(0 0 6px ${C.blue}66)` }} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth={sw}
        strokeDasharray={`${iDash} ${circ - iDash}`} strokeDashoffset={circ * 0.25 - pDash}
        style={{ transition: 'stroke-dasharray 0.55s cubic-bezier(0.22,1,0.36,1)', filter: 'drop-shadow(0 0 6px #ef444466)' }} />
      <text x={cx} y={cy - 3} textAnchor="middle" fill={C.text} fontSize={12} fontWeight={800}>{Math.round(pPct * 100)}%</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={C.muted} fontSize={8} fontWeight={600}>Principal</text>
    </svg>
  )
}

/* ══════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════ */
function AnimNum({ value }) {
  const [d, setD] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current; prev.current = value; let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 420, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setD(Math.round(from + (value - from) * e))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])
  return <>{d.toLocaleString('en-IN')}</>
}

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
const fmtRs = n =>
  n >= 1e7 ? `₹${(n/1e7).toFixed(2)} Cr` :
  n >= 1e5 ? `₹${(n/1e5).toFixed(2)} L`  :
  `₹${Math.round(n).toLocaleString('en-IN')}`

const calcEMI = (P, annRate, years) => {
  const r = annRate / (12 * 100), n = years * 12
  if (r === 0) return { emi: Math.round(P/n), total: Math.round(P), interest: 0 }
  const emi = (P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1)
  return { emi: Math.round(emi), total: Math.round(emi*n), interest: Math.round(emi*n - P) }
}

/* ══════════════════════════════════════════════
   CUSTOM SLIDER
══════════════════════════════════════════════ */
function Slider({ label, min, max, step, value, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100
  const thumbRef = useRef(null)

  const handleChange = v => {
    onChange(v)
    if (thumbRef.current)
      gsap.fromTo(thumbRef.current, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div className="mb-5 select-none">
      <div className="flex justify-between items-center mb-2.5">
        <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ background: '#EEF4FF', color: C.blue, fontSize: 12, fontWeight: 800, padding: '3px 13px', borderRadius: 20, border: `1px solid ${C.blue}22` }}>
          {format(value)}
        </span>
      </div>
      <div className="relative h-2 rounded-full flex items-center" style={{ background: '#E8EEFF' }}>
        <div className="absolute left-0 top-0 h-full rounded-full"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${C.blueDark}, ${C.blue})`, boxShadow: `0 0 12px ${C.blue}45`, transition: 'width 0.05s' }} />
        <div ref={thumbRef} className="absolute w-5 h-5 rounded-full bg-white pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)`, border: `2.5px solid ${C.blue}`, boxShadow: `0 2px 12px ${C.blue}55, 0 0 0 4px ${C.blue}15`, transition: 'left 0.05s' }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => handleChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-10" />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   FLOATING BADGE
══════════════════════════════════════════════ */
function FloatBadge({ style: s = {}, icon: Icon, title, sub, color, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { scale: 0, opacity: 0, y: 16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(2)', delay }
    )
    gsap.to(ref.current, { y: -8, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: delay + 0.9 })
  }, [delay])

  return (
    <div ref={ref} style={{
      position: 'absolute',
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: '10px 14px',
      zIndex: 30,                          /* z-index raised */
      boxShadow: `0 8px 32px rgba(0,0,0,0.10), 0 2px 8px ${color}22`,
      ...s
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${color}16`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Icon size={17} style={{ color }} strokeWidth={2.5} />
      </div>
      <div>
        <div style={{ color: C.text, fontSize: 12, fontWeight: 800 }}>{title}</div>
        <div style={{ color: C.muted, fontSize: 10, fontWeight: 500, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════ */
export default function Hero() {
  const heroRef = useRef(null)
  const cardRef = useRef(null)

  const [amount, setAmount] = useState(1000000)
  const [rate,   setRate]   = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const { emi, total, interest } = calcEMI(amount, rate, tenure)

  /* ── GSAP Master Entrance Timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.h-chip','.h-line1','.h-line2','.h-line3','.h-sub','.h-cta','.h-badge','.h-trust','.h-rcard','.h-ecalc'], { opacity: 0 })
      gsap.set(['.h-line1','.h-line2','.h-line3'], { y: 70 })
      gsap.set(['.h-chip','.h-cta'], { y: -20 })
      gsap.set(['.h-sub','.h-badge','.h-trust'], { y: 28 })
      gsap.set('.h-rcard', { x: 90, rotateY: -22 })
      gsap.set('.h-ecalc', { x: 90, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.25 })
      tl.to('.h-chip',  { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(2)' })
        .to('.h-line1', { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, '-=0.35')
        .to('.h-line2', { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, '-=0.65')
        .to('.h-line3', { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, '-=0.65')
        .to('.h-sub',   { y: 0, opacity: 1, duration: 0.8,  ease: 'power3.out' }, '-=0.5')
        .to('.h-cta',   { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(2)', scale: 1 }, '-=0.45')
        .to('.h-badge', { y: 0, opacity: 1, duration: 0.6,  ease: 'power3.out', stagger: 0.08 }, '-=0.35')
        .to('.h-trust', { y: 0, opacity: 1, duration: 0.5,  ease: 'power3.out', stagger: 0.1  }, '-=0.2')
        .to('.h-rcard', { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' }, 0.35)
        .to('.h-ecalc', { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.65)

      gsap.to('.scan-sweep', { left: '120%', duration: 2.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 3.8, delay: 1.8 })

      const bar = document.getElementById('_hero_scrollbar')
      const onScroll = () => {
        if (!bar) return
        const pct = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
        gsap.to(bar, { scaleX: pct, duration: 0.15, ease: 'none', overwrite: true })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* ── 3D Magnetic Card Tilt ── */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = e => {
      const { left, top, width, height } = card.getBoundingClientRect()
      const dx = (e.clientX - left - width  / 2) / (width  / 2)
      const dy = (e.clientY - top  - height / 2) / (height / 2)
      gsap.to(card, { rotateY: dx * 11, rotateX: -dy * 7.5, transformPerspective: 1100, duration: 0.55, ease: 'power2.out', overwrite: true })
    }
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.55)', overwrite: true })
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  const loanTypes = [
    { icon: Home,          label: 'Home Loan',      color: C.blue    },
    { icon: Briefcase,     label: 'Business Loan',  color: C.green   },
    { icon: Car,           label: 'Car Loan',        color: '#8B5CF6' },
    { icon: GraduationCap, label: 'Education Loan', color: '#06B6D4' },
  ]

  return (
    <section ref={heroRef} id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
      style={{ background: `linear-gradient(150deg, #EEF4FF 0%, #F8FAFF 50%, #EDFFF8 100%)` }}>

      {/* Scroll progress */}
      <div id="_hero_scrollbar" className="fixed top-0 left-0 h-[3px] w-full origin-left z-[999]"
        style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.green})`, transform: 'scaleX(0)' }} />

      {/* Three.js canvas */}
      <ThreeCanvas />

      {/* Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${C.blue}09 1px, transparent 1px), linear-gradient(90deg, ${C.blue}09 1px, transparent 1px)`, backgroundSize: '56px 56px' }} />

      {/* Glows */}
      <div className="absolute pointer-events-none z-0"
        style={{ top: -100, left: -80, width: 650, height: 650, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.blue}1A 0%, transparent 68%)` }} />
      <div className="absolute pointer-events-none z-0"
        style={{ bottom: -80, right: -60, width: 550, height: 550, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.green}12 0%, transparent 68%)` }} />

      {/* Content */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ════ LEFT ════ */}
          <div className="lg:col-span-6">

            <div className="h-chip inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.92)', border: `1px solid ${C.blue}28`,
                backdropFilter: 'blur(20px)', boxShadow: `0 4px 24px ${C.blue}14` }}>
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse flex-shrink-0" />
              <span style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>India's #1 Zero Commission Loan Platform</span>
            </div>

            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(2.5rem,4.8vw,4.6rem)',
              fontWeight: 900, lineHeight: 1.06, color: C.text, margin: '0 0 20px' }}>
              <div className="h-line1">Your Goals.</div>
              <div className="h-line2">Our Funding.</div>
              <div className="h-line3">
                <span style={{
                  background: `linear-gradient(110deg, ${C.blue} 0%, #38BDF8 42%, ${C.green} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Zero Commission.</span>
              </div>
            </h1>

            <p className="h-sub" style={{ color: C.muted, fontSize: 15.5, lineHeight: 1.78, maxWidth: 430, margin: '0 0 28px', fontWeight: 450 }}>
              Apply online in 5 minutes — zero broker fees, instant verification,
              competitive interest rates across all loan categories.
            </p>

            <div className="h-cta flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white text-sm font-bold"
                style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  boxShadow: `0 6px 28px ${C.blue}45`, textDecoration: 'none', transition: 'all 0.25s' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { y: -3, scale: 1.04, boxShadow: `0 12px 36px ${C.blue}55`, duration: 0.3, ease: 'back.out(2)' })}
                onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: `0 6px 28px ${C.blue}45`, duration: 0.35, ease: 'back.out(2)' })}>
                Apply For Loan <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="px-8 py-4 rounded-2xl text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.92)', border: `1.5px solid ${C.border}`,
                  color: C.text, backdropFilter: 'blur(14px)', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)', transition: 'all 0.25s' }}
                onMouseEnter={e => gsap.to(e.currentTarget, { y: -3, scale: 1.02, duration: 0.3, ease: 'back.out(2)' })}
                onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'back.out(2)' })}>
                How It Works
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {loanTypes.map(({ icon: Icon, label, color }) => (
                <div key={label} className="h-badge flex items-center gap-3.5 rounded-2xl p-3.5 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.88)', border: `1px solid ${C.border}`,
                    backdropFilter: 'blur(14px)', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', transition: 'all 0.25s' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${color}50`
                    e.currentTarget.style.background = `${color}09`
                    gsap.to(e.currentTarget, { y: -4, scale: 1.025, boxShadow: `0 8px 24px ${color}20`, duration: 0.3, ease: 'power2.out' })
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border
                    e.currentTarget.style.background = 'rgba(255,255,255,0.88)'
                    gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: '0 2px 12px rgba(0,0,0,0.03)', duration: 0.3, ease: 'power2.out' })
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}16`, border: `1px solid ${color}30`, color }}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <span style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, text: '100% Secure',     color: C.green    },
                { icon: Clock,       text: '24hr Approval',   color: C.blue     },
                { icon: Zap,         text: 'Instant Process', color: C.blueDark },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="h-trust flex items-center gap-2" style={{ color: C.muted, fontSize: 12, fontWeight: 700 }}>
                  <Icon size={14} style={{ color }} strokeWidth={2.5} /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="lg:col-span-6 flex flex-col gap-5">

            {/* ─────────────────────────────────────────────
                DASHBOARD CARD WRAPPER
                overflow: visible  →  badges never get clipped
                The scan/corner-glow stay inside the inner div
            ───────────────────────────────────────────── */}
            <div className="h-rcard relative"
              style={{
                /* Extra padding so the overflowing badges (top-right, bottom-left)
                   have room and don't push layout. Adjust as needed.            */
                paddingTop: 24,
                paddingBottom: 28,
                paddingLeft: 24,
                paddingRight: 24,
                /* preserve-3d needed for GSAP magnetic tilt */
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}>

              {/* ── Actual visible card (overflow:hidden stays here for scan sweep) ── */}
              <div ref={cardRef}
                className="relative rounded-3xl p-6 sm:p-7 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.97)',
                  backdropFilter: 'blur(28px)',
                  border: `1px solid ${C.border}`,
                  boxShadow: `0 32px 64px -12px ${C.blue}12, 0 8px 28px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`,
                }}>

                {/* Holographic shimmer */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: `linear-gradient(105deg, transparent 30%, ${C.blue}06 38%, ${C.green}05 46%, #38BDF808 52%, transparent 60%)`,
                    backgroundSize: '300% 300%',
                    animation: 'holoShift 6s ease-in-out infinite',
                    mixBlendMode: 'overlay',
                    zIndex: 1,
                  }} />

                {/* Scan shimmer */}
                <div className="scan-sweep absolute top-0 bottom-0 pointer-events-none z-10"
                  style={{ left: '-55%', width: '48%', background: `linear-gradient(90deg, transparent, ${C.blue}14, transparent)` }} />

                {/* Corner glow */}
                <div className="absolute pointer-events-none"
                  style={{ top: -50, right: -50, width: 180, height: 180, borderRadius: '50%',
                    background: `radial-gradient(circle, ${C.blue}16 0%, transparent 70%)` }} />

                {/* Header */}
                <div className="flex justify-between items-start mb-6" style={{ position: 'relative', zIndex: 3 }}>
                  <div>
                    <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Live Terminal</div>
                    <div style={{ color: C.text, fontSize: 18, fontWeight: 900 }}>System Metrics</div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, boxShadow: `0 6px 20px ${C.blue}40` }}>
                    <TrendingUp size={20} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Metric tiles */}
                <div className="grid grid-cols-3 gap-3 mb-6" style={{ position: 'relative', zIndex: 3 }}>
                  {[
                    { val: '₹0',   label: 'Commission', color: C.blue,    bg: '#EEF4FF', br: `${C.blue}25`  },
                    { val: '10K+', label: 'Clients',    color: C.green,   bg: '#EDFFF5', br: `${C.green}25` },
                    { val: '24H',  label: 'Approval',   color: '#8B5CF6', bg: '#F3EEFF', br: '#8B5CF625'    },
                  ].map(({ val, label, color, bg, br }) => (
                    <div key={label} className="text-center rounded-2xl py-3.5 px-1 border"
                      style={{ background: bg, borderColor: br, transition: 'transform 0.3s' }}
                      onMouseEnter={e => gsap.to(e.currentTarget, { y: -3, scale: 1.05, duration: 0.3, ease: 'back.out(2)' })}
                      onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'back.out(2)' })}>
                      <div style={{ fontSize: 20, fontWeight: 900, color, marginBottom: 3, filter: `drop-shadow(0 0 8px ${color}55)` }}>{val}</div>
                      <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-4" style={{ position: 'relative', zIndex: 3 }}>
                  {[
                    { label: 'Processing Speed',    val: 98,  color: C.blue    },
                    { label: 'Client Satisfaction', val: 99,  color: C.green   },
                    { label: 'Approval Rate',        val: 100, color: '#8B5CF6' },
                  ].map(({ label, val, color }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5" style={{ fontSize: 11, fontWeight: 700 }}>
                        <span style={{ color: C.muted }}>{label}</span>
                        <span style={{ color: C.text }}>{val}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: '#EEF2FF' }}>
                        <div className="h-full rounded-full"
                          style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}cc, ${color})`,
                            boxShadow: `0 0 12px ${color}55`, animation: 'growBar 1.6s cubic-bezier(0.22,1,0.36,1) both' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>{/* end inner card */}

              {/* ── Float badges — outside overflow:hidden, inside the wrapper ── */}
              <FloatBadge
                style={{ top: 0, right: 0 }}
                icon={CheckCircle2}
                title="Bank Grade Security"
                sub="100% Encrypted & Safe"
                color={C.green}
                delay={1.5}
              />
              <FloatBadge
                style={{ bottom: 0, left: 0 }}
                icon={Activity}
                title="Live Processing"
                sub="1,240 loans today"
                color={C.blue}
                delay={1.8}
              />
            </div>{/* end wrapper */}

            {/* EMI Calculator Card */}
            <div className="h-ecalc rounded-3xl p-6 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(28px)',
                border: `1px solid ${C.border}`,
                boxShadow: `0 24px 50px -10px ${C.green}10, 0 6px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)` }}>

              <div className="absolute pointer-events-none"
                style={{ bottom: -60, right: -60, width: 240, height: 240, borderRadius: '50%',
                  background: `radial-gradient(circle, ${C.green}18 0%, transparent 70%)` }} />
              <div className="absolute pointer-events-none"
                style={{ top: -40, left: -40, width: 160, height: 160, borderRadius: '50%',
                  background: `radial-gradient(circle, ${C.blue}0E 0%, transparent 70%)` }} />

              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${C.green}15`, border: `1px solid ${C.green}30` }}>
                  <span style={{ fontSize: 20 }}>🧮</span>
                </div>
                <span style={{ color: C.text, fontSize: 15, fontWeight: 900 }}>Interactive Rate Simulator</span>
                <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: `${C.green}16`, color: C.green, border: `1px solid ${C.green}30` }}>LIVE</span>
              </div>

              <Slider label="Loan Capital"         min={100000}  max={10000000} step={50000} value={amount} onChange={setAmount} format={fmtRs} />
              <Slider label="Interest Rate"        min={6}       max={20}       step={0.1}  value={rate}   onChange={setRate}   format={v => `${v.toFixed(1)}% APR`} />
              <Slider label="Amortization Horizon" min={1}       max={30}       step={1}    value={tenure} onChange={setTenure} format={v => `${v} Year${v > 1 ? 's' : ''}`} />

              <div className="flex gap-4 items-center mt-5 mb-4 p-4 rounded-2xl border"
                style={{ background: '#F7FAFF', borderColor: C.border }}>
                <RingChart principal={amount} interest={interest} />
                <div className="flex-1 flex flex-col gap-2">
                  {[
                    { label: 'Interest Pay',  val: fmtRs(interest), color: '#ef4444', bg: '#FFF5F5', br: '#ef444420' },
                    { label: 'Total Payable', val: fmtRs(total),    color: C.text,    bg: '#F0F5FF', br: C.border    },
                  ].map(({ label, val, color, bg, br }) => (
                    <div key={label} className="flex justify-between items-center px-3.5 py-2.5 rounded-xl"
                      style={{ background: bg, border: `1px solid ${br}` }}>
                      <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                      <span style={{ color, fontSize: 13, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-4 flex justify-between items-center"
                style={{ background: `linear-gradient(135deg, #0B132B 0%, #1C2541 100%)`,
                  boxShadow: '0 8px 32px rgba(11,20,55,0.22)' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 9, fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>Monthly Instalment</div>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                    ₹<AnimNum value={emi} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 400, marginLeft: 3 }}>/mo</span>
                  </div>
                </div>
                <a href="#contact" className="text-white text-sm font-bold px-5 py-2.5 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                    boxShadow: `0 4px 18px ${C.blue}55`, textDecoration: 'none' }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.07, y: -2, duration: 0.3, ease: 'back.out(2)' })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.35, ease: 'back.out(2)' })}>
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes growBar { from { width: 0% } }
        @keyframes holoShift {
          0%,100% { background-position: 0% 0%; opacity: 0.6; }
          50%      { background-position: 100% 100%; opacity: 1; }
        }
      `}</style>
    </section>
  )
}