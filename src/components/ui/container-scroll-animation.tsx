"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  leftArrow,
  rightArrow,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Det fælles Scroll hook til tidsstyringen af både iPad og Tekst!
  // 'offset' betyder at animationen starter allerede 300px FØR ankomst,
  // hvilket spreder forløbet over en lækker, lang periode.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["-300px end", "end start"]
  });
  
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.05, 1];
  };

  // 1) Animationen starter NU idet du scroller (ved 0 i stedet for 0.05) 
  // og den strækkes nu blødt og jævnt LAAANGT ud til 70% markøren (0.7). 
  // Dette fjerner *fuldstændig* det sudden "vippe punkt", og skaber et reelt smooth landing.
  const rotate = useTransform(scrollYProgress, [0, 0.7, 1], [45, 0, 0]);
  const scaleVals = scaleDimensions();
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [scaleVals[0], scaleVals[1], scaleVals[1]]);
  
  // 2) Det Ekstra Push (Push ned under blød afrunding)
  const translateCard = useTransform(scrollYProgress, [0, 0.7, 1], [0, 70, 70]);

  // 1) 0 -> 0.1: Skjult lavt bag iPad'en (150px nede). Så snart vi ser toppen af teksten, er den bagved iPaden.
  // 2) 0.1 -> 0.25: Ligesom vi ruller ned over, hæver den sig til at stå klart PÅ iPaden (0px).
  // 3) 0.25 -> 0.45: Langsomt svæv opad (0 -> -30). Den bevæger sig langsomt op ad, i mens man scroller lidt.
  // 4) 0.45 -> 0.7: Acceleration! Teksten flyver HELT væk (-400px), præcis idet iPad'en lander lodret.
  const translate = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.45, 0.7, 1], [150, 150, 0, -30, -400, -400]);

  return (
    <div
      className="h-[55rem] md:h-[62rem] xl:h-[75rem] flex items-center justify-center relative p-2 py-4 md:py-8"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translateCard} scale={scale} leftArrow={leftArrow} rightArrow={rightArrow}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        willChange: "transform"
      }}
      className="max-w-[90rem] mx-auto text-center relative z-10"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
  leftArrow,
  rightArrow
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        translateY: translate,
        scale,
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.08)",
        willChange: "transform"
      }}
      className="max-w-[50rem] lg:max-w-[66rem] xl:max-w-[90rem] -mt-12 mx-auto aspect-[1194/740] w-full rounded-[24px] md:rounded-[30px] xl:rounded-[40px] relative z-20"
    >
      <div className="h-full w-full overflow-hidden rounded-[24px] md:rounded-[30px] xl:rounded-[40px] relative z-10">
        {children}
      </div>
      
      {/* Absolute placerede pile UDENFOR skærmens klippe-felt */}
      {leftArrow && (
        <div className="absolute top-1/2 -left-6 md:-left-16 lg:-left-24 xl:-left-32 -translate-y-1/2 z-30">
          {leftArrow}
        </div>
      )}
      {rightArrow && (
        <div className="absolute top-1/2 -right-6 md:-right-16 lg:-right-24 xl:-right-32 -translate-y-1/2 z-30">
          {rightArrow}
        </div>
      )}
    </motion.div>
  );
};
