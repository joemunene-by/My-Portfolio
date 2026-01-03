import React from 'react';
import { motion } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { skillGroups } from '../data/skills';
import './Skills.css';

const data = [
    { subject: 'Defensive Security', A: 95, fullMark: 100 },
    { subject: 'Offensive Techniques', A: 85, fullMark: 100 },
    { subject: 'Full-Stack Dev', A: 90, fullMark: 100 },
    { subject: 'Systems Thinking', A: 95, fullMark: 100 },
    { subject: 'AI Integration', A: 80, fullMark: 100 },
    { subject: 'Cloud Security', A: 75, fullMark: 100 },
];

const Skills: React.FC = () => {
    return (
        <section id="skills" className="skills-section section">
            <div className="container">
                <h2 className="section-title">Technical Proficiency</h2>
                <p className="section-subtitle">A balanced view of my engineering expertise and security-first mindset.</p>

                <div className="skills-layout">
                    {/* Radar Chart */}
                    <div className="radar-container glass">
                        <h3 className="chart-title">Skill Architecture</h3>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                    />
                                    <Radar
                                        name="Proficiency"
                                        dataKey="A"
                                        stroke="var(--accent-primary)"
                                        fill="var(--accent-primary)"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="skills-grid-compact">
                        {skillGroups.map((group, index) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="skill-group-mini glass"
                            >
                                <h3 className="skill-group-title">{group.category}</h3>
                                <div className="skill-chips">
                                    {group.skills.map((skill) => (
                                        <span key={skill} className="skill-chip">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
