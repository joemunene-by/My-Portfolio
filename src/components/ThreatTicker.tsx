import { Globe, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ThreatTicker.css';

const ThreatTicker: React.FC = () => {
    const [threats, setThreats] = useState([
        { id: 1, type: 'CVE', title: 'Critical RCE in OpenSSH', severity: 'Critical', region: 'Global' },
        { id: 2, type: 'ATTACK', title: 'DDoS on Financial Sector', severity: 'High', region: 'APAC' },
        { id: 3, type: 'DISCOVERY', title: 'New Zero-Day in Chrome', severity: 'High', region: 'Global' },
        { id: 4, type: 'RANSOMWARE', title: 'Akira leak site update', severity: 'Medium', region: 'US' },
    ]);

    // Rotate threats
    useEffect(() => {
        const interval = setInterval(() => {
            setThreats(prev => [...prev.slice(1), prev[0]]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getSeverityColor = (sev: string) => {
        switch (sev) {
            case 'Critical': return '#ef4444';
            case 'High': return '#f97316';
            case 'Medium': return '#eab308';
            default: return '#10b981';
        }
    };

    return (
        <div className="threat-ticker-container">
            <div className="ticker-label">
                <Radio size={14} className="pulse-icon" />
                <span>LIVE THREAT FEED</span>
            </div>
            <div className="ticker-content">
                <div className="ticker-item">
                    <span className="ticker-type">{threats[0].type}</span>
                    <span className="ticker-title">{threats[0].title}</span>
                    <span className="ticker-region">[{threats[0].region}]</span>
                    <span
                        className="ticker-severity"
                        style={{ color: getSeverityColor(threats[0].severity) }}
                    >
                        {threats[0].severity}
                    </span>
                </div>
            </div>
            <div className="ticker-meta">
                <Globe size={14} />
                <span>Real-time Intel Engaged</span>
            </div>
        </div>
    );
};

export default ThreatTicker;
