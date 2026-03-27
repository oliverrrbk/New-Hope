import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Video, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { PageSkyHeader } from '../components/ui/page-sky-header';
import Cal, { getCalApi } from "@calcom/embed-react";

const BookCall = () => {
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("team@bisoncompany.dk");
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#1b1b1b" } },
        layout: "month_view"
      });
    })();
  }, []);

  // Aggressiv Scroll-Lock Effekter + Anti-Jump Monkeypatch
  useEffect(() => {
    let isWidgetHovered = false;
    let lockedY = window.scrollY;

    // 1. Monkeypatch som NÆGTER Cal.com scriptet at rulle os til toppen af widgeten
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = function (...args: any[]) {
      const widgetParent = document.getElementById('book-snak-widget');
      if (widgetParent && widgetParent.contains(this as Node)) {
        // Blokér alle programmatiske "scrollIntoView" kald indefra Cal.com scriptet totalt!
        return;
      }
      return originalScrollIntoView.apply(this, args);
    };

    let moveTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (moveTimeout) return;
      moveTimeout = setTimeout(() => {
        moveTimeout = null;
        const widgetEl = document.getElementById('book-snak-widget');
        if (!widgetEl) return;
        const rect = widgetEl.getBoundingClientRect();
        // Tjekker globalt om musen er inde i bunden af widget-boksen
        const isOverWidget = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        if (isOverWidget && !isWidgetHovered) {
          isWidgetHovered = true;
          lockedY = window.scrollY; // Gemmer den præcise Y-position
          
          // Beregn tykkelsen af scrollbaren, så layoutet ikke hopper ('hakket')
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollbarWidth}px`; // "Udfylder" the tomme plads, så designet fryses
          document.body.style.overscrollBehavior = 'none';

          // Giv navbar'en samme modvægt, så den ikke skyder til højre
          const navEl = document.querySelector('nav');
          if (navEl) {
            navEl.style.width = `calc(100% - ${scrollbarWidth}px)`;
          }
        } else if (!isOverWidget && isWidgetHovered) {
          isWidgetHovered = false;
          document.body.style.overflow = 'auto';
          document.body.style.paddingRight = '0px'; // Fjerner udfyldningen igen
          document.body.style.overscrollBehavior = 'auto';

          const navEl = document.querySelector('nav');
          if (navEl) {
            navEl.style.width = ''; // Nulstiller
          }
        }
      }, 50); // Throttle to 50ms to prevent layout thrashing
    };

    const killScroll = () => {
      // Hvis Cal.com via script (eller browser native focus) prøver at scrolle skærmen ned, tvinges den 100% tilbage usynligt!
      if (isWidgetHovered && window.scrollY !== lockedY) {
        window.scrollTo(0, lockedY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', killScroll, { passive: false });

    return () => {
      if (moveTimeout) clearTimeout(moveTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', killScroll);
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
      document.body.style.overscrollBehavior = 'auto';
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
      const navEl = document.querySelector('nav');
      if (navEl) {
        navEl.style.width = '';
      }
    };
  }, []);

  return (
    <main className="pt-32">
      <PageSkyHeader />
      <section className="py-20 px-6 relative z-[100]">
        <div className="max-w-[832px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Mission & Features */}
            <div className="relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block bg-bison-dark/5 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-bison-dark/60 mb-4"
              >
                Book en snak
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="text-[39px] md:text-[62px] font-black tracking-tighter font-display uppercase leading-[0.9] mb-2.5 text-bison-dark"
              >
                Lad os se <br />
                om vi <br />
                <span className="italic font-serif normal-case font-medium text-bison-brown/60 pt-1.5 inline-block drop-shadow-sm">kan hjælpe</span>
              </motion.h1>
              
              {/* Expanding text section pushing items physically down */}
              <motion.div
                initial={{ gridTemplateRows: "0fr", opacity: 0, y: -20 }}
                animate={{ gridTemplateRows: "1fr", opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="grid"
              >
                <div className="overflow-hidden">
                  <p className="text-[13px] w-full text-bison-dark/60 leading-relaxed mt-2.5 mb-8">
                    Vælg et tidspunkt der passer dig, så tager vi en<br className="hidden md:block"/>
                    uforpligtende snak om dine mål og hvordan vi<br className="hidden md:block"/>
                    potentielt kan hjælpe dig med at nå dem.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-5 mb-8">
                {[
                  { icon: <Calendar strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5 text-bison-green" />, title: "Gratis Strategisession", desc: "15 minutters fokuseret rådgivning." },
                  { icon: <Video strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5 text-bison-pink" />, title: "Online Møde", desc: "Vi mødes via Google Meet." },
                  { icon: <MessageSquare strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5 text-bison-blue" />, title: "Ingen Binding", desc: "Bare en god snak om dine muligheder." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 2.0 + (i * 0.15), duration: 0.5, ease: "easeOut" }}
                    className="flex gap-3 md:gap-4 items-start"
                  >
                    <div className="w-8 h-8 md:w-[36px] md:h-[36px] bg-white rounded-[10px] flex items-center justify-center shadow-lg border border-bison-dark/5 shrink-0 transform hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[16px] md:text-[20px] font-black font-display uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[10px] md:text-[12px] text-bison-dark/60 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-5 bg-bison-bg rounded-[1.2rem] border border-bison-dark/5">
                <h3 className="text-[13px] font-black font-display uppercase mb-2.5 tracking-tight">Hvad sker der nu?</h3>
                <ul className="space-y-2.5">
                  <li className="flex gap-2 text-[9px] text-bison-dark/60 items-start">
                    <ArrowRight size={12} className="text-bison-brown shrink-0 mt-0.5" />
                    Du vælger et tidspunkt der passer dig i kalenderen.
                  </li>
                  <li className="flex gap-2 text-[9px] text-bison-dark/60 items-start">
                    <ArrowRight size={12} className="text-bison-brown shrink-0 mt-0.5" />
                    Du modtager en bekræftelse og et link til mødet.
                  </li>
                  <li className="flex gap-2 text-[9px] text-bison-dark/60 items-start">
                    <ArrowRight size={12} className="text-bison-brown shrink-0 mt-0.5" />
                    Vi tager en snak om dine mål og lægger en plan.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-5 relative w-full z-10">
              <div className="relative w-full">
                {/* Main Calendar Widget */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full overflow-hidden border border-bison-dark/5 min-h-[325px] flex flex-col"
                >
                  <div className="p-5 bg-bison-dark text-white text-center">
                    <h2 className="text-[16px] font-black font-display uppercase tracking-tight">Vælg tidspunkt</h2>
                    <div className="flex justify-center items-center gap-1.5 mt-1.5">
                      <motion.div 
                        animate={{ opacity: [0.6, 1, 0.6] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                        className="w-1.5 h-1.5 shrink-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" 
                      />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">Ledige tider i dag</span>
                    </div>
                  </div>

                  <div 
                    id="book-snak-widget"
                    className="w-full bg-[#fbfbf9] border-t border-bison-dark/5 overflow-y-auto" 
                    style={{ height: "360px" }}
                  >
                    <div className="w-full min-h-full">
                      <Cal
                        calLink="oliver-bison/15min"
                        style={{ width: "100%", height: "100%" }}
                        config={{ layout: "month_view", theme: "light" }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-bison-bg border-t border-bison-dark/5 text-center">
                    <p className="text-[8px] font-bold text-bison-dark/40 uppercase tracking-widest">Vi glæder os til at møde dig</p>
                  </div>
                </motion.div>

                {/* The 3 Floating Ovals - The Team */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -15 }}
                    animate={{ opacity: 1, x: 0, rotate: 6 }}
                    transition={{ delay: 2.2, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "45% 55% 42% 58% / 55% 45% 58% 42%" }}
                    className="absolute top-[8%] -right-8 md:-right-16 lg:-right-24 w-[83px] h-[114px] md:w-[104px] md:h-[145px] shadow-[0_15px_30px_rgba(0,0,0,0.15)] overflow-hidden z-10"
                  >
                    <img src="/assets/1.png" className="w-full h-full object-cover scale-105 grayscale" alt="Oliver Rørbæk" referrerPolicy="no-referrer" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    transition={{ delay: 2.4, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "55% 45% 60% 40% / 40% 60% 45% 55%" }}
                    className="absolute top-[32%] -right-10 md:-right-20 lg:-right-30 w-[83px] h-[114px] md:w-[104px] md:h-[145px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden z-20"
                  >
                    <img src="/assets/2.png" className="w-full h-full object-cover scale-105 grayscale" alt="Mads Brunsbjerg" referrerPolicy="no-referrer" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -20 }}
                    animate={{ opacity: 1, x: 0, rotate: 10 }}
                    transition={{ delay: 2.6, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%" }}
                    className="absolute top-[56%] -right-5 md:-right-13 lg:-right-18 w-[83px] h-[114px] md:w-[104px] md:h-[145px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] overflow-hidden z-30"
                  >
                    <img src="/assets/3.png" className="w-full h-full object-cover scale-105 grayscale" alt="Jens Godballe Madsen" referrerPolicy="no-referrer" />
                  </motion.div>
                </div>
              </div>

              {/* Passer tiderne ikke (Bottom Section of Right Column) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-bison-blue/10 p-6 rounded-[1.6rem] border border-bison-blue/20"
              >
                <h3 className="text-[13px] font-black font-display uppercase mb-2.5 tracking-tight">Passer tiderne ikke?</h3>
                <p className="text-[9px] text-bison-dark/60 mb-4 w-[85%]">Send os en direkte besked, så finder vi et tidspunkt der fungerer for dig.</p>
                <div className="relative inline-block">
                  <motion.button 
                    onClick={() => setShowMailPopup(!showMailPopup)} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="inline-block bg-bison-dark text-white px-5 py-2 rounded-full font-bold text-[9px] shadow-md transition-shadow hover:shadow-lg focus:outline-none"
                  >
                    Send en mail
                  </motion.button>
                  <AnimatePresence>
                    {showMailPopup && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-48 p-3 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.12)] text-center flex flex-col items-center gap-1.5 z-50 origin-top"
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-[6px] border-transparent border-b-white/70 drop-shadow-sm" />
                        
                        <p className="text-[8px] font-bold uppercase tracking-widest text-bison-dark/50">Vores direkte e-mail</p>
                        <p className="text-[12px] font-black font-display text-bison-dark selection:bg-bison-pink/30">team@bisoncompany.dk</p>
                        <button onClick={handleCopy} className={`mt-1.5 text-[8px] font-bold uppercase tracking-widest text-white px-4 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md focus:outline-none flex gap-1.5 items-center ${copiedMail ? 'bg-bison-dark' : 'bg-bison-green hover:bg-bison-green/90'}`}>
                          {copiedMail ? <><Check size={10} strokeWidth={3} /> Kopieret</> : "Kopier"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookCall;
