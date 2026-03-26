import React, { useEffect, useRef, useState } from 'react';
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
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center -mt-6 lg:-mt-10 xl:mt-0" style={{ zoom: "65%" }}>
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

          {/* NY SIMPEL OVERSKRIFT */}
          <h1 className="flex flex-col font-black tracking-tighter leading-[1.0] mb-5 lg:mb-6 xl:mb-12 font-display uppercase text-white drop-shadow-2xl w-full max-w-[95vw] xl:max-w-[90rem] mx-auto cursor-default text-center items-center">
            <span className="block text-[11vw] sm:text-6xl md:text-[4rem] lg:text-[4.5rem] xl:text-[8rem] mb-2 md:mb-3 xl:mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]">Flotte hjemmesider</span>
            <span className="block text-[5vw] sm:text-3xl md:text-[2.25rem] lg:text-[2.75rem] xl:text-[5rem] italic font-serif normal-case font-medium text-bison-pink drop-shadow-[0_15px_35px_rgba(236,72,153,0.35)]">
              uden besvær og månedlige betalinger
            </span>
          </h1>
          <p className="text-sm md:text-base lg:text-base xl:text-2xl text-white/90 w-full max-w-[95vw] md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto mb-6 lg:mb-8 xl:mb-16 leading-relaxed font-medium drop-shadow-md">
            Vi designer fra bunden, og laver noget, som faktisk er skræddersyet til din virksomhed og dens personlighed. Samtidig er vores proces så simpel så mulig for dig – vi har skåret alt fedtet fra. Og så betaler du kun én gang.
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
                <div className="absolute w-[102%] h-[105%] blur-[10px] group-hover:w-full group-hover:h-full group-hover:blur-[0px] opacity-50 group-hover:opacity-0 group-hover:rounded-full group-hover:overflow-hidden transition-all duration-700 pointer-events-none flex items-center justify-center">
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
              
              <Link to="/book-et-opkald" className="relative z-10 overflow-hidden bg-white/10 ring-1 ring-inset ring-white/20 text-white px-6 py-2.5 lg:px-8 lg:py-3 xl:px-14 xl:py-6 rounded-full text-sm lg:text-base xl:text-2xl font-black font-display uppercase tracking-widest flex items-center justify-center transition-all cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/20 hover:ring-white/30" style={{ transform: "translateZ(0)" }}>
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
            className="text-[#0284c7] drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-[1.15]"
          >
            {/* Urets ramme */}
            <circle cx="12" cy="12" r="10" />
            {/* Lille viser: Peger fast mod kl. 12 (øverst) */}
            <line x1="12" y1="12" x2="12" y2="7.5" />
            {/* Stor viser: Starter mere til højre (5-tiden) og spoler kortere tilbage på hover */}
            <line 
              x1="12" y1="12" 
              x2="12" y2="16.5" 
              className="origin-[12px_12px] -rotate-[35deg] group-hover:-rotate-[100deg] transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
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
          <div className="absolute bottom-1 left-1 w-3 h-3 bg-gradient-to-tr from-pink-500 to-yellow-300 rounded-full blur-sm opacity-0 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-500 translate-y-1 -translate-x-1" />
          <Sparkles className="text-[#db2777] drop-shadow-sm relative z-10 transition-all duration-700 group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:scale-110 group-hover:rotate-12" size={32} />
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
            .group:hover .lock-shackle { stroke-dashoffset: 17; }
          `}</style>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4d7c0f] drop-shadow-sm relative z-10 transition-all duration-500 group-hover:scale-[1.1] group-hover:-translate-y-1">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            {/* Stregen udviskes over i låsen fra den højre løse ende - præcis ligesom uret! */}
            <path d="M7 11V7a5 5 0 0 1 9.9-1" className="lock-shackle" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="services" className="pt-20 lg:pt-24 pb-20 lg:pb-24 bg-white relative z-20 -mt-8 lg:-mt-12">
      <div className="absolute top-0 left-0 w-full h-2 bison-stripes" />
      <div className="max-w-[85rem] mx-auto px-6" style={{ zoom: "65%" }}>
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-black tracking-tighter mb-4 lg:mb-6 font-display uppercase">Hvordan vi gør det <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">anderledes</span></h2>
          <p className="text-sm lg:text-base xl:text-lg text-bison-dark/60">Vi har fjernet alt det, der normalt gør et webprojekt til en langsommelig hovedpine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ x: -50, y: -50 }}
              whileInView={{ x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative isolate"
            >
              {/* Fuzzy svævende skyer UDENOM kortet */}
              <div className="absolute -inset-8 pointer-events-none opacity-40 z-[-1] transition-opacity duration-500 group-hover:opacity-70">
                <div className={`absolute top-[-10%] left-[-15%] w-[80%] h-[80%] rounded-full blur-[40px] ${s.cloudColor} animate-cloud-1 group-hover:[animation-play-state:paused]`} />
                <div className={`absolute bottom-[-10%] right-[-15%] w-[90%] h-[90%] rounded-full blur-[50px] ${s.cloudColor} animate-cloud-2 group-hover:[animation-play-state:paused]`} />
              </div>

              {/* Selve kortkroppen, der hviler 'på' skyerne */}
              <div className={`h-full ${s.color} p-5 lg:p-6 xl:p-10 rounded-[1.5rem] xl:rounded-[2.5rem] border flex flex-col items-center text-center gap-4 lg:gap-5 transition-shadow duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]`}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-white/90 backdrop-blur-md rounded-[1rem] xl:rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                  {s.icon}
                </div>
                <h3 className="text-[1rem] lg:text-[1.1rem] xl:text-[1.6rem] font-black font-display uppercase tracking-tight relative z-10 whitespace-nowrap">{s.title}</h3>
                <p className="text-xs lg:text-sm xl:text-lg text-bison-dark/70 leading-relaxed relative z-10 font-medium">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  const scrollRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 80%", "end start"]
  });
  
  // Parallax bevægelse fra -15% til 15% af vinduets bredde (starter venstre, slutter højre)
  const xScroll = useTransform(scrollYProgress, [0, 1], ["-15vw", "15vw"]);

  return (
    <section 
      ref={scrollRef} 
      className="pt-32 lg:pt-40 xl:pt-56 pb-20 lg:pb-24 xl:pb-32 relative overflow-hidden bg-white"
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/cloud-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.7,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
        }}
      />
      <div className="max-w-3xl xl:max-w-4xl mx-auto px-6 relative z-10 w-full overflow-visible flex flex-col items-center justify-center" style={{ zoom: "65%" }}>
        {/* Togskinner: Nu bundet internt til kortet så afstanden er ens og zoom-skaleret. z-10 på wrapperen forhindrer dem i at forsvinde om bag sidens baggrund. */}
        {/* Togskinner: Dynamisk fadet og tapered ud mod skærmens kanter. w-[160vw] sikrer edge-to-edge i 65% zoom miljøet. */}
        <div 
          className="bison-stripes absolute left-1/2 -translate-x-1/2 top-24 xl:top-36 w-[160vw] h-[6px] opacity-90 -z-10"
          style={{
            clipPath: "polygon(0 50%, 35% 0, 65% 0, 100% 50%, 65% 100%, 35% 100%)",
            maskImage: "linear-gradient(to right, transparent 5%, black 40%, black 60%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 5%, black 40%, black 60%, transparent 95%)"
          }}
        />
        <div 
          className="bison-stripes absolute left-1/2 -translate-x-1/2 bottom-24 xl:bottom-36 w-[160vw] h-[6px] opacity-90 -z-10"
          style={{
            clipPath: "polygon(0 50%, 35% 0, 65% 0, 100% 50%, 65% 100%, 35% 100%)",
            maskImage: "linear-gradient(to right, transparent 5%, black 40%, black 60%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 5%, black 40%, black 60%, transparent 95%)"
          }}
        />

        <motion.div
          style={{ x: xScroll }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-6 md:p-8 lg:p-10 xl:p-20 rounded-2xl xl:rounded-3xl shadow-xl relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 backdrop-blur-2xl bg-bison-brown/30 border border-white/50 rounded-[0.8rem] xl:rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.1)] rotate-3 hover:scale-105 hover:rotate-6 transition-all duration-300 z-20 group">
          <div className="relative flex items-center justify-center -rotate-[24deg] translate-y-0.5">
            <Megaphone className="text-white drop-shadow-sm relative z-10 w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
            {/* Single animated, flattish sound wave, centered on the mouth */}
            <motion.div 
              animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.1], x: [0, 10] }} 
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute -right-1 top-1/2 -translate-y-[65%] w-1 h-3 lg:w-1.5 lg:h-4 xl:w-2 xl:h-5 rounded-[100%] border-r-[2.5px] border-white/80 z-0"
            />
          </div>
        </div>

        <div className="mb-5 lg:mb-8 xl:mb-10">
          <div className="inline-block bg-bison-dark/5 px-3 py-1 xl:px-4 xl:py-1 rounded-full text-[9px] lg:text-[10px] xl:text-xs font-bold uppercase tracking-widest text-bison-dark/60 mb-3 xl:mb-4">Vores filosofi</div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-black font-display uppercase tracking-tighter leading-tight">
            Med ærlighed <br />
            kommer <span className="italic font-serif normal-case font-medium text-bison-brown">man længst</span>
          </h2>
        </div>

        <div className="space-y-3 lg:space-y-4 xl:space-y-6 text-sm lg:text-base xl:text-lg text-bison-dark/70 leading-relaxed">
          <p>Mange bureauer bruger udmattede processer, beder om at få tilsendt alt skrivearbejdet og putter dig alligevel bare i en standard skabelon. Derudover betaler man hver måned flere hundrede kroner for "hosting og vedligehold", selvom der - for de fleste - ikke er noget af hoste og vedligeholde, når først siden er sat op.</p>
          <p>Hos Bison har vi en "no bullshit"-metode. Her får du et rigtig godt stykke ærligt arbejde, uden at blive ved med at betale for det. Processen er også ukompliceret: Du svarer mundtligt på nogle grundige spørgsmål, og derfra bygger vi en platform, der afspejler jeres virksomhed på en, faktisk, fed måde.</p>
          <p>Vi bruger aldrig skabeloner. Alt bygges fra bunden med skarpt fokus på konvertering. Hjemmesiden får sit eget liv gennem dynamiske animationer og interaktive elementer, der sikrer, at ingen glemmer jer.</p>
          <p className="font-bold text-bison-dark">Hos Bison kommer man længst med ærlighed. Hvis vi selv skulle have bygget en hjemmeside, ville vi ønske, det var præcis, som vi tilbyder det nu.</p>
        </div>

        <div className="mt-6 lg:mt-8 xl:mt-12 pt-6 lg:pt-8 xl:pt-12 border-t border-bison-dark/5 flex items-center gap-3 lg:gap-4 xl:gap-5">
          <div className="flex -space-x-2 xl:-space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full overflow-hidden ring-2 xl:ring-4 ring-white bg-white relative z-30 shadow-sm">
              <img src="/assets/1.png" alt="Oliver" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full overflow-hidden ring-2 xl:ring-4 ring-white bg-white relative z-20 shadow-sm">
              <img src="/assets/2.png" alt="Mads" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full overflow-hidden ring-2 xl:ring-4 ring-white bg-white relative z-10 shadow-sm">
              <img src="/assets/3.png" alt="Jens" className="w-[120%] h-[120%] object-cover object-top translate-x-[6%] -translate-y-[10%]" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <p className="font-black font-display uppercase tracking-wide text-[10px] lg:text-xs xl:text-sm text-bison-dark">Bison Company</p>
            <p className="text-[9px] lg:text-[10px] xl:text-xs text-bison-dark/40 font-bold uppercase tracking-widest mt-0.5">Vi står bag hvert et ord</p>
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
    features: ['45 min. behovsinterview', 'High-end design & animationer', 'Professionel tekstforfatning', 'Færdig på 7 dage', '100% ejerskab af alt', '0 kr. i månedligt gebyr'], 
    buttonText: 'Start her', 
    buttonVariant: 'secondary',
    themeColor: 'green'
  },
  { 
    planName: 'Kerne-sitet', 
    description: 'Til virksomheden, der vil have plads til at folde sine ydelser ud.', 
    price: '13.900', 
    priceSuffix: 'kr. (Én gang)', 
    features: ['Alt fra One-pager pakken', 'Op til 5 unikke hovedsider', 'Plads til ydelser, om os & cases', 'Færdig på 7 dage', '100% ejerskab af alt', '0 kr. i månedligt gebyr'], 
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
       <div className={`w-full md:w-[45%] flex flex-col items-start ${align === 'right' ? 'md:pl-16 md:pr-4' : 'md:pr-16 md:pl-4'}`}>
         <div className="mb-6">
           <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest shadow-[0_2px_10px_rgba(0,0,0,0.05)]" style={{ backgroundColor: bgColor, color: textColor }}>
             Step {step}
           </span>
         </div>
         <h3 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1b1b1b]">
           <span className="italic font-serif normal-case font-medium">{title1}</span>{title2}
         </h3>
         <p className="text-lg md:text-xl text-black/50 font-medium leading-relaxed max-w-[400px]">
           {desc}
         </p>
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

  return (
    <section 
      className="relative z-20 overflow-hidden bg-white" 
      id="smooth-liftoff"
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/cloud-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.7,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
        }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 xl:pt-56 pb-32" style={{ zoom: "65%" }}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-40 z-10 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-6 text-[#1b1b1b]"
          >
            Fra start til slut <br />
            <span className="italic font-serif normal-case font-medium text-bison-brown">uden bøvl</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-[21px] text-black/60 font-medium leading-relaxed"
          >
            Glem alt om langhårede processer. Vi har kogt forløbet ned til tre simple trin, så du kan få en professionel side uden at miste fokus på din forretning.
          </motion.p>
        </div>

        {/* Workflow steps */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-12">
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
          
          <div className="flex flex-col gap-32 md:gap-40 lg:gap-48 relative z-10 md:py-24">
            <StepItem 
              step="01" 
              title1="45 minutters " title2="interview" 
              desc="Vi mødes (over telefon eller kaffe) og trækker din viden ud af hovedet på dig. Det er alt, vi skal bruge for at skrive dine tekster og designe din side."
              align="left"
              bgColor="#b2d08d"
              textColor="#000"
            />
            <StepItem 
              step="02" 
              title1="Vi bygger " title2="det hele" 
              desc="Mens du passer dit arbejde, designer og koder vi din side. Vi sørger for alt det tekniske, tekstforfatningen og de detaljer, der får dig til at skille dig ud."
              align="right"
              bgColor="#e5aad8"
              textColor="#000"
            />
            <StepItem 
              step="03" 
              title1="Fuldt " title2="ejerskab" 
              desc="Efter præcis en uge går vi live. Du ejer siden 100%. Det betyder ingen binding, ingen månedlige gebyrer og ingen 'digital husleje' til os."
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cases = [
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
    <main>
      <Hero />
      <Services />
      <Mission />

      {/* Case Preview Section via Container Scroll Animation */}
      <section className="bg-white overflow-hidden relative z-20">
        <div className="flex flex-col overflow-hidden py-4 md:py-6" style={{ zoom: "65%" }}>
          <ContainerScroll
            titleComponent={
              <div className="text-center drop-shadow-sm pb-8 xl:pb-0">
                <h2 className="text-5xl md:text-6xl lg:text-[5rem] xl:text-[8rem] font-black tracking-tighter font-display uppercase text-bison-dark whitespace-nowrap">
                  Solidt <span className="italic font-serif normal-case text-bison-brown">håndværk</span>
                </h2>
              </div>
            }
            leftArrow={
              <button 
                onClick={prevCase}
                className="w-16 h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-bison-dark/5 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform text-bison-dark hover:text-bison-brown z-50 cursor-pointer"
              >
                <ChevronLeft size={32} strokeWidth={2.5} />
              </button>
            }
            rightArrow={
              <button 
                onClick={nextCase}
                className="w-16 h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-bison-dark/5 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform text-bison-dark hover:text-bison-brown z-50 cursor-pointer"
              >
                <ChevronRight size={32} strokeWidth={2.5} />
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
                  className="absolute inset-0 overflow-hidden bg-[#f4f5f7] flex flex-col items-center justify-center w-full h-full border border-dashed border-bison-dark/10 text-center px-6 z-50 rounded-[24px] md:rounded-[30px] xl:rounded-[40px]"
                >
                  <div className="w-16 h-16 bg-bison-dark/5 rounded-full flex items-center justify-center mb-6 bg-clip-padding backdrop-filter backdrop-blur-sm">
                    <Rocket className="text-bison-dark/40" size={32} />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black font-display uppercase tracking-widest text-bison-dark/40 drop-shadow-sm mb-4">Næste Case</h3>
                  <p className="text-bison-dark/30 font-bold uppercase tracking-widest text-sm">Under konstruktion. Kommer snart.</p>
                </motion.div>
              ) : (
                <motion.a
                  key="case"
                  href={cases[activeCaseIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                  className="absolute inset-0 block w-full h-full group cursor-pointer overflow-hidden rounded-[24px] md:rounded-[30px] xl:rounded-[40px] bg-white"
                >
                  <img
                    src={cases[activeCaseIndex].src}
                    alt="Udvalgt Case"
                    className="mx-auto object-cover h-full w-full object-top origin-top scale-[1.04] transition-transform duration-700 group-hover:scale-[1.08] rounded-[24px] md:rounded-[30px] xl:rounded-[40px]"
                    draggable={false}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bison-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[24px] md:rounded-[30px] xl:rounded-[40px] flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl uppercase tracking-widest shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out hover:bg-white/30 hover:scale-105 active:scale-95">
                      <span>Besøg Siden</span>
                      <div className="bg-white/20 p-2 rounded-full border border-white/20 shadow-sm">
                        <ExternalLink size={24} className="text-bison-blue drop-shadow-md" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}
            </AnimatePresence>
          </ContainerScroll>
          

          <div className="flex justify-center mt-6 md:mt-12 lg:mt-16 xl:mt-24 relative z-30">
            <Link 
              to="/cases" 
              className="group px-8 py-4 lg:px-10 lg:py-5 rounded-full backdrop-blur-2xl bg-bison-brown/30 border border-white/50 text-white font-black tracking-wide text-base lg:text-lg hover:bg-bison-brown/40 hover:border-white/60 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 hover:gap-5 relative z-30"
            >
              Se mere arbejde
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Smooth Liftoff Section */}
      <SmoothLiftoff />

      {/* Modern Pricing Section */}
      <ModernPricingPage
        title={
          <>
            Gennemsigtige priser. <span className="italic font-serif normal-case font-medium text-bison-brown">Nul abonnement.</span>
          </>
        }
        subtitle="Samme elite-kvalitet og 7-dages levering på alle løsninger. Du betaler for omfanget af din side, ikke for dårligere håndværk. Du ejer det hele 100% fra dag ét."
        plans={myPricingPlans}
        showAnimatedBackground={true}
      />
      {/* Final CTA Section */}
      <section className="bg-white relative z-20 py-20 lg:py-28 xl:py-36 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)'
          }}
        />
        <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-[40px] border border-white/20 rounded-[1.5rem] lg:rounded-[2rem] xl:rounded-[3rem] p-8 lg:p-12 xl:p-24 text-center relative z-10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]" style={{ zoom: "65%" }}>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-black font-display uppercase tracking-tighter text-white leading-[0.9] mb-5 lg:mb-8 xl:mb-10">
              SLUT MED AT BETALE <br />
              <span className="italic font-serif normal-case font-medium text-bison-pink">digital husleje.</span>
            </h2>
            <p className="text-sm lg:text-base xl:text-xl text-white/60 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 lg:mb-10 xl:mb-12 leading-relaxed">
              Stop med at vente på dit bureau. Vi leverer din nye side hurtigere, end de kan nå at booke et opstartsmøde. Du ejer det hele 100%, når vi er færdige, og vi sender aldrig en regning for "vedligeholdelse". Book 15 minutter, og find ud af, om vi kan hjælpe.
            </p>
            <Magnetic
              intensity={0.2}
              springOptions={{ bounce: 0.1 }}
              actionArea='global'
              range={200}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link to="/book-et-opkald" className="relative group overflow-hidden bg-white text-bison-dark px-6 py-3 lg:px-8 lg:py-4 xl:px-12 xl:py-5 rounded-full text-base lg:text-lg xl:text-xl font-black uppercase tracking-tight shadow-xl xl:shadow-2xl transition-all duration-300 flex items-center justify-center">
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
  );
};

export default Home;
