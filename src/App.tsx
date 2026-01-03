import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Security from './sections/Security';
import Terminal from './components/Terminal';
import Archive from './sections/Archive';
import TrustCenter from './sections/TrustCenter';
import HackChallenge from './components/HackChallenge';
import ThreatTicker from './components/ThreatTicker';
import Contact from './sections/Contact';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <ThreatTicker />
      <main>
        <Hero />
        <Terminal />
        <Projects />
        <Skills />
        <Archive />
        <TrustCenter />
        <Security />
        <HackChallenge />
        <Contact />
      </main>
      <footer className="main-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Joe Munene. Built with React & Security-First Mindset.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
