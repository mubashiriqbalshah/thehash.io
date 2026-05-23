// ============ Site Data Store (localStorage backed) ============
// All editable content lives here. Admin panel reads/writes this object.
// Falls back to defaults if localStorage is empty.

const STORAGE_KEY = 'thehash-site-data';

const DEFAULT_DATA = {
    slides: [
        {
            badge: '⚡ Next-Gen Blockchain',
            titlePart1: 'Building the',
            titleHighlight: 'Decentralized',
            titlePart2: 'Future',
            description: 'Blockchain, smart contracts, web platforms and mobile apps — engineered for the future of digital business.',
            primaryBtn: { text: 'Explore Services', href: '#services' },
            secondaryBtn: { text: 'Talk to Us', href: '#get-in-touch' }
        },
        {
            badge: '🔐 Smart Contracts',
            titlePart1: '',
            titleHighlight: 'Audited.',
            titlePart2: 'Secure. Deployed.',
            description: 'Battle-tested smart contracts on Ethereum, BSC, Polygon and Solana with rigorous security audits.',
            primaryBtn: { text: 'Our Contracts', href: '#services' },
            secondaryBtn: { text: 'Request Audit', href: '#get-in-touch' }
        },
        {
            badge: '📱 Web & Mobile Apps',
            titlePart1: 'Stunning',
            titleHighlight: 'Web & Mobile',
            titlePart2: 'Experiences',
            description: 'Modern websites and cross-platform mobile apps designed to scale your business and delight users.',
            primaryBtn: { text: 'View Solutions', href: '#services' },
            secondaryBtn: { text: 'Start Project', href: '#get-in-touch' }
        }
    ],
    stats: [
        { target: 150, suffix: '', label: 'Smart Contracts Deployed' },
        { target: 50, suffix: '', label: 'Global Clients' },
        { target: 99, suffix: '%', label: 'Security Audit Score' },
        { target: 24, suffix: '/7', label: 'Expert Support' }
    ],
    about: {
        tag: 'About Us',
        titlePart1: 'Powering the',
        titleHighlight: 'Digital',
        titlePart2: 'Future',
        paragraph1: 'TheHash.io is a full-service technology company delivering blockchain platforms, smart contracts, modern websites and mobile applications. We bridge the gap between traditional business and Web3 innovation.',
        paragraph2: 'Our team of blockchain architects, full-stack engineers, mobile developers and designers delivers production-ready solutions that scale globally.',
        features: [
            { icon: '⚡', title: 'Lightning Fast', desc: 'High-performance blockchain infrastructure built for scale.' },
            { icon: '🛡️', title: 'Secure by Design', desc: 'Multi-layer security audits and formal verification.' },
            { icon: '🌐', title: 'Full-Stack', desc: 'Blockchain, web and mobile — built end-to-end under one roof.' },
            { icon: '💎', title: 'Premium Quality', desc: 'Industry best practices and clean, auditable code.' }
        ]
    },
    services: [
        { iconKey: 'plus', title: 'Smart Contract Development', desc: 'Custom-built, gas-optimized smart contracts on Solidity, Rust and Move with comprehensive testing.', bullets: ['ERC-20, ERC-721, ERC-1155 tokens', 'DeFi protocols & staking', 'Upgradeable proxy patterns'] },
        { iconKey: 'solidity', title: 'Solidity Development', desc: 'Expert Solidity engineering for Ethereum and all EVM-compatible chains. From token standards to complex DeFi protocols, we write clean, secure and gas-efficient Solidity contracts that scale in production.', bullets: ['EVM chains: Ethereum, BSC, Polygon, Arbitrum, Base', 'Hardhat, Foundry & Truffle workflows', 'OpenZeppelin patterns & gas optimization'] },
        { iconKey: 'shield', title: 'Security Audits', desc: 'Rigorous manual and automated security audits to protect your smart contracts from vulnerabilities.', bullets: ['Vulnerability assessment', 'Formal verification', 'Detailed audit reports'] },
        { iconKey: 'globe', title: 'DApp Development', desc: 'Full-stack decentralized applications with seamless Web3 integrations and intuitive UX.', bullets: ['React, Next.js, Web3.js', 'Wallet integrations', 'IPFS & decentralized storage'] },
        { iconKey: 'network', title: 'DeFi Solutions', desc: 'Build the next generation of decentralized finance with custom protocols and liquidity solutions.', bullets: ['DEX & AMM development', 'Lending & yield protocols', 'Cross-chain bridges'] },
        { iconKey: 'card', title: 'NFT Marketplaces', desc: 'Launch beautiful, scalable NFT platforms with minting, trading, royalties and lazy minting.', bullets: ['Custom marketplace UI', 'Royalty engine', 'Multi-chain support'] },
        { iconKey: 'compass', title: 'Blockchain Consulting', desc: 'Strategic guidance for enterprises entering the Web3 space with tailored technology roadmaps.', bullets: ['Tokenomics design', 'Architecture planning', 'Regulatory compliance'] },
        { iconKey: 'browser', title: 'Web Development', desc: 'High-performance websites and web platforms built with modern frameworks, optimized for speed and SEO.', bullets: ['React, Next.js & Vue.js', 'Custom CMS & dashboards', 'E-commerce solutions'] },
        { iconKey: 'mobile', title: 'Mobile App Development', desc: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.', bullets: ['React Native & Flutter', 'Native iOS & Android', 'App Store deployment'] },
        { iconKey: 'design', title: 'UI / UX Design', desc: 'Beautiful, intuitive interfaces crafted through user research, wireframing, prototyping and polished visual design.', bullets: ['Figma design systems', 'Interactive prototypes', 'Brand identity'] }
    ],
    clients: [
        { name: 'Client 1', logoUrl: '' },
        { name: 'Client 2', logoUrl: '' },
        { name: 'Client 3', logoUrl: '' },
        { name: 'Client 4', logoUrl: '' },
        { name: 'Client 5', logoUrl: '' },
        { name: 'Client 6', logoUrl: '' }
    ],
    testimonial: {
        text: 'TheHash.io delivered our smart contract platform with exceptional quality and security. Their team\'s expertise transformed our vision into a production-ready blockchain solution.',
        author: 'Future Client Testimonial',
        role: 'Replace with real customer feedback'
    },
    leadership: [
        {
            initials: 'MI',
            name: 'Mudaser Iqbal',
            role: 'Founder & Entrepreneur',
            bio: 'Visionary leader driving blockchain innovation at TheHash.io. Passionate about building decentralized solutions that empower businesses worldwide.',
            email: 'founder@thehash.io',
            linkedin: '#',
            twitter: '#',
            colorVariant: 'cyan'
        },
        {
            initials: 'MI',
            name: 'Mubashir Iqbal',
            role: 'Director',
            bio: 'Strategic director leading operations and growth at TheHash.io. Bridging technology and business to deliver world-class blockchain solutions.',
            email: 'director@thehash.io',
            linkedin: '#',
            twitter: '#',
            colorVariant: 'purple'
        }
    ],
    contact: {
        email: 'info@thehash.io',
        website: 'www.thehash.io',
        notifyEmails: ['mubashir2009@gmail.com', 'mudaseriqbal@gmail.com'],
        formPrimaryEmail: 'mubashir2009@gmail.com',
        formEndpoint: '534edb36-d7c6-4e18-b37f-2b5e37435d7c',
        formProvider: 'web3forms'
    },
    footer: {
        tagline: 'Building the decentralized future, one block at a time.',
        copyright: '© 2026 TheHash.io — Founded by Mudaser Iqbal. All rights reserved.'
    }
};

// ============ Icon library (used by services) ============
const ICON_LIBRARY = {
    plus: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="6" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M16 24h16M24 16v16" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    solidity: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L12 14l12 6 12-6L24 4z" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 14v10l12 6V20" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M36 14v10L24 30V20" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 30v14M14 36l10 8 10-8" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    shield: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L40 14V28L24 42L8 28V14L24 6Z" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M19 22l4 4 8-8" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    globe: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M8 24h32M24 8c4 4 6 10 6 16s-2 12-6 16c-4-4-6-10-6-16s2-12 6-16z" stroke="url(#sgIcon)" stroke-width="2.5"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    network: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="6" stroke="url(#sgIcon)" stroke-width="2.5"/><circle cx="10" cy="12" r="4" stroke="url(#sgIcon)" stroke-width="2.5"/><circle cx="38" cy="12" r="4" stroke="url(#sgIcon)" stroke-width="2.5"/><circle cx="10" cy="36" r="4" stroke="url(#sgIcon)" stroke-width="2.5"/><circle cx="38" cy="36" r="4" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M13 14l8 7M35 14l-8 7M13 34l8-7M35 34l-8-7" stroke="url(#sgIcon)" stroke-width="2"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    card: '<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="4" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M6 18h36M14 28h6M24 28h10" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    compass: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 6v36M6 24h36" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="24" r="18" stroke="url(#sgIcon)" stroke-width="2.5"/><ellipse cx="24" cy="24" rx="9" ry="18" stroke="url(#sgIcon)" stroke-width="2.5"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    browser: '<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="28" rx="3" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M4 14h40M18 42h12M24 36v6" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><path d="M10 22l4 4-4 4M18 30h8" stroke="url(#sgIcon)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    mobile: '<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="40" rx="4" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M22 38h4" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><path d="M19 10h10" stroke="url(#sgIcon)" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="22" r="4" stroke="url(#sgIcon)" stroke-width="2"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    design: '<svg viewBox="0 0 48 48" fill="none"><path d="M12 8l24 16-12 4-4 12L12 8z" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M28 28l8 8" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    code: '<svg viewBox="0 0 48 48" fill="none"><path d="M16 14L6 24l10 10M32 14l10 10-10 10M28 10l-8 28" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>',
    rocket: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 4c8 4 12 12 12 20l-4 4h-16l-4-4c0-8 4-16 12-20z" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="20" r="4" stroke="url(#sgIcon)" stroke-width="2.5"/><path d="M16 32l-4 8 8-4M32 32l4 8-8-4" stroke="url(#sgIcon)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sgIcon" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs></svg>'
};

// ============ Load / Save ============
function loadSiteData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
        const parsed = JSON.parse(raw);
        const merged = deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
        // Migration: legacy #contact CTA hrefs -> #get-in-touch (form anchor)
        if (Array.isArray(merged.slides)) {
            merged.slides.forEach(s => {
                if (s.secondaryBtn && s.secondaryBtn.href === '#contact') s.secondaryBtn.href = '#get-in-touch';
            });
        }
        // Migration: ensure notifyEmails exists
        if (merged.contact && !Array.isArray(merged.contact.notifyEmails)) {
            merged.contact.notifyEmails = DEFAULT_DATA.contact.notifyEmails.slice();
        }
        // Migration: if user has not actively configured a form endpoint,
        // apply the default Web3Forms config.
        if (merged.contact && !merged.contact.formEndpoint) {
            merged.contact.formEndpoint = DEFAULT_DATA.contact.formEndpoint;
            merged.contact.formProvider = DEFAULT_DATA.contact.formProvider;
        }
        if (merged.contact && !merged.contact.formPrimaryEmail) {
            merged.contact.formPrimaryEmail = DEFAULT_DATA.contact.formPrimaryEmail;
        }
        return merged;
    } catch (e) {
        console.warn('[data] load failed, using defaults', e);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveSiteData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('[data] save failed', e);
        return false;
    }
}

function resetSiteData() {
    localStorage.removeItem(STORAGE_KEY);
}

function deepMerge(target, source) {
    if (Array.isArray(source)) return JSON.parse(JSON.stringify(source));
    if (typeof source !== 'object' || source === null) return source;
    const out = { ...target };
    for (const k of Object.keys(source)) {
        if (typeof source[k] === 'object' && source[k] !== null && !Array.isArray(source[k])) {
            out[k] = deepMerge(target?.[k] || {}, source[k]);
        } else {
            out[k] = source[k];
        }
    }
    return out;
}

// Expose globals
window.SITE_DATA = loadSiteData();
window.SITE_DATA_API = { load: loadSiteData, save: saveSiteData, reset: resetSiteData, DEFAULTS: DEFAULT_DATA };
window.ICON_LIBRARY = ICON_LIBRARY;
