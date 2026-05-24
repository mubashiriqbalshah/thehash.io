// Vercel serverless function: persist SITE_DATA changes from admin panel.
// POST { data, password } -> verifies password, rewrites data.js DEFAULT_DATA
// block in GitHub via Contents API. Vercel auto-deploys on the new commit.

const FILE_PATH = 'data.js';
const BRANCH = 'main';
const START_MARKER = '/* DEFAULT_DATA_START — do not edit these markers, the live publish API replaces between them */';
const END_MARKER = '/* DEFAULT_DATA_END */';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { GH_TOKEN, GH_REPO, ADMIN_PASSWORD } = process.env;
    if (!GH_TOKEN || !GH_REPO || !ADMIN_PASSWORD) {
        return res.status(500).json({
            error: 'Server not configured. Set GH_TOKEN, GH_REPO, ADMIN_PASSWORD env vars in Vercel.'
        });
    }

    const { data, password } = req.body || {};
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid admin password' });
    }
    if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Missing or invalid data payload' });
    }

    const ghBase = `https://api.github.com/repos/${GH_REPO}/contents/${FILE_PATH}`;
    const ghHeaders = {
        Authorization: `Bearer ${GH_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'thehash-admin-publish'
    };

    try {
        const getResp = await fetch(`${ghBase}?ref=${BRANCH}`, { headers: ghHeaders });
        if (!getResp.ok) {
            const txt = await getResp.text();
            return res.status(502).json({ error: `GitHub GET failed: ${getResp.status} ${txt}` });
        }
        const { content: b64, sha } = await getResp.json();
        const current = Buffer.from(b64, 'base64').toString('utf8');

        const startIdx = current.indexOf(START_MARKER);
        const endIdx = current.indexOf(END_MARKER);
        if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
            return res.status(500).json({ error: 'Marker block not found in data.js' });
        }

        const newBlock =
            START_MARKER + '\n' +
            'const DEFAULT_DATA = ' + JSON.stringify(data, null, 4) + ';\n' +
            END_MARKER;

        const updated =
            current.slice(0, startIdx) +
            newBlock +
            current.slice(endIdx + END_MARKER.length);

        if (updated === current) {
            return res.status(200).json({ ok: true, unchanged: true });
        }

        const putResp = await fetch(ghBase, {
            method: 'PUT',
            headers: { ...ghHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Admin: update site content',
                content: Buffer.from(updated, 'utf8').toString('base64'),
                sha,
                branch: BRANCH
            })
        });
        if (!putResp.ok) {
            const txt = await putResp.text();
            return res.status(502).json({ error: `GitHub PUT failed: ${putResp.status} ${txt}` });
        }

        const result = await putResp.json();
        return res.status(200).json({ ok: true, commit: result.commit?.sha });
    } catch (err) {
        return res.status(500).json({ error: err.message || String(err) });
    }
}
