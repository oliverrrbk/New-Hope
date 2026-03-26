import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import Home from '../pages/Home';
import About from '../pages/About';
import Cases from '../pages/Cases';
import Blog from '../pages/Blog';
import BookCall from '../pages/BookCall';

const leftClouds = [
  { w: '120vw', h: '120vh', top: '-10%', left: '-50vw', blur: '80px', delayIn: 0.05, delayOut: 0.1, bg: '#FDFCF8' },
  { w: '80vw', h: '120vh', top: '-10%', left: '-20vw', blur: '60px', delayIn: 0.1, delayOut: 0.15, bg: '#F5F5F0' },
  { w: '60vw', h: '80vh', top: '10%', left: '-10vw', blur: '40px', delayIn: 0.2, delayOut: 0.0, bg: '#FFFFFF' },
  { w: '70vw', h: '90vh', top: '-20%', left: '0vw', blur: '50px', delayIn: 0.15, delayOut: 0.05, bg: '#EBEBE6' },
  { w: '70vw', h: '70vh', bottom: '-10%', left: '-5vw', blur: '45px', delayIn: 0.25, delayOut: 0.0, bg: '#FDFCF8' },
];

const rightClouds = [
  { w: '120vw', h: '120vh', top: '-10%', right: '-50vw', blur: '80px', delayIn: 0.0, delayOut: 0.15, bg: '#F5F5F0' },
  { w: '80vw', h: '120vh', top: '-10%', right: '-20vw', blur: '60px', delayIn: 0.15, delayOut: 0.1, bg: '#EBEBE6' },
  { w: '65vw', h: '85vh', top: '25%', right: '-15vw', blur: '40px', delayIn: 0.05, delayOut: 0.2, bg: '#FFFFFF' },
  { w: '75vw', h: '80vh', top: '-15%', right: '-5vw', blur: '50px', delayIn: 0.2, delayOut: 0.05, bg: '#FDFCF8' },
  { w: '60vw', h: '75vh', bottom: '-15%', right: '5vw', blur: '45px', delayIn: 0.1, delayOut: 0.0, bg: '#F0EFEB' },
];

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.4 } }}
        className="w-full h-full flex flex-col flex-1"
      >
        {children}
      </motion.div>

      {/* Cloud Transitions Overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden block">
        {leftClouds.map((cloud, i) => (
          <motion.div
            key={`lc-${i}`}
            className="absolute rounded-[45%]"
            style={{
              backgroundColor: cloud.bg,
              width: cloud.w,
              height: cloud.h,
              top: cloud.top,
              bottom: cloud.bottom,
              left: cloud.left,
              filter: `blur(${cloud.blur})`,
            }}
            initial={{ x: '0vw' }}
            animate={{ x: '-120vw', transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: cloud.delayIn } }}
            exit={{ x: '0vw', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: cloud.delayOut } }}
          />
        ))}

        {rightClouds.map((cloud, i) => (
          <motion.div
            key={`rc-${i}`}
            className="absolute rounded-[50%]"
            style={{
              backgroundColor: cloud.bg,
              width: cloud.w,
              height: cloud.h,
              top: cloud.top,
              bottom: cloud.bottom,
              right: cloud.right,
              filter: `blur(${cloud.blur})`,
            }}
            initial={{ x: '0vw' }}
            animate={{ x: '120vw', transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: cloud.delayIn } }}
            exit={{ x: '0vw', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: cloud.delayOut } }}
          />
        ))}
      </div>
    </>
  );
};

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - Framer motion needs key but react-router-dom types don't include it */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/om-os" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/cases" element={<PageWrapper><Cases /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/book-et-opkald" element={<PageWrapper><BookCall /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};
