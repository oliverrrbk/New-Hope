import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence, useAnimate } from 'motion/react';
import {
  ArrowRight,
  Mic,
  Rocket,
  Unlock,
  Quote,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Meteors } from '../components/ui/meteors';
import { ModernPricingPage, PricingCardProps } from '../components/ui/animated-glassy-pricing';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { BlurIn } from '../components/ui/blur-in';
import { Magnetic } from '../components/ui/magnetic';
const StripeDecorator = ({ vertical = false, className = "" }) => (
  <div className={`${vertical ? 'bison-stripes-vertical w-1.5 h-full' : 'bison-stripes h-1.5 w-full'} ${className}`} />
);

const Hero = () => {
  const [scope, animate] = useAnimate();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutIds: NodeJS.Timeout[] = [];

    const runSequence = async () => {
      if (!isMounted) return;
      // Initialize all paths as hidden
      await animate(".sequence-path", { pathLength: 0, opacity: 0 }, { duration: 0 });
      
      // Vent efter siden er loadet for et mere naturligt flow (ca. 2 sekunder)
      const t1 = setTimeout(async () => {
        if (!isMounted) return;
        
        // 1. Udvid mellemrummet
        setIsExpanded(true);
        
        const t2 = setTimeout(async () => {
          if (!isMounted) return;
          
          try {
            // 2. Draw arrow first
            await animate("#arrow-path", { opacity: 1 }, { duration: 0.01 });
            await animate("#arrow-path", { pathLength: 1 }, { duration: 0.25, ease: "easeInOut" });
            if (!isMounted) return;
            
            const t3 = setTimeout(async () => {
              if (!isMounted) return;
              try {
                // 4. Draw "faktisk" letters one by one
                for (let i = 0; i < 7; i++) {
                  if (!isMounted) break;
                  await animate(`#faktisk-path-${i}`, { opacity: 1 }, { duration: 0.01 });
                  await animate(`#faktisk-path-${i}`, { pathLength: 1 }, { duration: 0.15, ease: "linear" });
                }
              } catch (e) {}
            }, 200);
            timeoutIds.push(t3);
          } catch (e) {}
        }, 800);
        timeoutIds.push(t2);
      }, 2200);
      timeoutIds.push(t1);
    };
    
    runSequence();
    
    return () => { 
      isMounted = false; 
      timeoutIds.forEach(clearTimeout);
    };
  }, [animate]);

  return (
    <section
      className="relative min-h-[110vh] flex items-center pt-32 pb-32 overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top'
      }}
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(195deg, black 35%, transparent 44%)',
          WebkitMaskImage: 'linear-gradient(195deg, black 35%, transparent 44%)'
        }}
      >
        <Meteors number={28} />
      </div>
      <div className="max-w-4xl mx-auto px-4 lg:px-6 relative z-10 w-full flex flex-col items-center text-center -mt-6 lg:-mt-10 xl:mt-0">
        <BlurIn 
          delay={1.0}
          duration={0.8}
          className="flex flex-col items-center w-full"
        >
          {/* GEMT GAMMEL OVERSKRIFT: 
          <h1 className="group flex flex-col font-black tracking-tighter leading-[0.85] mb-6 lg:mb-8 xl:mb-10 font-display uppercase text-white drop-shadow-2xl w-full max-w-6xl mx-auto px-2 md:px-6 cursor-default">
            <div className="flex w-full justify-center items-center text-center transition-all duration-700 ease-out pb-0 group-hover:pb-4 md:group-hover:pb-4 relative z-10">
              <span className="text-[10vw] sm:text-[9vw] md:text-[5rem] lg:text-[5.5rem] xl:text-[8rem] whitespace-nowrap leading-none mt-4 md:mt-8">Få en</span>
              
              <div 
                ref={scope} 
                className={`relative flex flex-col items-center justify-start self-start -mt-[12vw] md:-mt-20 lg:-mt-[3.5rem] xl:-mt-24 z-20 transition-all duration-[800ms] ease-in-out ${
                  isExpanded ? "w-[3vw] md:w-8 lg:w-9 xl:w-10 mx-0 md:mx-1" : "w-[0.5vw] md:w-2 lg:w-3 mx-1"
                }`}
              >
                
                <svg
                  className="mb-0 text-bison-green overflow-visible w-[28vw] md:w-[160px] lg:w-[180px] xl:w-[270px] rotate-[8deg] drop-shadow-md translate-x-[2vw] md:translate-x-3 lg:translate-x-4 xl:translate-x-6 translate-y-[1vw] md:translate-y-2 lg:translate-y-2.5 xl:translate-y-3"
                  viewBox="0 0 270 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {[
                    "M 35 25 C 25 15, 20 20, 20 35 L 20 110 M 10 50 L 35 50",
                    "M 75 55 C 55 45, 50 75, 65 80 C 75 80, 80 70, 75 55 M 75 45 L 75 80 Q 80 85 80",
                    "M 100 15 Q 97 40 100 80 M 120 45 Q 105 55 100 65 Q 110 70 120 80",
                    "M 140 25 L 140 75 C 140 85, 150 85, 150 80 M 130 50 L 150 50",
                    "M 165 50 L 165 75 C 165 85, 175 85, 175 80 M 165 30 L 165.5 30",
                    "M 210 50 C 190 40, 180 60, 195 65 C 215 70, 200 90, 185 80",
                    "M 230 15 Q 227 40 230 80 M 250 45 Q 235 55 230 65 Q 240 70 250 80"
                  ].map((path, index) => (
                    <motion.path
                      key={index}
                      id={`faktisk-path-${index}`}
                      className="sequence-path"
                      d={path}
                      initial={{ pathLength: 0, opacity: 0 }}
                    />
                  ))}
                </svg>

                <div className="mt-0 md:-mt-[0.25rem] lg:-mt-[0.5rem]">
                  <svg className="text-bison-green w-[4vw] h-[4.5vw] md:w-[2rem] md:h-[2.5rem] lg:w-[2.5rem] lg:h-[3rem] xl:w-[3.5rem] xl:h-[4rem] stroke-[3.5px] lg:stroke-[3.5px] xl:stroke-[4.5px] drop-shadow-sm overflow-visible rotate-[8deg]" viewBox="0 0 40 50" fill="none" stroke="currentColor">
                    <motion.path 
                       id="arrow-path"
                       className="sequence-path"
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       d="M 4 4 Q 16 30, 20 46 Q 24 30, 36 4" 
                       initial={{ pathLength: 0, opacity: 0 }}
                    />
                  </svg>
                </div>
              </div>

              <span className="text-[10vw] sm:text-[9vw] md:text-[5rem] lg:text-[5.5rem] xl:text-[8rem] whitespace-nowrap leading-none mt-4 md:mt-8">flot</span>
            </div>
            
            <div className="flex w-full items-center justify-center -my-2 md:-my-4 relative z-30 transition-all duration-700 ease-out">
              <div className="inline-flex items-center transform -rotate-3 group-hover:rotate-0 group-hover:scale-[1.05] transition-all duration-700 ease-out">
                <div className="h-[2px] w-8 lg:w-12 xl:w-20 bg-gradient-to-r from-transparent to-bison-pink/60 mr-4 lg:mr-6 hidden md:block drop-shadow-md group-hover:w-12 lg:group-hover:w-16 xl:group-hover:w-24 transition-all duration-700 ease-out" />
                <span className="italic font-serif normal-case font-medium text-bison-pink drop-shadow-[0_15px_35px_rgba(236,72,153,0.35)] text-[6.5vw] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] whitespace-nowrap group-hover:drop-shadow-[0_20px_50px_rgba(236,72,153,0.5)] transition-all duration-700 ease-out">
                  uden bøvl og besvær
                </span>
                <div className="h-[2px] w-6 lg:w-10 xl:w-16 bg-gradient-to-l from-transparent to-bison-pink/60 ml-4 lg:ml-6 hidden md:block drop-shadow-md group-hover:w-10 lg:group-hover:w-14 xl:group-hover:w-20 transition-all duration-700 ease-out" />
              </div>
            </div>
            
            <div className="flex w-full justify-center items-center text-center transition-all duration-700 ease-out pt-0 group-hover:pt-6 md:group-hover:pt-8">
              <span className="text-[10vw] sm:text-[9vw] md:text-[5rem] lg:text-[5.5rem] xl:text-[8rem] whitespace-nowrap relative z-10 opacity-95">hjemmeside</span>
            </div>
          </h1>
          */}

          {/* NY NATIVE SKALERET OVERSKRIFT */}
          <h1 className="flex flex-col font-black tracking-tighter leading-[1.05] mb-5 lg:mb-4 xl:mb-6 font-display uppercase text-white drop-shadow-2xl w-full max-w-[95vw] xl:max-w-[60rem] mx-auto cursor-default text-center items-center">
            <span className="block text-[11vw] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] xl:text-[5.5rem] mb-2 md:mb-3 drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]">Flotte<br />hjemmesider</span>
            <span className="block text-[5.5vw] sm:text-2xl md:text-[1.75rem] lg:text-[2rem] xl:text-[3.25rem] italic font-serif normal-case font-medium text-bison-pink drop-shadow-[0_15px_35px_rgba(236,72,153,0.35)] mt-1 lg:mt-2">
              uden besvær og månedlige betalinger
            </span>
          </h1>
          <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white/90 w-full max-w-[95vw] md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 lg:mb-5 xl:mb-8 leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            Vi designer fra bunden, og laver noget, som faktisk er skræddersyet til din virksomhed og dens personlighed. Samtidig er vores proces så simpel som muligt for dig – vi har skåret alt fedtet fra. Og så betaler du kun én gang.
          </p>

          <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea='global' range={200}>
            <motion.div
              className="relative flex flex-wrap gap-4 mb-8 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [-5, 5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ WebkitBackfaceVisibility: "hidden", transform: "translate3d(0, 0, 0)", willChange: "transform" }}
            >
              {/* Rolig, diffus "Forårs-sky" der ligger tættere om knappen */}
              <div className="absolute -inset-1 group-hover:inset-0 z-0 pointer-events-none transition-all duration-700 ease-out flex items-center justify-center group-hover:rounded-full overflow-visible">
                
                {/* 100% Solid Fyld: Overtager fuldstændigt baggrunden på hover som en fast brun base */}
                <div className="absolute inset-0 rounded-full bg-bison-brown/0 group-hover:bg-bison-brown/90 transition-colors duration-700 pointer-events-none" />

                {/* Hoved-skyen: Ligger og trækker vejret langsomt, men FYDER FULDSTÆNDIGT UD på hover */}
                <div className="absolute w-[108%] h-[115%] md:w-[102%] md:h-[105%] lg:w-[105%] blur-[8px] md:blur-[10px] lg:blur-[6px] opacity-80 md:opacity-50 lg:opacity-65 xl:opacity-75 group-hover:w-full group-hover:h-full group-hover:blur-[0px] group-hover:opacity-0 group-hover:rounded-full group-hover:overflow-hidden transition-all duration-700 pointer-events-none flex items-center justify-center">
                  <motion.div 
                     animate={{ scale: [0.98, 1.02] }} 
                     transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} 
                     className="absolute w-full h-full bg-bison-brown/70 rounded-[40%_60%_60%_40%]" 
                     style={{ willChange: "transform" }}
                  />
                  
                  {/* Støvet, gennemsigtig brun-sky der flyder blødt indeni (tonet ned fra hvid) */}
                  <motion.div 
                     animate={{ x: [-10, 10], y: [-5, 5], opacity: [0.1, 0.25] }} 
                     transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} 
                     className="absolute w-3/4 h-3/4 bg-[#e6cbb7]/20 rounded-full blur-[6px]" 
                     style={{ willChange: "transform, opacity" }}
                  />

                  {/* Små glimtrende brunlige støvkorn (nedtonet fuldstændigt i kontrast, blend-mode fjernet for blødere look) */}
                  <motion.div 
                     animate={{ opacity: [0, 0.4], scale: [0.6, 1], x: [-5, 5] }} 
                     transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }} 
                     className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#a67448] rounded-full blur-[3px]" 
                     style={{ willChange: "transform, opacity" }}
                  />
                  <motion.div 
                     animate={{ opacity: [0, 0.5], scale: [0.8, 1.2], y: [-5, 5] }} 
                     transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.5 }} 
                     className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#b58052] rounded-full blur-[4px]" 
                     style={{ willChange: "transform, opacity" }}
                  />
                  <motion.div 
                     animate={{ opacity: [0, 0.35], scale: [0.9, 1.2], x: [5, -5] }} 
                     transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2.5 }} 
                     className="absolute top-1/2 right-10 w-5 h-5 bg-[#c28d5e] rounded-full blur-[3px]" 
                     style={{ willChange: "transform, opacity" }}
                  />
                </div>
              </div>
              
              <Link to="/book-et-opkald" className="relative z-10 overflow-hidden bg-white/10 ring-1 ring-inset ring-white/20 text-white px-8 py-3.5 md:px-5 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 rounded-full text-[15px] md:text-xs lg:text-sm xl:text-lg font-black font-display uppercase tracking-widest flex items-center justify-center transition-all cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/20 hover:ring-white/30" style={{ transform: "translateZ(0)" }}>
                <Magnetic intensity={0.15} springOptions={{ bounce: 0.15 }} actionArea='global' range={250}>
                  <span className="relative z-10 inline-block pointer-events-none">Start her</span>
                </Magnetic>
              </Link>
            </motion.div>
          </Magnetic>
        </BlurIn>
      </div>
    </section>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  const services = [
    {
      title: "DEJLIGT NEMT",
      desc: "Alt indholdet laves ud fra ét mundtligt interview – også teksten. Det tager typisk 45 minutter. Derfra skal du ikke selv bruge mere tid.",
      color: "bg-bison-blue/10 backdrop-blur-xl border-white/50",
      cloudColor: "bg-[#0284c7]",
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Custom SVG Clock tidsrejse / spole-tilbage effekt */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="34" height="34" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-[#0284c7] drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-[1.15] group-data-[active=true]:scale-[1.15]"
          >
            {/* Urets ramme */}
            <circle cx="12" cy="12" r="10" />
            {/* Lille viser: Peger fast mod kl. 12 (øverst) */}
            <line x1="12" y1="12" x2="12" y2="7.5" />
            {/* Stor viser: Starter mere til højre (5-tiden) og spoler kortere tilbage på hover */}
            <line 
              x1="12" y1="12" 
              x2="12" y2="16.5" 
              className="origin-[12px_12px] -rotate-[35deg] group-hover:-rotate-[100deg] group-data-[active=true]:-rotate-[100deg] transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
            />
          </svg>
        </div>
      )
    },
    {
      title: "UNIKT DESIGN",
      desc: "Vi laver hjemmesider fra bunden med levende og interaktive elementer i et univers bygget på jeres personlighed.",
      color: "bg-bison-pink/10 backdrop-blur-xl border-white/50",
      cloudColor: "bg-[#db2777]",
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="absolute bottom-1 left-1 w-3 h-3 bg-gradient-to-tr from-pink-500 to-yellow-300 rounded-full blur-sm opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 group-hover:scale-[2] group-data-[active=true]:scale-[2] transition-all duration-500 translate-y-1 -translate-x-1" />
          <Sparkles className="text-[#db2777] drop-shadow-sm relative z-10 transition-all duration-700 group-hover:-translate-y-1.5 group-data-[active=true]:-translate-y-1.5 group-hover:translate-x-1.5 group-data-[active=true]:translate-x-1.5 group-hover:scale-110 group-data-[active=true]:scale-110 group-hover:rotate-12 group-data-[active=true]:rotate-12" size={32} />
        </div>
      )
    },
    {
      title: "100% EJERSKAB",
      desc: "I ejer siden. Vi opkræver ikke månedlige gebyrer. Én pris. Ét godt stykke arbejde. Hos os betaler man ikke \"digital husleje\".",
      color: "bg-bison-green/10 backdrop-blur-xl border-white/50",
      cloudColor: "bg-[#4d7c0f]",
      icon: (
        <div className="relative flex items-center justify-center">
          <style>{`
            .lock-shackle { stroke-dasharray: 23; stroke-dashoffset: 0; transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
            .group[data-active="true"] .lock-shackle { stroke-dashoffset: 17; }
            @media (hover: hover) {
              .group:hover .lock-shackle { stroke-dashoffset: 17; }
            }
          `}</style>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4d7c0f] drop-shadow-sm relative z-10 transition-all duration-500 group-hover:scale-[1.1] group-data-[active=true]:scale-[1.1] group-hover:-translate-y-1 group-data-[active=true]:-translate-y-1">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            {/* Stregen udviskes over i låsen fra den højre løse ende - præcis ligesom uret! */}
            <path d="M7 11V7a5 5 0 0 1 9.9-1" className="lock-shackle" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="services" className="pt-20 lg:pt-24 pb-12 lg:pb-16 bg-white relative z-20 -mt-8 lg:-mt-12">
      <div className="absolute top-0 left-0 w-full h-2 bison-stripes" />
      <div className="max-w-[60rem] mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-2 md:mb-3 font-display uppercase leading-[1.1]">
            Hvordan vi gør det 
            <br className="hidden md:block"/>
            <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">anderledes</span>
          </h2>
          <p className="text-xs md:text-sm text-bison-dark/60 font-medium max-w-lg mx-auto">Vi har fjernet alt det, der normalt gør et webprojekt til en langsommelig hovedpine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 items-stretch">
          {services.map((s, i) => (
            <div key={i} className="w-full relative h-full">
              <motion.div
                data-active={activeService === i}
                onClick={() => setActiveService(activeService === i ? null : i)}
                initial={{ x: -20, y: -20 }}
                whileInView={{ x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full group relative isolate mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-none md:mx-0 cursor-pointer md:cursor-default"
              >
                {/* Fuzzy svævende skyer UDENOM kortet */}
                <div className="absolute -inset-6 md:-inset-8 pointer-events-none opacity-20 md:opacity-40 z-[-1] transition-opacity duration-500 group-hover:opacity-70 group-data-[active=true]:opacity-70">
                  <div className={`absolute top-[-10%] left-[-15%] w-[80%] h-[80%] rounded-full blur-[30px] md:blur-[40px] ${s.cloudColor} animate-cloud-1 group-hover:[animation-play-state:paused] group-data-[active=true]:[animation-play-state:paused]`} />
                  <div className={`absolute bottom-[-10%] right-[-15%] w-[90%] h-[90%] rounded-full blur-[40px] md:blur-[50px] ${s.cloudColor} animate-cloud-2 group-hover:[animation-play-state:paused] group-data-[active=true]:[animation-play-state:paused]`} />
                </div>

                {/* Selve kortkroppen, der hviler 'på' skyerne */}
                <div className={`h-full ${s.color} p-5 md:p-6 lg:p-8 rounded-[1.2rem] md:rounded-[1.8rem] border flex flex-col justify-center items-center text-center gap-3 lg:gap-4 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] group-data-[active=true]:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] group-hover:scale-[1.03] md:group-hover:scale-100 group-data-[active=true]:scale-[1.03] md:group-data-[active=true]:scale-100 group-hover:bg-white/30 group-data-[active=true]:bg-white/30`}>
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl flex items-center justify-center shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110 group-data-[active=true]:scale-110">
                    <div className="scale-75 md:scale-90">{s.icon}</div>
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-black font-display uppercase tracking-tight relative z-10 whitespace-nowrap transition-transform duration-300 group-hover:scale-[1.05] group-data-[active=true]:scale-[1.05]">{s.title}</h3>
                  <p className="text-[0.65rem] md:text-[0.7rem] lg:text-xs text-bison-dark/70 transition-colors duration-300 group-hover:text-bison-dark group-data-[active=true]:text-bison-dark leading-relaxed relative z-10 font-medium max-w-[12rem] md:max-w-none">{s.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  const scrollRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 80%", "end start"]
  });
  
  // Parallax bevægelse fra -15% til 15% af vinduets bredde (starter venstre, slutter højre)
  const xScroll = useTransform(scrollYProgress, [0, 1], ["-15vw", "15vw"]);

  return (
    <section 
      ref={scrollRef} 
      className="pt-[6rem] md:pt-40 xl:pt-56 pb-0 md:pb-20 lg:pb-24 xl:pb-32 relative"
      style={{
        background: isMobile ? "linear-gradient(to bottom, #ffffff 0%, #ffffff 85%, #F7F5F2 100%)" : "#ffffff"
      }}
    >
      <div 
        className="absolute z-0 pointer-events-none overflow-hidden"
        style={{
          top: isMobile ? '2rem' : '0',  
          left: 0, right: 0, bottom: isMobile ? '-4rem' : 0,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)'
        }}
      >
        <motion.div 
          className="absolute"
          style={{
            top: "-30%", left: "-20%", right: "-20%", bottom: "-30%",
            y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
            backgroundImage: 'url(/cloud-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isMobile ? 0.6 : 0.7
          }}
        />
      </div>
      <div className="max-w-xl lg:max-w-2xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 w-full overflow-visible flex flex-col items-center justify-center">
        {/* Togskinner: Dynamisk positioneret så de sidder centreret på kortets 1/3 og 2/3 på mobil, men fastmonteret på desktop */}
        <div 
          className="bison-stripes absolute left-1/2 -translate-x-1/2 top-[33%] md:top-24 lg:top-28 w-[100vw] h-[3px] md:h-[4px] opacity-70 z-0"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
          }}
        />
        <div 
          className="bison-stripes absolute left-1/2 -translate-x-1/2 bottom-[33%] md:bottom-24 lg:bottom-28 w-[100vw] h-[3px] md:h-[4px] opacity-70 z-0"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
          }}
        />

        <motion.div
          style={{ x: xScroll }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 lg:p-12 rounded-[1.2rem] lg:rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:shadow-xl relative w-full max-w-[380px] md:max-w-none mx-auto"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 backdrop-blur-2xl bg-bison-brown/30 border border-white/50 rounded-lg lg:rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.1)] rotate-3 hover:scale-105 hover:rotate-6 transition-all duration-300 z-20 group">
            <div className="relative flex items-center justify-center -rotate-[24deg] translate-y-[1px]">
              <Megaphone className="text-white drop-shadow-sm relative z-10 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              {/* Single animated, flattish sound wave, centered on the mouth */}
              <motion.div 
                animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.1], x: [0, 10] }} 
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute -right-1 top-1/2 -translate-y-[65%] w-1 h-3 lg:w-1.5 lg:h-4 rounded-[100%] border-r-[2.5px] border-white/80 z-0"
              />
            </div>
          </div>

          <div className="mb-4 lg:mb-6">
            <div className="inline-block bg-bison-dark/5 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-bison-dark/60 mb-2 md:mb-3">Vores filosofi</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-display uppercase tracking-tighter leading-tight">
              Med ærlighed <br />
              kommer <span className="italic font-serif normal-case font-medium text-bison-brown">man længst</span>
            </h2>
          </div>

          <div className="text-xs lg:text-sm text-bison-dark/70 leading-relaxed">
            <p className="mb-3 lg:mb-4">
              Mange bureauer bruger udmattede processer, beder om at få tilsendt alt skrivearbejdet og putter dig alligevel bare i en standard skabelon.
              <AnimatePresence initial={false}>
                {isMobile && !isExpanded && !isCollapsing && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.4 }}
                  >
                    ... <button onClick={() => setIsExpanded(true)} className="text-bison-brown font-bold ml-1 hover:underline uppercase tracking-widest text-[9px]">Læs mere</button>
                  </motion.span>
                )}
              </AnimatePresence>
            </p>
            
            <AnimatePresence initial={false}>
              {(!isMobile || isExpanded) && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                  animate={isMobile ? { 
                    height: "auto", 
                    opacity: 1, 
                    transition: { height: { duration: 1.0, ease: [0.04, 0.62, 0.23, 0.98] }, staggerChildren: 0.2, delayChildren: 0.15 } 
                  } : false}
                  exit={isMobile ? { 
                    height: 0, 
                    opacity: 0, 
                    transition: { height: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4, delay: 0.4 }, staggerChildren: 0.1, staggerDirection: -1 } 
                  } : false}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 lg:gap-4 pt-3 lg:pt-4">
                    <motion.p 
                      initial={isMobile ? { opacity: 0, y: 20 } : false} 
                      animate={isMobile ? { opacity: 1, y: 0 } : false} 
                      exit={isMobile ? { opacity: 0, y: 10 } : false} 
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Derudover betaler man hver måned flere hundrede kroner for "hosting og vedligehold", selvom der - for de fleste - ikke er noget at hoste og vedligeholde, når først siden er sat op.
                    </motion.p>
                    <motion.p 
                      initial={isMobile ? { opacity: 0, y: 20 } : false} 
                      animate={isMobile ? { opacity: 1, y: 0 } : false} 
                      exit={isMobile ? { opacity: 0, y: 10 } : false} 
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Hos Bison har vi en "no bullshit"-metode. Her får du et rigtig godt stykke ærligt arbejde, uden at blive ved med at betale for det. Processen er også ukompliceret: Du svarer mundtligt på nogle grundige spørgsmål, og derfra bygger vi en platform, der afspejler jeres virksomhed på en, faktisk, fed måde.
                    </motion.p>
                    <motion.p 
                      initial={isMobile ? { opacity: 0, y: 20 } : false} 
                      animate={isMobile ? { opacity: 1, y: 0 } : false} 
                      exit={isMobile ? { opacity: 0, y: 10 } : false} 
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Vi bruger aldrig skabeloner. Alt bygges fra bunden med skarpt fokus på konvertering. Hjemmesiden får sit eget liv gennem dynamiske animationer og interaktive elementer, der sikrer, at ingen glemmer jer.
                    </motion.p>
                    <motion.p 
                      initial={isMobile ? { opacity: 0, y: 20 } : false} 
                      animate={isMobile ? { opacity: 1, y: 0 } : false} 
                      exit={isMobile ? { opacity: 0, y: 10 } : false} 
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="font-bold text-bison-dark mb-1 lg:mb-2"
                    >
                      Hos Bison kommer man længst med ærlighed. Hvis vi selv skulle have bygget en hjemmeside, ville vi ønske, det var præcis, som vi tilbyder det nu.
                    </motion.p>
                    
                    {isMobile && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 10 }} 
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="pt-1 pb-1 flex justify-center"
                      >
                        <button 
                          onClick={() => {
                            setIsExpanded(false);
                            setIsCollapsing(true);
                            setTimeout(() => setIsCollapsing(false), 1000);
                          }} 
                          className="text-bison-dark/50 hover:text-bison-brown font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5 transition-colors"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                          Læs mindre
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 md:mt-6 lg:mt-8 pt-5 md:pt-6 lg:pt-8 border-t border-bison-dark/5 flex items-center gap-3 lg:gap-4">
            <div className="flex -space-x-1.5 md:-space-x-2">
              <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden ring-2 ring-white bg-white relative z-30 shadow-sm">
                <img src="/assets/1.png" alt="Oliver" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden ring-2 ring-white bg-white relative z-20 shadow-sm">
                <img src="/assets/2.png" alt="Mads" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden ring-2 ring-white bg-white relative z-10 shadow-sm">
                <img src="/assets/3.png" alt="Jens" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div>
              <p className="font-black font-display uppercase tracking-wide text-[9px] md:text-[10px] lg:text-xs text-bison-dark">Bison Company</p>
              <p className="text-[8px] md:text-[9px] lg:text-[10px] text-bison-dark/40 font-bold uppercase tracking-widest mt-px">Vi står bag hvert et ord</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const myPricingPlans: PricingCardProps[] = [
  { 
    planName: 'One-pager', 
    description: 'Perfekt til den mindre virksomhed, der bare skal stå skarpt.', 
    price: '7.500', 
    priceSuffix: 'kr. (Én gang)',
    features: ['45 min. behovsinterview', 'High-end design & animationer', 'Professionel tekstforfatning', 'Færdig på 9 dage', '100% ejerskab af alt', '0 kr. i månedligt gebyr'], 
    buttonText: 'Kom i gang', 
    buttonVariant: 'secondary',
    themeColor: 'green'
  },
  { 
    planName: 'Kerne-sitet', 
    description: 'Til virksomheden, der vil have plads til at folde sine ydelser ud.', 
    price: '13.900', 
    priceSuffix: 'kr. (Én gang)', 
    features: ['Alt fra One-pager pakken', 'Op til 5 unikke hovedsider', 'Plads til ydelser, om os & cases', 'Færdig på 9 dage', '100% ejerskab af alt', '0 kr. i månedligt gebyr'], 
    buttonText: 'Vælg denne', 
    isPopular: true, 
    buttonVariant: 'primary',
    themeColor: 'pink'
  },
  { 
    planName: 'Specialiseret', 
    description: 'Når forretningen kræver specialfunktioner eller tunge systemer.', 
    price: 'Kontakt os', 
    priceSuffix: '',
    features: ['Alt fra Kerne-sitet', 'Skræddersyet funktionalitet', 'Booking, Webshop eller API', 'Tidsplan efter aftale', '100% ejerskab af alt', '0 kr. i månedligt gebyr'], 
    buttonText: 'Book en snak', 
    buttonVariant: 'primary',
    themeColor: 'blue'
  },
];

const StepItem = ({ step, title1, title2, desc, align, bgColor, textColor }) => {
  return (
    <motion.div
      initial="inactive"
      whileInView="active"
      viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
      variants={{
        inactive: { opacity: 0.15, y: 30, scale: 0.95 },
        active: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full ${align === 'left' ? 'justify-start' : 'justify-end'} relative`}
    >
       <div className={`w-full md:w-1/2 flex ${align === 'left' ? 'justify-end md:pr-16 lg:pr-24' : 'justify-start md:pl-16 lg:pl-24'}`}>
         <div className="flex flex-col items-start w-fit">
           <div className="mb-3 md:mb-6">
             <span className="px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest shadow-[0_2px_10px_rgba(0,0,0,0.05)]" style={{ backgroundColor: bgColor, color: textColor }}>
               Step {step}
             </span>
           </div>
         <h3 className="text-[20px] md:text-5xl font-semibold tracking-tight mb-2 md:mb-4 text-[#1b1b1b]">
           <span className="italic font-serif normal-case font-medium">{title1}</span>{title2}
         </h3>
         <p className="text-[11.5px] md:text-xl text-black/50 font-medium leading-relaxed w-full">
           {desc}
         </p>
         </div>
       </div>
    </motion.div>
  )
}

const SmoothLiftoff = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the middle section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 120%"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className="relative z-20 overflow-visible md:overflow-hidden bg-transparent md:bg-white" 
      id="smooth-liftoff"
    >
      <div 
        className="absolute z-0 pointer-events-none overflow-hidden"
        style={{
          top: isMobile ? '-12rem' : '0',
          left: 0, right: 0, bottom: 0,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 65%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 65%, transparent 90%)'
        }}
      >
        <motion.div 
          className="absolute"
          style={{
            top: "-30%", left: "-20%", right: "-20%", bottom: "-30%",
            y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
            backgroundImage: 'url(/cloud-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isMobile ? 0.6 : 0.7
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-[6rem] md:pt-32 xl:pt-56 pb-12 md:pb-32" style={{ zoom: "65%" }}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-40 z-10 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[26px] md:text-5xl font-black font-display uppercase tracking-tight mb-4 md:mb-6 text-[#1b1b1b]"
          >
            Fra start til slut <br />
            <span className="italic font-serif normal-case font-medium text-bison-brown">uden bøvl</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] md:text-[21px] text-black/60 font-medium leading-relaxed"
          >
            Glem alt om langhårede processer. Vi har kogt forløbet ned til tre<br className="hidden md:block" /> simple trin, så du kan få en professionel side uden at miste fokus<br className="hidden md:block" /> på din forretning.
          </motion.p>
        </div>

        {/* Workflow steps */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto pt-4 pb-12 md:py-12">
          {/* subtle background track */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-black/5 hidden md:block" />
          
          {/* scroll-revealed brightly colored gradient track */}
          <motion.div 
            className="absolute left-1/2 w-[4px] -translate-x-1/2 hidden md:block rounded-full"
            style={{ 
              backgroundImage: useMotionTemplate`linear-gradient(to bottom, ${useTransform(
                scrollYProgress,
                [0, 0.35, 0.55, 0.75, 0.95, 1],
                ["#b2d08d", "#b2d08d", "#e5aad8", "#e5aad8", "#1095ed", "#1095ed"]
              )}, ${useTransform(
                scrollYProgress,
                [0, 0.15, 0.45, 0.65, 0.85, 1],
                ["#b2d08d", "#e5aad8", "#e5aad8", "#1095ed", "#1095ed", "#1095ed"]
              )})`,
              top: useMotionTemplate`calc(${useTransform(scrollYProgress, [0, 1], [0, 100])}% - ${useTransform(scrollYProgress, [0, 1], [0, 350])}px)`,
              height: '350px',
              boxShadow: '0 0 20px rgba(0,0,0,0.1)'
            }}
          />
          
          <div className="flex flex-col gap-20 md:gap-40 lg:gap-48 relative z-10 md:py-24">
            <StepItem 
              step="01" 
              title1={<>45 minutters <br className="hidden md:block" /></>} 
              title2="interview" 
              desc={<>Vi mødes (over telefon eller kaffe) og <br className="hidden md:block" />trækker din viden ud af hovedet på dig. <br className="hidden md:block" />Det er alt, vi skal bruge for at skrive <br className="hidden md:block" />dine tekster og designe din side.</>}
              align="left"
              bgColor="#b2d08d"
              textColor="#000"
            />
            <StepItem 
              step="02" 
              title1="Vi bygger " title2="det hele" 
              desc={<>Mens du passer dit arbejde, designer <br className="hidden md:block" />og koder vi din side. Vi sørger for alt <br className="hidden md:block" />det tekniske, tekstforfatningen og de <br className="hidden md:block" />detaljer, der får dig til at skille dig ud.</>}
              align="right"
              bgColor="#e5aad8"
              textColor="#000"
            />
            <StepItem 
              step="03" 
              title1="Fuldt " title2="ejerskab" 
              desc={<>Efter præcis 9 dage går vi live. Du ejer <br className="hidden md:block" />siden 100%. Det betyder ingen binding, <br className="hidden md:block" />ingen månedlige gebyrer og ingen <br className="hidden md:block" />'digital husleje' til os.</>}
              align="left"
              bgColor="#1095ed"
              textColor="#fff"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.scrollTo(0, 0);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cases = [
    { src: "/showcase1.png", link: "https://www.osmaklima.dk/", isUnderConstruction: false },
    { src: "/casepic1.png", link: "https://www.eksempel.nu/", isUnderConstruction: false },
    { src: "", link: "", isUnderConstruction: true }
  ];

  const nextCase = () => {
    setDirection(1);
    setActiveCaseIndex((prev) => (prev + 1) % cases.length);
  };
  const prevCase = () => {
    setDirection(-1);
    setActiveCaseIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : "0%",
    }),
    center: {
      x: "0%",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : direction < 0 ? "100%" : "0%",
    })
  };

  return (
    <>
      <Helmet>
        <title>Hjemmesider uden abonnement | Unikt design af Bison Company</title>
        <meta name="description" content="Vi designer skræddersyede hjemmesider fra bunden uden skjulte gebyrer eller digital husleje. Få en professionel løsning, og betal kun én gang." />
        <link rel="canonical" href="https://bisoncompany.dk/" />
        <meta property="og:title" content="Hjemmesider uden abonnement | Unikt design af Bison Company" />
        <meta property="og:description" content="Vi designer skræddersyede hjemmesider fra bunden uden skjulte gebyrer eller digital husleje. Få en professionel løsning, og betal kun én gang." />
      </Helmet>
      <main className="overflow-x-hidden w-full relative">
        <Hero />
      <Services />
      <Mission />

      {/* Case Preview Section via Container Scroll Animation */}
      <section className="bg-transparent md:bg-white overflow-visible md:overflow-hidden relative z-20">
        <div className="flex flex-col pb-4 pt-0 md:py-6 relative z-20 -mt-12 md:mt-0">
          <ContainerScroll
            titleComponent={
              <div className="text-center drop-shadow-sm pb-8 xl:pb-0">
                <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tighter font-display uppercase text-bison-dark whitespace-nowrap">
                  Solidt <span className="italic font-serif normal-case text-bison-brown">håndværk</span>
                </h2>
              </div>
            }
            leftArrow={
              <button 
                onClick={prevCase}
                className="hidden md:flex w-10 h-10 lg:w-12 lg:h-12 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-bison-dark/5 rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-transform text-bison-dark hover:text-bison-brown z-50 cursor-pointer"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
            }
            rightArrow={
              <button 
                onClick={nextCase}
                className="hidden md:flex w-10 h-10 lg:w-12 lg:h-12 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-bison-dark/5 rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-transform text-bison-dark hover:text-bison-brown z-50 cursor-pointer"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
            }
          >
            <AnimatePresence custom={direction} initial={false}>
              {cases[activeCaseIndex].isUnderConstruction ? (
                <motion.div
                  key="construction"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) nextCase();
                    else if (offset.x > 50) prevCase();
                  }}
                  className="absolute inset-0 overflow-hidden bg-[#f4f5f7] flex flex-col items-center justify-center w-full h-full border border-dashed border-bison-dark/10 text-center px-6 z-50 rounded-[16px] md:rounded-[24px] lg:rounded-[30px]"
                >
                  <div className="w-10 h-10 lg:w-16 lg:h-16 bg-bison-dark/5 rounded-full flex items-center justify-center mb-4 lg:mb-6 bg-clip-padding backdrop-filter backdrop-blur-sm">
                    <Rocket className="text-bison-dark/40 w-5 h-5 lg:w-8 lg:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black font-display uppercase tracking-widest text-bison-dark/40 drop-shadow-sm mb-2 lg:mb-4">Næste Case</h3>
                  <p className="text-bison-dark/30 font-bold uppercase tracking-widest text-[10px] lg:text-xs">Under konstruktion. Kommer snart.</p>
                </motion.div>
              ) : (
                <motion.a
                  key={`case-${activeCaseIndex}`}
                  href={cases[activeCaseIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50) nextCase();
                    else if (offset.x > 50) prevCase();
                  }}
                  style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                  className="absolute inset-0 block w-full h-full group cursor-pointer overflow-hidden rounded-[24px] md:rounded-[30px] xl:rounded-[40px] bg-white"
                >
                  <img
                    src={cases[activeCaseIndex].src}
                    alt="Udvalgt Case"
                    className={`mx-auto object-cover h-full w-full object-top origin-top transition-transform duration-700 rounded-[16px] md:rounded-[24px] lg:rounded-[30px] xl:rounded-[40px] ${activeCaseIndex === 0 ? "scale-[1.22] group-hover:scale-[1.26] -translate-y-8 md:-translate-y-12 lg:-translate-y-14" : "scale-[1.04] group-hover:scale-[1.08]"}`}
                    draggable={false}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bison-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[16px] md:rounded-[24px] lg:rounded-[30px] flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-black text-sm lg:text-lg uppercase tracking-widest shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-3 lg:gap-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out hover:bg-white/30 hover:scale-105 active:scale-95">
                      <span>Besøg Siden</span>
                      <div className="bg-white/20 p-2 rounded-full border border-white/20 shadow-sm">
                        <ExternalLink className="text-bison-blue drop-shadow-md w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}
            </AnimatePresence>
          </ContainerScroll>
          {/* Wrapper for at positionere 'Swipe for at see cases' tættere på vinduet (via negativ top-margin på mobil), mens den relative interne afstand til CTA knappen nedunder holdes 100% konsistent */}
          <div className="-mt-14 md:mt-0 flex flex-col relative z-30">
            {/* Mobil Swipe Indikator under glasset */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCaseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.55, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden flex justify-center items-center gap-3 relative z-30 mb-14 h-[20px]"
              >
                {activeCaseIndex > 0 && (
                  <motion.svg animate={{ x: [-3, 0, -3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></motion.svg>
                )}
                <span className="text-[10px] font-bold tracking-widest uppercase font-sans">
                  {activeCaseIndex === 0 ? "Swipe for at se cases" : activeCaseIndex === cases.length - 1 ? "Swipe for at gå tilbage" : "Swipe for næste case"}
                </span>
                {activeCaseIndex < cases.length - 1 && (
                  <motion.svg animate={{ x: [3, 0, 3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></motion.svg>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-0 md:mt-16 lg:mt-24 xl:mt-28 mb-10 md:mb-0">
              <Link 
                to="/cases" 
                className="group px-6 py-2.5 lg:px-8 lg:py-3.5 rounded-full backdrop-blur-2xl bg-bison-brown/30 border border-white/50 text-white font-black tracking-wide text-sm lg:text-base hover:bg-bison-brown/40 hover:border-white/60 hover:pr-8 active:scale-95 transition-all duration-300 ease-out shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-2.5 lg:gap-3 hover:gap-5 relative z-30"
              >
                Se mere arbejde
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Liftoff Section */}
      <SmoothLiftoff />

      {/* Modern Pricing Section */}
      <ModernPricingPage
        title={
          <>
            <span className="inline-block tracking-tight text-[30px] sm:text-[32px] md:text-[inherit] leading-[1.1] md:leading-tight">Gennemsigtige priser.</span>
            <br className="block md:hidden" />
            <span className="inline-block text-[28px] sm:text-[30px] md:text-[inherit] italic font-serif normal-case font-medium text-bison-brown leading-[1.1] md:leading-tight mt-1 md:mt-0 md:ml-2">Nul abonnement.</span>
          </>
        }
        subtitle="Samme elite-kvalitet og 9-dages levering på alle løsninger. Du betaler for omfanget af din side, ikke for dårligere håndværk. Du ejer det hele 100% fra dag ét."
        plans={myPricingPlans}
        showAnimatedBackground={true}
      />
      {/* Final CTA Section */}
      <section className="bg-white relative z-20 py-20 lg:py-16 xl:py-20 2xl:py-36 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none bg-[length:auto_250%] md:bg-cover bg-bottom md:bg-bottom"
          style={{
            backgroundImage: 'url(/assets/hero-bg.png)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 45%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 45%, black 100%)'
          }}
        />
        <div className="max-w-[832px] mx-auto lg:max-w-[650px] xl:max-w-[700px] 2xl:max-w-[832px] bg-white/5 backdrop-blur-[40px] border border-white/20 rounded-[1rem] lg:rounded-[1.5rem] 2xl:rounded-[2rem] p-5 md:p-8 lg:p-6 xl:p-8 2xl:p-16 text-center relative z-10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] 2xl:text-[62px] font-black font-display uppercase tracking-tighter text-white leading-[0.9] mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
              SLUT MED AT BETALE <br />
              <span className="italic font-serif normal-case font-medium text-bison-pink">digital husleje.</span>
            </h2>
            <p className="text-[12px] md:text-[10px] lg:text-[12.5px] xl:text-[14px] 2xl:text-[14px] text-white/60 w-full mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 leading-relaxed max-w-[620px]">
              Stop med at vente på dit bureau. Vi leverer din nye side hurtigere, end de kan nå at booke et <br className="hidden 2xl:block" />
              opstartsmøde. Du ejer det hele 100%, når vi er færdige, og vi sender aldrig en regning for <br className="hidden 2xl:block"/>
              "vedligeholdelse". Book 15 minutter, og find ud af, om vi kan hjælpe.
            </p>
            <Magnetic
              intensity={0.2}
              springOptions={{ bounce: 0.1 }}
              actionArea='global'
              range={200}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link to="/book-et-opkald" className="relative group overflow-hidden bg-white text-bison-dark px-4 py-2 lg:px-6 lg:py-3 xl:px-7 xl:py-3.5 2xl:px-8 2xl:py-[13px] rounded-full text-[10px] lg:text-[12px] xl:text-[13px] font-black uppercase tracking-tight shadow-xl 2xl:shadow-2xl transition-all duration-300 flex items-center justify-center">
                  <Magnetic
                    intensity={0.1}
                    springOptions={{ bounce: 0.1 }}
                    actionArea='global'
                    range={200}
                  >
                    <span className="relative z-10 transition-colors group-hover:text-bison-blue duration-300 inline-block pointer-events-none">BOOK EN SNAK</span>
                  </Magnetic>
                </Link>
              </motion.div>
            </Magnetic>          </div>

        </div>
      </section>
    </main>
    </>
  );
};

export default Home;
