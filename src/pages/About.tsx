import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Paintbrush, Unlock, Zap as ZapIcon, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageSkyHeader } from '../components/ui/page-sky-header';
import { FadeText } from '../components/ui/fade-text';
import { GrassWind } from '../components/ui/grass-wind';

const About = () => {
  const [tIndex, setTIndex] = useState<number>(0);
  const metodeRef = useRef<HTMLDivElement>(null);
  const isMetodeInViewRaw = useInView(metodeRef, { once: true, amount: 0.2 });
  const [isMetodeInView, setIsMetodeInView] = useState(false);
  const [activeMember, setActiveMember] = useState<number | null>(null);

  useEffect(() => {
    if (isMetodeInViewRaw) {
      if (window.scrollY < 100) {
        const timer = setTimeout(() => setIsMetodeInView(true), 1800);
        return () => clearTimeout(timer);
      } else {
        setIsMetodeInView(true);
      }
    }
  }, [isMetodeInViewRaw]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      quote: "Før Bison undskyldte jeg for min hjemmeside. Nu sender jeg links til kunder med rank ryg. Det vildeste er, at jeg stort set ikke selv rørte en finger.",
      name: "Tilfreds Kunde",
      title: "Virksomhedsejer"
    },
    {
      quote: "Det nye design har fuldstændig transformeret vores konvertering. Teamet formåede at oversætte vores komplekse ydelser til et simpelt og utroligt fængende univers, brugerne endelig forstår.",
      name: "Marcus Halberg",
      title: "Founder, Nordic Scale"
    },
    {
      quote: "Bison Company leverer ikke bare flotte pixels; de bygger strategiske løsninger der kan mærkes direkte på bundlinjen. Niveauet af gennemsigtighed og eksekvering er uovertruffet.",
      name: "Sarah Lind",
      title: "Global CEO, Glowhaus & Partner"
    }
  ];

  const nextT = () => setTIndex((p) => (p + 1) % testimonials.length);
  const prevT = () => setTIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="pt-32">
      <PageSkyHeader />
      
      {/* 1. Hero Section (Kept exactly as it was) */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-[832px] mx-auto text-center flex flex-col items-center mb-10 relative z-10">
          <div className="mb-4 overflow-hidden">
            <FadeText
              direction="up"
              text="OM BISON COMPANY"
              className="inline-block bg-bison-dark/5 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-bison-dark/60"
              framerProps={{ show: { transition: { delay: 0.8 } } }}
            />
          </div>
          
          <h1 className="text-[39px] md:text-[62px] font-black tracking-tighter font-display uppercase leading-[1.1] mb-5 w-full">
            <FadeText
              direction="right"
              text="INGEN SPILDTID ELLER TOMME ORD."
              framerProps={{ show: { transition: { delay: 1.0 } } }}
            />
            <FadeText
              direction="down"
              text="Bare ungt, råt håndværk."
              className="italic font-serif normal-case font-medium text-bison-green brightness-90"
              framerProps={{ show: { transition: { delay: 1.2 } } }}
            />
          </h1>
          
          <div className="overflow-hidden w-full max-w-[580px]">
             <motion.p
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.4 }}
               className="text-[16px] text-bison-dark/70 font-medium leading-relaxed inline-block"
             >
               Bison er et passioneret tremandshold stiftet på vreden over branchens <br className="hidden md:block" /> langsomme og dyre processer. Vi knokler solen sort for at bygge dit digitale <br className="hidden md:block" /> ansigt udadtil – lynhurtigt, bundærligt og snorlige.
             </motion.p>
          </div>
        </div>
      </section>

      {/* IMAGE 1: Large Team Image with stylized background block */}
      <section className="px-6 mb-12 md:mb-16 relative z-10 -mt-10 md:-mt-14" style={{ perspective: "1500px" }}>
        <motion.div 
          initial={{ opacity: 0, rotateX: 25, y: 52, scale: 0.95 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[665px] mx-auto relative"
        >
          {/* White glass effect block */}
          <div className="absolute top-6 -left-[15px] -right-[15px] bottom-[-1.3rem] bg-white/40 backdrop-blur-xl border border-white/50 rounded-[1.6rem] -z-10 shadow-[0_20px_40px_rgba(0,0,0,0.05)]" />
          
          {/* Colored Geometric shapes */}
          <motion.div 
            animate={{ rotate: 360, y: [-10, 10, -10] }} 
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -left-10 top-0 w-16 h-16 border-[2px] border-bison-pink/80 rounded-md rotate-12 -z-20 shadow-sm" 
          />
          <motion.div 
            animate={{ rotate: -360, x: [-10, 10, -10] }} 
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, x: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -right-10 bottom-10 w-20 h-20 rounded-full border-[2px] border-bison-blue/80 -z-20 border-dashed shadow-sm" 
          />
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 -bottom-6 w-10 h-10 bg-bison-green/50 rounded-full blur-[9px] -z-20" 
          />

          <div className="aspect-[21/9] md:aspect-[16/7] rounded-[1.2rem] overflow-hidden shadow-lg relative bg-bison-dark">
            <img
              src="/assets/together.jpg"
              alt="Bison Team"
              className="w-full h-full object-cover object-[50%_40%] opacity-95 transition-transform duration-1000 hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* IMAGE 2: Values Cards Grid + Wide Stats Banner */}
      <section className="pt-10 md:pt-16 pb-16 px-6 relative z-10" ref={metodeRef}>
        <div className="max-w-[750px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(15px)" }}
            animate={isMetodeInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-[24px] md:text-[32px] font-black font-display uppercase tracking-tight mb-2 text-bison-dark">
              VORES METODE <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">i fokus</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={isMetodeInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-[10px] text-bison-dark/60 max-w-[374px] mx-auto font-bold uppercase tracking-widest"
            >
              INGEN SKABELONER - BARE BENHÅRDT HÅNDVÆRK
            </motion.p>
          </motion.div>

          {/* New 3 USPs replacing 5 cards - Floating Background Icons */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-5 mb-20">
            {[
              { title: "DESIGN-NØRDERI", desc: "Vi bygger alt fra bunden. Det betyder lynhurtige sider og animationer, der får dine konkurrenter til at ligne fortiden.", icon: <Paintbrush size={170} className="text-bison-green" strokeWidth={1} /> },
              { title: "TIDSBESPARENDE", desc: "Vi trækker din viden ud af hovedet på dig på 45 minutter. Vi skriver teksterne, så du kan passe din forretning imens.", icon: <ZapIcon size={180} className="text-bison-pink" strokeWidth={1} /> },
              { title: "RENT EJERSKAB", desc: "Når vi er færdige, klipper vi forbindelsen. Du ejer det hele 100%. Slut med at betale \"digital husleje\" for din egen side.", icon: <Unlock size={150} className="text-bison-blue" strokeWidth={1} /> }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isMetodeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center text-center group relative overflow-visible py-5"
              >
                {/* Large Background Icon */}
                <motion.div 
                  animate={isMetodeInView ? { y: [-5, 5, -5], rotate: [-4, 4, -4] } : {}}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40 -z-10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:opacity-[0.55]"
                >
                  {f.icon}
                </motion.div>

                {/* Text Content */}
                <div className="relative z-10 px-2 mt-6">
                  <h4 className="font-black font-display uppercase text-[14px] md:text-[16px] tracking-tight text-bison-dark mb-2">{f.title}</h4>
                  <p className="text-[10px] text-bison-dark/60 font-bold leading-relaxed max-w-[210px] mx-auto">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wide Stats Banner with Glassmorphism and Pulsing BG */}
          <div className="relative">
            {/* Background Pulsing Lights */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-visible">
              <motion.div
                animate={isMetodeInView ? { scale: [1, 1.1, 1], x: [-20, 20, -20], y: [-5, 5, -5] } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 w-64 h-64 md:w-[22rem] md:h-[22rem] bg-bison-pink/40 md:bg-bison-pink/30 rounded-full blur-[40px] md:blur-[65px] mix-blend-multiply transform-gpu"
              />
              <motion.div
                animate={isMetodeInView ? { scale: [1.1, 1, 1.1], x: [20, -20, 20], y: [5, -5, 5] } : {}}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-64 h-64 md:w-[22rem] md:h-[22rem] bg-bison-green/40 md:bg-bison-green/30 rounded-full blur-[40px] md:blur-[65px] mix-blend-multiply transform-gpu"
              />
              <motion.div
                animate={isMetodeInView ? { scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-72 h-72 md:w-[26rem] md:h-[26rem] bg-bison-blue/40 md:bg-bison-blue/30 rounded-full blur-[40px] md:blur-[65px] mix-blend-multiply transform-gpu"
              />
            </div>

            {/* Glassmorphism Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isMetodeInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[1.6rem] shadow-[0_15px_30px_rgba(0,0,0,0.05)] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8"
            >
              <div className="lg:w-1/3 text-center lg:text-left">
                <h3 className="text-[20px] md:text-[24px] font-black font-display uppercase tracking-tight text-bison-dark leading-tight">
                  VI BYGGER DIN <br />
                  <span className="text-bison-brown italic font-serif normal-case font-medium">digitale autoritet</span>
                </h3>
              </div>
              <div className="lg:w-2/3 flex flex-nowrap justify-center gap-6 md:gap-10 w-full overflow-visible">
                {[
                  { val: "100%", label: "EJERSKAB FRA DAG 1" },
                  { val: "0 KR.", label: "MÅNEDLIGE GEBYRER" },
                  { val: "45", suffix: "MIN.", label: "ARBEJDE FRA DIN SIDE" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center flex flex-col items-center justify-center -mt-1 px-1 shrink-0">
                     <div className="flex items-baseline gap-[1px] md:gap-[2px] whitespace-nowrap text-bison-dark mb-1">
                       <span className="text-[26px] sm:text-[32px] md:text-[42px] font-black font-display tracking-tighter">{stat.val}</span>
                       {stat.suffix && <span className="text-[16px] sm:text-[20px] md:text-[26px] font-black font-display tracking-tighter">{stat.suffix}</span>}
                     </div>
                    <div className="text-[6.5px] sm:text-[7.5px] md:text-[8px] font-bold uppercase tracking-widest whitespace-nowrap text-bison-dark/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMAGE 3: Executive Team */}
      <section className="py-20 md:py-24 bg-white px-6">
        <div className="max-w-[750px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-[24px] md:text-[32px] font-black font-display uppercase tracking-tight text-bison-dark text-center md:text-left"
            >
              MENNESKERNE <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">bagved</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-bison-dark/60 max-w-[340px] md:max-w-md text-[9px] md:text-[10px] font-bold leading-relaxed text-center md:text-right"
            >
              Vi er ikke et stort, tungt bureau med projektledere og kaffemøder. Vi er et lille hold af specialister, der har fokus på én ting: At gøre det virkelig godt, uden det er bøvlet for dig.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Oliver Rørbæk",
                role: "Adm. Direktør / Ejer",
                desc: "Husets perfektionistiske designnørd. Kombinerer tung salgserfaring med en kompromisløs jagt på visuel perfektion. Jeg vil bryde industristandarden og bevise, at en hjemmeside kan bygges smukkere og simplere uden alt besværet.",
                img: "/assets/1.png",
                color: "bg-bison-green",
                imgClassName: "w-full h-full object-cover grayscale mix-blend-normal opacity-95 transition-transform duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
              },
              {
                name: "Mads Brunsbjerg",
                role: "Direktør / Ejer",
                desc: "Salgsansvarlig med et gudsbenådet talent for den gode handel. Udover at styre maskinrummet og vores sociale kanaler er jeg firmaets moralske kompas, der elsker det hårde grind og sikrer ordentlighed i alt, vi lover.",
                img: "/assets/2.png",
                color: "bg-bison-pink",
                imgClassName: "w-full h-full object-cover grayscale mix-blend-normal opacity-95 transition-transform duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
              },
              {
                name: "Jens Godballe Madsen",
                role: "Salgsrådgiver",
                desc: "Tidligere tømrer, der nu bygger ærlige løsninger. Jeg er den absolutte modsætning til den gennemsnitlige, varmlufts-sælgertype. Min passion er at skære alt bullshit fra, dykke nede-på-jorden ind i dine behov og lægge en plan, der rammer plet.",
                img: "/assets/3.png",
                color: "bg-bison-blue",
                imgClassName: "w-full h-full object-cover grayscale mix-blend-normal opacity-95 transition-transform duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer relative mx-auto w-full max-w-[260px] md:max-w-none md:mx-0"
                onClick={() => setActiveMember(activeMember === i ? null : i)}
              >
                <div className={`aspect-[4/5] rounded-[12px] overflow-hidden mb-3 relative ${member.color}/20`}>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className={member.imgClassName} 
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Description Overlay */}
                  <div className={`absolute inset-0 bg-bison-dark/80 transition-all duration-500 flex flex-col justify-end p-5 ${activeMember === i ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                    <p className={`text-white text-[9.5px] leading-relaxed font-medium transition-transform duration-500 delay-100 ${activeMember === i ? 'translate-y-0' : 'translate-y-4 md:group-hover:translate-y-0'}`}>
                      {member.desc}
                    </p>
                  </div>
                </div>
                <h3 className="text-[13px] md:text-[14px] font-black font-display uppercase tracking-tight text-bison-dark mb-1">{member.name}</h3>
                <p className="text-[8px] font-bold uppercase tracking-widest text-bison-dark/60">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 4: Vision, Mission, Story Stack */}
      <section className="py-16 bg-[#fbfbf9] px-6 border-t border-bison-dark/5">
        <div className="max-w-[750px] mx-auto">

          {/* Stacked Blocks - Unfolding Animation with Characteristic Colors */}
          <div className="flex flex-col relative w-full items-center">
            {[
              { 
                title: "LOGIKKEN", 
                text: "Vi bygger kun sider, der er visuelt overlegne. Hvis det ikke ser bedre ud end dine konkurrenters, er vi ikke færdige.",
                bg: "bg-bison-green",
                zIndex: "z-30" 
              },
              { 
                title: "METODEN", 
                text: "Vi interviewer dig, skriver dine tekster og koder alt på én uge. Det er den eneste måde at bevare momentum og kvalitet.",
                bg: "bg-bison-pink",
                zIndex: "z-20"
              },
              { 
                title: "STARTEN", 
                text: "Bison opstod som en modreaktion på abonnements-fælder og langsomme processer. Vi gør det hurtigt, og vi gør det rigtigt.",
                bg: "bg-bison-blue",
                zIndex: "z-10"
              }
            ].map((block, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: -26 * (i + 1) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  delay: i * 0.2, 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`${block.bg} px-6 ${i > 0 ? 'pb-5 pt-[3rem] md:pt-[3.25rem] md:pb-6' : 'py-5 md:py-6'} flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[5.2rem] w-full max-w-[750px] shadow-md rounded-t-[1.6rem] ${i === 2 ? 'rounded-b-[1.6rem] mb-0' : '-mb-6'} ${block.zIndex} border-t border-white/40 relative z-10`}
              >
                <div className="md:w-[30%] lg:w-[28%] md:text-right md:pr-[1rem] lg:pr-[2rem]">
                  <h3 className="text-[20px] md:text-[27px] font-black font-display uppercase tracking-tight text-[#163321]">{block.title}</h3>
                </div>
                <div className="md:w-[70%] lg:w-[72%] flex items-center">
                  <p className="text-[#133320]/80 font-medium leading-relaxed text-[9px] md:text-[10.5px] max-w-[340px] md:max-w-[420px]">
                    {block.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 5: Light Testimonial Section */}
      <section className="py-16 md:py-20 bg-[#fbfbf9] px-6 text-bison-dark overflow-hidden relative">
        <div className="max-w-[750px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-between items-start mb-10 md:mb-12"
          >
            {/* "What they say" on the left, with animated underline */}
            <div className="flex flex-col items-start gap-[6px]">
              <h3 className="text-[24px] md:text-[32px] font-black font-display uppercase tracking-tight text-bison-dark">RYGTET SIGER</h3>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="h-[1.5px] md:h-[2px] bg-bison-blue opacity-50 w-full rounded-full origin-left mt-[2px]"
              />
            </div>
            
            {/* Quote on the right */}
            <div className="flex items-center">
              <Quote className="text-bison-green opacity-90 hidden md:block" size={42} strokeWidth={2.5} />
              <Quote className="text-bison-green opacity-90 md:hidden" size={26} strokeWidth={2.5} />
            </div>
          </motion.div>
          
          <div className="min-h-[140px] md:min-h-[120px] relative">
            <AnimatePresence mode="wait">
              <motion.p 
                key={tIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-[16px] md:text-[20px] lg:text-[24px] font-medium font-serif italic text-bison-dark/60 leading-relaxed max-w-[640px] tracking-tight"
              >
                "{testimonials[tIndex].quote}"
              </motion.p>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="border-t border-bison-dark/10 pt-6 flex flex-col md:flex-row gap-4 justify-between items-center"
          >
            {/* Reviewer info */}
            <div className="flex flex-col w-full md:w-auto text-center md:text-left h-10 justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-black font-display uppercase tracking-tight text-[13px] text-bison-dark mb-[2px]">{testimonials[tIndex].name}</p>
                  <p className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-bison-dark/40">{testimonials[tIndex].title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Clean arrow buttons without glass background */}
            <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end cursor-pointer">
              <button onClick={prevT} aria-label="Forrige" className="flex items-center justify-center hover:scale-125 hover:-translate-x-2 transition-all text-bison-blue opacity-90 px-2 py-1">
                <ArrowLeft size={21} strokeWidth={2.5} />
              </button>
              <button onClick={nextT} aria-label="Næste" className="flex items-center justify-center hover:scale-125 hover:translate-x-2 transition-all text-bison-pink opacity-90 px-2 py-1">
                <ArrowRight size={21} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacing before footer */}
      <div className="bg-[#fbfbf9] h-20 md:h-32" />
    </main>
  );
};

export default About;
