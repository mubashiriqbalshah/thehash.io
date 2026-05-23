// ============ Admin Panel Logic ============
// Storage-only admin. Password is stored in localStorage (simple gate).
// Reads & writes window.SITE_DATA via SITE_DATA_API.

const ADMIN_PASSWORD_KEY = 'thehash-admin-password';
const ADMIN_SESSION_KEY = 'thehash-admin-session';
const DEFAULT_PASSWORD = 'admin123';

function getStoredPassword() { return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD; }
function setStoredPassword(pw) { localStorage.setItem(ADMIN_PASSWORD_KEY, pw); }
function isLoggedIn() { return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'; }
function setLoggedIn(v) {
    if (v) sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    else sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

// ============ Login flow ============
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const appEl = document.getElementById('app');

function showApp() {
    loginOverlay.style.display = 'none';
    appEl.classList.remove('hidden');
    document.body.classList.remove('locked');
    renderActivePanel();
}
function showLogin() {
    loginOverlay.style.display = 'flex';
    appEl.classList.add('hidden');
    document.body.classList.add('locked');
    loginPassword.value = '';
    setTimeout(() => loginPassword.focus(), 50);
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = loginPassword.value;
    if (entered === getStoredPassword()) {
        loginError.textContent = '';
        setLoggedIn(true);
        showApp();
    } else {
        loginError.textContent = 'Incorrect password';
        loginPassword.value = '';
        loginPassword.focus();
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    setLoggedIn(false);
    showLogin();
});

if (isLoggedIn()) showApp(); else showLogin();

// ============ Tab navigation ============
const tabs = document.querySelectorAll('.nav-tab');
const panels = document.querySelectorAll('.panel');
let activeTab = 'slides';

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (target === activeTab) return;
        activeTab = target;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.id === `panel-${target}`));
        renderActivePanel();
    });
});

// ============ Toast ============
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');
let toastTimer;
function showToast(msg, type = 'success') {
    toastMsg.textContent = msg;
    toastIcon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ============ Data save ============
function saveData() {
    const ok = SITE_DATA_API.save(window.SITE_DATA);
    if (ok) showToast('Saved successfully');
    else showToast('Save failed', 'error');
}

// ============ Helpers ============
function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
}
function bindInput(input, getter, setter) {
    input.value = getter() ?? '';
    input.addEventListener('input', () => setter(input.value));
}

// ============ Panel: Slides ============
function renderSlidesPanel() {
    const wrap = document.getElementById('panel-slides');
    const data = window.SITE_DATA.slides;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Hero Slides</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveSlidesBtn">Save Changes</button>
            </div>
        </div>
        <div class="item-list" id="slidesList"></div>
        <button class="add-row-btn" id="addSlideBtn">+ Add Slide</button>
    `;
    const list = wrap.querySelector('#slidesList');
    data.forEach((s, i) => list.appendChild(buildSlideRow(s, i, data, list)));
    wrap.querySelector('#addSlideBtn').addEventListener('click', () => {
        data.push({
            badge: '', titlePart1: 'New', titleHighlight: 'Slide', titlePart2: 'Title',
            description: 'Slide description goes here.',
            primaryBtn: { text: 'Primary', href: '#services' },
            secondaryBtn: { text: 'Secondary', href: '#contact' }
        });
        renderSlidesPanel();
    });
    wrap.querySelector('#saveSlidesBtn').addEventListener('click', saveData);
}

function buildSlideRow(s, i, arr, list) {
    const row = el(`
        <div class="item-row" data-i="${i}">
            <div class="item-header">
                <span class="item-title">Slide ${i + 1}</span>
                <div class="item-actions">
                    <button class="icon-btn" data-act="up" title="Move up">↑</button>
                    <button class="icon-btn" data-act="down" title="Move down">↓</button>
                    <button class="icon-btn danger" data-act="del" title="Delete">✕</button>
                </div>
            </div>
            <div class="form-group">
                <label>Badge (e.g. "⚡ Next-Gen Blockchain")</label>
                <input type="text" data-f="badge">
            </div>
            <div class="form-row-3">
                <div class="form-group">
                    <label>Title Part 1</label>
                    <input type="text" data-f="titlePart1">
                </div>
                <div class="form-group">
                    <label>Highlighted Word</label>
                    <input type="text" data-f="titleHighlight">
                </div>
                <div class="form-group">
                    <label>Title Part 2</label>
                    <input type="text" data-f="titlePart2">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea data-f="description" rows="2"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Primary Button Text</label>
                    <input type="text" data-f="primaryBtn.text">
                </div>
                <div class="form-group">
                    <label>Primary Button Link</label>
                    <input type="text" data-f="primaryBtn.href">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Secondary Button Text</label>
                    <input type="text" data-f="secondaryBtn.text">
                </div>
                <div class="form-group">
                    <label>Secondary Button Link</label>
                    <input type="text" data-f="secondaryBtn.href">
                </div>
            </div>
        </div>
    `);
    row.querySelectorAll('[data-f]').forEach(inp => {
        const path = inp.dataset.f.split('.');
        const get = () => path.reduce((o, k) => o?.[k], s);
        const set = v => {
            let o = s;
            for (let k = 0; k < path.length - 1; k++) {
                if (!o[path[k]]) o[path[k]] = {};
                o = o[path[k]];
            }
            o[path[path.length - 1]] = v;
        };
        bindInput(inp, get, set);
    });
    row.querySelectorAll('[data-act]').forEach(btn => {
        btn.addEventListener('click', () => {
            const act = btn.dataset.act;
            if (act === 'del') { arr.splice(i, 1); renderSlidesPanel(); }
            else if (act === 'up' && i > 0) { [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; renderSlidesPanel(); }
            else if (act === 'down' && i < arr.length - 1) { [arr[i+1], arr[i]] = [arr[i], arr[i+1]]; renderSlidesPanel(); }
        });
    });
    return row;
}

// ============ Panel: Stats ============
function renderStatsPanel() {
    const wrap = document.getElementById('panel-stats');
    const data = window.SITE_DATA.stats;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Stats</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveStatsBtn">Save Changes</button>
            </div>
        </div>
        <div class="item-list" id="statsList"></div>
        <button class="add-row-btn" id="addStatBtn">+ Add Stat</button>
    `;
    const list = wrap.querySelector('#statsList');
    data.forEach((s, i) => {
        const row = el(`
            <div class="item-row">
                <div class="item-header">
                    <span class="item-title">Stat ${i + 1}</span>
                    <div class="item-actions">
                        <button class="icon-btn danger" data-act="del">✕</button>
                    </div>
                </div>
                <div class="form-row-3">
                    <div class="form-group">
                        <label>Number</label>
                        <input type="number" data-f="target">
                    </div>
                    <div class="form-group">
                        <label>Suffix (%, +, /7 ...)</label>
                        <input type="text" data-f="suffix">
                    </div>
                    <div class="form-group">
                        <label>Label</label>
                        <input type="text" data-f="label">
                    </div>
                </div>
            </div>
        `);
        row.querySelectorAll('[data-f]').forEach(inp => {
            const key = inp.dataset.f;
            bindInput(inp, () => s[key], v => { s[key] = inp.type === 'number' ? Number(v) || 0 : v; });
        });
        row.querySelector('[data-act="del"]').addEventListener('click', () => { data.splice(i, 1); renderStatsPanel(); });
        list.appendChild(row);
    });
    wrap.querySelector('#addStatBtn').addEventListener('click', () => {
        data.push({ target: 0, suffix: '', label: 'New Stat' });
        renderStatsPanel();
    });
    wrap.querySelector('#saveStatsBtn').addEventListener('click', saveData);
}

// ============ Panel: About ============
function renderAboutPanel() {
    const wrap = document.getElementById('panel-about');
    const a = window.SITE_DATA.about;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>About Section</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveAboutBtn">Save Changes</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Header</h3></div>
            <div class="form-group"><label>Tag (e.g. "About Us")</label><input type="text" id="aboutTag"></div>
            <div class="form-row-3">
                <div class="form-group"><label>Title Part 1</label><input type="text" id="aboutT1"></div>
                <div class="form-group"><label>Highlight</label><input type="text" id="aboutTh"></div>
                <div class="form-group"><label>Title Part 2</label><input type="text" id="aboutT2"></div>
            </div>
            <div class="form-group"><label>Paragraph 1</label><textarea id="aboutP1" rows="3"></textarea></div>
            <div class="form-group"><label>Paragraph 2</label><textarea id="aboutP2" rows="3"></textarea></div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Features</h3></div>
            <div class="item-list" id="featuresList"></div>
            <button class="add-row-btn" id="addFeatureBtn" style="margin-top:12px;">+ Add Feature</button>
        </div>
    `;
    bindInput(wrap.querySelector('#aboutTag'), () => a.tag, v => a.tag = v);
    bindInput(wrap.querySelector('#aboutT1'), () => a.titlePart1, v => a.titlePart1 = v);
    bindInput(wrap.querySelector('#aboutTh'), () => a.titleHighlight, v => a.titleHighlight = v);
    bindInput(wrap.querySelector('#aboutT2'), () => a.titlePart2, v => a.titlePart2 = v);
    bindInput(wrap.querySelector('#aboutP1'), () => a.paragraph1, v => a.paragraph1 = v);
    bindInput(wrap.querySelector('#aboutP2'), () => a.paragraph2, v => a.paragraph2 = v);

    const flist = wrap.querySelector('#featuresList');
    (a.features || []).forEach((f, i) => {
        const row = el(`
            <div class="item-row">
                <div class="item-header">
                    <span class="item-title">Feature ${i + 1}</span>
                    <div class="item-actions"><button class="icon-btn danger" data-act="del">✕</button></div>
                </div>
                <div class="form-row-3">
                    <div class="form-group"><label>Icon (emoji)</label><input type="text" data-f="icon"></div>
                    <div class="form-group"><label>Title</label><input type="text" data-f="title"></div>
                    <div class="form-group"><label>Description</label><input type="text" data-f="desc"></div>
                </div>
            </div>
        `);
        row.querySelectorAll('[data-f]').forEach(inp => bindInput(inp, () => f[inp.dataset.f], v => f[inp.dataset.f] = v));
        row.querySelector('[data-act="del"]').addEventListener('click', () => { a.features.splice(i, 1); renderAboutPanel(); });
        flist.appendChild(row);
    });
    wrap.querySelector('#addFeatureBtn').addEventListener('click', () => {
        if (!a.features) a.features = [];
        a.features.push({ icon: '✦', title: 'New Feature', desc: 'Description.' });
        renderAboutPanel();
    });
    wrap.querySelector('#saveAboutBtn').addEventListener('click', saveData);
}

// ============ Panel: Services ============
function renderServicesPanel() {
    const wrap = document.getElementById('panel-services');
    const data = window.SITE_DATA.services;
    const iconKeys = Object.keys(window.ICON_LIBRARY || {});
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Services</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveServicesBtn">Save Changes</button>
            </div>
        </div>
        <div class="item-list" id="servicesList"></div>
        <button class="add-row-btn" id="addServiceBtn">+ Add Service</button>
    `;
    const list = wrap.querySelector('#servicesList');
    data.forEach((sv, i) => {
        const row = el(`
            <div class="item-row">
                <div class="item-header">
                    <span class="item-title">${escAttr(sv.title || `Service ${i+1}`)}</span>
                    <div class="item-actions">
                        <button class="icon-btn" data-act="up">↑</button>
                        <button class="icon-btn" data-act="down">↓</button>
                        <button class="icon-btn danger" data-act="del">✕</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label>Title</label><input type="text" data-f="title"></div>
                    <div class="form-group"><label>Icon</label>
                        <select data-f="iconKey">
                            ${iconKeys.map(k => `<option value="${k}">${k}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-group"><label>Description</label><textarea data-f="desc" rows="2"></textarea></div>
                <div class="form-group">
                    <label>Bullets</label>
                    <div class="bullets-list" data-bullets></div>
                    <button class="add-row-btn" data-act="addBullet" style="margin-top:6px;">+ Add Bullet</button>
                </div>
            </div>
        `);
        row.querySelectorAll('[data-f]').forEach(inp => bindInput(inp, () => sv[inp.dataset.f], v => sv[inp.dataset.f] = v));
        const bWrap = row.querySelector('[data-bullets]');
        const renderBullets = () => {
            bWrap.innerHTML = '';
            (sv.bullets || []).forEach((b, bi) => {
                const br = el(`<div class="bullet-row"><input type="text" value="${escAttr(b)}"><button class="icon-btn danger">✕</button></div>`);
                br.querySelector('input').addEventListener('input', e => { sv.bullets[bi] = e.target.value; });
                br.querySelector('button').addEventListener('click', () => { sv.bullets.splice(bi, 1); renderBullets(); });
                bWrap.appendChild(br);
            });
        };
        renderBullets();
        row.querySelector('[data-act="addBullet"]').addEventListener('click', () => {
            if (!sv.bullets) sv.bullets = [];
            sv.bullets.push('');
            renderBullets();
        });
        row.querySelectorAll('[data-act]').forEach(btn => {
            const act = btn.dataset.act;
            if (act === 'addBullet') return;
            btn.addEventListener('click', () => {
                if (act === 'del') { data.splice(i, 1); renderServicesPanel(); }
                else if (act === 'up' && i > 0) { [data[i-1], data[i]] = [data[i], data[i-1]]; renderServicesPanel(); }
                else if (act === 'down' && i < data.length - 1) { [data[i+1], data[i]] = [data[i], data[i+1]]; renderServicesPanel(); }
            });
        });
        list.appendChild(row);
    });
    wrap.querySelector('#addServiceBtn').addEventListener('click', () => {
        data.push({ iconKey: 'plus', title: 'New Service', desc: 'Service description.', bullets: ['Feature 1', 'Feature 2'] });
        renderServicesPanel();
    });
    wrap.querySelector('#saveServicesBtn').addEventListener('click', saveData);
}

// ============ Panel: Clients ============
function renderClientsPanel() {
    const wrap = document.getElementById('panel-clients');
    const data = window.SITE_DATA.clients;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Clients</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveClientsBtn">Save Changes</button>
            </div>
        </div>
        <div class="info-banner">Tip: Use an image URL (https://...) for logos, or leave empty to show first 2 initials of the client name.</div>
        <div class="item-list" id="clientsList"></div>
        <button class="add-row-btn" id="addClientBtn">+ Add Client</button>
    `;
    const list = wrap.querySelector('#clientsList');
    data.forEach((c, i) => {
        const row = el(`
            <div class="item-row">
                <div class="item-header">
                    <span class="item-title">${escAttr(c.name || `Client ${i+1}`)}</span>
                    <div class="item-actions">
                        <button class="icon-btn" data-act="up">↑</button>
                        <button class="icon-btn" data-act="down">↓</button>
                        <button class="icon-btn danger" data-act="del">✕</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label>Client Name</label><input type="text" data-f="name"></div>
                    <div class="form-group"><label>Logo URL (optional)</label><input type="url" data-f="logoUrl" placeholder="https://..."></div>
                </div>
            </div>
        `);
        row.querySelectorAll('[data-f]').forEach(inp => bindInput(inp, () => c[inp.dataset.f], v => c[inp.dataset.f] = v));
        row.querySelectorAll('[data-act]').forEach(btn => {
            const act = btn.dataset.act;
            btn.addEventListener('click', () => {
                if (act === 'del') { data.splice(i, 1); renderClientsPanel(); }
                else if (act === 'up' && i > 0) { [data[i-1], data[i]] = [data[i], data[i-1]]; renderClientsPanel(); }
                else if (act === 'down' && i < data.length - 1) { [data[i+1], data[i]] = [data[i], data[i+1]]; renderClientsPanel(); }
            });
        });
        list.appendChild(row);
    });
    wrap.querySelector('#addClientBtn').addEventListener('click', () => {
        data.push({ name: 'New Client', logoUrl: '' });
        renderClientsPanel();
    });
    wrap.querySelector('#saveClientsBtn').addEventListener('click', saveData);
}

// ============ Panel: Testimonial ============
function renderTestimonialPanel() {
    const wrap = document.getElementById('panel-testimonial');
    const t = window.SITE_DATA.testimonial;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Testimonial</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveTestBtn">Save Changes</button>
            </div>
        </div>
        <div class="card">
            <div class="form-group"><label>Quote</label><textarea id="testText" rows="4"></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>Author Name</label><input type="text" id="testAuthor"></div>
                <div class="form-group"><label>Author Role / Company</label><input type="text" id="testRole"></div>
            </div>
        </div>
    `;
    bindInput(wrap.querySelector('#testText'), () => t.text, v => t.text = v);
    bindInput(wrap.querySelector('#testAuthor'), () => t.author, v => t.author = v);
    bindInput(wrap.querySelector('#testRole'), () => t.role, v => t.role = v);
    wrap.querySelector('#saveTestBtn').addEventListener('click', saveData);
}

// ============ Panel: Leadership ============
function renderLeadershipPanel() {
    const wrap = document.getElementById('panel-leadership');
    const data = window.SITE_DATA.leadership;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Leadership</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveLeadBtn">Save Changes</button>
            </div>
        </div>
        <div class="item-list" id="leadList"></div>
        <button class="add-row-btn" id="addLeadBtn">+ Add Person</button>
    `;
    const list = wrap.querySelector('#leadList');
    data.forEach((p, i) => {
        const row = el(`
            <div class="item-row">
                <div class="item-header">
                    <span class="item-title">${escAttr(p.name || `Person ${i+1}`)}</span>
                    <div class="item-actions">
                        <button class="icon-btn" data-act="up">↑</button>
                        <button class="icon-btn" data-act="down">↓</button>
                        <button class="icon-btn danger" data-act="del">✕</button>
                    </div>
                </div>
                <div class="form-row-3">
                    <div class="form-group"><label>Initials</label><input type="text" data-f="initials" maxlength="3"></div>
                    <div class="form-group"><label>Name</label><input type="text" data-f="name"></div>
                    <div class="form-group"><label>Role</label><input type="text" data-f="role"></div>
                </div>
                <div class="form-group"><label>Bio</label><textarea data-f="bio" rows="2"></textarea></div>
                <div class="form-row-3">
                    <div class="form-group"><label>Email</label><input type="email" data-f="email"></div>
                    <div class="form-group"><label>LinkedIn URL</label><input type="url" data-f="linkedin"></div>
                    <div class="form-group"><label>Twitter URL</label><input type="url" data-f="twitter"></div>
                </div>
                <div class="form-group"><label>Avatar Color</label>
                    <select data-f="colorVariant">
                        <option value="cyan">Cyan</option>
                        <option value="purple">Purple / Blue</option>
                    </select>
                </div>
            </div>
        `);
        row.querySelectorAll('[data-f]').forEach(inp => bindInput(inp, () => p[inp.dataset.f], v => p[inp.dataset.f] = v));
        row.querySelectorAll('[data-act]').forEach(btn => {
            const act = btn.dataset.act;
            btn.addEventListener('click', () => {
                if (act === 'del') { data.splice(i, 1); renderLeadershipPanel(); }
                else if (act === 'up' && i > 0) { [data[i-1], data[i]] = [data[i], data[i-1]]; renderLeadershipPanel(); }
                else if (act === 'down' && i < data.length - 1) { [data[i+1], data[i]] = [data[i], data[i+1]]; renderLeadershipPanel(); }
            });
        });
        list.appendChild(row);
    });
    wrap.querySelector('#addLeadBtn').addEventListener('click', () => {
        data.push({ initials: 'XX', name: 'New Person', role: 'Role', bio: 'Bio here.', email: '', linkedin: '#', twitter: '#', colorVariant: 'cyan' });
        renderLeadershipPanel();
    });
    wrap.querySelector('#saveLeadBtn').addEventListener('click', saveData);
}

// ============ Panel: Contact ============
function renderContactPanel() {
    const wrap = document.getElementById('panel-contact');
    const c = window.SITE_DATA.contact;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Contact Info</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveContactBtn">Save Changes</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Display (shown on site)</h3></div>
            <div class="form-row">
                <div class="form-group"><label>Public Email</label><input type="email" id="cEmail"></div>
                <div class="form-group"><label>Website</label><input type="text" id="cWebsite"></div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Notification Emails (where form messages go)</h3></div>
            <div class="info-banner">
                <strong>Mailto mode:</strong> all recipients listed below receive the message.<br>
                <strong>Web3Forms mode:</strong> the <em>Primary Email</em> below gets the message directly, and the other emails are added as CC.<br>
                One per line.
            </div>
            <div class="form-group">
                <label>All Recipients (one per line)</label>
                <textarea id="cNotify" rows="3" placeholder="email1@example.com&#10;email2@example.com"></textarea>
            </div>
            <div class="form-group">
                <label>Primary Email (registered with Web3Forms / Formspree)</label>
                <input type="email" id="cPrimary" placeholder="primary@example.com">
                <small style="display:block; color:var(--text-muted); font-size:12px; margin-top:6px;">This must match the email you used when signing up for the form service. Other recipients above are CC'd.</small>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Contact Form Delivery</h3></div>
            <div class="info-banner">
                <strong>Mailto</strong> (default): opens visitor's email client with pre-filled message — no setup needed, but visitor must have an email client.<br>
                <strong>Formspree / Web3Forms</strong>: messages delivered to your inbox directly. Free tier available — sign up, paste endpoint below.
            </div>
            <div class="form-group">
                <label>Delivery Method</label>
                <select id="cProvider">
                    <option value="mailto">Mailto (open visitor's email app)</option>
                    <option value="formspree">Formspree (paste full URL)</option>
                    <option value="web3forms">Web3Forms (paste access key)</option>
                </select>
            </div>
            <div class="form-group" id="cEndpointWrap">
                <label id="cEndpointLabel">Endpoint URL / Access Key</label>
                <input type="text" id="cEndpoint" placeholder="">
                <small id="cEndpointHelp" style="display:block; color:var(--text-muted); font-size:12px; margin-top:6px;"></small>
            </div>
        </div>
    `;
    bindInput(wrap.querySelector('#cEmail'), () => c.email, v => c.email = v);
    bindInput(wrap.querySelector('#cWebsite'), () => c.website, v => c.website = v);
    bindInput(wrap.querySelector('#cProvider'), () => c.formProvider || 'mailto', v => { c.formProvider = v; updateProviderUI(); });
    bindInput(wrap.querySelector('#cEndpoint'), () => c.formEndpoint || '', v => c.formEndpoint = v);

    const notifyEl = wrap.querySelector('#cNotify');
    notifyEl.value = (c.notifyEmails || []).join('\n');
    notifyEl.addEventListener('input', () => {
        c.notifyEmails = notifyEl.value.split('\n').map(s => s.trim()).filter(Boolean);
    });
    bindInput(wrap.querySelector('#cPrimary'), () => c.formPrimaryEmail || '', v => c.formPrimaryEmail = v);

    function updateProviderUI() {
        const provider = c.formProvider || 'mailto';
        const wrap2 = wrap.querySelector('#cEndpointWrap');
        const label = wrap.querySelector('#cEndpointLabel');
        const input = wrap.querySelector('#cEndpoint');
        const help = wrap.querySelector('#cEndpointHelp');
        if (provider === 'mailto') {
            wrap2.style.display = 'none';
        } else if (provider === 'formspree') {
            wrap2.style.display = '';
            label.textContent = 'Formspree Endpoint URL';
            input.placeholder = 'https://formspree.io/f/xxxxxxxx';
            help.innerHTML = 'Sign up free at <a href="https://formspree.io" target="_blank" style="color:var(--accent);">formspree.io</a> → create form → paste full endpoint URL.';
        } else if (provider === 'web3forms') {
            wrap2.style.display = '';
            label.textContent = 'Web3Forms Access Key';
            input.placeholder = 'Your access key UUID';
            help.innerHTML = 'Sign up free at <a href="https://web3forms.com" target="_blank" style="color:var(--accent);">web3forms.com</a> → get access key → paste here.';
        }
    }
    updateProviderUI();
    wrap.querySelector('#saveContactBtn').addEventListener('click', saveData);
}

// ============ Panel: Footer ============
function renderFooterPanel() {
    const wrap = document.getElementById('panel-footer');
    const f = window.SITE_DATA.footer;
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Footer</h2>
            <div class="topbar-actions">
                <button class="btn btn-primary" id="saveFooterBtn">Save Changes</button>
            </div>
        </div>
        <div class="card">
            <div class="form-group"><label>Tagline (under logo)</label><textarea id="fTagline" rows="2"></textarea></div>
            <div class="form-group"><label>Copyright Text</label><input type="text" id="fCopy"></div>
        </div>
    `;
    bindInput(wrap.querySelector('#fTagline'), () => f.tagline, v => f.tagline = v);
    bindInput(wrap.querySelector('#fCopy'), () => f.copyright, v => f.copyright = v);
    wrap.querySelector('#saveFooterBtn').addEventListener('click', saveData);
}

// ============ Panel: Settings ============
function renderSettingsPanel() {
    const wrap = document.getElementById('panel-settings');
    wrap.innerHTML = `
        <div class="topbar">
            <h2>Settings</h2>
        </div>
        <div class="card">
            <div class="card-header"><h3>Change Admin Password</h3></div>
            <div class="form-row">
                <div class="form-group"><label>New Password</label><input type="password" id="newPw"></div>
                <div class="form-group"><label>Confirm</label><input type="password" id="confirmPw"></div>
            </div>
            <button class="btn btn-primary" id="changePwBtn">Update Password</button>
        </div>
        <div class="card">
            <div class="card-header"><h3>Backup &amp; Restore</h3></div>
            <p style="color:var(--text-dim); font-size:13px; margin-bottom:14px;">Export your data as JSON to back up, or restore from a JSON file.</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn" id="exportBtn">⬇ Export JSON</button>
                <label class="btn" style="cursor:pointer;">⬆ Import JSON<input type="file" id="importInput" accept="application/json" hidden></label>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3 style="color:var(--danger);">Danger Zone</h3></div>
            <p style="color:var(--text-dim); font-size:13px; margin-bottom:14px;">Reset all site content back to original defaults. This cannot be undone.</p>
            <button class="btn btn-danger" id="resetBtn">Reset All Content</button>
        </div>
    `;
    wrap.querySelector('#changePwBtn').addEventListener('click', () => {
        const a = wrap.querySelector('#newPw').value;
        const b = wrap.querySelector('#confirmPw').value;
        if (!a || a.length < 4) return showToast('Password must be 4+ characters', 'error');
        if (a !== b) return showToast('Passwords do not match', 'error');
        setStoredPassword(a);
        wrap.querySelector('#newPw').value = '';
        wrap.querySelector('#confirmPw').value = '';
        showToast('Password updated');
    });
    wrap.querySelector('#exportBtn').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(window.SITE_DATA, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `thehash-site-data-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Exported');
    });
    wrap.querySelector('#importInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                window.SITE_DATA = parsed;
                SITE_DATA_API.save(parsed);
                showToast('Imported successfully');
                renderActivePanel();
            } catch (err) {
                showToast('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    });
    wrap.querySelector('#resetBtn').addEventListener('click', () => {
        if (!confirm('Reset all content to defaults? This cannot be undone.')) return;
        SITE_DATA_API.reset();
        window.SITE_DATA = SITE_DATA_API.load();
        showToast('Reset to defaults');
        renderActivePanel();
    });
}

// ============ Active panel dispatcher ============
function renderActivePanel() {
    const map = {
        slides: renderSlidesPanel,
        stats: renderStatsPanel,
        about: renderAboutPanel,
        services: renderServicesPanel,
        clients: renderClientsPanel,
        testimonial: renderTestimonialPanel,
        leadership: renderLeadershipPanel,
        contact: renderContactPanel,
        footer: renderFooterPanel,
        settings: renderSettingsPanel
    };
    if (map[activeTab]) map[activeTab]();
}

function escAttr(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
