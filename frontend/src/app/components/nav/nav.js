'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 mb-2 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Arbeit
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className={`${isScrolled ? 'text-muted-foreground' : 'text-foreground'} hover:text-primary transition-colors`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`${isScrolled ? 'text-muted-foreground' : 'text-foreground'} hover:text-primary transition-colors`}
            >
              How It Works
            </button>
            <button
              onClick={() => router.push('/scanner')}
              className={`${isScrolled ? 'text-muted-foreground' : 'text-foreground'} hover:text-primary transition-colors`}
            >
              ATS Scanner
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/Bauth"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              For Recruiters
            </Link>
            <Link
              href="/auth"
              className="bg-background hover:bg-secondary text-primary px-6 py-2 rounded-xl transition-colors border-2 border-primary"
            >
              For Freelancers
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
