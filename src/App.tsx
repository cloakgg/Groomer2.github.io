/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WebGLShader } from './components/WebGLShader';
import { NebulaShader } from './components/NebulaShader';
import MacOSDock from './components/MacOSDock';
import { ActionSearchBar } from './components/ActionSearchBar';
import { 
  Scissors, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook, 
  CheckCircle2, 
  PlusCircle,
  Menu,
  X,
  Verified,
  ShieldCheck,
  Award,
  Armchair,
  MoveRight,
  PhoneCall,
  Navigation
} from 'lucide-react';
import { cn } from './lib/utils';

type Page = 'home' | 'services' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen organic-mesh relative overflow-hidden">
      {/* Navigation Dock */}
      <div className={cn(
        "fixed top-4 left-0 w-full z-50 flex justify-center transition-all duration-500",
        scrolled ? "translate-y-0" : "translate-y-2"
      )}>
        <MacOSDock 
          tabs={[
            { id: 'home', name: 'Home', icon: Scissors },
            { id: 'services', name: 'Services', icon: Armchair },
            { id: 'about', name: 'About', icon: Award },
            { id: 'contact', name: 'Contact', icon: PhoneCall }
          ]}
          onTabClick={(id) => navigate(id as Page)}
          activeTab={currentPage}
          className={cn(
            "shadow-2xl transition-all duration-300",
            scrolled ? "scale-90" : "scale-100"
          )}
        />
      </div>

      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" onNavigate={navigate} />}
          {currentPage === 'services' && <ServicesPage key="services" onNavigate={navigate} />}
          {currentPage === 'about' && <AboutPage key="about" onNavigate={navigate} />}
          {currentPage === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl text-white hover:bg-[#128C7E] transition-colors"
      >
        <PhoneCall size={32} />
      </motion.a>

      {/* Footer */}
      <footer className="bg-surface-container-lowest pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="text-primary w-8 h-8" />
              <span className="font-display text-2xl text-primary tracking-tighter">Groomer Branch 2</span>
            </div>
            <p className="text-on-surface-variant font-sans mb-8">
              Meticulous grooming for the modern Karachi gentleman. Excellence in every cut, every time.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://instagram.com/groomer.pk" icon={<Instagram size={20} />} />
              <SocialLink href="https://facebook.com/groomerbranch2" icon={<Facebook size={20} />} />
              <SocialLink href="https://twitter.com/groomer_pk" icon={<Twitter size={20} />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-primary">Services</h4>
            <ul className="space-y-4 font-sans text-on-surface-variant">
              <li className="hover:text-primary cursor-pointer transition-colors">Precision Haircuts</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Traditional Shaves</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Beard Sculpting</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Scalp Treatments</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-4 font-sans text-on-surface-variant">
              <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('about')}>About Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('about')}>Hygiene Standards</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Our Master Barbers</li>
              <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('contact')}>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-primary">Location</h4>
            <address className="not-italic text-on-surface-variant space-y-2 mb-6">
              Block 14, Federal B Area,<br />
              Karachi, Pakistan
            </address>
            <a 
              href="https://www.google.com/maps/place/Groomer+Branch+2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container p-4 rounded-lg border border-white/5 block hover:border-primary/30 transition-all group"
            >
              <p className="text-primary font-bold text-sm mb-1 group-hover:underline flex items-center gap-2">Open Daily <Navigation size={12} /></p>
              <p className="text-xs opacity-70">11:00 AM — 11:00 PM</p>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
          <p className="text-xs">© 2024 Groomer Branch 2. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-mono">
            <span>Karachi</span>
            <span>Lahore</span>
            <span>Islamabad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ icon, href = "#" }: { icon: ReactNode, href?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-10 h-10 glass rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all border border-white/5 shadow-lg"
    >
      {icon}
    </a>
  );
}

// --- Page Components ---

interface PageProps {
  onNavigate: (page: Page) => void;
  key?: string;
}

function HomePage({ onNavigate, key }: PageProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["PRECISION", "ARTISTRY", "PERFECTION", "MASTERY", "STYLE"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const marqueeImages = [
    "/images/barber_hero.png",
    "/images/haircut.png",
    "/images/shave.png",
    "/images/tools.png",
    "/images/barber_hero.png",
    "/images/haircut.png",
  ];

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/barber_hero.png" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <WebGLShader />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs text-primary font-bold tracking-[0.4em] mb-6 block uppercase"
            >
              The Real Heritage — Branch 2
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-display text-7xl md:text-9xl mb-8 leading-[1.1] tracking-tighter"
            >
              Elite <br />
              <div className="relative h-[1.2em] overflow-hidden mt-4">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 top-0 text-primary italic font-bold"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -100 : 100,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-sans text-lg text-on-surface-variant mb-12 max-w-xl leading-relaxed"
            >
              Experience the authentic atmosphere of Karachi's most meticulous barber studio. Real people, real techniques, and a legacy of grooming excellence since day one.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <button 
                onClick={() => onNavigate('contact')}
                className="primary-gradient text-on-primary px-10 py-5 rounded-full font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
              >
                Secure Your Spot
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className="border-2 border-primary/20 text-primary px-10 py-5 rounded-full font-bold text-base hover:bg-primary/10 transition-colors"
              >
                View Services
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Marquee Scroller */}
      <section className="py-24 bg-black overflow-hidden border-y border-white/5 relative group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 left-0 p-4 font-mono text-[8px] text-primary/40 uppercase tracking-[0.5em] z-20">Artisanal Workflow</div>
        <div className="absolute bottom-0 right-0 p-4 font-mono text-[8px] text-primary/40 uppercase tracking-[0.5em] z-20">Karachi — PK</div>
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="flex marquee-scroller whitespace-nowrap py-10">
          {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((img, idx) => (
            <motion.div 
              key={idx} 
              className="flex-none w-[350px] h-[450px] mx-4 rounded-3xl overflow-hidden glass border-4 border-white/5 relative group cursor-pointer transition-all duration-500 shadow-2xl shadow-primary/5 marquee-item"
            >
              <img src={img} alt={`Work ${idx}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-x-0 bottom-0 p-8 glass-dark border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-2">Masterpiece — 0{idx % 6 + 1}</p>
                <h4 className="font-display text-2xl italic">Signature Cut</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Crafting Perfection Section */}
      <section className="py-32 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl mb-6 uppercase tracking-tighter">The Groomer Standard</h2>
            <div className="h-0.5 w-40 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-4 glass p-10 flex flex-col justify-end group border-primary/10">
              <ShieldCheck className="text-primary w-12 h-12 mb-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-3xl mb-4 italic">Strict Hygiene</h3>
              <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest leading-loose">Medical-grade sterilization for every tool. We prioritize your health above all else.</p>
            </div>
            
            <div className="md:col-span-8 relative overflow-hidden rounded-lg group">
              <img 
                src="/images/haircut.png" 
                alt="Expert Stylists" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.3em] mb-4 block">Craftsmanship</span>
                <h3 className="font-display text-5xl mb-4 italic tracking-tighter">Artisan Barbery</h3>
                <p className="text-on-surface-variant max-w-md font-sans text-sm">Real barbers using heritage techniques to deliver the sharpest fades in the city.</p>
              </div>
            </div>

            <div className="md:col-span-7 relative overflow-hidden rounded-lg group">
              <img 
                src="/images/shave.png" 
                alt="Lounge" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 border-2 border-white/5"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="font-display text-4xl mb-2 italic">Premium Atmosphere</h3>
                <p className="text-on-surface-variant font-sans text-sm">A space designed for the modern professional to unwind and reset.</p>
              </div>
            </div>

            <div className="md:col-span-5 glass p-10 flex flex-col items-center justify-center text-center border-primary/10">
              <div className="relative mb-6">
                <Award className="text-primary w-20 h-20" />
                <motion.div 
                  className="absolute inset-0 border-2 border-primary/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase mb-2 text-primary font-bold">Karachi's Finest</span>
              <h3 className="font-display text-3xl mb-4 italic">Est. Excellence</h3>
              <p className="text-on-surface-variant text-xs uppercase tracking-widest font-mono">Consistently ranked as the top grooming destination in Federal B Area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Socials Reverse Scroller */}
      <section className="py-24 bg-surface-container-lowest overflow-hidden border-t border-white/5 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2 block font-bold">// CLIPS & FEED</span>
            <h2 className="font-display text-4xl italic tracking-tighter">Social Influence</h2>
          </div>
          <button className="text-[10px] font-mono uppercase tracking-widest border-b border-primary/40 pb-1 text-primary/60 hover:text-primary transition-colors">
            Follow @groomer.pk
          </button>
        </div>
        
        <div className="flex marquee-scroller-reverse whitespace-nowrap">
          {[...marqueeImages, ...marqueeImages].reverse().map((img, idx) => (
            <motion.div 
              key={idx} 
              className="flex-none w-80 h-[500px] mx-4 rounded-3xl overflow-hidden glass border border-white/10 shadow-xl group relative cursor-pointer transition-all duration-700 marquee-item"
            >
              <img src={img} alt={`Social ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Instagram className="text-white" size={40} />
                </div>
              </div>
              <div className="absolute top-6 left-6 p-3 glass-dark rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                 <p className="text-[10px] font-mono text-white tracking-widest">LIVE SESSION</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto glass p-20 text-center rounded-xl relative overflow-hidden border-2 border-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <h2 className="font-display text-5xl md:text-7xl mb-8 uppercase tracking-tighter">Elevate Your <span className="text-primary italic">Identity</span></h2>
          <p className="text-lg text-on-surface-variant mb-12 max-w-xl mx-auto font-sans">
            Ready for a transformation? Join our community of discerning gentlemen.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="primary-gradient text-on-primary px-14 py-6 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest"
          >
            Claim Your Chair
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function ServicesPage({ onNavigate, key }: PageProps) {
  const services = [
    {
      id: 1,
      title: "Precision Haircuts",
      price: "PKR 3500+",
      description: "A tailored consultation followed by a meticulous cut that complements your face shape and lifestyle. Finished with a straight-razor neck shave.",
      image: "/images/haircut.png",
      items: ["45-Minute Session", "Hot Towel Finish"]
    },
    {
      id: 2,
      title: "Hot Towel Shaves",
      price: "PKR 2500",
      description: "The ultimate classic barber experience. Multiple hot towels, rich lather, and a smooth straight-razor finish.",
      image: "/images/shave.png",
      items: ["Skin Prep Ritual", "Double Shave Finish"]
    }
  ];

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-40 pb-20 bg-black overflow-hidden"
    >
      <NebulaShader />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-primary mb-4 block tracking-[0.4em] uppercase font-bold">Authentic Barbery</span>
            <h1 className="font-display text-6xl mb-6 tracking-tighter">Masterful Cuts, <br /><span className="text-primary italic">No AI needed.</span></h1>
            <p className="text-on-surface-variant text-lg max-w-lg mb-10 font-sans leading-relaxed">
              Real results from real sessions. We believe in showing our actual craft, not simulations. Explore our premium grooming services.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="primary-gradient text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-110 transition-all shadow-lg shadow-primary/40 uppercase tracking-widest text-xs"
            >
              Book Your Session <MoveRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-xl aspect-video overflow-hidden border-2 border-primary/20"
          >
            <img 
              src="/images/tools.png" 
              alt="Services" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id} 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="glass rounded-xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden border-b border-white/5">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-display text-4xl text-primary">{service.title}</h3>
                  <span className="bg-surface-container-highest px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-primary border border-primary/20">{service.price}</span>
                </div>
                <p className="text-on-surface-variant mb-8 line-clamp-3 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-10">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-mono tracking-wider opacity-80">
                      <CheckCircle2 size={16} className="text-primary" /> {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full py-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-on-primary transition-all font-bold uppercase tracking-widest text-xs"
                >
                  SELECT SERVICE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AboutPage({ onNavigate, key }: PageProps) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-40 pb-20 bg-black overflow-hidden"
    >
      <NebulaShader />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="font-mono text-xs text-primary uppercase tracking-[0.4em]">Heritage of Precision</span>
            <h1 className="font-display text-6xl leading-none">Our Story</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              At Groomer Branch 2, we believe grooming is more than a service; it's a meticulous craft. Our journey began with a single vision: to merge the timeless artistry of traditional barbering with the sophisticated demands of the modern gentleman.
            </p>
            <div className="flex gap-6">
              <div className="glass p-6 rounded-lg flex-1 border border-primary/20">
                <span className="font-display text-4xl text-primary block mb-2">15+</span>
                <span className="font-mono text-[10px] uppercase tracking-widest">Years of Craft</span>
              </div>
              <div className="glass p-6 rounded-lg flex-1 border border-primary/20">
                <span className="font-display text-4xl text-primary block mb-2">10k+</span>
                <span className="font-mono text-[10px] uppercase tracking-widest">Fades Perfected</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <img 
              src="/images/barber_hero.png" 
              alt="Story" 
              className="rounded-xl w-full h-[500px] object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 border-2 border-primary/10" 
            />
            <div className="absolute inset-0 border-4 border-primary/20 rounded-xl -m-4 pointer-events-none" />
          </motion.div>
        </div>

        <div className="text-center mb-20 bg-surface-container/60 backdrop-blur-md py-20 rounded-xl px-10 border border-white/5">
          <span className="font-mono text-xs text-primary mb-4 block uppercase tracking-widest">Clinical Grade Care</span>
          <h2 className="font-display text-5xl mb-12">The Groomer Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div whileHover={{ y: -10 }} className="space-y-6">
              <ShieldCheck className="mx-auto text-primary" size={48} />
              <h3 className="font-display text-2xl">Sterilized Equipment</h3>
              <p className="text-on-surface-variant text-sm">Medical-grade sterilization for every tool, ensuring your safety without compromise.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="space-y-6">
              <Verified className="mx-auto text-primary" size={48} />
              <h3 className="font-display text-2xl">Expert Certified</h3>
              <p className="text-on-surface-variant text-sm">Ranked Karachi's #1 grooming destination for the modern professional.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="space-y-6">
              <Armchair className="mx-auto text-primary" size={48} />
              <h3 className="font-display text-2xl">Premium Comfort</h3>
              <p className="text-on-surface-variant text-sm">Escape the heat in our premium air-conditioned lounge designed for maximum comfort.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactPage({ key }: { key?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Signature Haircut',
    notes: ''
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, service, notes } = formData;
    
    // WhatsApp redirect logic
    const phoneNumber = "923001234567"; // Replace with actual branch number
    const message = `*Groomer Branch 2 Booking Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Notes:* ${notes || 'N/A'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-40 pb-20 bg-black overflow-hidden"
    >
      <NebulaShader />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-primary uppercase tracking-[0.4em] mb-4 block">Craftsmanship & Precision</span>
            <h1 className="font-display text-5xl md:text-7xl mb-8 leading-tight">Secure Your<br /><span className="text-primary italic">Masterclass</span><br />Experience.</h1>
            <p className="text-on-surface-variant text-lg mb-12 max-w-lg leading-relaxed">
              Experience the pinnacle of grooming artistry at Groomer Branch 2. Our Federal B Area location offers the standard in meticulous precision.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform border border-primary/20">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Trading Hours</p>
                  <p className="text-xl font-display">Daily: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform border border-primary/20">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Studio Location</p>
                  <p className="text-xl font-display">Block 14, Federal B Area, Karachi</p>
                  <a 
                    href="https://www.google.com/maps/place/Groomer+Branch+2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center gap-1 hover:underline mt-2"
                  >
                    View on Maps <Navigation size={10} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform border border-primary/20">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Direct Line</p>
                  <p className="text-xl font-display">+92 21 34567890</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass p-12 rounded-xl border border-white/10 shadow-2xl shadow-black/50"
          >
            <h2 className="font-display text-3xl mb-10 text-primary">Service Request</h2>
            <form className="space-y-8" onSubmit={handleBooking}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary transition-all text-on-surface" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary transition-all text-on-surface" 
                    placeholder="+92 300 0000000" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">Preferred Service</label>
                <ActionSearchBar 
                  selectedValue={formData.service}
                  onSelect={(action) => setFormData({...formData, service: action.label})}
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-60">Notes (Optional)</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-primary transition-all text-on-surface resize-none" 
                  rows={3} 
                  placeholder="Tell us your requirements..." 
                />
              </div>

              <button className="w-full primary-gradient text-on-primary py-5 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                Request Appointment <ChevronRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

