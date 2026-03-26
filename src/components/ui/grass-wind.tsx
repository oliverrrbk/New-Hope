"use client"

import { useEffect, useRef } from "react"

interface GrassBladeProps {
  x: number
  height: number
  width: number
  delay: number
  windStrength: number
  baseColor: string
  midColor: string
  tipColor: string
}

interface WindParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

interface WindyGrassProps {
  className?: string
  grassColor?: string
  windLineColor?: string
  particleColor?: string
  backgroundColor?: string
  grassDensity?: number
  windStrength?: number
  showWindLines?: boolean
  showParticles?: boolean
}

export function GrassWind({
  className = "",
  grassColor = "hsl(180, 70%, 45%)",
  windLineColor = "hsl(190, 80%, 60%)",
  particleColor = "hsl(200, 90%, 70%)",
  backgroundColor = "transparent",
  grassDensity = 3,
  windStrength = 0.7,
  showWindLines = true,
  showParticles = true,
}: WindyGrassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const grassBladesRef = useRef<GrassBladeProps[]>([])
  const windParticlesRef = useRef<WindParticle[]>([])
  const windLinesRef = useRef<Array<{ x: number; y: number; length: number; speed: number }>>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = 120 * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = "120px"
      ctx.scale(pixelRatio, pixelRatio)
      initGrass()
      initWindElements()
    }

    const initGrass = () => {
      grassBladesRef.current = []
      const bladeCount = Math.floor(window.innerWidth / grassDensity)
      
      // Tall grass blades
      for (let i = 0; i < bladeCount; i++) {
        const greenVariation = Math.random()
        let baseColor, midColor, tipColor
        
        if (greenVariation < 0.2) {
          // Darker
          baseColor = `hsl(85, 40%, 25%)`
          midColor = `hsl(80, 38%, 30%)`
          tipColor = `hsl(75, 35%, 35%)`
        } else if (greenVariation < 0.4) {
          // Medium dark
          baseColor = `hsl(90, 35%, 32%)`
          midColor = `hsl(85, 32%, 38%)`
          tipColor = `hsl(80, 30%, 42%)`
        } else if (greenVariation < 0.6) {
          // Medium
          baseColor = `hsl(85, 32%, 38%)`
          midColor = `hsl(80, 30%, 43%)`
          tipColor = `hsl(78, 32%, 48%)`
        } else if (greenVariation < 0.8) {
          // Medium light
          baseColor = `hsl(80, 35%, 42%)`
          midColor = `hsl(78, 33%, 48%)`
          tipColor = `hsl(75, 35%, 52%)`
        } else {
          // Lighter
          baseColor = `hsl(75, 38%, 48%)`
          midColor = `hsl(72, 36%, 52%)`
          tipColor = `hsl(70, 38%, 58%)`
        }
        
        grassBladesRef.current.push({
          x: (i * window.innerWidth) / bladeCount + Math.random() * grassDensity,
          height: 40 + Math.random() * 40,
          width: 2 + Math.random() * 2,
          delay: Math.random() * Math.PI * 2,
          windStrength: 0.5 + Math.random() * 0.5,
          baseColor,
          midColor,
          tipColor,
        })
      }
      
      // Short grass for ground cover
      const shortBladeCount = bladeCount * 2
      for (let i = 0; i < shortBladeCount; i++) {
        const greenVariation = Math.random()
        let baseColor, midColor, tipColor
        
        if (greenVariation < 0.2) {
          // Darker
          baseColor = `hsl(85, 40%, 25%)`
          midColor = `hsl(80, 38%, 30%)`
          tipColor = `hsl(75, 35%, 35%)`
        } else if (greenVariation < 0.4) {
          // Medium dark
          baseColor = `hsl(90, 35%, 32%)`
          midColor = `hsl(85, 32%, 38%)`
          tipColor = `hsl(80, 30%, 42%)`
        } else if (greenVariation < 0.6) {
          // Medium
          baseColor = `hsl(85, 32%, 38%)`
          midColor = `hsl(80, 30%, 43%)`
          tipColor = `hsl(78, 32%, 48%)`
        } else if (greenVariation < 0.8) {
          // Medium light
          baseColor = `hsl(80, 35%, 42%)`
          midColor = `hsl(78, 33%, 48%)`
          tipColor = `hsl(75, 35%, 52%)`
        } else {
          // Lighter
          baseColor = `hsl(75, 38%, 48%)`
          midColor = `hsl(72, 36%, 52%)`
          tipColor = `hsl(70, 38%, 58%)`
        }
        
        grassBladesRef.current.push({
          x: Math.random() * window.innerWidth,
          height: 15 + Math.random() * 20,
          width: 1.5 + Math.random() * 1.5,
          delay: Math.random() * Math.PI * 2,
          windStrength: 0.1 + Math.random() * 0.2,
          baseColor,
          midColor,
          tipColor,
        })
      }
    }

    const initWindElements = () => {
      windLinesRef.current = []
      windParticlesRef.current = []
      
      for (let i = 0; i < 5; i++) {
        windLinesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * 100,
          length: 20 + Math.random() * 30,
          speed: 0.7 + Math.random() * 1.0,
        })
      }
    }

    const createWindParticle = () => {
      if (Math.random() < 0.08 && windParticlesRef.current.length < 50) {
        windParticlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: 100 + Math.random() * 20,
          vx: 0.6 + Math.random() * 0.8,
          vy: -0.3 - Math.random() * 0.8,
          life: 0,
          maxLife: 150 + Math.random() * 150,
          size: 1 + Math.random() * 2,
        })
      }
    }

    const drawGrassBlade = (blade: GrassBladeProps, time: number) => {
      const baseWind = Math.sin(time * 0.0008 + blade.delay * 0.05) * 15
      const gustWind = Math.sin(time * 0.0012 + blade.delay * 0.05) * 8
      const windOffset = (baseWind + gustWind + 12) * windStrength * blade.windStrength
      const windOffset2 = Math.sin(time * 0.001 + blade.delay * 0.05 + 1) * 5 * windStrength * blade.windStrength
      
      ctx.save()
      ctx.translate(blade.x, 120)
      
      const gradient = ctx.createLinearGradient(0, 0, 0, -blade.height)
      gradient.addColorStop(0, blade.baseColor)
      gradient.addColorStop(0.5, blade.midColor)
      gradient.addColorStop(1, blade.tipColor)
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = blade.width
      ctx.lineCap = "round"
      
      ctx.beginPath()
      ctx.moveTo(0, 0)
      
      const segments = 5
      for (let i = 1; i <= segments; i++) {
        const t = i / segments
        const y = -blade.height * t
        const x = windOffset * t * t + windOffset2 * t * (1 - t) * 2
        
        if (i === segments) {
          ctx.lineTo(x, y)
        } else {
          const nextT = (i + 1) / segments
          const nextY = -blade.height * nextT
          const nextX = windOffset * nextT * nextT + windOffset2 * nextT * (1 - nextT) * 2
          
          const cpX = (x + nextX) / 2
          const cpY = (y + nextY) / 2
          
          ctx.quadraticCurveTo(x, y, cpX, cpY)
        }
      }
      
      ctx.stroke()
      ctx.restore()
    }

    const drawWindLines = (time: number) => {
      if (!showWindLines) return
      
      ctx.globalAlpha = 0.25
      
      // Calculate wind direction from grass animation
      const baseWind = Math.sin(time * 0.0008)
      const windMultiplier = Math.max(0.7, baseWind * 0.5 + 0.9)
      
      windLinesRef.current.forEach((line) => {
        line.x += line.speed * windMultiplier
        
        if (line.x > window.innerWidth + line.length) {
          line.x = -line.length
          line.y = Math.random() * 100
        }
        
        const gradient = ctx.createLinearGradient(line.x, line.y, line.x + line.length, line.y)
        gradient.addColorStop(0, `hsl(80, 28%, 45%)`)
        gradient.addColorStop(0.5, `hsl(85, 30%, 50%)`)
        gradient.addColorStop(1, `hsl(75, 25%, 42%)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        
        ctx.beginPath()
        
        // Draw curvy line with multiple segments
        const segments = 5
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments
          const x = line.x + line.length * progress
          const wave1 = Math.sin(time * 0.003 + x * 0.02 + line.y) * 3
          const wave2 = Math.sin(time * 0.005 + x * 0.015 + 2 + line.y) * 2
          const y = line.y + wave1 + wave2
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      })
      
      ctx.globalAlpha = 1
    }

    const drawWindParticles = () => {
      if (!showParticles) return
      
      // Calculate wind direction from grass animation
      const baseWind = Math.sin(timeRef.current * 0.0008)
      const windMultiplier = Math.max(0.7, baseWind * 0.5 + 0.9)
      
      windParticlesRef.current = windParticlesRef.current.filter((particle) => {
        particle.x += particle.vx * windMultiplier
        particle.y += particle.vy
        particle.life++
        
        if (particle.life > particle.maxLife || particle.x > window.innerWidth + 10) {
          return false
        }
        
        const alpha = 1 - particle.life / particle.maxLife
        ctx.fillStyle = `hsl(80, 25%, 45%)`
        ctx.globalAlpha = alpha * 0.5
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.globalAlpha = 1
        return true
      })
    }

    let isVisible = false;

    const animate = () => {
      if (!isVisible) return; // Pause rendering when out of view
      
      timeRef.current += 16
      
      ctx.clearRect(0, 0, window.innerWidth, 120)
      
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, window.innerWidth, 120)
      }
      
      drawWindLines(timeRef.current)
      
      createWindParticle()
      drawWindParticles()
      
      grassBladesRef.current.forEach((blade) => {
        drawGrassBlade(blade, timeRef.current)
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = 0;
          }
        }
      });
    }, { threshold: 0 });

    observer.observe(canvas);

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [grassColor, windLineColor, particleColor, backgroundColor, grassDensity, windStrength, showWindLines, showParticles])

  return (
    <div className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: "120px" }}
      />
    </div>
  )
}
