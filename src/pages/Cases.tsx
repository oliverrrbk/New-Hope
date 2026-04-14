import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Quote, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageSkyHeader } from '../components/ui/page-sky-header';
import { WordFadeIn } from '../components/ui/word-fade-in';
import { FadeText } from '../components/ui/fade-text';
import { GrassWind } from '../components/ui/grass-wind';

const Cases = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const caseVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(20px)" },
    visible: (i: number) => ({
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { delay: 1.2 + (i * 0.2), duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    })
  };
  const cases = [
    {
      title: "Showcase",
      category: "Anlægsgartner",
      desc: "Dette er et eksempel på den visuelle klasse og konverteringsfokuserede detaljegrad, vi bygger. Hver pixel er tænkt ind i en større strategi for stærke håndværkere.",
      img: "/casepic1.png",
      link: "https://www.eksempel.nu/",
      isUnderConstruction: false,
      isUpcoming: false,
      tags: [
        { text: "Premium Design", theme: "Design" },
        { text: "Interaktiv", theme: "Vækst" }
      ]
    },
    {
      title: "OSMA Klima ApS",
      category: "Ventilationsløsninger",
      desc: "For OSMA Klima har vi designet en knivskarp platform, der cementerer deres faglige tyngde inden for ventilation over for både store erhvervsprojekter og private.",
      img: "/showcase1.png", 
      link: "https://www.osmaklima.dk/",
      isUnderConstruction: false,
      isUpcoming: false,
      tags: [
        { text: "Ventilation", theme: "Teknologi" },
        { text: "Konvertering", theme: "Vækst" }
      ]
    },
    {
      title: "Næste Projekt",
      category: "Aftale Lukket",
      desc: "Vi har netop skudt processen i gang og indskrevet i kalenderen. Endnu en lokal servicevirksomhed, der rykker liga digitalt.",
      link: "#",
      isUnderConstruction: false,
      isUpcoming: true,
      tags: [
        { text: "I Kalenderen", theme: "Vækst" }
      ]
    },
    {
      title: "Kommende Case",
      category: "Ledig Plads",
      desc: "Skal vi bygge dig en flot hjemmeside, der faktisk afspejler din virksomhed, uden det er bøvlet for dig.",
      link: "/book-et-opkald",
      isUnderConstruction: false,
      isUpcoming: true,
      tags: [
        { text: "Din Tur?", theme: "Design" }
      ]
    }
  ];

  const getTagColor = (tag: string) => {
    switch(tag) {
      case "Design": return "bg-bison-pink text-bison-dark";
      case "Teknologi": return "bg-bison-blue text-bison-dark";
      case "Vækst": return "bg-bison-green text-bison-dark";
      default: return "bg-gray-100 text-bison-dark";
    }
  };

  return (
    <>
      <Helmet>
        <title>Vores Cases | Webdesign af høj kvalitet | Bison Company</title>
        <meta name="description" content="Se vores tidligere arbejde, lige fra anlægsgartnere til ventilationsfirmaer. Vi bygger konverteringsfokuserede sites med premium design." />
        <link rel="canonical" href="https://bisoncompany.dk/cases" />
        <meta property="og:title" content="Vores Cases | Webdesign af høj kvalitet | Bison Company" />
        <meta property="og:description" content="Se vores tidligere arbejde, lige fra anlægsgartnere til ventilationsfirmaer. Vi bygger konverteringsfokuserede sites med premium design." />
      </Helmet>
      <main className="pt-32">
        <PageSkyHeader />
      <section className="py-12 md:py-20 px-6 relative z-10">
        <div className="max-w-[832px] mx-auto">
          <div className="mb-4 overflow-hidden">
            <FadeText
              direction="up"
              text="Vores Arbejde"
              className="inline-block bg-bison-dark/5 px-2.5 py-0.5 md:px-3.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-bison-dark/60"
              framerProps={{ show: { transition: { delay: 1.2 } } }}
            />
          </div>
          <div className="flex flex-wrap items-end gap-x-2.5 md:gap-x-4 text-[39px] md:text-[62px] font-black tracking-tighter font-display uppercase leading-[0.9] mb-8 text-bison-dark drop-shadow-none">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Udvalgte
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm pb-1"
            >
              cases
            </motion.span>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {cases.map((c, i) => (
              c.isUpcoming ? (
                <motion.div
                  key={i}
                  custom={i}
                  variants={caseVariants}
                  initial="hidden"
                  animate="visible"
                  className="group relative h-full min-h-[260px]"
                >
                   {c.link === "#" ? (
                     <div className="block h-full border-2 border-dashed border-bison-dark/10 rounded-[1.6rem] p-8 flex flex-col items-center justify-center text-center transition-colors">
                       <h3 className="text-[20px] font-black font-display uppercase tracking-tight opacity-40 mb-1.5">{c.title}</h3>
                       <p className="text-bison-dark/40 font-bold uppercase tracking-widest text-[8px] mb-4">{c.category}</p>
                       <div className="flex gap-1.5 mb-4">
                          {c.tags?.map((tag, ti) => (
                            <span key={ti} className={`text-[8px] px-2.5 py-1 font-bold uppercase tracking-widest rounded-full opacity-60 ${getTagColor(tag.theme)}`}>
                              {tag.text}
                            </span>
                          ))}
                       </div>
                       <p className="text-[12px] text-bison-dark/40 leading-relaxed max-w-[245px]">{c.desc}</p>
                     </div>
                   ) : (
                     <Link to={c.link} className="block h-full border-2 border-dashed border-bison-dark/20 bg-bison-dark/5 rounded-[1.6rem] p-8 flex flex-col items-center justify-center text-center hover:bg-bison-dark/10 transition-colors shadow-sm hover:shadow-md cursor-pointer">
                       <h3 className="text-[20px] font-black font-display uppercase tracking-tight text-bison-dark/60 mb-1.5">{c.title}</h3>
                       <p className="text-bison-dark/50 font-bold uppercase tracking-widest text-[8px] mb-4">{c.category}</p>
                       <div className="flex gap-1.5 mb-4">
                          {c.tags?.map((tag, ti) => (
                            <span key={ti} className={`text-[8px] px-2.5 py-1 font-bold uppercase tracking-widest rounded-full shadow-sm hover:scale-105 transition-transform ${getTagColor(tag.theme)}`}>
                              {tag.text}
                            </span>
                          ))}
                       </div>
                       <p className="text-[12px] text-bison-dark/70 leading-relaxed max-w-[245px] font-medium">{c.desc}</p>
                     </Link>
                   )}
                </motion.div>
              ) : c.isUnderConstruction ? (
                <motion.div
                  key={i}
                  custom={i}
                  variants={caseVariants}
                  initial="hidden"
                  animate="visible"
                  className="group"
                >
                  <div className="aspect-video bg-bison-dark/5 rounded-[1.6rem] overflow-hidden mb-5 relative border-2 border-dashed border-bison-dark/20 flex flex-col items-center justify-center text-center p-5">
                     <div className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-[1rem] border border-white flex items-center justify-center mb-4 shadow-sm">
                        <Hammer className="text-bison-dark/40 -rotate-[15deg]" size={20} />
                     </div>
                     <h3 className="text-[16px] md:text-[20px] font-black font-display uppercase tracking-widest text-bison-dark/40">Siden bygges</h3>
                     <p className="text-bison-dark/30 font-bold uppercase tracking-widest text-[8px] mt-1.5">Kommer snart online</p>
                  </div>
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <h3 className="text-[20px] font-black font-display uppercase tracking-tight">{c.title}</h3>
                      <p className="text-bison-dark/40 font-bold uppercase tracking-widest text-[8px] mt-0.5">{c.category}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {c.tags?.map((tag, ti) => (
                        <span key={ti} className={`text-[8px] px-2.5 py-1 font-bold uppercase tracking-widest rounded-full ${getTagColor(tag.theme)}`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[12px] text-bison-dark/60 leading-relaxed max-w-[370px]">{c.desc}</p>
                </motion.div>
              ) : (
                <motion.a
                  key={i}
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  custom={i}
                  variants={caseVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group block cursor-pointer"
                >
                  <div className="aspect-video rounded-[1.6rem] overflow-hidden mb-5 relative shadow-xl">
                    <img src={c.img} alt={`${c.title} - Ny hjemmeside case af webbureauet Bison Company`} className={`w-full h-full object-cover transition-transform duration-700 ${c.title === "Showcase" ? "object-top origin-top scale-[1.25] group-hover:scale-[1.30]" : "object-[50%_14%] origin-[50%_14%] scale-[1.18] group-hover:scale-[1.22]"}`} referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-bison-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-full font-black text-[13px] md:text-[16px] uppercase tracking-widest shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-2.5 transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-out hover:bg-white/30">
                        <span>Se Case</span>
                        <div className="bg-white/20 p-1 rounded-full border border-white/20 shadow-sm">
                          <ExternalLink size={16} className="text-bison-blue drop-shadow-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <h3 className="text-[20px] font-black font-display uppercase tracking-tight">{c.title}</h3>
                      <p className="text-bison-dark/40 font-bold uppercase tracking-widest text-[8px] mt-0.5">{c.category}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {c.tags?.map((tag, ti) => (
                        <span key={ti} className={`text-[8px] px-2.5 py-1 font-bold uppercase tracking-widest rounded-full ${getTagColor(tag.theme)}`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[12px] text-bison-dark/60 leading-relaxed max-w-[370px]">{c.desc}</p>
                </motion.a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Spacing before footer */}
      <div className="h-20 md:h-32" />
    </main>
    </>
  );
};

export default Cases;
