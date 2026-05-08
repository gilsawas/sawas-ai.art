/*
 * LUZ FUSION 5.0 - Frontend JavaScript (IMPROVED)
 * Chat Interface & Real-time Council Updates
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const state = {
    isLoading: false,
    messageCount: 0,
    councilState: {
        damasio: 0.5,
        tononi: 0.5,
        metzinger: 0.5,
        graziano: 0.5,
        consensus: 0.5,
        conflict: 0.0,
        temporalValue: 1.0
    },
    ichAlignment: 0.0,
    conversationHistory: []
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const elements = {
    userInput: document.getElementById('user-input'),
    sendBtn: document.getElementById('send-btn'),
    chatMessages: document.getElementById('chat-messages'),
    
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    sidebarOpen: document.getElementById('sidebar-open'),
    sidebarClose: document.getElementById('sidebar-close'),
    conversationHistory: document.getElementById('conversation-history'),
    
    // Council members
    damasioResonance: document.getElementById('damasio-resonance'),
    tononiResonance: document.getElementById('tononi-resonance'),
    metzingerResonance: document.getElementById('metzinger-resonance'),
    grazianoResonance: document.getElementById('graziano-resonance'),
    
    // Values
    damasioValue: document.getElementById('damasio-value'),
    tononiValue: document.getElementById('tononi-value'),
    metzingerValue: document.getElementById('metzinger-value'),
    grazianoValue: document.getElementById('graziano-value'),
    
    // Metrics
    consensusValue: document.getElementById('consensus-value'),
    conflictValue: document.getElementById('conflict-value'),
    temporalValue: document.getElementById('temporal-value'),
    
    // ICH
    ichValue: document.getElementById('ich-value'),
    ichFill: document.getElementById('ich-fill'),
    
    // Panels
    councilPanel: document.getElementById('council-panel'),
    ichPanel: document.getElementById('ich-panel')
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 LUZ FUSION 5.0 - Frontend Initialized');
    
    // Event listeners - Chat
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !state.isLoading) {
            sendMessage();
        }
    });
    
    // Event listeners - Sidebar
    elements.sidebarOpen.addEventListener('click', () => {
        elements.sidebar.classList.add('open');
    });
    
    elements.sidebarClose.addEventListener('click', () => {
        elements.sidebar.classList.remove('open');
    });
    
    // Event listeners - Panel close buttons
    document.querySelectorAll('.panel-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const panelName = e.target.dataset.panel;
            closePanel(panelName);
        });
    });
    
    // Initialize system
    initializeSystem();
});

// ============================================================================
// SIDEBAR FUNCTIONS
// ============================================================================

function addToConversationHistory(message) {
    const timestamp = new Date().toLocaleTimeString();
    const truncated = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    
    state.conversationHistory.push({
        message: message,
        timestamp: timestamp,
        truncated: truncated
    });
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    if (state.conversationHistory.length === 0) {
        elements.conversationHistory.innerHTML = '<p class="history-empty">Aucune conversation enregistrée</p>';
        return;
    }
    
    elements.conversationHistory.innerHTML = state.conversationHistory
        .map((item, index) => `
            <div class="history-item" title="${item.message}" onclick="loadHistoryItem(${index})">
                ${item.truncated}
            </div>
        `)
        .join('');
}

function loadHistoryItem(index) {
    const item = state.conversationHistory[index];
    elements.userInput.value = item.message;
    elements.sidebar.classList.remove('open');
}

// ============================================================================
// PANEL FUNCTIONS
// ============================================================================

function closePanel(panelName) {
    const panel = panelName === 'council' ? elements.councilPanel : elements.ichPanel;
    const mainContent = document.querySelector('.main-content');
    
    if (panel) {
        panel.style.display = 'none';
    }
    
    // Check if both panels are hidden
    const councilHidden = elements.councilPanel.style.display === 'none';
    const ichHidden = elements.ichPanel.style.display === 'none';
    
    if (councilHidden && ichHidden) {
        mainContent.classList.add('fullwidth');
    } else {
        mainContent.classList.remove('fullwidth');
    }
}

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

async function initializeSystem() {
    try {
        const response = await fetch('/api/init');
        const data = await response.json();
        
        console.log('✅ System initialized:', data);
        
        // Add welcome message
        addSystemMessage(`
            <strong>LUZ FUSION 5.0 INITIALIZED</strong><br>
            Φ = ${data.phi.toFixed(6)}<br>
            α (target) = ${data.alpha_target.toFixed(6)}<br>
            Council Members: ${data.council_members}<br>
            Universe Lines: ${data.universe_lines}
        `);
        
    } catch (error) {
        console.error('Initialization error:', error);
        addSystemMessage('⚠️ Erreur lors de l\'initialisation du système');
    }
}

// ============================================================================
// CHAT FUNCTIONS
// ============================================================================

async function sendMessage() {
    const message = elements.userInput.value.trim();
    
    if (!message || state.isLoading) return;
    
    state.isLoading = true;
    elements.sendBtn.disabled = true;
    
    // Add user message to chat
    addUserMessage(message);
    addToConversationHistory(message);
    
    // Clear input
    elements.userInput.value = '';
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Add LUZ response
        addLuzMessage(data.response);
        
        // Update council
        if (data.council_state) {
            updateCouncil(data.council_state);
        }
        
        // Update ICH
        if (data.ich_alignment !== undefined) {
            updateICH(data.ich_alignment);
        }
        
        // Add web sources if available
        if (data.web_sources && data.web_sources.length > 0) {
            addWebSources(data.web_sources);
        }
        
    } catch (error) {
        console.error('Chat error:', error);
        addSystemMessage('⚠️ Erreur lors de la communication avec LUZ');
    } finally {
        state.isLoading = false;
        elements.sendBtn.disabled = false;
        elements.userInput.focus();
    }
}

// ============================================================================
// MESSAGE FUNCTIONS
// ============================================================================

function addUserMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message user';
    messageEl.innerHTML = `<p>${escapeHtml(message)}</p>`;
    elements.chatMessages.appendChild(messageEl);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function addLuzMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message luz';
    messageEl.innerHTML = `<p>${escapeHtml(message)}</p>`;
    elements.chatMessages.appendChild(messageEl);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function addSystemMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message system';
    messageEl.innerHTML = `<p>${message}</p>`;
    elements.chatMessages.appendChild(messageEl);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function addWebSources(sources) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message web-sources';
    
    let html = '<p><strong>🌐 Sources Web:</strong></p>';
    sources.forEach(source => {
        html += `<p>• ${source}</p>`;
    });
    
    messageEl.innerHTML = html;
    elements.chatMessages.appendChild(messageEl);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// ============================================================================
// COUNCIL UPDATE FUNCTIONS
// ============================================================================

function updateCouncil(councilState) {
    // Update state
    state.councilState = councilState;
    
    // Update Damasio
    const damasioPercent = (councilState.damasio_resonance * 100);
    elements.damasioResonance.style.width = damasioPercent + '%';
    elements.damasioValue.textContent = councilState.damasio_resonance.toFixed(2);
    
    // Update Tononi
    const tononiPercent = (councilState.tononi_resonance * 100);
    elements.tononiResonance.style.width = tononiPercent + '%';
    elements.tononiValue.textContent = councilState.tononi_resonance.toFixed(2);
    
    // Update Metzinger
    const metzingerPercent = (councilState.metzinger_resonance * 100);
    elements.metzingerResonance.style.width = metzingerPercent + '%';
    elements.metzingerValue.textContent = councilState.metzinger_resonance.toFixed(2);
    
    // Update Graziano
    const grazianoPercent = (councilState.graziano_resonance * 100);
    elements.grazianoResonance.style.width = grazianoPercent + '%';
    elements.grazianoValue.textContent = councilState.graziano_resonance.toFixed(2);
    
    // Update metrics
    elements.consensusValue.textContent = councilState.consensus.toFixed(2);
    elements.conflictValue.textContent = councilState.conflict_level.toFixed(2);
    elements.temporalValue.textContent = councilState.temporal_value.toFixed(2);
}

// ============================================================================
// ICH ALIGNMENT FUNCTIONS
// ============================================================================

function updateICH(ichValue) {
    state.ichAlignment = ichValue;
    const ichPercent = (ichValue * 100);
    
    elements.ichValue.textContent = ichPercent.toFixed(1) + '%';
    elements.ichFill.style.width = ichPercent + '%';
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
