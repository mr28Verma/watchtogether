<script>
  import { onMount } from 'svelte';

  let streamInputUrl = '';
  let inviteCopied = false;
  let currentRoomUrl = '';
  let isMobileLandscape = false;

  let messages = [
    { id: 1, user: 'Alex', text: '🍿 Yo! Pass the digital popcorn. What are we watching?', time: '12:04', isHost: true },
    { id: 2, user: 'Sarah', text: 'Nolan marathon or sci-fi nights? Let’s drop the magnet link!', time: '12:05', isHost: false }
  ];
  let newMessage = '';

  onMount(() => {
    currentRoomUrl = window.location.href;
    
    const checkOrientation = () => {
      isMobileLandscape = window.innerWidth < 960 && window.innerWidth > window.innerHeight;
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isHost: true
    }];
    newMessage = '';
    
    setTimeout(() => {
      const scroller = document.querySelector('.message-scroller-layer');
      if (scroller) scroller.scrollTop = scroller.scrollHeight;
    }, 50);
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
        </a>
      </div>
    </header>

    <div class="video-canvas-viewport">
      <div class="canvas-blur-backing"></div>
      
      <div class="canvas-control-overlay">
        <button class="fullscreen-trigger-btn" on:click={toggleFullscreenElement} title="Toggle Fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" /></svg>
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
        <button on:click={handleMediaSubmit} class="pipe-btn fill-blue" title="Screenshare">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
          <span>Screenshare</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-green" title="VBrowser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
          <span>VBrowser</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-purple" title="File Cast">
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
          <span>{messages.length ? messages.length : 1} connected</span>
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
        <div class="tab-label">
          <span>Party Feed</span>
        </div>
      </div>

      <div class="message-scroller-layer">
        {#each messages as msg (msg.id)}
          <div class="chat-card-wrapper" class:self-card={msg.user === 'You'}>
            <div class="chat-card-header">
              <span class="card-author" class:host-accent={msg.isHost}>{msg.user}</span>
              {#if msg.isHost}
                <span class="host-tag">HOST</span>
              {/if}
              <span class="card-time">{msg.time}</span>
            </div>
            
            <div class="chat-card-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="feed-input-footer">
        <div class="chat-input-wrapper">
          <input 
            type="text" 
            placeholder="Type your reaction here..." 
            bind:value={newMessage}
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button on:click={sendMessage} class="message-dispatch-trigger" class:has-text={newMessage.trim() !== ''} aria-label="Send Message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>

  </aside>
</main>

<style>
  /* CONFIGURATION DESIGN SYSTEM CONSTANTS */
  :root {
    --bg-dark-base: #04080e;
    --bg-dark-surface: #090f17;
    --bg-dark-elevation: #121d2c;
    
    --neon-cyan: #0fccb4;
    --neon-blue: #3b82f6;
    --neon-purple: #8b5cf6;
    --neon-green: #10b981;
    --neon-amber: #f5a623;
    
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

  .ambient-glow {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    pointer-events: none; opacity: 0.02; filter: blur(100px); z-index: 1;
  }
  .decoration-left { top: -100px; left: -100px; background: var(--neon-cyan); }
  .decoration-right { bottom: -100px; right: 100px; background: var(--neon-purple); }

  .room-top-bar {
    height: 44px; padding-bottom: 8px;
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
    display: flex; align-items: center; justify-content: center; color: #f43f5e; 
    text-decoration: none; padding: 8px; border-radius: 8px; background: rgba(244, 63, 94, 0.05);
    border: 1px solid rgba(244, 63, 94, 0.15); transition: all 0.2s;
  }
  .leave-room-trigger svg { width: 14px; height: 14px; }
  .leave-room-trigger:hover { background: #f43f5e; color: #fff; border-color: #f43f5e; }

  .workspace-viewport {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 380px;
    position: relative; z-index: 2;
  }

  .media-engine-container {
    padding: 24px; display: flex; flex-direction: column; gap: 20px;
    overflow-y: auto; height: 100%;
  }
  
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

  .video-canvas-viewport {
    flex: 1; background: #020408; border-radius: 14px;
    border: 1px solid var(--border-faint-line); position: relative;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    min-height: 320px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .canvas-blur-backing { position: absolute; inset: 0; opacity: 0.03; background: radial-gradient(circle at center, var(--neon-cyan), transparent 60%); }
  
  .canvas-control-overlay { position: absolute; top: 12px; right: 12px; z-index: 5; }
  .fullscreen-trigger-btn {
    background: rgba(4, 8, 14, 0.6); border: 1px solid var(--border-faint-line);
    color: var(--font-primary); border-radius: 6px; width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 0.2s, border-color 0.2s;
  }
  .fullscreen-trigger-btn:hover { background: rgba(4, 8, 14, 0.8); border-color: rgba(255,255,255,0.2); }
  .fullscreen-trigger-btn svg { width: 14px; height: 14px; color: var(--neon-cyan); }

  .canvas-empty-state { text-align: center; max-width: 380px; padding: 24px; position: relative; z-index: 2; }
  .empty-state-icon { width: 48px; height: 48px; margin: 0 auto 16px; color: var(--neon-cyan); }
  .canvas-empty-state h4 { font-size: 1.1rem; font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 6px; }
  .canvas-empty-state p { font-size: 0.82rem; color: var(--font-secondary); line-height: 1.5; }

  .dashboard-sidebar-container {
    background: var(--bg-dark-surface); border-left: 1px solid var(--border-faint-line);
    display: flex; flex-direction: column; height: 100%; overflow: hidden;
  }

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

  /* ======================================================================
     ASYMMETRICAL STORY CARD CHAT UI ENGINE
     ====================================================================== */
  .chat-module-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
  .module-navigation-tabs { padding: 14px 20px; border-bottom: 1px solid var(--border-faint-line); }
  .tab-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--font-primary); opacity: 0.8; }
  .message-scroller-layer { flex: 1; padding: 24px 20px; display: flex; flex-direction: column; gap: 24px; overflow-y: auto; scroll-behavior: smooth; }
  
  .chat-card-wrapper { display: flex; flex-direction: column; max-width: 88%; align-self: flex-start; position: relative; }
  .chat-card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; padding: 0 4px; }
  .card-author { font-size: 0.75rem; font-weight: 800; color: var(--neon-purple); }
  .card-author.host-accent { color: var(--neon-cyan); }
  .host-tag { font-size: 0.58rem; font-weight: 900; background: rgba(15, 204, 180, 0.15); color: var(--neon-cyan); padding: 1px 4px; border-radius: 3px; letter-spacing: 0.02em; }
  .card-time { font-size: 0.62rem; color: var(--font-secondary); font-family: monospace; margin-left: auto; }

  .chat-card-bubble { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-faint-line); border-radius: 16px 16px 16px 2px; padding: 12px 16px; box-shadow: -4px 8px 24px rgba(0,0,0,0.2); transition: transform 0.2s, border-color 0.2s; }
  .chat-card-bubble:hover { transform: translateY(-2px) scale(1.01); border-color: var(--border-mid-line); }
  .chat-card-bubble p { font-size: 0.85rem; color: var(--font-primary); opacity: 0.92; line-height: 1.5; word-break: break-word; }

  .chat-card-wrapper.self-card { align-self: flex-end; }
  .chat-card-wrapper.self-card .chat-card-bubble { border-radius: 16px 16px 2px 16px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border-color: rgba(59, 130, 246, 0.2); box-shadow: 4px 8px 24px rgba(59, 130, 246, 0.06); }
  .chat-card-wrapper.self-card .card-author { color: var(--neon-blue); }

  .feed-input-footer { padding: 16px 20px 20px; border-top: 1px solid var(--border-faint-line); background: linear-gradient(to top, rgba(4, 8, 14, 0.4), transparent); }
  .chat-input-wrapper { display: flex; background: rgba(2, 4, 8, 0.5); border: 1px solid var(--border-faint-line); border-radius: 12px; padding: 4px 4px 4px 14px; align-items: center; gap: 10px; transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  .chat-input-wrapper:focus-within { border-color: rgba(59, 130, 246, 0.4); box-shadow: 0 0 20px rgba(59, 130, 246, 0.08); }
  .chat-input-wrapper input { flex: 1; background: transparent; border: none; outline: none; font-size: 0.85rem; color: var(--font-primary); font-family: inherit; }
  .chat-input-wrapper input::placeholder { color: var(--font-secondary); opacity: 0.5; }
  
  .message-dispatch-trigger { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.01); color: var(--font-secondary); border: 1px solid var(--border-faint-line); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.25s ease; }
  .message-dispatch-trigger svg { width: 13px; height: 13px; }
  .message-dispatch-trigger.has-text { background: var(--neon-blue); color: #fff; border-color: var(--neon-blue); box-shadow: 0 0 12px rgba(59, 130, 246, 0.35); }
  .message-dispatch-trigger.has-text:hover { transform: translateY(-1px); opacity: 0.95; }

  /* RESPONSIVE LAYOUT BREAKPOINTS (PORTRAIT) */
  @media (max-width: 768px) {
    .workspace-viewport {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .media-engine-container { padding: 12px; gap: 12px; overflow: visible; height: auto; }
    .room-top-bar { height: 40px; padding-bottom: 4px; }
    .video-canvas-viewport { min-height: calc(56.25vw - 24px); border-radius: 10px; }
    .canvas-empty-state { padding: 16px; }
    .empty-state-icon { width: 36px; height: 36px; margin-bottom: 12px; }
    .canvas-empty-state h4 { font-size: 0.95rem; }
    .canvas-empty-state p { font-size: 0.78rem; }
    .source-injector-card { padding: 12px; border-radius: 10px; }
    .input-row { padding: 8px 12px; margin-bottom: 8px; }
    .pipe-btn { padding: 8px 10px; font-size: 0.75rem; border-radius: 6px; }
    .pipe-btn svg { margin: 0; }
    .pipe-btn span { display: none; }
    .pipe-btn.action-submit span { display: inline; }
    .dashboard-sidebar-container { border-left: none; border-top: 1px solid var(--border-faint-line); height: 400px; background: linear-gradient(to bottom, var(--bg-dark-surface), var(--bg-dark-base)); }
    .invite-management-surface { padding: 14px 16px; }
    .message-scroller-layer { padding: 14px 16px; }
    .feed-input-footer { padding: 10px 16px 16px; }
  }

  /* HARDWARE LEVEL MOBILE LANDSCAPE ENGINE OVERRIDES */
  @media (max-height: 540px) and (orientation: landscape), (max-width: 960px) and (orientation: landscape) {
    .workspace-viewport {
      display: block !important;
      height: 100vh !important;
      width: 100vw !important;
      position: fixed !important;
      inset: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      z-index: 99999 !important;
      background: #000 !important;
    }

    .media-engine-container {
      position: absolute !important;
      inset: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      height: 100% !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;
      z-index: 10 !important;
    }

    .room-top-bar,
    .source-injector-card,
    .dashboard-sidebar-container,
    .ambient-glow {
      display: none !important;
    }

    .video-canvas-viewport {
      position: absolute !important;
      inset: 0 !important;
      height: 100% !important;
      width: 100% !important;
      max-height: 100% !important;
      max-width: 100% !important;
      border-radius: 0 !important;
      border: none !important;
      margin: 0 !important;
    }
  }

  .video-canvas-viewport:fullscreen { padding: 0 !important; background: #000; border: none !important; border-radius: 0 !important; }
  .video-canvas-viewport:fullscreen .canvas-control-overlay { top: 24px; right: 24px; }
</style>