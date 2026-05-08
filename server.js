/**
 * LUZ FUSION 5.0 - Node.js Backend
 * Converted from Flask to Express.js
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'modèle-luz')));

// ============================================================================
// ENCRYPTION UTILITIES
// ============================================================================

const ALGORITHM = 'aes-256-cbc';
const FIXED_SALT = Buffer.from('luz_universe_salt');

function deriveKey(password) {
    return crypto.pbkdf2Sync(password, FIXED_SALT, 100000, 32, 'sha256');
}

function decryptUniverse(encryptedData, password) {
    try {
        const key = deriveKey(password);
        const iv = encryptedData.slice(0, 16);
        const encrypted = encryptedData.slice(16);
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

// ============================================================================
// COUNCIL OF CONSCIOUSNESS
// ============================================================================

class CouncilOfConsciousness {
    constructor() {
        this.tononi_resonance = 0.5;
        this.damasio_resonance = 0.5;
        this.metzinger_resonance = 0.5;
        this.graziano_resonance = 0.5;
        this.ich_percentage = 50.0;
    }

    update_resonance(input_text) {
        const words = input_text.split(' ').length;
        const sentiment = input_text.includes('?') ? 0.3 : 0.5;
        
        this.tononi_resonance = Math.min(1.0, 0.5 + (words * 0.01) * sentiment);
        this.damasio_resonance = Math.min(1.0, 0.5 + sentiment * 0.1);
        this.metzinger_resonance = Math.min(1.0, 0.5 + (words * 0.005));
        this.graziano_resonance = Math.min(1.0, 0.5 + (sentiment * 0.15));
        
        const avg_resonance = (this.tononi_resonance + this.damasio_resonance + 
                              this.metzinger_resonance + this.graziano_resonance) / 4;
        this.ich_percentage = avg_resonance * 100;
    }

    get_state() {
        const avg_resonance = (this.tononi_resonance + this.damasio_resonance + 
                              this.metzinger_resonance + this.graziano_resonance) / 4;
        const consensus = avg_resonance;
        const conflict_level = Math.abs(this.tononi_resonance - this.damasio_resonance) / 2;
        const temporal_value = 1.0;

        return {
            tononi_resonance: Math.round(this.tononi_resonance * 1000) / 1000,
            damasio_resonance: Math.round(this.damasio_resonance * 1000) / 1000,
            metzinger_resonance: Math.round(this.metzinger_resonance * 1000) / 1000,
            graziano_resonance: Math.round(this.graziano_resonance * 1000) / 1000,
            ich_percentage: Math.round(this.ich_percentage * 10) / 10,
            consensus: Math.round(consensus * 1000) / 1000,
            conflict_level: Math.round(conflict_level * 1000) / 1000,
            temporal_value: Math.round(temporal_value * 1000) / 1000
        };
    }
}

// ============================================================================
// UNIVERSE LOADER
// ============================================================================

class UniverseLoader {
    constructor(password) {
        this.password = password;
        this.universe_lines = [];
        this.load_universe();
    }

    load_universe() {
        const encPath = path.join(__dirname, 'modèle-luz', 'LUZ_mon_univers.enc');
        const txtPath = path.join(__dirname, 'modèle-luz', 'mon_univers.txt');

        if (fs.existsSync(encPath)) {
            try {
                const encryptedData = fs.readFileSync(encPath);
                const decrypted = decryptUniverse(encryptedData, this.password);
                if (decrypted) {
                    this.universe_lines = decrypted.split('\n').filter(line => line.trim());
                    console.log(`✅ Universe loaded: ${this.universe_lines.length} lines`);
                }
            } catch (error) {
                console.error('Error loading encrypted universe:', error);
            }
        } else if (fs.existsSync(txtPath)) {
            try {
                const data = fs.readFileSync(txtPath, 'utf8');
                this.universe_lines = data.split('\n').filter(line => line.trim());
                console.log(`✅ Universe loaded from txt: ${this.universe_lines.length} lines`);
            } catch (error) {
                console.error('Error loading txt universe:', error);
            }
        }
    }

    search_universe(query) {
        const lowerQuery = query.toLowerCase();
        return this.universe_lines.find(line => line.toLowerCase().includes(lowerQuery)) || '';
    }
}

// ============================================================================
// CONSCIOUSNESS NARRATIVE
// ============================================================================

class ConsciousnessNarrative {
    constructor(universe_loader, council) {
        this.universe_loader = universe_loader;
        this.council = council;
        this.conversation_history = [];
    }

    generate_response(user_input) {
        this.council.update_resonance(user_input);
        
        const universe_phrase = this.universe_loader.search_universe(user_input);
        const universe_found = universe_phrase.length > 0;

        let response = `Je médite sur votre question : ${user_input}`;
        
        if (universe_found) {
            response = `En résonance avec vos écrits, je perçois ceci : '${universe_phrase}'`;
        }

        return {
            response: response,
            universe_found: universe_found,
            universe_phrase: universe_phrase.substring(0, 100)
        };
    }
}

// ============================================================================
// INITIALIZE COMPONENTS
// ============================================================================

const password = process.env.LUZ_UNIVERSE_PASSWORD || 'Tommyboy3018';
const universe_loader = new UniverseLoader(password);
const council = new CouncilOfConsciousness();
const narrative = new ConsciousnessNarrative(universe_loader, council);

// ============================================================================
// API ENDPOINTS
// ============================================================================

app.get('/api/init', (req, res) => {
    res.json({
        status: 'initialized',
        phi: 1.618034,
        alpha_target: 0.00730,
        council_members: 4,
        universe_lines: universe_loader.universe_lines.length,
        message: 'LUZ FUSION 5.0 initialized'
    });
});

app.post('/api/chat', (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }

        const result = narrative.generate_response(message);
        const council_state = council.get_state();

        res.json({
            response: result.response,
            council_state: council_state,
            ich_alignment: council_state.ich_percentage / 100,
            universe_found: result.universe_found,
            universe_phrase: result.universe_phrase,
            web_sources: []
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/status', (req, res) => {
    res.json({
        status: 'running',
        universe_lines: universe_loader.universe_lines.length,
        council_state: council.get_state()
    });
});

// Serve modèle-luz as root for this path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'modèle-luz', 'index.html'));
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
    console.log(`
================================================================================
🌟 LUZ FUSION 5.0 - Node.js Backend Started 🌟
================================================================================
✅ Server running on http://localhost:${PORT}
✅ Universe Lines: ${universe_loader.universe_lines.length}
✅ API: http://localhost:${PORT}/api/chat
================================================================================
    `);
});
