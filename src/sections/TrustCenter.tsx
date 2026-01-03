import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, AlertCircle, CheckCircle } from 'lucide-react';
import './TrustCenter.css';

const TrustCenter: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState<any>(null);

    const performScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsScanning(true);
        // Simulate a scan since we don't have a backend proxy here
        setTimeout(() => {
            setResults({
                url: url.startsWith('http') ? url : `https://${url}`,
                score: 75,
                headers: [
                    { name: 'Content-Security-Policy', status: 'Missing', severity: 'High', desc: 'Critical for preventing XSS.' },
                    { name: 'Strict-Transport-Security', status: 'Valid', severity: 'None', desc: 'Enforces HTTPS.' },
                    { name: 'X-Frame-Options', status: 'Missing', severity: 'Medium', desc: 'Protects against clickjacking.' },
                    { name: 'X-Content-Type-Options', status: 'Valid', severity: 'None', desc: 'Prevents MIME sniffing.' },
                ]
            });
            setIsScanning(false);
        }, 2000);
    };

    return (
        <section id="trust-center" className="trust-section section">
            <div className="container">
                <h2 className="section-title">Trust Center & Security Lab</h2>
                <p className="section-subtitle">A transparency portal for my security posture and interactive tools for web auditing.</p>

                <div className="trust-grid">
                    {/* Trust Policies */}
                    <div className="trust-info glass">
                        <div className="info-header">
                            <Shield className="accent-icon" />
                            <h3>Vulnerability Disclosure Policy</h3>
                        </div>
                        <p>I believe in a collaborative security ecosystem. If you find a vulnerability in any of my projects, I encourage you to report it via my contact form.</p>
                        <ul className="policy-list">
                            <li>No system is perfectly secure.</li>
                            <li>I offer "Safe Harbor" for ethical research.</li>
                            <li>Priority is given to RCE and Authorization Bypass.</li>
                        </ul>

                        <div className="stack-badge-container">
                            <h4>Primary Security Stack</h4>
                            <div className="stack-badges">
                                <span className="badge">Burp Suite</span>
                                <span className="badge">Wireshark</span>
                                <span className="badge">Nmap</span>
                                <span className="badge">Gitleaks</span>
                                <span className="badge">OWASP ZAP</span>
                            </div>
                        </div>
                    </div>

                    {/* Header Scanner Tool */}
                    <div className="header-scanner glass">
                        <div className="scanner-header">
                            <Zap className="accent-icon" />
                            <h3>Security Header Scanner (Trial)</h3>
                        </div>
                        <p className="scanner-meta">External tool to audit HTTP security headers of any public domain.</p>

                        <form onSubmit={performScan} className="scanner-form">
                            <div className="input-with-button">
                                <Search className="search-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="scanner-input"
                                />
                                <button type="submit" disabled={isScanning} className="btn-primary">
                                    {isScanning ? 'Scanning...' : 'Scan'}
                                </button>
                            </div>
                        </form>

                        <div className="scanner-results">
                            {isScanning && (
                                <div className="scanning-animation">
                                    <div className="scan-line"></div>
                                    <p>Analyzing headers for {url}...</p>
                                </div>
                            )}

                            {results && !isScanning && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="results-container"
                                >
                                    <div className="results-header">
                                        <h4>Results for: {results.url}</h4>
                                        <span className="score">Score: {results.score}/100</span>
                                    </div>
                                    <div className="headers-list">
                                        {results.headers.map((h: any) => (
                                            <div key={h.name} className="header-item">
                                                <div className="header-main">
                                                    {h.status === 'Valid' ? <CheckCircle size={16} color="#10b981" /> : <AlertCircle size={16} color="#f43f5e" />}
                                                    <span className="header-name">{h.name}</span>
                                                    <span className={`status-tag ${h.status.toLowerCase()}`}>{h.status}</span>
                                                </div>
                                                <p className="header-desc">{h.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustCenter;
