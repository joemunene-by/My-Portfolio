export interface TechnicalNote {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
}

export const technicalNotes: TechnicalNote[] = [
    {
        id: 'systems-thinking-security',
        title: 'Systems Thinking in Cybersecurity',
        date: 'Dec 28, 2025',
        excerpt: 'Analyzing security not as a feature, but as a holistic property of a system.',
        content: `# Systems Thinking in Cybersecurity
    
Security is often treated as a "bolt-on" feature—a firewall here, an encryption layer there. However, true security is a **holistic property** of a system.

### The Feedback Loop
In systems thinking, we look at how different components interact. A vulnerability in a "low-priority" microservice can escalate into a full system compromise if there's no isolation.

### Principles I Follow:
1. **Defense in Depth**: Multiple layers of security.
2. **Least Privilege**: Components should only have the access they *absolutely* need.
3. **Observability**: You can't secure what you can't see.

Building systems that are "Secure by Design" requires understanding the entire architecture, not just the code.`,
        tags: ['Security', 'Architecture', 'Systems Thinking']
    },
    {
        id: 'static-analysis-benefits',
        title: 'The Power of Static Analysis',
        date: 'Jan 1, 2026',
        excerpt: 'How my Vulnerabilities-Scanner helps find bugs before they reached production.',
        content: `# The Power of Static Analysis

Static Application Security Testing (SAST) is the process of analyzing source code without executing it.

### Why it Matters
Finding a bug during development costs **10x less** than finding it in production. My tool, the \`Vulnerabilities-Scanner\`, looks for patterns like:
- Hardcoded credentials
- SQL injection sinks
- Insecure crypto implementations

### Limitations
SAST can't find everything. It misses logic flaws that only appear at runtime. That's why I combine it with a defensive mindset during the entire development lifecycle.`,
        tags: ['SAST', 'Python', 'Secure Coding']
    }
];
