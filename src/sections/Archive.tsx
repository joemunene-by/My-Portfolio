import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { technicalNotes, type TechnicalNote } from '../data/notes';
import './Archive.css';

const Archive: React.FC = () => {
    const [selectedNote, setSelectedNote] = useState<TechnicalNote | null>(null);

    return (
        <section id="archive" className="archive-section section">
            <div className="container">
                <h2 className="section-title">Technical Archive</h2>
                <p className="section-subtitle">Deep dives into systems thinking, security engineering, and technical problem-solving.</p>

                <div className="notes-grid">
                    {technicalNotes.map((note) => (
                        <motion.div
                            key={note.id}
                            whileHover={{ y: -5 }}
                            className="note-card glass"
                            onClick={() => setSelectedNote(note)}
                        >
                            <div className="note-date">
                                <Calendar size={14} />
                                <span>{note.date}</span>
                            </div>
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-excerpt">{note.excerpt}</p>
                            <div className="note-footer">
                                <div className="note-tags">
                                    {note.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="tag-tiny">{tag}</span>
                                    ))}
                                </div>
                                <span className="read-more">
                                    Read Note <ArrowRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedNote && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="modal-overlay"
                            onClick={() => setSelectedNote(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="note-modal glass"
                                onClick={e => e.stopPropagation()}
                            >
                                <button className="close-modal" onClick={() => setSelectedNote(null)}>
                                    <X size={24} />
                                </button>
                                <div className="modal-header">
                                    <div className="note-date">
                                        <Calendar size={14} />
                                        <span>{selectedNote.date}</span>
                                    </div>
                                    <h1>{selectedNote.title}</h1>
                                    <div className="note-tags">
                                        {selectedNote.tags.map(tag => (
                                            <span key={tag} className="tag-large">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-content markdown-body">
                                    <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Archive;
