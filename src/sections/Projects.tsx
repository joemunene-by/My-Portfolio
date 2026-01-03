import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ShieldCheck, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import './Projects.css';

const Projects: React.FC = () => {
    const [filter, setFilter] = useState<Project['category'] | 'All'>('All');
    const [selectedReport, setSelectedReport] = useState<Project | null>(null);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const categories: (Project['category'] | 'All')[] = ['All', 'Security', 'Full-Stack', 'Tools', 'Creative'];

    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <h2 className="section-title">Engineering Portfolio</h2>
                <p className="section-subtitle">From static analysis tools to complex web ecosystems. Select a featured project for a deep-dive security report.</p>

                <div className="filter-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-tab ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="projects-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="project-card glass"
                            >
                                <div className="project-header">
                                    <div className="project-category">
                                        {project.category === 'Security' && <ShieldCheck size={14} />}
                                        {project.category}
                                    </div>
                                    {project.featured && <span className="featured-badge">Featured</span>}
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.map(t => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                        <Github size={18} />
                                        <span>Code</span>
                                    </a>
                                    {project.featured && (
                                        <button onClick={() => setSelectedReport(project)} className="project-link btn-report">
                                            <FileText size={18} />
                                            <span>Security Audit</span>
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Report Modal */}
                <AnimatePresence>
                    {selectedReport && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="modal-overlay"
                            onClick={() => setSelectedReport(null)}
                        >
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                className="report-modal glass"
                                onClick={e => e.stopPropagation()}
                            >
                                <button className="close-modal" onClick={() => setSelectedReport(null)}>
                                    <X size={24} />
                                </button>

                                <div className="report-header">
                                    <ShieldCheck size={40} className="report-icon" />
                                    <div>
                                        <span className="report-label">SECURITY AUDIT REPORT</span>
                                        <h2 className="report-title">{selectedReport.title}</h2>
                                    </div>
                                </div>

                                <div className="report-grid">
                                    <div className="report-section">
                                        <h3><AlertTriangle size={18} /> Risk Profile</h3>
                                        <p>Static analysis identified 0 critical vulnerabilities. Attack surface is minimized through strict input validation and least-privilege principles.</p>
                                    </div>

                                    <div className="report-section">
                                        <h3><CheckCircle size={18} /> Hardening Measures</h3>
                                        <ul>
                                            <li>Modular component isolation</li>
                                            <li>Environment variable sanitization</li>
                                            <li>Automated dependency auditing (NPM/PIP)</li>
                                            <li>Secure communication via TLS/HTTPS</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="report-footer">
                                    <p>This project follows the <strong>Secure-by-Design</strong> architecture pattern. Full documentation available in the repository README.</p>
                                    <a href={selectedReport.github} className="btn-primary">View Full Source</a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
