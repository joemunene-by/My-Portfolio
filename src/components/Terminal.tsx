import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Shield } from 'lucide-react';
import './Terminal.css';

const Terminal: React.FC = () => {
    const [lines, setLines] = useState<string[]>([
        'Initializing secure session...',
        'Authenticating user: joe_munene',
        'Access granted.',
        'Type "help" for a list of available commands.'
    ]);
    const [inputValue, setInputValue] = useState('');
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [lines]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const cmd = inputValue.toLowerCase().trim();
        const newLines = [...lines, `> ${inputValue}`];

        switch (cmd) {
            case 'help':
                newLines.push('Available commands: about, skills, projects, clear, contact');
                break;
            case 'about':
                newLines.push('Joe Munene: Full-Stack Developer & Cybersecurity Engineer based in Nairobi, Kenya.');
                break;
            case 'skills':
                newLines.push('Languages: Python, JavaScript, TypeScript. Specialties: Security Engineering, Web Dev.');
                break;
            case 'projects':
                newLines.push('Top Projects: Vulnerabilities Scanner, DNS Tool, SentinelPulse, Port Scanner.');
                break;
            case 'contact':
                newLines.push('Reach out via email or GitHub. Check the contact section below.');
                break;
            case 'clear':
                setLines([]);
                setInputValue('');
                return;
            case 'whoami':
                newLines.push('Guest User - Access Level: Read-Only');
                break;
            default:
                newLines.push(`Command not found: ${cmd}`);
        }

        setLines(newLines);
        setInputValue('');
    };

    return (
        <section id="terminal" className="terminal-section section">
            <div className="container">
                <div className="terminal-window glass">
                    <div className="terminal-header">
                        <div className="window-controls">
                            <span className="control close"></span>
                            <span className="control minimize"></span>
                            <span className="control maximize"></span>
                        </div>
                        <div className="terminal-title">
                            <TerminalIcon size={14} />
                            <span>joe@munene:~ (zsh)</span>
                        </div>
                        <div className="encryption-status">
                            <Shield size={12} />
                            <span>AES-256</span>
                        </div>
                    </div>

                    <div className="terminal-body" ref={terminalBodyRef}>
                        {lines.map((line, i) => (
                            <div key={i} className="terminal-line">
                                {line.startsWith('>') ? (
                                    <span className="prompt-symbol">{line}</span>
                                ) : (
                                    <span className="output-line">{line}</span>
                                )}
                            </div>
                        ))}
                        <form onSubmit={handleCommand} className="terminal-input-form">
                            <span className="prompt-symbol-active">&gt;</span>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                                autoComplete="off"
                                spellCheck="false"
                                className="terminal-input"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
