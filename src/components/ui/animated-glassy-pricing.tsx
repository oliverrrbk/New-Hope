import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RippleButton } from "./multi-type-ripple-buttons";
// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([1.0, 1.0, 1.0]);

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      const isDark = root.classList.contains('dark');
      setBackgroundColor(isDark ? [0, 0, 0] : [1.0, 1.0, 1.0]);
    };
    updateColor();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColor();
        }
      }
    });
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      
      float variation(vec2 v1, vec2 v2, float strength, float speed) { 
        float l1 = length(v1);
        if (l1 < 0.0001) return 0.0;
        return sin(dot(v1 / l1, normalize(v2)) * strength + iTime * speed) / 100.0; 
      }
      
      // Paint a filled, diffuse soft orb
      float paintDiffuseOrb(vec2 uv, vec2 center, float rad) {
        vec2 diff = center - uv;
        float len = length(diff);
        
        // Add subtle organic wobble to the edge
        len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
        len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
        
        // Using 1.0 - smoothstep for a very soft, blurry radial gradient
        return 1.0 - smoothstep(rad * 0.1, rad, len);
      }

      vec3 getThemeColor(float t) {
        float st = mod(t, 3.0);
        // Using the colors from the USP cards (#0284c7, #db2777, #4d7c0f)
        vec3 colBlue = vec3(2.0, 132.0, 199.0) / 255.0;
        vec3 colPink = vec3(219.0, 39.0, 119.0) / 255.0;
        vec3 colGreen = vec3(77.0, 124.0, 15.0) / 255.0;
        
        if (st < 1.0) return mix(colBlue, colPink, smoothstep(0.0, 1.0, st));
        if (st < 2.0) return mix(colPink, colGreen, smoothstep(0.0, 1.0, st - 1.0));
        return mix(colGreen, colBlue, smoothstep(0.0, 1.0, st - 2.0));
      }

      void main(){
        // Normalize UVs to [0, 1]
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        
        // Correct aspect ratio by making UVs square but maintaining the origin
        float aspect = iResolution.x / iResolution.y;
        vec2 st = uv;
        st.x = st.x * aspect - (aspect - 1.0) / 2.0;

        // Radius for the diffuse orb - made larger for a stronger background glow
        float radius = 0.50; 
        vec2 center = vec2(0.5);

        // Get the diffuse mask (0.0 to 1.0 depending on distance to center)
        float mask = paintDiffuseOrb(st, center, radius);

        // Modify time to be faster and start "further in" to the animation
        float timeObj = iTime + 50.0;

        // Apply rotation to the pattern inside the orb for animation (faster)
        vec2 v = rotate2d(timeObj * 0.4) * (st - center) + center;
        
        // Dynamic color based on time and position (faster)
        vec3 foregroundColor = getThemeColor(timeObj * 0.6 + v.x * 2.5 + v.y * 2.5);
        
        // Mix with background color using the soft mask
        vec3 color = mix(uBackgroundColor, foregroundColor, mask);
        
        gl_FragColor = vec4(color, 1.0);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');
    glBgColorLocationRef.current = gl.getUniformLocation(program, 'uBackgroundColor');
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId: number | null = null;
    let isVisible = false;

    const render = (time: number) => {
      if (!isVisible) return; // Prevent rendering if not visible

      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Keep it running
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          // Pause rendering
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0 });

    observer.observe(canvas);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full block z-0 bg-transparent opacity-[45%]" />;
};


// --- EXPORTED Building Blocks --- //

/**
 * We export the Props interface so you can easily type the data for your plans.
 */
export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  themeColor?: 'green' | 'pink' | 'blue';
}

/**
 * We export the PricingCard component itself in case you want to use it elsewhere.
 */
export const PricingCard = ({
  planName, description, price, priceSuffix, features, buttonText, isPopular = false, buttonVariant = 'primary', themeColor = 'blue'
}: PricingCardProps) => {
  const themeMap = {
    green: {
      bg: 'bg-bison-green',
      text: 'text-bison-green',
      glow: 'ring-[#b2d08d]/40 border-[#b2d08d]/50 shadow-[0_0_30px_-10px_rgba(178,208,141,0.4)]',
      badgeBg: 'bg-bison-green text-bison-dark'
    },
    pink: {
      bg: 'bg-bison-pink',
      text: 'text-[#d996cb]', // Lidt mørkere pink til tekst og ikoner i lys mode
      glow: '!border-0 ring-[3px] ring-white shadow-[0_0_40px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_60px_rgba(255,255,255,1)]', // Tykkere hvid kant, ingen sort border, kraftig glow
      badgeBg: 'bg-white text-bison-dark ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.7)]'
    },
    blue: {
      bg: 'bg-bison-blue',
      text: 'text-[#1095ed]',
      glow: 'ring-[#1095ed]/30 border-[#1095ed]/40 shadow-[0_0_30px_-10px_rgba(16,149,237,0.3)]',
      badgeBg: 'bg-[#1095ed] text-white'
    }
  };

  const t = themeMap[themeColor];

  const cardClasses = `
    backdrop-blur-2xl bg-white/10 bg-gradient-to-br rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex-1 max-w-[360px] 2xl:max-w-[420px] px-8 py-10 2xl:px-10 2xl:py-12 flex flex-col transition-all duration-300
    from-white/60 to-white/20 border border-white/60 group
    dark:from-white/20 dark:to-white/10 dark:border-white/20 dark:backdrop-brightness-[0.91]
    ${isPopular ? `scale-[1.03] 2xl:scale-105 relative z-10 ${t.glow}` : ''}
  `;
  const buttonClasses = `
    mt-auto w-full py-3.5 2xl:py-4 rounded-xl font-bold uppercase tracking-wider text-[14px] 2xl:text-[16px] transition-all duration-300 font-sans
    ${t.bg} text-black border border-black/10 shadow-sm hover:scale-105 hover:-translate-y-1 hover:shadow-xl
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className={`absolute -top-4 -right-2 2xl:-top-5 2xl:right-5 px-3 py-1 2xl:px-4 2xl:py-1.5 text-[12px] 2xl:text-[14px] font-semibold rounded-full ${t.badgeBg}`}>
          Mest populær
        </div>
      )}
      <div className="mb-5 2xl:mb-6">
        <h2 className="text-[42px] 2xl:text-[56px] font-extralight tracking-[-0.03em] text-black font-display leading-[1.1]">{planName}</h2>
        <p className="text-[16px] 2xl:text-[18px] text-black/70 mt-2 2xl:mt-3 font-sans leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 mb-8 2xl:mt-8 2xl:mb-10 flex flex-wrap items-baseline gap-x-2 2xl:gap-x-3 gap-y-1 2xl:gap-y-2 min-h-[56px] 2xl:min-h-[64px]">
        <span className="text-[40px] 2xl:text-[56px] font-extralight text-bison-brown font-display leading-none">{price}</span>
        {priceSuffix && <span className="text-[14px] 2xl:text-[16px] text-black/70 font-sans">{priceSuffix}</span>}
      </div>
      <div className="card-divider w-full mb-8 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]"></div>
      <ul className="flex flex-col gap-5 text-[16px] text-black/90 mb-10 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            <CheckIcon className={`${t.text} w-5 h-5 shrink-0 mt-0.5`} /> 
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
      <RippleButton 
        className={buttonClasses.trim()} 
        variant="default" 
        rippleColor="rgba(255,255,255,0.4)"
        rippleDuration={800}
      >
        {buttonText}
      </RippleButton>
    </div>
  );
};


// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  /** The main title. Can be a string or a ReactNode for more complex content. */
  title: React.ReactNode;
  /** The subtitle text appearing below the main title. */
  subtitle: React.ReactNode;
  /** An array of plan objects that conform to PricingCardProps. */
  plans: PricingCardProps[];
  /** Whether to show the animated WebGL background. Defaults to true. */
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Animation: Canvas starter lille og bliver større fra midten af, indtil den når sin fulde størrelse (scale 1) når man er ca. midt på sektionen.
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="bg-white w-full overflow-hidden relative flex flex-col items-center justify-center">
      {showAnimatedBackground && (
        <motion.div 
          style={{ scale: backgroundScale, opacity: backgroundOpacity, transformOrigin: 'center center' }} 
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
        >
          <ShaderCanvas />
        </motion.div>
      )}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 pt-32 md:pt-40 2xl:pt-48 pb-32 md:pb-48 2xl:pb-64" style={{ zoom: "65%" }}>
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto text-center mb-16 2xl:mb-20">
          <h1 className="text-[40px] md:text-[56px] 2xl:text-[64px] font-extralight leading-tight tracking-[-0.03em] text-black font-display">
            {title}
          </h1>
          <p className="mt-4 2xl:mt-5 text-[16px] md:text-[18px] 2xl:text-[20px] text-black/80 max-w-3xl 2xl:max-w-4xl mx-auto font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 2xl:gap-8 justify-center items-center w-full max-w-[1100px] 2xl:max-w-[1360px] relative z-20">
          {plans.map((plan) => <React.Fragment key={plan.planName}><PricingCard {...plan} /></React.Fragment>)}
        </div>
      </div>
    </div>
  );
};
