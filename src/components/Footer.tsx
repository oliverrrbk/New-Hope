import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Mail, Phone, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const StripeDecorator = ({ vertical = false, className = "" }) => (
  <div className={`${vertical ? 'bison-stripes-vertical w-1.5 h-full' : 'bison-stripes h-1.5 w-full'} ${className}`} />
);

const Footer = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    if (isPolicyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isPolicyOpen]);

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(59, 45, 40, 0.15);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(59, 45, 40, 0.3);
        }
      `}</style>
  <footer className="text-white pt-20 md:pt-32 pb-12 overflow-hidden relative">
    {/* Background Mesh Gradient with Noise Texture */}
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#2c1a11]">
      <div 
        className="absolute inset-0 w-full h-full opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 0%, #f3d8c1 0%, rgba(243, 216, 193, 0) 55%),
            radial-gradient(ellipse at 50% 80%, #030201 0%, rgba(3, 2, 1, 0) 80%),
            radial-gradient(circle at 95% 45%, #a86c47 0%, rgba(168, 108, 71, 0) 55%),
            radial-gradient(circle at 0% 100%, #5e3522 0%, rgba(94, 53, 34, 0) 50%)
          `
        }}
      />
      {/* Grainy Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>

    <div className={`${isSafari ? 'max-w-[832px]' : 'max-w-7xl'} mx-auto px-6 relative z-10`} style={{ zoom: "65%" }}>
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 group inline-flex">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-white/20 transition-all duration-300 overflow-hidden"
            >
              <img src="/assets/logo-clean.png" alt="Bison Logo" className="w-[130%] h-[130%] object-contain scale-110" />
            </motion.div>
            <span className="text-xl md:text-2xl font-black tracking-tighter font-display uppercase group-hover:text-white/60 transition-colors duration-300 text-white/40">
              Bison Company
            </span>
          </Link>
          <h2 className="text-[26px] md:text-4xl font-black font-display uppercase tracking-tighter leading-tight mb-8 max-w-md">
            Med ærlighed <br />
            kommer <span className="italic font-serif normal-case font-medium text-bison-blue">man længst</span>
          </h2>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, url: "https://www.instagram.com/vierbison/" },
              { Icon: Linkedin, url: "https://www.linkedin.com/company/bison-company-aps/" }
            ].map(({ Icon, url }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5, backgroundColor: "#ffffff", color: "var(--color-bison-dark)" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-300"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-6">Naviger</h4>
          <ul className="space-y-4">
            {[
              { name: 'Hjem', path: '/' },
              { name: 'Om os', path: '/om-os' },
              { name: 'Cases', path: '/cases' },
              { name: 'Blog', path: '/blog' },
              { name: 'Book en snak', path: '/book-et-opkald' }
            ].map(item => (
              <li key={item.name}>
                <Link to={item.path} className="inline-block hover:text-bison-blue transition-all duration-300 hover:translate-x-2">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-6">Kontakt</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }}><Mail size={20} className="text-bison-green group-hover:text-white transition-colors" /></motion.div>
              <a href="mailto:team@bisoncompany.dk" className="hover:text-bison-green transition-colors">team@bisoncompany.dk</a>
            </li>
            <li className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }}><Phone size={20} className="text-bison-pink group-hover:text-white transition-colors" /></motion.div>
              <a href="tel:+4520323144" className="hover:text-bison-pink transition-colors">+45 20 32 31 44</a>
            </li>
            <li className="flex items-start gap-3 group">
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="pt-0.5">
                <MapPin size={20} className="text-bison-blue group-hover:text-white transition-colors" />
              </motion.div>
              <span className="leading-snug">
                Aarhus, Danmark<br />
                <span className="text-white/50 text-[10px] md:text-[14px]">
                  Bison Company ApS<br />
                  CVR: 45899713
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40">
        <p className="text-[10.5px] sm:text-[12px] md:text-sm whitespace-nowrap">© 2026 Bison Company ApS. Alle rettigheder forbeholdes.</p>
        <div className="flex gap-8">
          <button onClick={() => setIsPolicyOpen(true)} className="hover:text-white transition-colors cursor-pointer outline-none">Privatlivspolitik</button>
        </div>
      </div>
    </div>

    {/* Large background text */}
    <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 opacity-[0.05] pointer-events-none select-none text-center z-10 mix-blend-overlay">
      <h1 className="text-[25vw] font-black font-display uppercase tracking-tighter leading-none">BISON</h1>
    </div>

    {/* Top stripe acting as border */}
    <StripeDecorator className="absolute top-0 left-0 right-0 h-2 z-20" />
  </footer>

      <AnimatePresence>
        {isPolicyOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPolicyOpen(false)}
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
                <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tighter text-bison-dark">Privatlivspolitik</h2>
                <button 
                  onClick={() => setIsPolicyOpen(false)}
                  className="p-2 hover:bg-bison-dark/5 rounded-full transition-colors outline-none"
                >
                  <X size={24} className="text-bison-dark" />
                </button>
              </div>
              <div className="p-6 md:p-8 space-y-6 max-w-none text-bison-dark/80 font-medium leading-relaxed">
                <p>Hos Bison Company ApS tager vi beskyttelsen af dine personoplysninger alvorligt. I denne privatlivspolitik kan du læse, hvordan vi indsamler, behandler og opbevarer dine data, når du besøger vores hjemmeside eller benytter vores kontaktformular.</p>
                
                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">1. Dataansvarlig</h3>
                <p className="bg-bison-dark/5 p-6 rounded-2xl">
                  Den dataansvarlige for behandlingen af dine personoplysninger er:<br /><br />
                  Bison Company ApS<br />
                  CVR-nr.: 45 89 97 13<br />
                  Jens Baggesens Vej 71<br />
                  8200 Aarhus N<br />
                  E-mail: team@bisoncompany.dk<br />
                  Telefon: 20 32 31 44
                </p>

                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">2. Hvilke oplysninger indsamler vi, formål og behandlingsgrundlag?</h3>
                <p>Vi indsamler kun de oplysninger, der er nødvendige for at kunne levere vores service til dig. Vi behandler dine data ud fra følgende formål og juridiske grundlag (GDPR):</p>
                <div className="space-y-4">
                  <p><strong>Når du bruger vores kontaktformular:</strong> For at kunne besvare din henvendelse og evt. give dig et tilbud på vores ydelser, indsamler vi: Fornavn, efternavn, e-mailadresse, telefonnummer, den valgte ydelse, samt eventuelle oplysninger du selv angiver i beskeden.</p>
                  <p><strong>Behandlingsgrundlag:</strong> Behandlingen sker for at kunne træffe foranstaltninger på din anmodning forud for indgåelse af en kontrakt (GDPR art. 6, stk. 1, litra b) samt vores legitime interesse i at besvare generelle henvendelser (GDPR art. 6, stk. 1, litra f).</p>
                  
                  <div className="border-l-4 border-bison-pink pl-4 py-2 my-6">
                    <p className="mb-2"><strong>Når du booker tid hos os:</strong> Bruger du vores bookingsystem (Cal.com), indsamler vi dit navn, e-mail og telefonnummer for at kunne administrere og levere den aftalte ydelse.</p>
                    <p><strong>Behandlingsgrundlag:</strong> Opfyldelse af en kontrakt (GDPR art. 6, stk. 1, litra b).</p>
                  </div>

                  <div className="border-l-4 border-bison-green pl-4 py-2 my-6">
                    <p className="mb-2"><strong>Når du tilmelder dig vores nyhedsbrev:</strong> Vi indsamler din e-mailadresse (og evt. navn) med det formål at sende dig markedsføring og nyheder.</p>
                    <p><strong>Behandlingsgrundlag:</strong> Dit udtrykkelige samtykke (GDPR art. 6, stk. 1, litra a).</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">3. Modtagere af personoplysninger og tredjelande</h3>
                <p>Vi sælger aldrig dine personoplysninger til tredjepart. For at kunne drive vores hjemmeside og forretning, deler vi oplysninger med vores databehandlere, som f.eks. vores hostingudbyder (Vercel), vores e-mailudbyder samt vores bookingsystem (Cal.com). Vi har indgået databehandleraftaler med disse leverandører, som sikrer, at de overholder gældende GDPR-lovgivning.</p>
                <p><strong>Overførsel til tredjelande:</strong> Visse af vores databehandlere (f.eks. Vercel og Cal.com) kan være etableret uden for EU/EØS. I disse tilfælde sikrer vi, at overførslen sker på et lovligt grundlag, f.eks. via EU-Kommissionens standardkontraktbestemmelser (SCC) eller EU-US Data Privacy Framework.</p>

                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">4. Cookies og Analytics</h3>
                <p>Vi ønsker at forbedre vores hjemmeside og brugeroplevelsen. Til dette formål benytter vi Vercel Analytics, som er en privatlivsvenlig løsning, der giver os indblik i hjemmesidens trafik. Vercel Analytics indsamler data anonymiseret og sætter ikke personhenførbare cookies på dit udstyr. Vi sætter overhovedet ikke markedsførings- eller tredjepartscookies på din enhed.</p>

                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">5. Hvor længe opbevarer vi dine data?</h3>
                <p>Vi opbevarer kun dine personoplysninger, så længe det er nødvendigt:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Kunderelationer:</strong> Oplysninger relateret til køb og fakturering opbevares i 5 år udløbet af det pågældende regnskabsår, jf. Bogføringsloven.</li>
                  <li><strong>Generelle henvendelser:</strong> Oplysninger fra kontaktformularen, der ikke fører til et kundeforhold, slettes typisk inden for 6 måneder efter endt korrespondance.</li>
                  <li><strong>Nyhedsbrev:</strong> Din e-mailadresse opbevares indtil du afmelder dig. Du kan til enhver tid trække dit samtykke tilbage.</li>
                </ul>

                <h3 className="text-xl font-bold text-bison-dark mt-10 mb-4 uppercase tracking-wider text-sm">6. Dine rettigheder</h3>
                <p>Efter databeskyttelsesforordningen har du en række rettigheder i forhold til vores behandling af dine oplysninger:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Ret til indsigt:</strong> Du har ret til at se de oplysninger, vi behandler om dig.</li>
                  <li><strong>Ret til berigtigelse:</strong> Du har ret til at få urigtige oplysninger rettet.</li>
                  <li><strong>Ret til sletning:</strong> Du har i særlige tilfælde ret til at få slettet oplysninger om dig, før vores almindelige sletning indtræffer.</li>
                  <li><strong>Ret til begrænsning:</strong> Du har i visse tilfælde ret til at få behandlingen af dine personoplysninger begrænset.</li>
                  <li><strong>Ret til indsigelse:</strong> Du har ret til at gøre indsigelse mod vores ellers lovlige behandling.</li>
                  <li><strong>Ret til dataportabilitet:</strong> Du har i visse tilfælde ret til at modtage dine personoplysninger i et struktureret, almindeligt anvendt og maskinlæsbart format.</li>
                </ul>
                <p className="mt-8 pt-6 border-t border-bison-dark/10">Ønsker du at gøre brug af dine rettigheder, bedes du kontakte os på team@bisoncompany.dk. Du har også ret til at indgive en klage til Datatilsynet, hvis du er utilfreds med den måde, vi behandler dine personoplysninger på. Du finder Datatilsynets kontaktoplysninger på <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-bison-blue hover:underline">www.datatilsynet.dk</a>.</p>
                <div className="mt-12 pt-12 flex justify-center border-t border-bison-dark/10">
                  <button
                    onClick={() => setIsPolicyOpen(false)}
                    className="px-10 py-4 rounded-full bg-bison-dark text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-3 outline-none"
                  >
                    Luk politikken <X size={20} />
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

export default Footer;
