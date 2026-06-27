import { useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Toolchain from './sections/Toolchain';
import IsometricShowcase from './sections/IsometricShowcase';
import Manifesto from './sections/Manifesto';
import Footer from './sections/Footer';
import SectionDivider from './sections/SectionDivider';

function App() {
  useEffect(() => {
    // Smooth scroll with lerp
    let scrollY = window.scrollY;
    let targetY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      targetY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          scrollY += (targetY - scrollY) * 0.08;
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <SectionDivider glowColor="#8b5cf6" />
      <Philosophy />
      <SectionDivider glowColor="#ec4899" />
      <IsometricShowcase />
      <SectionDivider glowColor="#06b6d4" />
      <Toolchain />
      <SectionDivider glowColor="#8b5cf6" />
      <Manifesto />
      <Footer />
    </div>
  );
}

export default App;
