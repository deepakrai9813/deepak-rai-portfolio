import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Works from "./components/Works";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll(true);

  // Always open at the very top so the header is the first thing seen
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Preloader />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Works />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
