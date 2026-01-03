export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'Security' | 'Full-Stack' | 'Tools' | 'Creative';
  github: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'vulnerabilities-scanner',
    title: 'Vulnerabilities-Scanner',
    description: 'Static scanner that finds insecure patterns in source code using Python. Analyzes code for common security pitfalls.',
    tech: ['Python', 'Static Analysis', 'Security'],
    category: 'Security',
    github: 'https://github.com/joemunene-by/Vulnerabilities-Scanner',
    featured: true
  },
  {
    id: 'dns-tool',
    title: 'DNS & Domain Intelligence',
    description: 'Comprehensive domain intelligence utility for network reconnaissance and DNS analysis.',
    tech: ['Python', 'Networking', 'Security'],
    category: 'Security',
    github: 'https://github.com/joemunene-by/DNS-Lookup-and-Domain-Intelligence-Tool',
    featured: true
  },
  {
    id: 'sentinelpulse',
    title: 'SentinelPulse',
    description: 'Real-time Threat Intelligence Dashboard for visualizing and monitoring security threats.',
    tech: ['JavaScript', 'Web', 'Dashboard'],
    category: 'Full-Stack',
    github: 'https://github.com/joemunene-by/sentinelpulse',
    featured: true
  },
  {
    id: 'port-scanner',
    title: 'Port-scanner',
    description: 'Network scanning utility with a modern web interface for service enumeration.',
    tech: ['JavaScript', 'Networking', 'UI'],
    category: 'Security',
    github: 'https://github.com/joemunene-by/Port-scanner',
    featured: true
  },
  {
    id: 'key-logger',
    title: 'Educational Key-logger',
    description: 'Educational surveillance tool developed to understand input monitoring and protection.',
    tech: ['Python', 'Security', 'Research'],
    category: 'Security',
    github: 'https://github.com/joemunene-by/Key-logger'
  },
  {
    id: 'cyber-sec-agency',
    title: 'Cyber-Sec Agency',
    description: 'Full-spectrum security services site showcasing professional security offerings.',
    tech: ['JavaScript', 'Web', 'UX'],
    category: 'Full-Stack',
    github: 'https://github.com/joemunene-by/Cyber-sec-agency'
  },
  {
    id: 'ghosthacking',
    title: 'Ghosthacking',
    description: 'Project focused on cybersecurity content and threat research repository.',
    tech: ['Security', 'Content', 'Research'],
    category: 'Security',
    github: 'https://github.com/joemunene-by/Ghosthacking'
  },
  {
    id: 'complex-dev',
    title: 'Complex-Dev',
    description: 'Modern web services platform showcasing high-performance web engineering.',
    tech: ['HTML', 'Web Services', 'Performance'],
    category: 'Full-Stack',
    github: 'https://github.com/joemunene-by/Complex-Dev'
  },
  {
    id: 'gigidy',
    title: 'Gigidy',
    description: 'Static site architecture and development project.',
    tech: ['HTML', 'Static Site', 'Design'],
    category: 'Full-Stack',
    github: 'https://github.com/joemunene-by/gigidy'
  },
  {
    id: 'systems-thinking-notes',
    title: 'Systems-Thinking Notes',
    description: 'Personal notes on computation, security, and systems engineering.',
    tech: ['Knowledge', 'Security', 'Systems'],
    category: 'Tools',
    github: 'https://github.com/joemunene-by/systems-thinking-notes'
  },
  {
    id: 'joe-learning-platform',
    title: 'Learning Platform',
    description: 'Teaching platform content and technical documentation site.',
    tech: ['HTML', 'Teaching', 'Web'],
    category: 'Tools',
    github: 'https://github.com/joemunene-by/Joe-learning-platform'
  },
  {
    id: 'caesar-cipher-tool',
    title: 'Caesar-Cipher Tool',
    description: 'Encryption utility showcasing fundamental cryptographic concepts.',
    tech: ['CSS', 'Cryptography', 'UI'],
    category: 'Creative',
    github: 'https://github.com/joemunene-by/Caesa-Cipher-Tool'
  },
  {
    id: 'car-mods-3d',
    title: 'Car-Mods 3D',
    description: '3D car customization experience built with TypeScript.',
    tech: ['TypeScript', '3D', 'Three.js'],
    category: 'Creative',
    github: 'https://github.com/joemunene-by/car-mods-3d'
  },
  {
    id: '3d-car-studio',
    title: '3D Car Customization Studio',
    description: 'Another advanced 3D project focusing on interactive customization.',
    tech: ['TypeScript', '3D', 'Interactive'],
    category: 'Creative',
    github: 'https://github.com/joemunene-by/3d-car-customization-studio'
  }
];
