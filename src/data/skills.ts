export interface SkillGroup {
    category: string;
    skills: string[];
    icon?: string;
}

export const skillGroups: SkillGroup[] = [
    {
        category: 'Cybersecurity & Security Engineering',
        skills: [
            'Ethical Hacking Principles',
            'Secure-by-Design Architecture',
            'Threat Modeling',
            'Attack Surface Analysis',
            'Network & Systems Security',
            'DNS Fundamentals',
            'Port Scanning & Service Enumeration',
            'Vulnerability Scanning (Static Analysis)',
            'OWASP Common Vulnerabilities',
            'Secure API Design',
            'HTTP Security Headers (CSP, HSTS)',
            'Security Automation'
        ]
    },
    {
        category: 'Programming & Software Development',
        skills: [
            'Python (Security Tools & Automation)',
            'JavaScript (Frontend & Backend)',
            'TypeScript (Structured Projects)',
            'HTML5 & CSS3',
            'Modular Code Design',
            'CLI Tool Development',
            'Debugging & Testing Mindset',
            'Git & Version Control'
        ]
    },
    {
        category: 'Web Development & Dashboards',
        skills: [
            'Responsive Web Design',
            'UI/UX Fundamentals',
            'Interactive Interfaces',
            'Threat Intelligence Visualization',
            'API Consumption & Integration',
            'Client-Server Interaction',
            'Performance-Conscious UI design'
        ]
    },
    {
        category: 'AI & Automation',
        skills: [
            'AI Model Integration',
            'Prompt Engineering',
            'AI-Assisted Developer Tools',
            'Workflow Automation Concepts',
            'AI APIs Integration'
        ]
    },
    {
        category: 'Systems Thinking & Thinking Mindset',
        skills: [
            'Problem Decomposition',
            'Technical Trade-off Analysis',
            'Documentation & Tech Communication',
            'Learning-by-Building Methodology',
            'Systems Thinking Approach'
        ]
    },
    {
        category: 'Tools & Specialized',
        skills: [
            'VS Code & Browser DevTools',
            'CLI / Terminal Workflows',
            'Three.js (3D Visualization)',
            'Cryptography Basics',
            'Markdown Documentation',
            'Static Site Hosting (Vercel/GitHub)',
            'Research-Oriented Mindset'
        ]
    }
];
