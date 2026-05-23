// ============ Helpers ============
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
function escapeAttr(str) { return escapeHtml(str); }

const D = window.SITE_DATA || {};

// ============ Render: Hero Slides ============
function renderSlides() {
    const slider = document.getElementById('slider');
    const dotsWrap = document.getElementById('dots');
    if (!slider || !D.slides) return;
    slider.innerHTML = D.slides.map((s, i) => {
        const bgClass = `slide-bg-${(i % 3) + 1}`;
        const t1 = escapeHtml(s.titlePart1 || '');
        const t2 = escapeHtml(s.titlePart2 || '');
        const th = s.titleHighlight ? `<span class="gradient-text">${escapeHtml(s.titleHighlight)}</span>` : '';
        return `
        <div class="slide ${i === 0 ? 'active' : ''}" data-slide="${i}">
            <div class="slide-bg ${bgClass}"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <span class="slide-badge">${escapeHtml(s.badge || '')}</span>
                <h1 class="slide-title">${t1} ${th} ${t2}</h1>
                <p class="slide-description">${escapeHtml(s.description || '')}</p>
                <div class="slide-actions">
                    <a href="${escapeAttr(s.primaryBtn?.href || '#')}" class="btn btn-primary">${escapeHtml(s.primaryBtn?.text || '')} <span>→</span></a>
                    <a href="${escapeAttr(s.secondaryBtn?.href || '#')}" class="btn btn-outline">${escapeHtml(s.secondaryBtn?.text || '')}</a>
                </div>
            </div>
        </div>`;
    }).join('');
    if (dotsWrap) {
        dotsWrap.innerHTML = D.slides.map((_, i) =>
            `<button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}"><span></span></button>`
        ).join('');
    }
}

// ============ Render: Stats ============
function renderStats() {
    const grid = document.getElementById('statsGrid');
    if (!grid || !D.stats) return;
    grid.innerHTML = D.stats.map(st => `
        <div class="stat-item">
            <div class="stat-number" data-target="${st.target}" suffix="${escapeAttr(st.suffix || '')}">0</div>
            <div class="stat-label">${escapeHtml(st.label)}</div>
        </div>
    `).join('');
}

// ============ Render: About ============
function renderAbout() {
    const wrap = document.getElementById('aboutContent');
    if (!wrap || !D.about) return;
    const a = D.about;
    wrap.innerHTML = `
        <span class="section-tag">${escapeHtml(a.tag || 'About Us')}</span>
        <h2 class="section-title">${escapeHtml(a.titlePart1 || '')} <span class="gradient-text">${escapeHtml(a.titleHighlight || '')}</span> ${escapeHtml(a.titlePart2 || '')}</h2>
        <p class="section-text">${escapeHtml(a.paragraph1 || '')}</p>
        <p class="section-text">${escapeHtml(a.paragraph2 || '')}</p>
        <div class="features-grid">
            ${(a.features || []).map(f => `
                <div class="feature-item">
                    <div class="feature-icon">${escapeHtml(f.icon || '✦')}</div>
                    <h4>${escapeHtml(f.title || '')}</h4>
                    <p>${escapeHtml(f.desc || '')}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// ============ Render: Services ============
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid || !D.services) return;
    const lib = window.ICON_LIBRARY || {};
    grid.innerHTML = D.services.map((sv, i) => {
        const icon = lib[sv.iconKey] || lib.plus || '';
        const bullets = (sv.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('');
        return `
        <div class="service-card reveal" data-delay="${i * 60}">
            <div class="service-icon-wrap">${icon}</div>
            <h3>${escapeHtml(sv.title)}</h3>
            <p>${escapeHtml(sv.desc)}</p>
            <ul class="service-list">${bullets}</ul>
        </div>`;
    }).join('');
}

// ============ Render: Clients ============
function renderClients() {
    const grid = document.getElementById('clientsGrid');
    if (!grid || !D.clients) return;
    grid.innerHTML = D.clients.map(c => {
        const logo = c.logoUrl
            ? `<img src="${escapeAttr(c.logoUrl)}" alt="${escapeAttr(c.name)}" class="client-logo-img">`
            : `<div class="client-logo-placeholder">${escapeHtml(c.name || 'Client').slice(0, 2).toUpperCase()}</div>`;
        return `
        <div class="client-card reveal">
            ${logo}
            <p>${escapeHtml(c.name || '')}</p>
        </div>`;
    }).join('');
}

// ============ Render: Testimonial ============
function renderTestimonial() {
    const wrap = document.getElementById('testimonialBlock');
    if (!wrap || !D.testimonial) return;
    const t = D.testimonial;
    wrap.innerHTML = `
        <div class="quote-mark">"</div>
        <p class="testimonial-text">${escapeHtml(t.text || '')}</p>
        <div class="testimonial-author">
            <div class="author-avatar">★</div>
            <div class="author-info">
                <strong>${escapeHtml(t.author || '')}</strong>
                <span>${escapeHtml(t.role || '')}</span>
            </div>
        </div>
    `;
}

// ============ Render: Leadership ============
function renderLeadership() {
    const grid = document.getElementById('leadershipGrid');
    if (!grid || !D.leadership) return;
    const socialSvg = {
        email: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.337v-8.49H5.667v8.49h2.672zM7.003 8.574a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763V13.67c0-2.476-1.34-3.628-3.13-3.628-1.444 0-2.09.793-2.45 1.35v-1.16h-2.717c.036.766 0 8.49 0 8.49h2.717v-4.74c0-.244.018-.488.09-.662.196-.488.642-.992 1.392-.992.982 0 1.375.748 1.375 1.844v4.55h2.723z"/></svg>',
        twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.5.5-2.4.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1C18 4.4 16.9 4 15.7 4c-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1 1C8.2 9 5.1 7.4 3 4.9c-.4.7-.6 1.4-.6 2.2 0 1.5.7 2.8 1.9 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.5 3.7 3.4 4.1-.6.2-1.2.2-1.8.1.5 1.7 2 2.9 3.8 2.9-1.4 1.1-3.2 1.8-5.1 1.8H2c1.9 1.2 4.1 1.9 6.4 1.9 7.7 0 11.9-6.4 11.9-11.9v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>'
    };
    grid.innerHTML = D.leadership.map(p => `
        <div class="founder-card reveal">
            <div class="founder-glow"></div>
            <div class="founder-avatar ${p.colorVariant === 'purple' ? 'founder-avatar-purple' : ''}">
                <span>${escapeHtml(p.initials || '')}</span>
            </div>
            <h3 class="founder-name">${escapeHtml(p.name || '')}</h3>
            <span class="founder-role">${escapeHtml(p.role || '')}</span>
            <p class="founder-bio">${escapeHtml(p.bio || '')}</p>
            <div class="founder-links">
                <a href="mailto:${escapeAttr(p.email || '')}" class="founder-link" aria-label="Email">${socialSvg.email}</a>
                <a href="${escapeAttr(p.linkedin || '#')}" class="founder-link" aria-label="LinkedIn" target="_blank" rel="noopener">${socialSvg.linkedin}</a>
                <a href="${escapeAttr(p.twitter || '#')}" class="founder-link" aria-label="Twitter" target="_blank" rel="noopener">${socialSvg.twitter}</a>
            </div>
        </div>
    `).join('');
}

// ============ Render: Contact info ============
function renderContactInfo() {
    const wrap = document.getElementById('contactInfo');
    if (!wrap || !D.contact) return;
    const c = D.contact;
    wrap.innerHTML = `
        <div class="info-item">
            <span class="info-icon">📧</span>
            <div>
                <strong>Email</strong>
                <a href="mailto:${escapeAttr(c.email || '')}">${escapeHtml(c.email || '')}</a>
            </div>
        </div>
        <div class="info-item">
            <span class="info-icon">🌐</span>
            <div>
                <strong>Website</strong>
                <span>${escapeHtml(c.website || '')}</span>
            </div>
        </div>
    `;
}

// ============ Render: Footer dynamic cols ============
function renderFooterCols() {
    const tagline = document.getElementById('footerTagline');
    if (tagline && D.footer?.tagline) tagline.textContent = D.footer.tagline;
    const copy = document.getElementById('footerCopyright');
    if (copy && D.footer?.copyright) copy.textContent = D.footer.copyright;

    const svcCol = document.getElementById('footerServicesCol');
    if (svcCol && D.services) {
        svcCol.innerHTML = '<h4>Services</h4>' + D.services.slice(0, 5)
            .map(s => `<a href="#services">${escapeHtml(s.title)}</a>`).join('');
    }
    const conCol = document.getElementById('footerConnectCol');
    if (conCol && D.contact) {
        conCol.innerHTML = `
            <h4>Connect</h4>
            <a href="mailto:${escapeAttr(D.contact.email || '')}">${escapeHtml(D.contact.email || '')}</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">GitHub</a>
        `;
    }
}

// ============ Render everything ============
function renderAll() {
    renderSlides();
    renderStats();
    renderAbout();
    renderServices();
    renderClients();
    renderTestimonial();
    renderLeadership();
    renderContactInfo();
    renderFooterCols();
}
renderAll();

// ============ Theme Toggle ============
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('thehash-theme') || 'dark';
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('thehash-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('thehash-theme', 'light');
        }
    });
}

// ============ Hero Slider ============
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

function startSlider() {
    clearInterval(slideInterval);
    if (slides.length > 1) slideInterval = setInterval(nextSlide, 5500);
}

if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); startSlider(); });
if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); startSlider(); });
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.dot));
        startSlider();
    });
});

const slider = document.getElementById('slider');
if (slider) {
    let touchStartX = 0, touchEndX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToSlide(currentSlide + 1); else goToSlide(currentSlide - 1);
            startSlider();
        }
    });
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlider);
}
startSlider();

// ============ Navbar Scroll Effect ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ============ Active Nav Link + Magnetic Indicator ============
const navLinksWrap = document.getElementById('navLinks');
const navIndicator = document.getElementById('navIndicator');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionMap = Array.from(navLinkEls).map(a => ({
    link: a,
    section: document.querySelector(a.getAttribute('href'))
})).filter(x => x.section);

let activeNavLink = null;
let isHovering = false;

function moveIndicatorTo(linkEl) {
    if (!linkEl || !navIndicator || !navLinksWrap) return;
    // Skip on mobile / when nav is hidden (offsetWidth === 0)
    if (navLinksWrap.offsetWidth === 0) {
        navIndicator.classList.remove('visible');
        return;
    }
    const wrapRect = navLinksWrap.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    navIndicator.style.left = (linkRect.left - wrapRect.left) + 'px';
    navIndicator.style.width = linkRect.width + 'px';
    navIndicator.classList.add('visible');
}

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = sectionMap[0];
    for (const item of sectionMap) {
        if (item.section.offsetTop <= scrollY) current = item;
    }
    sectionMap.forEach(x => x.link.classList.toggle('active', x === current));
    activeNavLink = current?.link;
    if (!isHovering) moveIndicatorTo(activeNavLink);
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

navLinkEls.forEach(link => {
    link.addEventListener('mouseenter', () => { isHovering = true; moveIndicatorTo(link); });
});
if (navLinksWrap) {
    navLinksWrap.addEventListener('mouseleave', () => { isHovering = false; moveIndicatorTo(activeNavLink); });
}
window.addEventListener('resize', () => { if (activeNavLink) moveIndicatorTo(activeNavLink); });

requestAnimationFrame(() => {
    updateActiveNav();
    setTimeout(() => activeNavLink && moveIndicatorTo(activeNavLink), 100);
});

// ============ Reveal on Scroll ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ Animated Counter ============
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.getAttribute('suffix') || '';
            let count = 0;
            const steps = 60;
            const increment = target / steps;
            const stepTime = 2000 / steps;
            const update = () => {
                count += increment;
                if (count >= target) el.textContent = target + suffix;
                else { el.textContent = Math.floor(count) + suffix; setTimeout(update, stepTime); }
            };
            update();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// ============ Blockchain Network Background ============
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let pulses = [];
let edges = [];
let driftHashes = [];
const LINK_DIST = 170;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = (Math.random() - 0.5) * 0.18;
        this.radius = Math.random() * 3 + 4;
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.004;
        this.pulsePhase = Math.random() * Math.PI * 2;
        const palette = [
            { core: '0, 245, 255', glow: '0, 245, 255' },
            { core: '120, 220, 255', glow: '120, 220, 255' },
            { core: '255, 255, 255', glow: '180, 230, 255' }
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update(t) {
        this.x += this.vx; this.y += this.vy;
        this.rotation += this.rotSpeed;
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
        this.breath = 0.55 + Math.sin(t * 0.002 + this.pulsePhase) * 0.25;
    }
    draw() {
        const r = this.radius;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 4);
        glow.addColorStop(0, `rgba(${this.color.glow}, ${0.22 * this.breath})`);
        glow.addColorStop(1, `rgba(${this.color.glow}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(0, 0, r * 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            const px = Math.cos(a) * r, py = Math.sin(a) * r;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${this.color.core}, ${0.55 * this.breath + 0.25})`;
        ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.core}, ${0.85 * this.breath + 0.15})`;
        ctx.fill();
        ctx.restore();
    }
}

class Pulse {
    constructor(a, b) {
        this.a = a; this.b = b;
        this.t = 0;
        this.speed = 0.005 + Math.random() * 0.008;
        this.color = Math.random() < 0.5 ? '0, 245, 255' : '255, 255, 255';
    }
    update() { this.t += this.speed; return this.t < 1; }
    draw() {
        const x = this.a.x + (this.b.x - this.a.x) * this.t;
        const y = this.a.y + (this.b.y - this.a.y) * this.t;
        const fade = Math.sin(this.t * Math.PI);
        const tx = this.a.x + (this.b.x - this.a.x) * Math.max(0, this.t - 0.08);
        const ty = this.a.y + (this.b.y - this.a.y) * Math.max(0, this.t - 0.08);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${this.color}, 0)`);
        grad.addColorStop(1, `rgba(${this.color}, ${0.9 * fade})`);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${fade})`; ctx.fill();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 10);
        glow.addColorStop(0, `rgba(${this.color}, ${0.35 * fade})`);
        glow.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
    }
}

const HEX_CHARS = '0123456789abcdef';
function randHash(len) {
    let s = '0x';
    for (let i = 0; i < len; i++) s += HEX_CHARS[Math.floor(Math.random() * 16)];
    return s;
}
class DriftHash {
    constructor() { this.reset(true); }
    reset(initial = false) {
        this.text = randHash(8 + Math.floor(Math.random() * 8));
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 30;
        this.vy = -(0.15 + Math.random() * 0.25);
        this.opacity = 0.04 + Math.random() * 0.06;
        this.size = 10 + Math.random() * 4;
    }
    update() { this.y += this.vy; if (this.y < -20) this.reset(false); }
    draw() {
        ctx.font = `${this.size}px "Space Grotesk", monospace`;
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function initScene() {
    nodes = []; pulses = []; driftHashes = [];
    const nodeCount = Math.min(55, Math.floor((canvas.width * canvas.height) / 28000));
    for (let i = 0; i < nodeCount; i++) nodes.push(new Node());
    const hashCount = Math.min(12, Math.floor(canvas.width / 180));
    for (let i = 0; i < hashCount; i++) driftHashes.push(new DriftHash());
}
function computeEdges() {
    edges = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DIST) edges.push([i, j, dist]);
        }
    }
}
function drawEdges() {
    edges.forEach(([i, j, dist]) => {
        const a = nodes[i], b = nodes[j];
        const alpha = 0.12 * (1 - dist / LINK_DIST);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
        ctx.lineWidth = 0.6; ctx.stroke();
    });
}
function maybeSpawnPulse() {
    if (edges.length === 0) return;
    if (Math.random() < 0.06 && pulses.length < 14) {
        const [i, j] = edges[Math.floor(Math.random() * edges.length)];
        const dir = Math.random() < 0.5;
        pulses.push(new Pulse(dir ? nodes[i] : nodes[j], dir ? nodes[j] : nodes[i]));
    }
}
function animateScene(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    driftHashes.forEach(h => { h.update(); h.draw(); });
    nodes.forEach(n => n.update(t));
    computeEdges();
    drawEdges();
    nodes.forEach(n => n.draw());
    maybeSpawnPulse();
    pulses = pulses.filter(p => { const alive = p.update(); if (alive) p.draw(); return alive; });
    requestAnimationFrame(animateScene);
}
initScene();
requestAnimationFrame(animateScene);
window.addEventListener('resize', initScene);

// ============ Smooth Scroll ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        let target;
        try { target = document.querySelector(href); } catch { return; }
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            const nl = document.querySelector('.nav-links');
            const mt = document.getElementById('menuToggle');
            if (nl?.classList.contains('mobile-open')) {
                nl.classList.remove('mobile-open');
                mt?.classList.remove('is-open');
            }
        }
    });
});

// ============ Contact Form ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const statusEl = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    function setBanner(msg, type) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = `form-status show ${type}`;
    }
    function clearBanner() {
        if (!statusEl) return;
        statusEl.className = 'form-status';
        statusEl.textContent = '';
    }
    function resetBtn() {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearBanner();

        const payload = {
            name: contactForm.querySelector('#name').value.trim(),
            email: contactForm.querySelector('#email').value.trim(),
            subject: contactForm.querySelector('#subject').value.trim(),
            message: contactForm.querySelector('#message').value.trim()
        };
        if (!payload.name || !payload.email || !payload.subject || !payload.message) {
            setBanner('Please fill in all fields.', 'error');
            return;
        }

        const cfg = window.SITE_DATA?.contact || {};
        const provider = cfg.formProvider || 'mailto';
        const endpoint = cfg.formEndpoint || '';
        const notify = Array.isArray(cfg.notifyEmails) ? cfg.notifyEmails.filter(Boolean) : [];
        const primary = (cfg.formPrimaryEmail || notify[0] || '').toLowerCase();
        const targetEmail = notify.length ? notify.join(',') : (cfg.email || 'info@thehash.io');
        const ccEmails = notify.filter(e => e.toLowerCase() !== primary).join(',');

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        const submittedAt = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Karachi',
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        }) + ' (PKT)';

        try {
            if ((provider === 'formspree' || provider === 'web3forms') && endpoint) {
                const body = provider === 'web3forms'
                    ? {
                        access_key: endpoint,
                        subject: `New Inquiry: ${payload.subject} — TheHash.io`,
                        from_name: `${payload.name} via TheHash.io`,
                        replyto: payload.email,
                        Name: payload.name,
                        Email: payload.email,
                        'Subject Line': payload.subject,
                        Message: payload.message,
                        'Submitted On': submittedAt,
                        Source: 'thehash.io contact form',
                        ...(ccEmails ? { cc: ccEmails } : {})
                      }
                    : payload;
                const url = provider === 'web3forms' ? 'https://api.web3forms.com/submit' : endpoint;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(body)
                });
                if (!res.ok) throw new Error('Submit failed: ' + res.status);
                setBanner('✓ Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                resetBtn();
                setTimeout(clearBanner, 6000);
            } else {
                // Mailto: open user's email client with pre-filled message
                // Use raw comma-separated emails (don't URL-encode the To list)
                const bodyText =
`Hello TheHash.io team,

A new inquiry has been submitted through the website.

— Name: ${payload.name}
— Email: ${payload.email}
— Subject: ${payload.subject}
— Submitted: ${submittedAt}

Message:
${payload.message}

—
Sent from thehash.io contact form`;
                const subj = `New Inquiry: ${payload.subject} — TheHash.io`;
                const mailto = `mailto:${targetEmail}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(bodyText)}`;
                window.location.href = mailto;
                setBanner('✓ Message sent successfully! Opening your email app — please hit Send to deliver.', 'success');
                contactForm.reset();
                resetBtn();
                setTimeout(clearBanner, 7000);
            }
        } catch (err) {
            console.error('[contact]', err);
            setBanner('✕ Could not send. Please try again or email us directly.', 'error');
            resetBtn();
        }
    });
}

// ============ Mobile Menu Toggle ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        menuToggle.classList.toggle('is-open');
    });
}

// ============ Parallax effect on hero ============
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        const slideContent = document.querySelector('.slide.active .slide-content');
        if (slideContent) {
            slideContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            slideContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    }
});
