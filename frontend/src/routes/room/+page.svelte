<script>
  import { onMount } from 'svelte';

  let streamInputUrl = '';
  let inviteCopied = false;
  let currentRoomUrl = '';
  let isMobileLandscape = false;

  let messages = [
    { id: 1, user: 'Alex', text: 'Hey everyone! Glad you could make it.', time: '12:04' },
    { id: 2, user: 'Sarah', text: 'Ready for movie night! What are we watching?', time: '12:05' }
  ];
  let newMessage = '';

  onMount(() => {
    currentRoomUrl = window.location.href;
    
    // Auto-detect mobile landscape orientation to give optimal video real estate
    const checkOrientation = () => {
      isMobileLandscape = window.innerWidth < 768 && window.innerWidth > window.innerHeight;
    };
    
    window.addEventListener('resize', checkOrientation);
    checkOrientation();
    
    return () => window.removeEventListener('resize', checkOrientation);
  });

  function copyInviteLink() {
    navigator.clipboard.writeText(currentRoomUrl);
    inviteCopied = true;
    setTimeout(() => { inviteCopied = false; }, 2000);
  }

  function handleMediaSubmit() {
    if (!streamInputUrl) return;
  }

  function sendMessage() {
    if (!newMessage.trim()) return;
    messages = [...messages, {
      id: Date.now(),
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    newMessage = '';
  }

  function toggleFullscreenElement() {
    const player = document.querySelector('.video-canvas-viewport');
    if (!document.fullscreenElement) {
      player.requestFullscreen?.().catch(err => alert(`Error enabling fullscreen: ${err.message}`));
    } else {
      document.exitFullscreen?.();
    }
  }
</script>

<main class="workspace-viewport" class:landscape-mode={isMobileLandscape}>
  <div class="ambient-glow decoration-left"></div>
  <div class="ambient-glow decoration-right"></div>
  
  <section class="media-engine-container">
    
    <header class="room-top-bar">
      <div class="identity-lockup">
        <a href="/" class="brand-identity-link">
          <div class="brand-logo-frame">
            <svg class="logo-svg" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="#0fccb4"/>
              <polygon points="106,46 180,85 106,124" fill="#f5a623"/>
              <circle cx="90" cy="85" r="10" fill="#e8f0ff"/>
            </svg>
          </div>
          <span class="app-title">WatchTogether</span>
        </a>
      </div>

      <div class="system-status">
        <a href="/" class="leave-room-trigger" title="Leave Room">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Leave</span>
        </a>
      </div>
    </header>

    <div class="video-canvas-viewport">
      <div class="canvas-blur-backing"></div>
      
      <div class="canvas-control-overlay">
        <button class="fullscreen-trigger-btn" on:click={toggleFullscreenElement} title="Maximize Playback Canvas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" /></svg>
          <span>Landscape / Fullscreen</span>
        </button>
      </div>

      <div class="canvas-empty-state">
        <div class="empty-state-icon">
          <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="currentColor" opacity="0.12"/>
            <polygon points="106,46 180,85 106,124" fill="currentColor" opacity="0.25"/>
          </svg>
        </div>
        <h4>Ready to Watch</h4>
        <p>Drop a web stream reference or local path configuration below to bind frame synchronization layers.</p>
      </div>
    </div>

    <div class="source-injector-card">
      <div class="input-row">
        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        <input 
          type="text" 
          placeholder="Paste video stream link, magnet URL, or drag storage media..." 
          bind:value={streamInputUrl}
          on:keydown={(e) => e.key === 'Enter' && handleMediaSubmit()}
        />
      </div>
      
      <div class="pipeline-triggers">
        <button on:click={handleMediaSubmit} class="pipe-btn fill-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
          <span>Screenshare</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
          <span>VBrowser</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>File Cast</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn action-submit">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Stream</span>
        </button>
      </div>
    </div>
  </section>

  <aside class="dashboard-sidebar-container">
    
    <div class="invite-management-surface">
      <div class="surface-meta-header">
        <h5>Sync Node Access</h5>
        <div class="live-counter">
          <span class="pulse-dot"></span>
          <span>{messages.length ? messages.length : 1} live</span>
        </div>
      </div>
      
      <div class="copy-link-group">
        <div class="mock-url-display">{currentRoomUrl || 'watchtogether.app/room/...'}</div>
        <button on:click={copyInviteLink} class="copy-trigger" class:copied={inviteCopied}>
          {#if inviteCopied}
            Copied
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Invite</span>
          {/if}
        </button>
      </div>
    </div>

    <div class="chat-module-surface">
      <div class="module-navigation-tabs">
        <div class="tab-label">Live Room Feed</div>
      </div>

      <div class="message-scroller-layer">
        {#each messages as msg (msg.id)}
          <div class="chat-message-node" class:self-message={msg.user === 'You'}>
            <div class="node-avatar" style="background: ${msg.user === 'You' ? 'var(--neon-blue)' : msg.user === 'Alex' ? 'var(--neon-cyan)' : 'var(--neon-purple)'}">
              {msg.user[0]}
            </div>
            <div class="node-content">
              <div class="meta-row">
                <span class="user-name">{msg.user}</span>
                <span class="timestamp">{msg.time}</span>
              </div>
              <p class="message-body">{msg.text}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="feed-input-footer">
        <div class="chat-input-wrapper">
          <input 
            type="text" 
            placeholder="Broadcast a synced tracking message..." 
            bind:value={newMessage}
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button on:click={sendMessage} class="message-dispatch-trigger" aria-label="Send Message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>

  </aside>
</main>

<style>
  /* CONFIGURATION PARAMETERS INITIALIZATION */
  :root {
    --bg-dark-base: #04080e;
    --bg-dark-surface: #090f17;
    --bg-dark-elevation: #121d2c;
    
    --neon-cyan: #0fccb4;
    --neon-blue: #3b82f6;
    --neon-purple: #8b5cf6;
    --neon-green: #10b981;
    
    --border-faint-line: rgba(255, 255, 255, 0.04);
    --border-mid-line: rgba(255, 255, 255, 0.09);
    
    --glass-opacity-bg: rgba(9, 15, 23, 0.65);
    --blur-factor: blur(24px);
    
    --font-primary: #f8fafc;
    --font-secondary: #64748b;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :global(html), :global(body) {
    height: 100%;
    background-color: var(--bg-dark-base);
    color: var(--font-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  /* DECORATIVE BACKGROUND FLARES */
  .ambient-glow {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    pointer-events: none; opacity: 0.02; filter: blur(100px); z-index: 1;
  }
  .decoration-left { top: -100px; left: -100px; background: var(--neon-cyan); }
  .decoration-right { bottom: -100px; right: 100px; background: var(--neon-purple); }

  /* NAVIGATION AND IDENTITY TOP ROW */
  .room-top-bar {
    height: 52px; padding-bottom: 12px;
    background: transparent;
    border-bottom: 1px solid var(--border-faint-line);
    display: flex; align-items: center; justify-content: space-between;
    position: relative; z-index: 10;
  }
  .brand-identity-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
  .brand-logo-frame { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .logo-svg { width: 100%; height: 100%; }
  .app-title { font-weight: 800; font-size: 1.05rem; letter-spacing: -0.02em; font-family: 'Syne', sans-serif; }
  
  .system-status { display: flex; align-items: center; }
  .leave-room-trigger {
    display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: #f43f5e; 
    text-decoration: none; padding: 6px 12px; border-radius: 6px; background: rgba(244, 63, 94, 0.05);
    border: 1px solid rgba(244, 63, 94, 0.15); transition: all 0.2s;
  }
  .leave-room-trigger svg { width: 12px; height: 12px; }
  .leave-room-trigger:hover { background: #f43f5e; color: #fff; border-color: #f43f5e; }

  /* HUB APPARATUS CORE LAYOUT FRAMEWORK */
  .workspace-viewport {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 380px;
    position: relative; z-index: 2;
  }

  /* VIDEO ENGINE VIEWSPACE PORT */
  .media-engine-container {
    padding: 24px; display: flex; flex-direction: column; gap: 20px;
    overflow-y: auto; height: 100%;
  }
  
  /* SOURCE BAR MODIFIERS */
  .source-injector-card {
    background: var(--glass-opacity-bg); backdrop-filter: var(--blur-factor); -webkit-backdrop-filter: var(--blur-factor);
    border: 1px solid var(--border-faint-line); border-radius: 14px; padding: 16px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  }
  .input-row {
    display: flex; align-items: center; gap: 12px; background: rgba(2, 4, 8, 0.4);
    border: 1px solid var(--border-faint-line); border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;
  }
  .input-icon { width: 16px; height: 16px; color: var(--neon-cyan); opacity: 0.7; }
  .input-row input { flex: 1; background: transparent; border: none; outline: none; font-size: 0.85rem; color: var(--font-primary); font-family: inherit; }
  .input-row input::placeholder { color: var(--font-secondary); opacity: 0.6; }

  .pipeline-triggers { display: flex; gap: 8px; flex-wrap: wrap; }
  .pipe-btn {
    background: rgba(255,255,255,0.02); border: 1px solid var(--border-faint-line);
    color: var(--font-secondary); font-size: 0.8rem; font-weight: 600;
    padding: 8px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;
    transition: all 0.2s;
  }
  .pipe-btn svg { width: 12px; height: 12px; }
  .pipe-btn:hover { color: var(--font-primary); background: rgba(255,255,255,0.05); }
  
  .fill-blue:hover { background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.25); color: var(--neon-blue); }
  .fill-green:hover { background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25); color: var(--neon-green); }
  .fill-purple:hover { background: rgba(139, 92, 246, 0.08); border-color: rgba(139, 92, 246, 0.25); color: var(--neon-purple); }
  
  .pipe-btn.action-submit { margin-left: auto; background: var(--neon-cyan); color: var(--bg-dark-base); font-weight: 700; border: none; }
  .pipe-btn.action-submit:hover { opacity: 0.95; }

  /* VIDEO SCREEN CANVAS ENGINE LAYER */
  .video-canvas-viewport {
    flex: 1; background: #020408; border-radius: 14px;
    border: 1px solid var(--border-faint-line); position: relative;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    min-height: 320px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .canvas-blur-backing { position: absolute; inset: 0; opacity: 0.03; background: radial-gradient(circle at center, var(--neon-cyan), transparent 60%); }
  
  /* ACTION LAYER OVER VIDEO SYSTEM BOUNDS */
  .canvas-control-overlay {
    position: absolute; top: 12px; right: 12px; z-index: 5; display: flex; gap: 8px;
  }
  .fullscreen-trigger-btn {
    background: rgba(4, 8, 14, 0.7); border: 1px solid var(--border-mid-line);
    color: var(--font-primary); border-radius: 6px; font-size: 0.72rem; font-weight: 600;
    padding: 6px 12px; display: flex; align-items: center; gap: 6px; cursor: pointer;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 0.2s;
  }
  .fullscreen-trigger-btn:hover { background: rgba(4, 8, 14, 0.9); }
  .fullscreen-trigger-btn svg { width: 12px; height: 12px; color: var(--neon-cyan); }

  .canvas-empty-state { text-align: center; max-width: 380px; padding: 24px; position: relative; z-index: 2; }
  .empty-state-icon { width: 48px; height: 48px; margin: 0 auto 16px; color: var(--neon-cyan); }
  .canvas-empty-state h4 { font-size: 1.1rem; font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 6px; }
  .canvas-empty-state p { font-size: 0.82rem; color: var(--font-secondary); line-height: 1.5; }

  /* SIDEBAR RECEPTACLE (RIGHT) */
  .dashboard-sidebar-container {
    background: var(--bg-dark-surface); border-left: 1px solid var(--border-faint-line);
    display: flex; flex-direction: column; height: 100%; overflow: hidden;
  }

  /* ACCESS MANAGER ROUTE COMPONENT */
  .invite-management-surface { padding: 20px; border-bottom: 1px solid var(--border-faint-line); }
  .surface-meta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .surface-meta-header h5 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--font-secondary); }
  
  .live-counter { display: flex; align-items: center; gap: 6px; font-size: 0.68rem; font-weight: 600; color: var(--neon-green); }
  .pulse-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--neon-green); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }

  .copy-link-group {
    display: flex; background: rgba(2, 4, 8, 0.4); border: 1px solid var(--border-faint-line);
    border-radius: 6px; padding: 4px; align-items: center; justify-content: space-between; gap: 8px;
  }
  .mock-url-display { padding-left: 8px; font-size: 0.78rem; color: var(--font-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: monospace; }
  .copy-trigger {
    background: var(--font-primary); color: var(--bg-dark-base); border: none; font-size: 0.75rem; font-weight: 700;
    padding: 6px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px; flex-shrink: 0;
  }
  .copy-trigger svg { width: 10px; height: 10px; }
  .copy-trigger.copied { background: var(--neon-green); color: #fff; }

  /* FEED CHAT RECEPTACLE PANEL */
  .chat-module-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .module-navigation-tabs { padding: 14px 20px; border-bottom: 1px solid var(--border-faint-line); }
  .tab-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--font-primary); opacity: 0.8; }

  .message-scroller-layer { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
  
  .chat-message-node { display: flex; gap: 10px; align-items: flex-start; }
  .node-avatar { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: #fff; flex-shrink: 0; }
  .node-content { flex: 1; min-width: 0; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.01); padding: 8px 12px; border-radius: 8px; }
  .meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
  .user-name { font-size: 0.72rem; font-weight: 700; color: var(--font-primary); }
  .timestamp { font-size: 0.62rem; color: var(--font-secondary); }
  .message-body { font-size: 0.8rem; color: var(--font-primary); opacity: 0.85; line-height: 1.4; word-break: break-word; }

  .chat-message-node.self-message { flex-direction: row-reverse; }
  .chat-message-node.self-message .node-content { background: rgba(59, 130, 246, 0.03); border-color: rgba(59, 130, 246, 0.1); }
  .chat-message-node.self-message .user-name { color: var(--neon-blue); }

  .feed-input-footer { padding: 14px 20px 20px; border-top: 1px solid var(--border-faint-line); }
  .chat-input-wrapper { display: flex; background: var(--bg-dark-elevation); border: 1px solid var(--border-faint-line); border-radius: 8px; padding: 4px 4px 4px 12px; align-items: center; gap: 8px; }
  .chat-input-wrapper input { flex: 1; background: transparent; border: none; outline: none; font-size: 0.82rem; color: var(--font-primary); font-family: inherit; }
  .chat-input-wrapper input::placeholder { color: var(--font-secondary); opacity: 0.6; }
  
  .message-dispatch-trigger {
    width: 30px; height: 30px; border-radius: 5px; background: rgba(255,255,255,0.02);
    color: var(--font-secondary); border: 1px solid var(--border-faint-line); cursor: pointer; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .message-dispatch-trigger svg { width: 12px; height: 12px; }
  .chat-input-wrapper input:not(:placeholder-shown) + .message-dispatch-trigger { background: var(--neon-blue); color: #fff; border-color: var(--neon-blue); }

  /* ======================================================================
    ULTRA-RESPONSIVE INTERFACE ARCHITECTURE ENGINE (MOBILE MATURATION)
    ======================================================================
  */
  @media (max-width: 768px) {
    /* Converts grid distribution to unified flex pipeline stacking */
    .workspace-viewport {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .media-engine-container {
      padding: 12px;
      gap: 12px;
      overflow: visible; /* Prevents inside viewport collision chains */
      height: auto;
    }

    .room-top-bar {
      height: 44px;
      padding-bottom: 4px;
    }

    /* PRIORITIZES THE VIDEO SCREEN DISPLAY HEIGHT AND IMMERSION RADIUS */
    .video-canvas-viewport {
      min-height: calc(56.25vw - 24px); /* Perfectly keeps exact 16:9 box real estate proportions */
      border-radius: 10px;
    }

    .canvas-empty-state {
      padding: 16px;
    }
    .empty-state-icon {
      width: 36px; height: 36px; margin-bottom: 12px;
    }
    .canvas-empty-state h4 { font-size: 0.95rem; }
    .canvas-empty-state p { font-size: 0.78rem; }

    /* REDUCES BUTTON TEXT ACCENTS ON PHONES SO CONTROLS FIT SECURELY IN A SINGLE LINE */
    .source-injector-card {
      padding: 12px;
      border-radius: 10px;
    }
    .input-row {
      padding: 8px 12px;
      margin-bottom: 8px;
    }
    .pipe-btn {
      padding: 8px 10px;
      font-size: 0.75rem;
      border-radius: 6px;
    }
    .pipe-btn svg {
      margin: 0; /* Centers icons perfectly when running compressed structural text */
    }
    .pipe-btn span {
      display: none; /* Safely strips textual descriptions to ensure buttons never overlay awkwardly */
    }
    .pipe-btn.action-submit span {
      display: inline; /* Keep text representation for main stream initialization triggers */
    }

    /* SIDEBAR SYSTEM TRANSLATION TO BOTTOM CHAT STREAM MODULE */
    .dashboard-sidebar-container {
      border-left: none;
      border-top: 1px solid var(--border-faint-line);
      height: 400px; /* Locked constraint block ensuring container never breaks bounds */
      background: linear-gradient(to bottom, var(--bg-dark-surface), var(--bg-dark-base));
    }

    .invite-management-surface {
      padding: 14px 16px;
    }
    .chat-module-surface {
      padding: 0 4px;
    }
    .message-scroller-layer {
      padding: 14px 16px;
    }
    .feed-input-footer {
      padding: 10px 16px 16px;
    }
  }

  /* ======================================================================
    LANDSCAPE OPTIMIZATION INTERFACE DETECTOR
    ======================================================================
  */
  @media (max-width: 920px) and (orientation: landscape) {
    /* Maximize viewing footprint completely if user screens are horizontally oriented */
    .workspace-viewport.landscape-mode {
      grid-template-columns: 1fr;
      grid-template-rows: 100vh;
      overflow: hidden;
    }
    .workspace-viewport.landscape-mode .media-engine-container {
      padding: 0;
      gap: 0;
      height: 100%;
      width: 100vw;
    }
    .workspace-viewport.landscape-mode .room-top-bar,
    .workspace-viewport.landscape-mode .source-injector-card,
    .workspace-viewport.landscape-mode .dashboard-sidebar-container {
      display: none !important; /* Temporarily strips distraction modules to mimic immersive smart player ecosystems */
    }
    .workspace-viewport.landscape-mode .video-canvas-viewport {
      height: 100vh;
      width: 100vw;
      border-radius: 0;
      border: none;
    }
  }

  /* NATIVE PLAYER ATTRIBUTE SELECTION TARGETING FULLSCREEN EXECUTIONS */
  .video-canvas-viewport:fullscreen {
    padding: 0 !important;
    background: #000;
  }
  .video-canvas-viewport:fullscreen .canvas-control-overlay {
    top: 24px; right: 24px;
  }
  .video-canvas-viewport:fullscreen .canvas-empty-state {
    transform: scale(1.15);
  }
</style>