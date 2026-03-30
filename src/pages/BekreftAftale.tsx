import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Globe, Zap, Info, X } from 'lucide-react';
import { PageSkyHeader } from '../components/ui/page-sky-header';

const BekreftAftale = () => {
  const [searchParams] = useSearchParams();
  const pakkeQuery = searchParams.get('pakke') || 'Ifølge fremsendte tilbud';
  const prisQuery = searchParams.get('pris') || '';

  const [companyInfo, setCompanyInfo] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    if (isTermsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isTermsOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !companyInfo.trim() || !contactName.trim() || !contactEmail.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('company', companyInfo);
      formData.append('name', contactName);
      formData.append('email', contactEmail);
      formData.append('package', pakkeQuery);
      formData.append('price', prisQuery);
      
      // Submits data to the Google Apps Script endpoint
      await fetch("https://script.google.com/macros/s/AKfycbzv_e1z0FlIebngm1wYST4FI4Dwjg90xf2e0ppfMZ7StKuvLC3_BRTQaVhNStHPBrXL/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      // Vi lader dem gå igennem, selv ved no-cors "fejl", da scriptet ofte stadig har modtaget data.
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isSuccess) {
    return (
      <main className="pt-32 min-h-[80vh] flex flex-col justify-center relative">
        <PageSkyHeader />
        <section className="py-20 px-6 relative z-[100] flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-bison-dark/5 max-w-[500px] w-full p-10 text-center relative"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="w-20 h-20 bg-bison-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-bison-green" strokeWidth={3} />
            </motion.div>
            
            <h2 className="text-[32px] font-black font-display uppercase leading-none tracking-tight text-bison-dark mb-4">
              Aftale Bekræftet
            </h2>
            <p className="text-[14px] text-bison-dark/70 leading-relaxed mb-8">
              Tak for tilliden! Vi glæder os utroligt meget til at komme i gang med jeres nye hjemmeside. Vi sender faktura og næste skridt til din mail inden længe.
            </p>
            
            <div className="bg-bison-bg rounded-2xl p-4 inline-block mx-auto text-left">
              <p className="text-[10px] uppercase font-bold text-bison-dark/50 tracking-widest mb-1">Kontakt os</p>
              <p className="text-[13px] font-medium text-bison-dark">team@bisoncompany.dk</p>
            </div>
          </motion.div>
        </section>

      </main>
    );
  }

  return (
    <>
      <main className="pt-32">
      <PageSkyHeader />
      <section className="py-20 px-6 relative z-[100]">
        <div className="max-w-[900px] mx-auto">
          <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
            
            {/* Indhold : Venstre side (3 columns on PC) */}
            <div className="md:col-span-3 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-flex gap-2.5 items-center bg-bison-dark/5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-bison-dark/70 mb-5 lg:mb-6"
              >
                <ShieldCheck size={15} className="text-bison-green" /> Sikker bekræftelse
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="text-[36px] md:text-[52px] font-black tracking-tighter font-display uppercase leading-[0.9] mb-4 text-bison-dark"
              >
                Lad os komme i <br />
                gang med <span className="text-bison-blue/80 block md:inline">jeres</span> <br />
                <span className="italic font-serif normal-case font-medium text-bison-brown/60 pt-1.5 inline-block drop-shadow-sm">nye hjemmeside</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-[14px] text-bison-dark/60 leading-relaxed mb-10 max-w-[400px]"
              >
                Ingen skjulte gebyrer. Intet abonnement. Bare solidt håndværk og en professionel løsning, der virker fra dag ét.
              </motion.p>
              
              {/* Hvad siger du ja til? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="mb-10"
              >
                <h3 className="text-[14px] font-black font-display uppercase tracking-tight text-bison-dark mb-4">Dét siger I ja til</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Globe className="w-4 h-4 text-bison-blue" />, title: "Skræddersyet Hjemmeside", desc: "Professionelt design optimeret til jeres virksomhed." },
                    { icon: <Zap className="w-4 h-4 text-bison-pink" />, title: "Én Fast Pris (Ingen abonnementer)", desc: "I ejer hjemmesiden 100% når den er betalt." },
                    { icon: <Check className="w-4 h-4 text-bison-green" />, title: "Klar-til-brug løsning", desc: "Vi står for det tekniske, så I kan fokusere på jeres forretning." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-8 h-8 rounded-[8px] bg-white flex items-center justify-center shadow-md border border-bison-dark/5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="pt-1">
                        <p className="text-[14px] font-bold text-bison-dark leading-none mb-1">{item.title}</p>
                        <p className="text-[12px] text-bison-dark/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hvad sker der nu? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="p-6 bg-bison-bg rounded-[1.2rem] border border-bison-dark/5"
              >
                <h3 className="text-[12px] font-black font-display uppercase mb-4 tracking-tight">Hvad sker der efterfølgende?</h3>
                <div className="grid sm:grid-cols-3 gap-6 relative">
                  {/* Forbindelseslinje */}
                  <div className="absolute top-4 left-6 right-6 h-[1px] bg-bison-dark/10 hidden sm:block z-0" />
                  
                  {[
                    { nr: "1", title: "Vi sender faktura", text: "Du modtager roligt fakturaen på mail." },
                    { nr: "2", title: "Vi går i arbejdstøjet", text: "Vi bygger siden og ordner alt det tekniske." },
                    { nr: "3", title: "Siden går i luften", text: "I får en professionel side, der kører perfekt." }
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 flex sm:flex-col items-start gap-4 sm:gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-bison-dark/10 shadow-sm flex items-center justify-center text-[10px] font-black shrink-0">
                        {step.nr}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-bison-dark mb-0.5">{step.title}</p>
                        <p className="text-[10px] text-bison-dark/60 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Handlingsområde : Højre side (2 columns on PC) */}
            <div className="md:col-span-2 relative w-full z-10">
              {/* Sticky wrapper for desktop */}
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full overflow-hidden border border-bison-dark/5"
                >
                  <div className="p-6 bg-bison-dark text-white text-center">
                    <h2 className="text-[18px] font-black font-display uppercase tracking-tight">Bekræft Aftale</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1.5 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={12} /> Helt sikkert og enkelt
                    </p>
                  </div>

                  {/* Tilbudsoversigt fra URL */}
                  <div className="bg-[#f2f2ee] p-5 text-center border-b border-bison-dark/5">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-bison-dark/50 mb-1.5">Valgt løsning</p>
                     <p className="text-[16px] font-black font-display text-bison-dark leading-tight">{pakkeQuery}</p>
                     {prisQuery && (
                       <div className="mt-1">
                         <p className="text-[17px] font-black font-display text-[#BCD5AD] tracking-tight">{prisQuery} DKK</p>
                         <p className="text-[9px] text-bison-dark/50 font-bold uppercase tracking-widest mt-0.5">Engangsbeløb (eks. moms)</p>
                       </div>
                     )}
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 bg-[#fbfbf9]">
                    <div className="mb-4">
                      <label htmlFor="companyInfo" className="block text-[10px] font-bold uppercase tracking-widest text-bison-dark/60 mb-2 ml-1">
                        Virksomhedsnavn eller CVR
                      </label>
                      <input
                        type="text"
                        id="companyInfo"
                        value={companyInfo}
                        onChange={(e) => setCompanyInfo(e.target.value)}
                        placeholder="Skriv jeres navn her..."
                        className="w-full bg-white border border-bison-dark/10 rounded-xl px-4 py-3 text-[14px] text-bison-dark focus:outline-none focus:border-bison-dark/30 focus:ring-2 focus:ring-bison-dark/5 transition-all shadow-sm"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="contactName" className="block text-[10px] font-bold uppercase tracking-widest text-bison-dark/60 mb-2 ml-1">
                        Dit fulde navn
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="F.eks. Jens Jensen..."
                        className="w-full bg-white border border-bison-dark/10 rounded-xl px-4 py-3 text-[14px] text-bison-dark focus:outline-none focus:border-bison-dark/30 focus:ring-2 focus:ring-bison-dark/5 transition-all shadow-sm"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="contactEmail" className="block text-[10px] font-bold uppercase tracking-widest text-bison-dark/60 mb-2 ml-1">
                        Din e-mail (til faktura)
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Din mail..."
                        className="w-full bg-white border border-bison-dark/10 rounded-xl px-4 py-3 text-[14px] text-bison-dark focus:outline-none focus:border-bison-dark/30 focus:ring-2 focus:ring-bison-dark/5 transition-all shadow-sm"
                        required
                      />
                    </div>

                    <div className="mb-8 p-4 bg-white border border-bison-dark/5 rounded-xl shadow-sm">
                       <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 border-[1.5px] border-bison-dark/20 rounded-md checked:bg-bison-green checked:border-bison-green transition-all cursor-pointer"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                          />
                          <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={4} />
                        </div>
                        <div className="text-[12px] text-bison-dark/70 leading-relaxed select-none">
                          Jeg accepterer hermed tilbuddet og bekræfter, at jeg har læst og accepteret <button type="button" onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} className="font-bold underline decoration-bison-dark/20 hover:decoration-bison-dark/60 transition-colors">vilkår og betingelser</button> for opgaven.
                        </div>
                      </label>
                    </div>

                    <motion.button
                      whileHover={termsAccepted && companyInfo.trim() && contactName.trim() && contactEmail.trim() ? { scale: 1.02 } : {}}
                      whileTap={termsAccepted && companyInfo.trim() && contactName.trim() && contactEmail.trim() ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={!termsAccepted || !companyInfo.trim() || !contactName.trim() || !contactEmail.trim() || isSubmitting}
                      className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest shadow-lg transition-all 
                        ${termsAccepted && companyInfo.trim() && contactName.trim() && contactEmail.trim() 
                          ? 'bg-bison-green text-bison-dark hover:bg-[#3ec461] hover:shadow-xl' 
                          : 'bg-bison-dark/10 text-bison-dark/30 cursor-not-allowed border border-bison-dark/5'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="w-4 h-4 border-2 border-bison-dark border-t-transparent rounded-full" />
                          Bekræfter...
                        </span>
                      ) : (
                        <>
                          <Check size={16} strokeWidth={3} className={termsAccepted && companyInfo.trim() && contactName.trim() && contactEmail.trim() ? "text-bison-dark" : "hidden"} />
                          Bekræft aftale
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="p-4 bg-bison-bg border-t border-bison-dark/5 flex items-start gap-3">
                    <Info size={16} className="text-bison-blue shrink-0 mt-0.5" />
                    <p className="text-[10px] text-bison-dark/60 leading-relaxed">
                      Er der noget du er i tvivl om inden du godkender? Svar enten på mailen eller ring direkte til os.
                    </p>
                  </div>
                </motion.div>
                
                {/* Små dekorative elementer bagved boksen */}
                <div className="absolute -z-10 -right-8 -top-8 w-32 h-32 bg-bison-blue/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -z-10 -left-8 -bottom-8 w-32 h-32 bg-bison-pink/20 rounded-full blur-3xl opacity-50" />
              </div>
            </div>

          </div>
        </div>
      </section>
      </main>

      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
              className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              className="overscroll-contain custom-scrollbar w-full max-w-2xl h-full overflow-y-auto bg-white shadow-2xl relative z-10 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-bison-dark/5 sticky top-0 bg-white/90 backdrop-blur-md z-10 shadow-sm shrink-0">
                <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tighter text-bison-dark">Aftalevilkår</h2>
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="p-2 hover:bg-bison-dark/5 rounded-full transition-colors outline-none"
                >
                  <X size={24} className="text-bison-dark" />
                </button>
              </div>
              <div className="p-6 md:p-8 space-y-6 max-w-none text-bison-dark/80 font-medium leading-relaxed text-sm">
                <p className="font-bold mb-4">Standardvilkår for samarbejde med Bison Company ApS</p>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">1. Leverance</h3>
                  <p>Bison Company ApS leverer udvikling og igangsættelse af hjemmeside baseret på kundens behovsinterview samt efterfølgende opsummering og forventningsafstemning.</p>
                  <p>Hosting kan også afholdes, hvis kunden ønsker det. Prisen heraf afhænger af prisen på aktuelle domæne.</p>
                  <p>Konkret omfang, type af løsning, pris og øvrige vilkår fremgår af den skriftlige aftale mellem parterne.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">2. Pris og betaling</h3>
                  <p>Leverancen leveres efter engangsbetaling via faktura. Levering påbegyndes, når aftalen er skriftligt godkendt, og betalingen er gennemført eller accepteret.</p>
                  <p>Ved ønsket hosting aftales der indbyrdes en årlig pris, som vil fremgå af den skriftlige aftale.</p>
                  <p>Ved manglende eller forsinket betaling forbeholder Bison Company ApS sig retten til midlertidigt at sætte leverancen, herunder arbejde, support og drift, på pause, indtil betaling er modtaget.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">3. Levering og tidsplan</h3>
                  <p>Første version af hjemmesiden leveres efter gennemført behovsinterview og modtagelse af nødvendigt input fra kunden.</p>
                  <p>Angivne leveringstider er vejledende og kan påvirkes af kundens svartider og feedback.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">4. Rettelser og ændringer</h3>
                  <p>Gratis tilpasninger er inkluderet i den første måned efter launch.</p>
                  <p>Efterfølgende rettelser/justeringer/opdateringer er der rig mulighed for, blot efter vilkårlig timepris.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">5. Hosting og teknisk drift</h3>
                  <p>Hosting og teknisk drift varetages ikke af Bison Company ApS – medmindre eksplicit ønsket og aftalt, hvilket vil fremgå af den skriftlige aftale mellem parterne.</p>
                  <p>Vi viser dig hvordan du selv kan stå for det hele uden besvær, hvormed det bliver billigst muligt for kunden at have en hjemmeside kørende.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">6. Ejerskab og rettigheder</h3>
                  <p>Kunden ejer eget indhold, herunder tekst, logo og billedmateriale leveret af kunden. Den samlede hjemmesideopsætning, herunder struktur, design, teknisk implementering og tekst-modificering udarbejdes af Bison Company ApS, og ejes, efter levering af leverancen, også af kunden.</p>
                  <p>Metode, workflow og interne systemer tilhører Bison Company ApS og overdrages ikke.</p>
                  <p>Bison Company ApS forbeholder sig retten til at anvende arbejdet som reference, medmindre andet aftales skriftligt.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">7. Ansvarsbegrænsning</h3>
                  <p>Bison Company ApS leverer en teknisk og indholdsmæssig løsning, men garanterer ikke specifikke resultater såsom leads, omsætning, placeringer eller forretningsmæssig effekt.</p>
                  <p>Virksomheden kan ikke holdes ansvarlig for indirekte tab, driftstab eller tabt fortjeneste.</p>
                  <p>Bison Company ApS’ samlede ansvar kan aldrig overstige det beløb, kunden har betalt inden for de seneste 12 måneder.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">8. Fortrolighed</h3>
                  <p>Bison Company ApS og kunden forpligter sig til at behandle følsomme oplysninger, herunder forretningsmæssige og interne forhold, fortroligt.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-bison-dark mt-8 mb-2 uppercase tracking-wider text-xs">9. Lovvalg og værneting</h3>
                  <p>Aftalen er underlagt dansk ret.</p>
                  <p>Eventuelle tvister afgøres ved dansk domstol.</p>
                </div>

                <div className="mt-10 pt-6 border-t border-bison-dark/10 text-xs">
                  <p className="font-bold">Bison Company ApS</p>
                  <p>CVR: 45899713</p>
                  <p>Kontakt: team@bisoncompany.dk</p>
                  <p>Telefon: 20 32 31 44</p>
                </div>
                
                <div className="mt-12 pt-12 flex justify-center border-t border-bison-dark/10">
                  <button
                    onClick={() => setIsTermsOpen(false)}
                    className="px-10 py-4 rounded-full bg-bison-dark text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-3 outline-none"
                  >
                    Luk aftalevilkår <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BekreftAftale;
