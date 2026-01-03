import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Lock, Unlock, ShieldAlert } from 'lucide-react';
import './HackChallenge.css';

const HackChallenge: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isHacked, setIsHacked] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAttempts(p => p + 1);

        // The "vulnerability" is a simple weak password check or hidden field
        // For this educational challenge: the password is "secure_by_design"
        if (inputValue.toLowerCase().trim() === 'secure_by_design') {
            setIsHacked(true);
        } else {
            if (attempts >= 2) setShowHint(true);
        }
    };

    return (
        <section id="challenge" className="challenge-section section">
            <div className="container">
                <div className="challenge-card glass">
                    <div className="challenge-icon">
                        {isHacked ? <Unlock size={40} className="unlocked" /> : <Lock size={40} />}
                    </div>

                    <h2 className="challenge-title">Security Lab: Authorization Bypass</h2>
                    <p className="challenge-desc">
                        A "vulnerable" system has been detected. Can you find the secret key to gain access?
                        Check my <strong>Systems Thinking</strong> notes for clues on my design philosophy.
                    </p>

                    {!isHacked ? (
                        <form onSubmit={handleSubmit} className="challenge-form">
                            <div className="input-group">
                                <Bug className="input-icon" size={18} />
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter secret key..."
                                    className="challenge-input"
                                />
                            </div>
                            <button type="submit" className="btn-primary challenge-btn">
                                Attempt Bypass
                            </button>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="challenge-hint"
                                    >
                                        <ShieldAlert size={14} />
                                        Hint: My core philosophy mentioned in the hero section... (with underscores)
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="success-message"
                        >
                            <h3>ACCESS GRANTED</h3>
                            <p>Well done, Engineer. You've identified the core value of this portfolio.</p>
                            <div className="token-display">
                                FLAG{'{'}SECURE_ENGINEERING_EXPERT{'}'}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HackChallenge;
