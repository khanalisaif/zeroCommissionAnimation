import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * Ultra-Premium Finance & FinTech 3D Background
 * Elements: Gold Dollar Coins · Rising Bar Charts · Tech Orbital Rings
 *           Currency Spheres · Data Flow Particles · Plexus Network
 * Engine: Three.js (WebGL) + GSAP (all animations)
 */
export default function AnimatedBG({ variant = 'blue' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Scene ──────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.Fog(0xF7F9FC, 200, 750)

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.5, 900)
    camera.position.set(0, 15, 240)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Studio Lighting ────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))

    const sunLight = new THREE.DirectionalLight(0xffffff, 4)
    sunLight.position.set(120, 260, 180)
    scene.add(sunLight)

    const blueSpot = new THREE.PointLight(0x0057FF, 10, 500)
    blueSpot.position.set(-100, 100, 80)
    scene.add(blueSpot)

    const greenSpot = new THREE.PointLight(0x00C853, 8, 450)
    greenSpot.position.set(100, -100, 100)
    scene.add(greenSpot)

    const goldSpot = new THREE.PointLight(0xFFD700, 6, 300)
    goldSpot.position.set(0, 0, 50)
    scene.add(goldSpot)

    // ── Materials ─────────────────────────────────────────────
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xFFD060, metalness: 1.0, roughness: 0.06
    })
    const goldDarkMat = new THREE.MeshStandardMaterial({
      color: 0xB8900A, metalness: 1.0, roughness: 0.12
    })
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xCCDDEE, metalness: 1.0, roughness: 0.08
    })
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0057FF, metalness: 0.85, roughness: 0.18
    })
    const blueDarkMat = new THREE.MeshStandardMaterial({
      color: 0x0038A8, metalness: 0.9, roughness: 0.15
    })
    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x00C853, metalness: 0.8, roughness: 0.2
    })
    const techWireMat = new THREE.MeshStandardMaterial({
      color: 0x0057FF, metalness: 0.95, roughness: 0.05, wireframe: true
    })
    const glowMat = new THREE.MeshPhysicalMaterial({
      color: 0x00C853, transmission: 0.8, thickness: 2,
      roughness: 0.05, ior: 1.5, transparent: true, metalness: 0
    })

    // ── World Group ───────────────────────────────────────────
    const world   = new THREE.Group()
    scene.add(world)

    const objects = [] // { mesh, type, y0, extras }

    function register(mesh, type, extras = {}) {
      mesh.scale.setScalar(0)
      world.add(mesh)
      objects.push({ mesh, type, y0: mesh.position.y, ...extras })
      return mesh
    }

    // ──────────────────────────────────────────────────────────
    // 1. PREMIUM DOLLAR COINS
    // ──────────────────────────────────────────────────────────
    const coinBodyGeo = new THREE.CylinderGeometry(11, 11, 2.4, 72)
    const coinRimGeo  = new THREE.TorusGeometry(11, 0.9, 16, 72)

    // Canvas face with engraved $ + radial detail
    function makeFaceTex(bg, symbol, symbolColor) {
      const c = document.createElement('canvas')
      c.width = c.height = 512
      const ctx = c.getContext('2d')

      // Background fill
      const bgGrad = ctx.createRadialGradient(256,256,0, 256,256,256)
      bgGrad.addColorStop(0,   bg)
      bgGrad.addColorStop(0.7, bg)
      bgGrad.addColorStop(1,   'rgba(0,0,0,0.3)')
      ctx.fillStyle = bgGrad
      ctx.beginPath(); ctx.arc(256,256,256,0,Math.PI*2); ctx.fill()

      // Concentric detail ring
      ctx.strokeStyle = 'rgba(0,0,0,0.15)'
      ctx.lineWidth = 3
      ctx.beginPath(); ctx.arc(256,256,200,0,Math.PI*2); ctx.stroke()
      ctx.beginPath(); ctx.arc(256,256,240,0,Math.PI*2); ctx.stroke()

      // Radial tick marks
      ctx.lineWidth = 1.5
      for (let i = 0; i < 48; i++) {
        const a = (i / 48) * Math.PI * 2
        const r1 = i % 4 === 0 ? 195 : 205
        ctx.beginPath()
        ctx.moveTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1)
        ctx.lineTo(256 + Math.cos(a) * 240, 256 + Math.sin(a) * 240)
        ctx.stroke()
      }

      // Symbol
      ctx.fillStyle = symbolColor
      ctx.font = 'bold 200px Georgia, serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(symbol, 256, 270)

      return new THREE.CanvasTexture(c)
    }

    const goldFaceTex   = makeFaceTex('#D4920A', '$', 'rgba(0,0,0,0.35)')
    const silverFaceTex = makeFaceTex('#8AAABB', '$', 'rgba(255,255,255,0.4)')

    function spawnCoin(isGold, x, y, z) {
      const grp     = new THREE.Group()
      const faceMat = new THREE.MeshStandardMaterial({
        map: isGold ? goldFaceTex : silverFaceTex,
        metalness: 0.95, roughness: 0.08
      })
      const body = new THREE.Mesh(coinBodyGeo, [
        isGold ? goldMat : silverMat,
        faceMat, faceMat
      ])
      grp.add(body)

      const rim = new THREE.Mesh(coinRimGeo, isGold ? goldDarkMat : silverMat)
      rim.rotation.x = Math.PI / 2
      grp.add(rim)

      grp.position.set(x, y, z)
      grp.rotation.set(
        (Math.random() - 0.5) * 1.2,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.8
      )
      register(grp, 'coin', {
        spinY: (Math.random() > 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.025),
        spinX: (Math.random() - 0.5) * 0.008
      })
    }

    // 12 coins — gold & silver mix
    const coinLayout = [
      [-140,  65, -80, true ], [ 110,  60, -70, false],
      [ -55, -85, -55, true ], [  85, -65,-105, false],
      [-105, -45,-115, true ], [  35,  90, -95, false],
      [ 160, -35,-130, true ], [ -75,  40, -40, false],
      [  65,-110, -75, true ], [-155, -75,-100, false],
      [  -5,  70, -60, true ], [ 130,  85,-125, false],
    ]
    coinLayout.forEach(([x,y,z,gold]) => spawnCoin(gold, x, y, z))

    // ──────────────────────────────────────────────────────────
    // 2. FINANCIAL BAR CHARTS (rising data bars)
    // ──────────────────────────────────────────────────────────
    const barSetGroup = new THREE.Group()
    world.add(barSetGroup)

    const barHeights  = [14, 22, 17, 28, 20, 32, 25]
    const barColors   = [blueMat, greenMat, blueDarkMat, greenMat, blueMat, greenMat, blueDarkMat]
    const barObjects  = []

    barHeights.forEach((h, i) => {
      const geo = new THREE.BoxGeometry(7, h, 7)
      const bar = new THREE.Mesh(geo, barColors[i])
      bar.position.set(-120 + i * 17, -90 + h / 2, -140)
      bar.scale.set(1, 0, 1) // start collapsed — GSAP grows them
      barSetGroup.add(bar)
      barObjects.push({ bar, idx: i, h })
    })

    // Platform base for chart
    const baseMesh = new THREE.Mesh(
      new THREE.BoxGeometry(130, 2, 14),
      new THREE.MeshStandardMaterial({ color: 0xE5EAF2, metalness: 0.3, roughness: 0.6 })
    )
    baseMesh.position.set(-3, -91, -140)
    world.add(baseMesh)

    // GSAP: bars rise up staggered
    barObjects.forEach(({ bar, idx, h }) => {
      gsap.to(bar.scale, {
        y: 1,
        duration: 1.2, delay: 0.5 + idx * 0.12,
        ease: 'power3.out'
      })
      // Continuous pulse
      gsap.to(bar.scale, {
        y: 1 + Math.random() * 0.4,
        duration: 2 + Math.random() * 2,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: 2 + idx * 0.2
      })
    })

    // ──────────────────────────────────────────────────────────
    // 3. TECH ORBITAL RINGS (FinTech identity)
    // ──────────────────────────────────────────────────────────
    const ringGroup = new THREE.Group()
    ringGroup.position.set(130, 20, -100)
    world.add(ringGroup)

    const ringConfigs = [
      { r: 30, thick: 0.6, mat: blueMat,     speedX: 0.008,  speedY: 0.005, tilt: 0.3  },
      { r: 42, thick: 0.5, mat: greenMat,    speedX: -0.006, speedY: 0.008, tilt: -0.5 },
      { r: 55, thick: 0.4, mat: blueDarkMat, speedX: 0.005,  speedY: -0.007,tilt: 0.8  },
    ]
    ringConfigs.forEach(({ r, thick, mat, speedX, speedY, tilt }) => {
      const geo  = new THREE.TorusGeometry(r, thick, 16, 80)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tilt
      mesh.userData   = { speedX, speedY }
      ringGroup.add(mesh)
    })

    // Center sphere
    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(8, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x0057FF, metalness: 0.9, roughness: 0.05 })
    )
    ringGroup.add(coreSphere)
    ringGroup.scale.setScalar(0)
    gsap.to(ringGroup.scale, { x: 1, y: 1, z: 1, duration: 1.5, delay: 0.8, ease: 'elastic.out(1, 0.5)' })

    // ──────────────────────────────────────────────────────────
    // 4. CURRENCY SYMBOL SPHERES (₹ $ € glow orbs)
    // ──────────────────────────────────────────────────────────
    function makeCurrencyOrb(symbol, bgColor, x, y, z) {
      const c = document.createElement('canvas')
      c.width = c.height = 256
      const ctx = c.getContext('2d')
      const g = ctx.createRadialGradient(128,128,0, 128,128,128)
      g.addColorStop(0,   bgColor)
      g.addColorStop(0.7, bgColor)
      g.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(128,128,128,0,Math.PI*2); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = 'bold 130px Arial'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(symbol, 128, 140)
      const tex = new THREE.CanvasTexture(c)
      const mat = new THREE.MeshPhysicalMaterial({
        map: tex, transmission: 0.6, thickness: 1.5,
        roughness: 0.08, ior: 1.4, transparent: true, metalness: 0.1
      })
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), mat)
      mesh.position.set(x, y, z)
      register(mesh, 'orb')
      return mesh
    }

    makeCurrencyOrb('₹', 'rgba(0,87,255,0.85)',   -160, -20, -60)
    makeCurrencyOrb('$', 'rgba(255,200,0,0.85)',    -30, -50, -40)
    makeCurrencyOrb('€', 'rgba(0,200,83,0.85)',      80,  50, -55)
    makeCurrencyOrb('%', 'rgba(0,56,168,0.85)',      40, -80, -85)

    // ──────────────────────────────────────────────────────────
    // 5. PLEXUS TECH NODES (FinTech network)
    // ──────────────────────────────────────────────────────────
    const nodePositions = [
      [-130, 55,-120], [-70,-75,-135], [ 0, 85,-150],
      [ 75,-55,-125],  [145, 35,-120], [-45,115,-160],
      [ 20,-30,-110],  [-90, 10,-100],
    ]
    const nodeGeo = new THREE.IcosahedronGeometry(5, 1)
    nodePositions.forEach(([x,y,z]) => {
      const mesh = new THREE.Mesh(nodeGeo, techWireMat)
      mesh.position.set(x, y, z)
      register(mesh, 'node')
    })

    // Lines connecting near nodes
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0057FF, transparent: true, opacity: 0.18 })
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const [x1,y1,z1] = nodePositions[i], [x2,y2,z2] = nodePositions[j]
        if (Math.hypot(x2-x1,y2-y1,z2-z1) < 190) {
          const lg = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x1,y1,z1), new THREE.Vector3(x2,y2,z2)
          ])
          world.add(new THREE.Line(lg, lineMat))
        }
      }
    }

    // ──────────────────────────────────────────────────────────
    // 6. DATA STREAM PARTICLES
    // ──────────────────────────────────────────────────────────
    const pCount = 280
    const pGeo   = new THREE.BufferGeometry()
    const pPos   = new Float32Array(pCount * 3)
    const pVel   = new Float32Array(pCount)
    for (let i = 0; i < pCount; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 600
      pPos[i*3+1] = (Math.random() - 0.5) * 600
      pPos[i*3+2] = (Math.random() - 0.5) * 350 - 80
      pVel[i]     = 0.4 + Math.random() * 0.7
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))

    const ptc = document.createElement('canvas')
    ptc.width = ptc.height = 32
    const ptx = ptc.getContext('2d')
    const ptg = ptx.createRadialGradient(16,16,0,16,16,16)
    ptg.addColorStop(0,   'rgba(0,87,255,1)')
    ptg.addColorStop(0.4, 'rgba(0,200,83,0.5)')
    ptg.addColorStop(1,   'rgba(0,0,0,0)')
    ptx.fillStyle = ptg; ptx.fillRect(0,0,32,32)
    const ptTex = new THREE.CanvasTexture(ptc)

    const pMat = new THREE.PointsMaterial({
      size: 3.5, map: ptTex, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    scene.add(new THREE.Points(pGeo, pMat))

    // ──────────────────────────────────────────────────────────
    // GSAP: Entrance animations
    // ──────────────────────────────────────────────────────────
    objects.forEach(({ mesh }, i) => {
      const s = 0.65 + Math.random() * 0.55
      gsap.to(mesh.scale, {
        x: s, y: s, z: s,
        duration: 1.3, delay: 0.08 + i * 0.07,
        ease: 'elastic.out(1, 0.5)'
      })
    })

    // GSAP: Float loops
    objects.forEach(({ mesh, y0 }) => {
      const amp = 10 + Math.random() * 18
      gsap.to(mesh.position, {
        y: y0 + amp,
        duration: 3.5 + Math.random() * 3,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 4
      })
    })

    // GSAP: Light pulse for drama
    gsap.to(blueSpot,  { intensity: 16, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to(greenSpot, { intensity: 14, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 })
    gsap.to(goldSpot,  { intensity: 10, duration: 2.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 })

    // ──────────────────────────────────────────────────────────
    // Mouse Parallax
    // ──────────────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 }
    const camTgt = { x: 0, y: 15 }

    const onMove = (e) => {
      const r = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width  - 0.5) * 65
      mouse.y = ((e.clientY - r.top)  / r.height - 0.5) * -45
    }
    window.addEventListener('pointermove', onMove)

    // ──────────────────────────────────────────────────────────
    // RAF Loop
    // ──────────────────────────────────────────────────────────
    let raf, t = 0, visible = true
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    obs.observe(mount)

    function animate() {
      raf = requestAnimationFrame(animate)
      if (!visible) return
      t += 0.016

      // Camera parallax
      camTgt.x += (mouse.x - camTgt.x) * 0.035
      camTgt.y += (mouse.y - camTgt.y) * 0.035
      camera.position.x = camTgt.x
      camera.position.y = camTgt.y
      camera.lookAt(0, 0, 0)

      // Orbiting lights — makes metals shimmer
      blueSpot.position.x  =  Math.sin(t * 0.5) * 200
      blueSpot.position.z  =  Math.cos(t * 0.4) * 120 + 60
      greenSpot.position.x =  Math.cos(t * 0.45) * 180
      greenSpot.position.z =  Math.sin(t * 0.5) * 120 + 60
      goldSpot.position.x  =  Math.sin(t * 0.7) * 100
      goldSpot.position.y  =  Math.cos(t * 0.6) * 80

      // Per-object logic
      objects.forEach(({ mesh, type, spinY, spinX }) => {
        if (type === 'coin') {
          mesh.rotation.y += spinY || 0.018
          mesh.rotation.x += spinX || 0
        } else if (type === 'node') {
          mesh.rotation.x += 0.012
          mesh.rotation.y += 0.018
        } else if (type === 'orb') {
          mesh.rotation.y += 0.007
        }
      })

      // Orbital rings spin
      ringGroup.children.forEach(child => {
        if (child.userData.speedX) {
          child.rotation.x += child.userData.speedX
          child.rotation.y += child.userData.speedY
        }
      })
      ringGroup.rotation.y = Math.sin(t * 0.18) * 0.3

      // Whole world breathes
      world.rotation.y = Math.sin(t * 0.09) * 0.14
      world.rotation.x = Math.cos(t * 0.08) * 0.06

      // Particles drift upward (data streams)
      const pa = pGeo.attributes.position.array
      for (let i = 0; i < pCount; i++) {
        pa[i*3+1] += pVel[i]
        if (pa[i*3+1] > 300) pa[i*3+1] = -300
      }
      pGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      gsap.killTweensOf([
        ...objects.map(o => o.mesh.scale),
        ...objects.map(o => o.mesh.position),
        ...barObjects.map(o => o.bar.scale),
        ringGroup.scale, blueSpot, greenSpot, goldSpot
      ])
      obs.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      ;[coinBodyGeo, coinRimGeo, nodeGeo, pGeo].forEach(g => g.dispose())
      ;[goldMat, goldDarkMat, silverMat, blueMat, blueDarkMat, greenMat, techWireMat, glowMat, pMat, lineMat].forEach(m => m.dispose())
      ;[goldFaceTex, silverFaceTex, ptTex].forEach(t => t.dispose())
    }
  }, [variant])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
