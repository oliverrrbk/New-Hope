import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedRoutes } from './components/AnimatedRoutes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-bison-blue selection:text-bison-dark flex flex-col md:cursor-none">
        <CustomCursor />
        <Navbar />
        <div className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
