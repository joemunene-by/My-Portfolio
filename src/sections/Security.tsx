import React from 'react';
import { ShieldCheck, Lock, EyeOff, Globe } from 'lucide-react';
import './Security.css';

const Security: React.FC = () => {
    const hardeningSteps = [
        {
            title: "Content Security Policy (CSP)",
            desc: "Mitigating XSS attacks by restricting sources for scripts, styles, and other resources.",
            icon: <Lock size={24} />
        },
        {
            title: "HSTS & Transport Security",
            desc: "Enforcing secure HTTPS connections and preventing protocol downgrade attacks.",
            icon: <ShieldCheck size={24} />
        },
        {
            title: "X-Frame-Options",
            desc: "Protecting against clickjacking by preventing the site from being embedded in unauthorized frames.",
            icon: <EyeOff size={24} />
        },
        {
            title: "Subresource Integrity (SRI)",
            desc: "Ensuring that third-party assets have not been tampered with using cryptographic hashes.",
            icon: <Globe size={24} />
        }
    ];

    return (
        <section id="security" className="security-section section">
            <div className="container">
                <h2 className="section-title">Security Hardening</h2>
                <p className="section-subtitle">How I apply a defensive security mindset to my own digital infrastructure.</p>

                <div className="hardening-grid">
                    {hardeningSteps.map((step) => (
                        <div key={step.title} className="hardening-card glass">
                            <div className="hardening-icon">{step.icon}</div>
                            <h3 className="hardening-title">{step.title}</h3>
                            <p className="hardening-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="security-cta glass">
                    <div className="cta-content">
                        <h3>Secure By Design</h3>
                        <p>Every tool and application I build follows the principle of least privilege and strict input validation. Security isn't just a layer; it's the foundation.</p>
                    </div>
                    <a href="https://github.com/joemunene-by/Vulnerabilities-Scanner" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        View Security Tooling
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Security;
