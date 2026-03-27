import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Paintbrush, Unlock, Zap as ZapIcon, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageSkyHeader } from '../components/ui/page-sky-header';
import { FadeText } from '../components/ui/fade-text';
import { GrassWind } from '../components/ui/grass-wind';

const About = () => {
  const [tIndex, setTIndex] = useState<number>(0);

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
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center mb-16 relative z-10" style={{ zoom: "65%" }}>
          <div className="mb-6 overflow-hidden">
            <FadeText
              direction="up"
              text="OM BISON COMPANY"
              className="inline-block bg-bison-dark/5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-bison-dark/60"
              framerProps={{ show: { transition: { delay: 0.8 } } }}
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-display uppercase leading-[1.1] mb-8 w-full">
            <FadeText
              direction="right"
              text="NUL FLUFF. NUL SPILDTID."
              framerProps={{ show: { transition: { delay: 1.0 } } }}
            />
            <FadeText
              direction="down"
              text="Bare ungt, råt håndværk."
              className="italic font-serif normal-case font-medium text-bison-green stroke-bison-dark"
              framerProps={{ show: { transition: { delay: 1.2 } } }}
            />
          </h1>
          
          <div className="overflow-hidden w-full max-w-4xl">
            <FadeText
              direction="left"
              text="Bison er et passioneret tremandshold stiftet på vreden over branchens langsomme og dyre processer. Vi knokler solen sort for at bygge dit digitale ansigt udadtil – lynhurtigt, bundærligt og snorlige."
              className="text-2xl text-bison-dark/70 font-medium leading-relaxed inline-block"
              framerProps={{ show: { transition: { delay: 1.4 } } }}
            />
          </div>
        </div>
      </section>

      {/* IMAGE 1: Large Team Image with stylized background block */}
      <section className="px-6 mb-20 md:mb-24 relative z-10 -mt-16 md:-mt-20" style={{ perspective: "1500px" }}>
        <motion.div 
          initial={{ opacity: 0, rotateX: 25, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto relative"
          style={{ zoom: "65%" }}
        >
          {/* White glass effect block */}
          <div className="absolute top-10 -left-6 -right-6 bottom-[-2rem] bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.5rem] -z-10 shadow-[0_30px_60px_rgba(0,0,0,0.05)]" />
          
          {/* Colored Geometric shapes */}
          <motion.div 
            animate={{ rotate: 360, y: [-10, 10, -10] }} 
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -left-16 top-0 w-24 h-24 border-[3px] border-bison-pink/80 rounded-lg rotate-12 -z-20 shadow-sm" 
          />
          <motion.div 
            animate={{ rotate: -360, x: [-10, 10, -10] }} 
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, x: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -right-16 bottom-16 w-32 h-32 rounded-full border-[3px] border-bison-blue/80 -z-20 border-dashed shadow-sm" 
          />
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 -bottom-10 w-16 h-16 bg-bison-green/50 rounded-full blur-[14px] -z-20" 
          />

          <div className="aspect-[21/9] md:aspect-[16/7] rounded-3xl overflow-hidden shadow-xl relative bg-bison-dark">
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
      <section className="pt-16 md:pt-24 pb-24 px-6 relative z-10">
        <div className="max-w-[70rem] mx-auto" style={{ zoom: "65%" }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 1.8 } },
              hidden: {}
            }}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={{
               hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(15px)" },
               visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } }
              }}
              className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-4 text-bison-dark"
            >
              VORES METODE <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">i fokus</span>
            </motion.h2>
            <motion.p 
              variants={{
               hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
               visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-sm md:text-base text-bison-dark/60 max-w-xl mx-auto font-bold uppercase tracking-widest"
            >
              INGEN SKABELONER - BARE BENHÅRDT HÅNDVÆRK
            </motion.p>
          </motion.div>

          {/* New 3 USPs replacing 5 cards - Floating Background Icons */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 mb-32">
            {[
              { title: "DESIGN-NØRDERI", desc: "Vi bygger alt fra bunden. Det betyder lynhurtige sider og animationer, der får dine konkurrenter til at ligne fortiden.", icon: <Paintbrush size={260} className="text-bison-green" strokeWidth={1} /> },
              { title: "TIDSBESPARENDE", desc: "Vi trækker din viden ud af hovedet på dig på 45 minutter. Vi skriver teksterne, så du kan passe din forretning imens.", icon: <ZapIcon size={280} className="text-bison-pink" strokeWidth={1} /> },
              { title: "RENT EJERSKAB", desc: "Når vi er færdige, klipper vi forbindelsen. Du ejer det hele 100%. Slut med at betale \"digital husleje\" for din egen side.", icon: <Unlock size={230} className="text-bison-blue" strokeWidth={1} /> }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 + (i * 0.1) }}
                className="flex-1 flex flex-col items-center text-center group relative overflow-visible py-8"
              >
                {/* Large Background Icon */}
                <motion.div 
                  animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40 -z-10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:opacity-[0.55]"
                >
                  {f.icon}
                </motion.div>

                {/* Text Content */}
                <div className="relative z-10 px-4 mt-10">
                  <h4 className="font-black font-display uppercase text-xl md:text-2xl tracking-tight text-bison-dark mb-3 drop-shadow-md bg-white/50 md:bg-transparent rounded-lg">{f.title}</h4>
                  <p className="text-sm text-bison-dark/60 font-bold leading-relaxed max-w-xs mx-auto drop-shadow-md bg-white/50 md:bg-transparent rounded-lg py-1 px-2">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wide Stats Banner with Glassmorphism and Pulsing BG */}
          <div className="relative">
            {/* Background Pulsing Lights */}
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-visible">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [-30, 30, -30],
                  y: [-10, 10, -10]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-bison-pink/30 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply"
              />
              <motion.div
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  x: [30, -30, 30],
                  y: [10, -10, 10]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-bison-green/30 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-bison-blue/30 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply"
              />
            </div>

            {/* Glassmorphism Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="relative z-10 w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="lg:w-1/3 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-bison-dark leading-tight">
                  VI BYGGER DIN <br />
                  <span className="text-bison-brown italic font-serif normal-case font-medium">digitale autoritet</span>
                </h3>
              </div>
              <div className="lg:w-2/3 flex flex-wrap sm:flex-nowrap justify-center lg:justify-end gap-12 w-full">
                {[
                  { val: "100%", label: "EJERSKAB FRA DAG 1" },
                  { val: "0 KR.", label: "MÅNEDLIGE GEBYRER" },
                  { val: "45", suffix: " MIN.", label: "ARBEJDE FRA DIN SIDE" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center flex-1 flex flex-col items-center justify-center -mt-2">
                     <div className="flex items-baseline gap-1 whitespace-nowrap text-bison-dark mb-2">
                       <span className="text-5xl md:text-6xl font-black font-display tracking-tighter">{stat.val}</span>
                       {stat.suffix && <span className="text-3xl md:text-5xl font-black font-display tracking-tighter">{stat.suffix}</span>}
                     </div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-bison-dark/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMAGE 3: Executive Team */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-[70rem] mx-auto" style={{ zoom: "65%" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-bison-dark"
            >
              MENNESKERNE <span className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1">bagved</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-bison-dark/60 max-w-md text-sm font-bold leading-relaxed text-left md:text-right"
            >
              Vi er ikke et stort, tungt bureau med projektledere og kaffemøder. Vi er et lille hold af specialister, der har fokus på én ting: At gøre det virkelig godt, uden det er bøvlet for dig.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Oliver Rørbæk",
                role: "Adm. Direktør / Ejer",
                desc: "Founder og husets perfektionistiske designnørd. Kombinerer tung salgserfaring med en kompromisløs jagt på visuel perfektion. Jeg vil bryde industristandarden og bevise, at en hjemmeside kan bygges smukkere og simplere uden alt besværet.",
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
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer relative"
              >
                <div className={`aspect-[4/5] rounded-2xl overflow-hidden mb-5 relative ${member.color}/20`}>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className={member.imgClassName} 
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Description Overlay */}
                  <div className="absolute inset-0 bg-bison-dark/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-white text-sm leading-relaxed font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {member.desc}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-black font-display uppercase tracking-tight text-bison-dark mb-1">{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-bison-dark/60">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 4: Vision, Mission, Story Stack */}
      <section className="py-24 bg-[#fbfbf9] px-6 border-t border-bison-dark/5">
        <div className="max-w-[70rem] mx-auto" style={{ zoom: "65%" }}>

          {/* Stacked Blocks - Unfolding Animation with Characteristic Colors */}
          <div className="flex flex-col relative">
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
                initial={{ opacity: 0, y: -40 * (i + 1) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: i * 0.2, 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`${block.bg} px-10 ${i > 0 ? 'pb-8 pt-[4.5rem] md:pt-[5rem] md:pb-10' : 'py-8 md:py-10'} flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-32 w-full shadow-lg rounded-t-[2.5rem] ${i === 2 ? 'rounded-b-[2.5rem] mb-0' : '-mb-10'} ${block.zIndex} border-t border-white/40 relative z-10`}
              >
                <div className="md:w-[25%] lg:w-1/4 md:text-right md:pr-[2rem] lg:pr-[3rem]">
                  <h3 className="text-4xl md:text-[2.6rem] font-black font-display uppercase tracking-tight text-[#163321]">{block.title}</h3>
                </div>
                <div className="md:w-[75%] lg:w-3/4">
                  <p className="text-[#133320]/80 font-medium leading-relaxed text-sm md:text-base lg:pr-10">
                    {block.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 5: Light Testimonial Section */}
      <section className="py-24 md:py-32 bg-[#fbfbf9] px-6 text-bison-dark overflow-hidden relative">
        <div className="max-w-[70rem] mx-auto relative z-10" style={{ zoom: "65%" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-start mb-16 md:mb-20"
          >
            {/* "What they say" on the left, with animated underline */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-bison-dark">RYGTET SIGER</h3>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="h-[2px] md:h-1 bg-bison-blue opacity-50 w-full rounded-full origin-left mt-1"
              />
            </div>
            
            {/* Quote on the right */}
            <div className="flex items-center">
              <Quote className="text-bison-green opacity-90 hidden md:block" size={64} strokeWidth={2.5} />
              <Quote className="text-bison-green opacity-90 md:hidden" size={40} strokeWidth={2.5} />
            </div>
          </motion.div>
          
          <div className="min-h-[16rem] md:min-h-[14rem] relative">
            <AnimatePresence mode="wait">
              <motion.p 
                key={tIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-medium font-serif italic text-bison-dark/60 leading-relaxed max-w-[65rem] tracking-tight"
              >
                "{testimonials[tIndex].quote}"
              </motion.p>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-bison-dark/10 pt-10 flex flex-col md:flex-row gap-6 justify-between items-center"
          >
            {/* Reviewer info */}
            <div className="flex flex-col w-full md:w-auto text-center md:text-left h-16 justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-black font-display uppercase tracking-tight text-xl text-bison-dark mb-1">{testimonials[tIndex].name}</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-bison-dark/40">{testimonials[tIndex].title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Clean arrow buttons without glass background */}
            <div className="flex gap-6 w-full md:w-auto justify-center md:justify-end cursor-pointer">
              <button onClick={prevT} aria-label="Forrige" className="flex items-center justify-center hover:scale-125 hover:-translate-x-2 transition-all text-bison-blue opacity-90 px-2 py-1">
                <ArrowLeft size={32} strokeWidth={2.5} />
              </button>
              <button onClick={nextT} aria-label="Næste" className="flex items-center justify-center hover:scale-125 hover:translate-x-2 transition-all text-bison-pink opacity-90 px-2 py-1">
                <ArrowRight size={32} strokeWidth={2.5} />
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
