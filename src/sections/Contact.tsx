import React from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="contact-section section">
            <div className="container">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-subtitle">Open to collaborations, contract work, and cybersecurity projects.</p>

                <div className="contact-container">
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon"><Mail size={20} /></div>
                            <div className="info-text">
                                <h4>Email</h4>
                                <a href="mailto:joemunene@example.com">joemunene@example.com</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon"><MapPin size={20} /></div>
                            <div className="info-text">
                                <h4>Location</h4>
                                <span>Nairobi, Kenya</span>
                            </div>
                        </div>

                        <div className="social-links-footer">
                            <a href="https://github.com/joemunene-by" target="_blank" rel="noopener noreferrer" className="social-footer-item">
                                <Github size={24} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="social-footer-item">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows={5} placeholder="How can I help you?"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
