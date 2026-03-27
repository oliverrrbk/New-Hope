import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, User, X } from 'lucide-react';
import { PageSkyHeader } from '../components/ui/page-sky-header';
import { BlurredStagger } from '../components/ui/blurred-stagger-text';
import { TextEffect } from '../components/ui/text-effect';
import { FadeText } from '../components/ui/fade-text';
import { GrassWind } from '../components/ui/grass-wind';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("loading");

    try {
      const formData = new FormData();
      formData.append('email', email);

      await fetch("https://script.google.com/macros/s/AKfycbxFzDaclLpL28DYqqihMSFeeNZ8VR6jjF-GxfONUQbhcspK3QdpL8DzxoJ_6bplZlI3/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setSubscribeStatus("success");
      setEmail("");

      // Nulstiller formen efter et par sekunder, så de ikke hænger fast i success-boksen evigt
      setTimeout(() => setSubscribeStatus("idle"), 4000);
    } catch (error) {
      console.error(error);
      setSubscribeStatus("error");
    }
  };


  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost]);

  const posts = [
    {
      title: "Hvad sker der i din hjerne, når du besøger en moderne hjemmeside?",
      excerpt: "Vidste du, at din hjerne er biologisk kodet til hurtigere at opdage bevægelse? Læs hvordan moderne web-animationer formindsker 'mental load' og skaber en mere intuitiv brugeroplevelse.",
      content: "De fleste tænker, at animationer på en hjemmeside bare er “nice to have”. Lidt ekstra lir. Det er de ikke.\n\nNår du lander på en hjemmeside, sker der noget ret simpelt i din hjerne: Den scanner lynhurtigt efter, hvad der er vigtigt — og hvad du skal gøre.\n\nOg her spiller bevægelse en kæmpe rolle.\n\n**Din hjerne er bygget til at opdage bevægelse**\nVi er biologisk kodet til at reagere på bevægelse. Det stammer helt tilbage fra dengang, hvor bevægelse kunne betyde fare… eller mad. Det betyder i praksis: Hvis noget bevæger sig på en hjemmeside, så ser du det før alt andet. Faktisk viser studier, at brugere opdager animerede elementer markant hurtigere end statiske. Det er derfor, en knap der “kommer ind”, føles mere tydelig end en, der bare står der.\n\n**Animation gør det lettere at forstå**\nEn god hjemmeside forklarer sig selv. Her er animation ikke pynt — det er kommunikation. Når noget bevæger sig forstår du, hvad der er klikbart. Du ser, hvad der sker, når du interagerer. Det føles mere intuitivt. Det kaldes at reducere “mental load”. Kort sagt: din hjerne skal arbejde mindre.\n\n**Det føles bedre — og det betyder mere, end du tror**\nDer er også en anden effekt. Når noget ser godt ud og føles smooth, så tror vi automatisk, at det også fungerer bedre. Det er en ret veldokumenteret psykologisk effekt. Så selv små animationer kan øge tillid, få din løsning til at virke mere professionel og holde folk længere på siden.\n\n**Men… der er en grænse**\nAnimation virker kun, hvis det har et formål. For meget bevægelse? Så bliver det støj. Og så sker det modsatte: Folk bliver forvirrede. Siden føles langsom. Brugeren smutter.\n\n**Så hvad er pointen?**\nEn moderne hjemmeside handler ikke om at være flashy. Den handler om at guide mennesker. God animation fanger opmærksomhed, skaber forståelse og leder til handling. Og det er i sidste ende det, der gør forskellen mellem en hjemmeside… og en hjemmeside der faktisk virker.",
      date: "12. Marts, 2026",
      author: "Mads Brunsbjerg",
      readTime: "3 min",
      img: "/assets/blog1_pro.png",
      category: "Psykologi & Design"
    },
    {
      title: "Hvorfor de fleste hjemmesider er spild af penge",
      excerpt: "De fleste hjemmesider ser pæne ud, men de skaber ikke kunder. Læs hvorfor langsomme processer, standardløsninger og 'digital husleje' holder din forretning tilbage.",
      content: "De fleste virksomheder har en hjemmeside. Det er bare ikke det samme som, at den virker. Mange hjemmesider ser fine ud. De har tekst, billeder og en kontaktformular. Men de skaber ikke kunder. De bliver ikke opdateret. Og de bliver ikke brugt aktivt i forretningen. Så hvad er de egentlig værd?\n\n**Problemet er ikke hjemmesiden — det er måden, den bliver lavet på**\nDe fleste starter samme sted. Et bureau. Et kickoff-møde. Og så starter det… Mails frem og tilbage. “Kan du lige sende teksten?” “Har du nogle billeder?” “Kan du godkende det her?” Det trækker ud. Ofte i måneder. Og når siden endelig er færdig, er energien væk. Den bliver lanceret… og så dør den stille og roligt bagefter.\n\n**Digital husleje (som ingen rigtig gider betale)**\nMange ender også med en løsning, de ikke selv har kontrol over. Et abonnement. En platform. En udvikler, der skal ind over hver gang noget skal ændres. Det betyder i praksis: Jo mindre du bruger din hjemmeside, jo billigere føles den. Og det er et problem.\n\n**Standardløsninger virker ikke (selvom de er nemme)**\nMange hjemmesider bliver bygget som templates. Lidt tilpasning her. Lidt farver der. Og så kører vi. Men en hjemmeside er ikke noget, der bare skal “se fint ud”. Den skal passe til: hvordan din virksomhed arbejder, hvordan dine kunder tænker og hvordan de træffer beslutninger. Hvis det ikke er gennemtænkt, så bliver oplevelsen flad. Folk forstår ikke, hvad de skal gøre. De bliver ikke fanget. Og de smutter igen.\n\n**En hjemmeside skal arbejde — ikke bare eksistere**\nEn god hjemmeside gør tre ting: Den fanger opmærksomhed. Den skaber forståelse. Den leder til handling. Hvis den ikke gør det… Så er det i bund og grund bare en pæn PDF på internettet.\n\n**Så hvad er pointen?**\nDet er ikke hjemmesider, der er spild af penge. Det er måden, de bliver lavet på. Når processen er tung… Når løsningen er generisk… Når du ikke selv kan bruge den bagefter… Så ender du med noget, der bare står.\n\n**Det er derfor, vi gør det anderledes**\nVi fjerner alt det unødvendige frem og tilbage. Vi bygger ikke ud fra en template — men ud fra dig. Og vi laver noget, du faktisk kan arbejde videre med selv. Uden afhængighed. Uden abonnementer. Uden bullshit. En hjemmeside skal ikke bare være der. Den skal arbejde.",
      date: "8. Marts, 2026",
      author: "Mads Brunsbjerg",
      readTime: "4 min",
      img: "/assets/blog2_pro.png",
      category: "Forretning & Konvertering"
    },
    {
      title: "Hvorfor ingen gider læse din hjemmeside",
      excerpt: "Folk læser ikke på nettet – de scanner. Lær hvorfor lange tekstblokke dræber konverteringen, og hvordan du designer et effektivt flow, der guider i stedet for at forklare.",
      content: "De fleste hjemmesider har ét problem. Der er for meget tekst. Lange afsnit. Forklaringer. “Om os”-historier, der aldrig stopper. Og hvis vi skal være ærlige… Folk læser det ikke.\n\n**Folk scanner — de læser ikke**\nNår nogen lander på din hjemmeside, gør de ikke det samme som når de læser en bog. De scanner. De leder efter: Hvad det her er, om det er relevant, og hvad de skal gøre. Det tager få sekunder. Hvis de ikke fanger det hurtigt… Så er de væk igen.\n\n**Problemet er ikke din tekst — det er formatet**\nDet er ikke fordi, det du skriver er forkert. Det er bare pakket forkert ind. Store tekstblokke kræver energi. Og på en hjemmeside gider folk ikke bruge energi. De vil forstå det hurtigt. Uden at tænke for meget.\n\n**Din hjerne vil have overblik — ikke forklaringer**\nNår vi møder noget nyt, prøver hjernen først at skabe overblik. Ikke detaljer. Så hvis din side starter med: 3 lange afsnit, en masse forklaring og ingen visuel retning, så føles det tungt med det samme. Og så mister du folk, før du overhovedet er kommet i gang.\n\n**Så hvad virker i stedet?**\nEn god hjemmeside føles ikke som noget, du skal læse. Den føles som noget, du bevæger dig igennem. Det handler om: korte budskaber, tydelig struktur, visuel variation og flow. Så brugeren hele tiden bliver guidet videre.\n\n**Vis — forklar ikke**\nI stedet for at skrive lange forklaringer… Så vis det. Brug: sektioner, overskrifter, bevægelse, interaktion. Det gør det lettere at forstå — hurtigere.\n\n**Mindre tekst = mere effekt**\nDet lyder måske kontraintuitivt. Men jo mindre du skriver… jo mere bliver læst. Fordi det er nemmere at gå til. Det handler ikke om at skrive mindre for at skrive mindre. Det handler om at gøre det lettere at forstå. En hjemmeside er ikke en artikel. Det er en oplevelse.\n\n**Hvad du skal gøre i stedet**\nTænk din hjemmeside som et flow — ikke en tekst. Start med det vigtigste. Skær alt unødvendigt væk. Del det op i små bidder. Guid brugeren videre. Og sørg for, at man aldrig er i tvivl om: Hvad det her er, og hvad man skal gøre. Folk gider ikke læse din hjemmeside. Men de vil gerne forstå den. Og det er en ret vigtig forskel.",
      date: "1. Marts, 2026",
      author: "Mads Brunsbjerg",
      readTime: "3 min",
      img: "/assets/blog3_pro.png",
      category: "Tekst & Strategi"
    }
  ];

  return (
    <main className="pt-32">
      <PageSkyHeader />
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

      {/* Blog Modal Popup */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              className="custom-scrollbar w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 flex flex-col"
              style={{ zoom: "65%" }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/70 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-20"
              >
                <X size={24} className="text-bison-dark" />
              </button>

              <div className="aspect-[21/9] md:aspect-[25/9] w-full relative shrink-0">
                <img src={selectedPost.img} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-bison-dark/20" />
                <div className="absolute bottom-6 left-6 bg-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                  {selectedPost.category}
                </div>
              </div>

              <div className="p-8 md:p-16">
                <div className="flex items-center gap-6 text-sm font-bold text-bison-dark/40 uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-2"><User size={16} /> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {selectedPost.readTime}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter mb-10 leading-[0.9]">
                  {selectedPost.title}
                </h2>
                <div className="prose prose-lg max-w-none text-bison-dark/70">
                  <p className="whitespace-pre-line leading-relaxed font-medium text-lg md:text-xl">
                    {selectedPost.content.split(/(\*\*.*?\*\*)/g).map((part: string, i: number) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-extrabold text-bison-dark">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                </div>

                <div className="mt-16 pt-16 border-t border-bison-dark/10 flex justify-center">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-10 py-5 rounded-full bg-bison-dark text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center gap-3"
                  >
                    Luk artiklen <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <section className="py-12 md:py-20 px-6">
        <div className="max-w-[832px] mx-auto">
          <div className="text-center mb-[52px]">
            <div className="mb-4 overflow-hidden">
              <FadeText
                direction="up"
                text="Vores Tanker"
                className="inline-block bg-bison-dark/5 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-bison-dark/60"
                framerProps={{ show: { transition: { delay: 0.8 } } }}
              />
            </div>
            <div className="flex flex-wrap justify-center items-end gap-x-2.5 md:gap-x-3 text-[39px] md:text-[62px] font-black tracking-tighter font-display uppercase leading-[0.9] mb-5 text-bison-dark">
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Bison
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.95, duration: 0.5 }}
                className="italic font-serif normal-case font-medium text-bison-brown/60 drop-shadow-sm"
              >
                Insights
              </motion.span>
            </div>
            <TextEffect
              per="word"
              preset="fade"
              delay={0.8}
              className="text-[13px] text-bison-dark/60 max-w-[436px] mx-auto leading-relaxed"
            >
              Vi deler vores viden om design, teknologi og vækst for at hjælpe dig med at blive klogere på den digitale verden.
            </TextEffect>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: -80, filter: "blur(15px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.1 + (i * 0.8), duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] rounded-[1.2rem] overflow-hidden mb-5 relative shadow-lg">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-widest shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-[8px] font-bold text-bison-dark/40 uppercase tracking-widest mb-2.5">
                  <span className="flex items-center gap-1"><User size={10} /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>

                <h3 className="text-[16px] font-black font-display uppercase tracking-tight mb-2.5 group-hover:text-bison-brown transition-colors leading-tight line-clamp-2 min-h-[2rem]">
                  {post.title}
                </h3>

                <p className="text-[10px] text-bison-dark/60 leading-relaxed mb-4 line-clamp-3 h-[3.2rem] overflow-hidden">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-2.5 border-t border-bison-dark/5 flex items-center justify-between text-[10px] font-bold text-bison-dark group-hover:text-bison-brown transition-colors">
                  Læs artiklen
                  <div className="w-6 h-6 rounded-full bg-bison-dark/5 flex items-center justify-center group-hover:bg-bison-brown/10 transition-colors">
                    <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div
          className="max-w-[665px] mx-auto bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 md:p-12 text-center relative group transition-all duration-500"
        >
          {/* Internal Content wrapping */}
          <div className="relative z-10">
            <h2 className="text-[24px] md:text-[31px] font-black font-display uppercase tracking-tighter mb-4 leading-tight">Få de nyeste insights direkte i din <br className="hidden md:block" /> indbakke</h2>
            <p className="text-[12px] text-bison-dark/60 mb-8 max-w-[374px] mx-auto leading-relaxed">Vi sender kun guld. Ingen spam, kun viden der hjælper din <br className="hidden md:block" /> forretning med at vokse.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-[320px] mx-auto" onSubmit={handleSubscribe}>
              {subscribeStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-[#163321] text-[#fbfbf9] px-4 py-3 rounded-full font-bold flex items-center justify-center shadow-lg border border-[#163321]/20 text-[12px]"
                >
                  <span className="flex items-center gap-2">Du er tilmeldt! <span className="text-bison-green">✔</span></span>
                </motion.div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribeStatus === 'loading'}
                    placeholder="Din e-mail adresse"
                    required
                    className="flex-1 bg-white/70 backdrop-blur-sm border border-white focus:border-bison-brown px-4 py-3 rounded-full text-bison-dark text-[12px] focus:ring-4 focus:ring-bison-brown/20 outline-none font-bold shadow-sm transition-all disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    whileHover={subscribeStatus !== 'loading' ? { scale: 1.05 } : {}}
                    whileTap={subscribeStatus !== 'loading' ? { scale: 0.95 } : {}}
                    className="bg-bison-dark text-white px-6 py-3 rounded-full text-[12px] font-bold shadow-lg transition-all hover:shadow-xl border border-bison-dark/10 min-w-[100px] disabled:opacity-70 flex items-center justify-center"
                  >
                    {subscribeStatus === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Tilmeld"
                    )}
                  </motion.button>
                </>
              )}
            </form>
          </div>
          {/* Background Ambient Blobs */}
          <div className="absolute inset-0 z-[-1] pointer-events-none opacity-60 transition-all duration-1000 group-hover:opacity-100 saturate-150">
            {/* Pink - Top Left corner */}
            <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] rounded-full blur-[40px] bg-bison-pink animate-cloud-1 [animation-play-state:paused] group-hover:[animation-play-state:running] transition-transform duration-1000 group-hover:translate-x-[40%] group-hover:translate-y-[20%] group-hover:scale-75" />
            {/* Green - Bottom Right corner */}
            <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[60%] rounded-full blur-[40px] bg-bison-green animate-cloud-2 [animation-play-state:paused] group-hover:[animation-play-state:running] transition-transform duration-1000 group-hover:-translate-x-[40%] group-hover:-translate-y-[20%] group-hover:scale-75" />
            {/* Blue - Top Right / Middle Right area */}
            <div className="absolute top-[10%] -right-[10%] w-[35%] h-[50%] rounded-full blur-[40px] bg-bison-blue animate-cloud-1 [animation-play-state:paused] group-hover:[animation-play-state:running] transition-transform duration-1000 group-hover:-translate-x-[60%] group-hover:translate-y-[10%] group-hover:scale-75" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
          </div>
        </div>
      </section>

      {/* Spacing before footer */}
      <div className="h-10 md:h-16" />
    </main>
  );
};

export default Blog;
