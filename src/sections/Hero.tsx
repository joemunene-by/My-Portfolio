import { motion } from 'framer-motion';
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-background">
                <div className="grid-overlay"></div>
                <div className="glow-sphere sphere-1"></div>
                <div className="glow-sphere sphere-2"></div>
            </div>

            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hero-badge"
                >
                    <span className="badge-pulse"></span>
                    Cybersecurity & Full-Stack Engineering
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hero-title text-glitch"
                    data-text="Joe Munene."
                >
                    Joe Munene<span className="text-gradient">.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hero-description"
                >
                    Building secure systems, intelligent tools, and real-world applications
                    with <span className="highlight">Python</span>, <span className="highlight">JavaScript</span>,
                    and a defensive security mindset.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hero-cta"
                >
                    <a href="#projects" className="btn-primary">
                        Explore Work <ArrowRight size={18} />
                    </a>
                    <a href="#security" className="btn-secondary">
                        Security Hardening <TerminalIcon size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
