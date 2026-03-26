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
        <div className="max-w-7xl mx-auto" style={{ zoom: "65%" }}>
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Mission & Features */}
            <div className="relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block bg-bison-dark/5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-bison-dark/60 mb-6"
              >
                Book en snak
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="text-6xl md:text-8xl font-black tracking-tighter font-display uppercase leading-[0.9] mb-4 text-bison-dark"
              >
                Lad os se <br />
                om vi <br />
                <span className="italic font-serif normal-case font-medium text-bison-brown/60 pt-2 inline-block drop-shadow-sm">kan hjælpe</span>
              </motion.h1>
              
              {/* Expanding text section pushing items physically down */}
              <motion.div
                initial={{ gridTemplateRows: "0fr", opacity: 0, y: -20 }}
                animate={{ gridTemplateRows: "1fr", opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="grid"
              >
                <div className="overflow-hidden">
                  <p className="text-xl text-bison-dark/60 max-w-md leading-relaxed mt-4 mb-12">
                    Vælg et tidspunkt der passer dig, så tager vi en uforpligtende snak om dine mål og hvordan vi potentielt kan hjælpe dig med at nå dem.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-8 mb-12">
                {[
                  { icon: <Calendar strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-bison-green" />, title: "Gratis Strategisession", desc: "15 minutters fokuseret rådgivning." },
                  { icon: <Video strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-bison-pink" />, title: "Online Møde", desc: "Vi mødes via Google Meet." },
                  { icon: <MessageSquare strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8 text-bison-blue" />, title: "Ingen Binding", desc: "Bare en god snak om dine muligheder." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 2.0 + (i * 0.15), duration: 0.5, ease: "easeOut" }}
                    className="flex gap-5 md:gap-6 items-start"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-[1rem] md:rounded-[1.2rem] flex items-center justify-center shadow-lg border border-bison-dark/5 shrink-0 transform hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight">{item.title}</h3>
                      <p className="text-base md:text-lg text-bison-dark/60 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 bg-bison-bg rounded-3xl border border-bison-dark/5">
                <h3 className="text-xl font-black font-display uppercase mb-4 tracking-tight">Hvad sker der nu?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm text-bison-dark/60 items-start">
                    <ArrowRight size={18} className="text-bison-brown shrink-0 mt-0.5" />
                    Du vælger et tidspunkt der passer dig i kalenderen.
                  </li>
                  <li className="flex gap-3 text-sm text-bison-dark/60 items-start">
                    <ArrowRight size={18} className="text-bison-brown shrink-0 mt-0.5" />
                    Du modtager en bekræftelse og et link til mødet.
                  </li>
                  <li className="flex gap-3 text-sm text-bison-dark/60 items-start">
                    <ArrowRight size={18} className="text-bison-brown shrink-0 mt-0.5" />
                    Vi tager en snak om dine mål og lægger en plan.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8 relative w-full z-10">
              <div className="relative w-full">
                {/* Main Calendar Widget */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-white rounded-[3rem] shadow-2xl relative z-10 w-full overflow-hidden border border-bison-dark/5 min-h-[500px] flex flex-col"
                >
                  <div className="p-8 bg-bison-dark text-white text-center">
                    <h2 className="text-2xl font-black font-display uppercase tracking-tight">Vælg tidspunkt</h2>
                    <div className="flex justify-center items-center gap-2.5 mt-2">
                      <motion.div 
                        animate={{ opacity: [0.6, 1, 0.6] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                        className="w-2.5 h-2.5 shrink-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" 
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60">Ledige tider i dag</span>
                    </div>
                  </div>

                  <div 
                    id="book-snak-widget"
                    className="w-full bg-[#fbfbf9] rounded-b-[3rem] border-t border-bison-dark/5 overflow-y-auto" 
                    style={{ height: "550px" }}
                  >
                    {/* min-h-full uden højderestriktioner på Cal, lader widgeten sprede sig internt,
                        hvilket kvæler iFrame'ens egen stædige dobbelte scroll-hopmekanisme */}
                    <div className="w-full min-h-full">
                      <Cal
                        calLink="oliver-bison/15min"
                        style={{ width: "100%" }}
                        config={{ layout: "month_view", theme: "light" }}
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-bison-bg border-t border-bison-dark/5 text-center">
                    <p className="text-xs font-bold text-bison-dark/40 uppercase tracking-widest">Vi glæder os til at møde dig</p>
                  </div>
                </motion.div>

                {/* The 3 Floating Ovals - The Team */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -15 }}
                    animate={{ opacity: 1, x: 0, rotate: 6 }}
                    transition={{ delay: 2.2, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "45% 55% 42% 58% / 55% 45% 58% 42%" }}
                    className="absolute top-[5%] -right-12 md:-right-24 lg:-right-36 w-32 h-44 md:w-40 md:h-56 shadow-2xl overflow-hidden"
                  >
                    <img src="/assets/1.png" className="w-full h-full object-cover scale-105 grayscale" alt="Oliver Rørbæk" referrerPolicy="no-referrer" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    transition={{ delay: 2.4, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "55% 45% 60% 40% / 40% 60% 45% 55%" }}
                    className="absolute top-[35%] -right-16 md:-right-32 lg:-right-44 w-32 h-44 md:w-40 md:h-56 shadow-2xl overflow-hidden"
                  >
                    <img src="/assets/2.png" className="w-full h-full object-cover scale-105 grayscale" alt="Mads Brunsbjerg" referrerPolicy="no-referrer" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -20 }}
                    animate={{ opacity: 1, x: 0, rotate: 10 }}
                    transition={{ delay: 2.6, type: "spring", bounce: 0.4, stiffness: 60 }}
                    style={{ borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%" }}
                    className="absolute top-[65%] -right-8 md:-right-20 lg:-right-28 w-32 h-44 md:w-40 md:h-56 shadow-2xl overflow-hidden"
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
                className="bg-bison-blue/10 p-10 rounded-[2.5rem] border border-bison-blue/20"
              >
                <h3 className="text-xl font-black font-display uppercase mb-4 tracking-tight">Passer tiderne ikke?</h3>
                <p className="text-sm text-bison-dark/60 mb-6">Send os en direkte besked, så finder vi et tidspunkt der fungerer for dig.</p>
                <div className="relative inline-block">
                  <motion.button 
                    onClick={() => setShowMailPopup(!showMailPopup)} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="inline-block bg-bison-dark text-white px-8 py-3 rounded-full font-bold text-sm shadow-md transition-shadow hover:shadow-lg focus:outline-none"
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-5 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.12)] text-center flex flex-col items-center gap-2 z-50 origin-top"
                      >
                        {/* Taleboble spids OP mod knappen */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-[10px] border-transparent border-b-white/70 drop-shadow-sm" />
                        
                        <p className="text-xs font-bold uppercase tracking-widest text-bison-dark/50">Vores direkte e-mail</p>
                        <p className="text-lg font-black font-display text-bison-dark selection:bg-bison-pink/30">team@bisoncompany.dk</p>
                        <button onClick={handleCopy} className={`mt-2 text-xs font-bold uppercase tracking-widest text-white px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md focus:outline-none flex gap-2 items-center ${copiedMail ? 'bg-bison-dark' : 'bg-bison-green hover:bg-bison-green/90'}`}>
                          {copiedMail ? <><Check size={14} strokeWidth={3} /> Kopieret</> : "Kopier"}
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
