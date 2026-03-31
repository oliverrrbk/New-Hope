import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedRoutes } from './components/AnimatedRoutes';

import { ReactLenis } from 'lenis/react';

export default function App() {
  return (
    <Router>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <div className="min-h-screen selection:bg-bison-blue selection:text-bison-dark flex flex-col">
          <Navbar />
          <div className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </ReactLenis>
      <Analytics />
    </Router>
  );
}
