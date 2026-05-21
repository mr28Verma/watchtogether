<script>
  import { onMount } from 'svelte';

  let streamInputUrl = '';
  let inviteCopied = false;
  let currentRoomUrl = '';

  // Mock data for messages to make the UI look alive and dynamic instantly
  let messages = [
    { id: 1, user: 'Alex', text: 'Hey everyone! Glad you could make it.', time: '12:04' },
    { id: 2, user: 'Sarah', text: 'Ready for movie night! What are we watching?', time: '12:05' }
  ];
  let newMessage = '';

  onMount(() => {
    currentRoomUrl = window.location.href;
  });

  function copyInviteLink() {
    navigator.clipboard.writeText(currentRoomUrl);
    inviteCopied = true;
    setTimeout(() => { inviteCopied = false; }, 2000);
  }

  function handleMediaSubmit() {
    if (!streamInputUrl) return;
    // Core playback engine instantiation logic goes here
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
</script>

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
    <div class="user-pill">
      <div class="avatar-dot"></div>
      <span>Host</span>
    </div>
    <a href="/" class="leave-room-trigger">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
      Leave
    </a>
  </div>
</header>

<main class="workspace-viewport">
  <div class="ambient-glow decoration-left"></div>
  <div class="ambient-glow decoration-right"></div>
  
  <section class="media-engine-container">
    
    <div class="source-injector-card">
      <div class="input-row">
        <div class="input-glow-effect"></div>
        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        <input 
          type="text" 
          placeholder="Paste video link, magnet link, YouTube URL, or drag files..." 
          bind:value={streamInputUrl}
          on:keydown={(e) => e.key === 'Enter' && handleMediaSubmit()}
        />
      </div>
      
      <div class="pipeline-triggers">
        <button on:click={handleMediaSubmit} class="pipe-btn fill-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8m-4-4v4"/></svg>
          Screenshare
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
          VBrowser
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn fill-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          File Cast
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn action-submit">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Play Stream
        </button>
      </div>
    </div>

    <div class="video-canvas-viewport">
      <div class="canvas-blur-backing"></div>
      <div class="canvas-empty-state">
        <div class="empty-state-icon">
          <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="currentColor" opacity="0.15"/>
            <polygon points="106,46 180,85 106,124" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <h4>Awaiting Media Stream</h4>
        <p>Drop a link or select a casting option above to spin up the synchronization engine instance.</p>
      </div>
    </div>
  </section>

  <aside class="dashboard-sidebar-container">
    
    <div class="invite-management-surface">
      <div class="surface-meta-header">
        <h5>Invite Crew</h5>
        <div class="live-counter">
          <span class="pulse-dot"></span>
          <span>{messages.length ? messages.length : 1} connected</span>
        </div>
      </div>
      
      <div class="copy-link-group">
        <div class="mock-url-display">{currentRoomUrl || 'watchtogether.app/room/generating...'}</div>
        <button on:click={copyInviteLink} class="copy-trigger" class:copied={inviteCopied}>
          {#if inviteCopied}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="btn-icon"><polyline points="20 6 9 17 4 12"/></svg>
            Copied
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy Link
          {/if}
        </button>
      </div>
    </div>

    <div class="chat-module-surface">
      <div class="module-navigation-tabs">
        <div class="tab-label">
          <span>Live Chat Feed</span>
        </div>
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
            placeholder="Send a synced message..." 
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
  /* APPLICATION DESIGN SYSTEM INITIALIZATION */
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
    --font-muted: #334155;
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

  /* DECORATIVE BACKGROUND LIGHTS */
  .ambient-glow {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    pointer-events: none; opacity: 0.03; filter: blur(100px); z-index: 1;
  }
  .decoration-left { top: -100px; left: -100px; background: var(--neon-cyan); }
  .decoration-right { bottom: -100px; right: 100px; background: var(--neon-purple); }

  /* TOP BAR AREA CONFIGURATION */
  .room-top-bar {
    height: 64px; padding: 0 28px;
    background: rgba(4, 8, 14, 0.7);
    border-bottom: 1px solid var(--border-faint-line);
    display: flex; align-items: center; justify-content: space-between;
    backdrop-filter: var(--blur-factor); -webkit-backdrop-filter: var(--blur-factor);
    position: relative; z-index: 10;
  }
  .identity-lockup { display: flex; align-items: center; }
  .brand-identity-link { display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; }
  .brand-logo-frame { 
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    filter: drop-shadow(0 0 8px rgba(15, 204, 180, 0.3));
  }
  .logo-svg { width: 100%; height: 100%; }
  .app-title { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.03em; font-family: 'Syne', sans-serif; background: linear-gradient(135deg, #fff 60%, var(--font-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  
  .system-status { display: flex; align-items: center; gap: 16px; }
  .user-pill {
    display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 600;
    background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2);
    padding: 6px 14px; border-radius: 100px; color: var(--neon-blue);
  }
  .avatar-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--neon-blue); box-shadow: 0 0 8px var(--neon-blue); }
  
  .leave-room-trigger {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.82rem; font-weight: 600; color: #f43f5e; text-decoration: none; 
    padding: 6px 14px; border-radius: 8px; background: rgba(244, 63, 94, 0.05);
    border: 1px solid rgba(244, 63, 94, 0.15); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .leave-room-trigger svg { width: 14px; height: 14px; }
  .leave-room-trigger:hover { background: #f43f5e; color: #fff; border-color: #f43f5e; box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2); transform: translateY(-1px); }

  /* WORKSPACE VIEWPORT GRID LAYOUT */
  .workspace-viewport {
    height: calc(100% - 64px);
    display: grid;
    grid-template-columns: 1fr 380px;
    position: relative; z-index: 2;
  }

  /* MEDIA PANEL CONTEXT WRAPPER (LEFT) */
  .media-engine-container {
    padding: 28px; display: flex; flex-direction: column; gap: 24px;
    overflow-y: auto; height: 100%;
  }
  
  /* ADVANCED GLASSMORPHIC MEDIA INJECTOR CARD */
  .source-injector-card {
    background: var(--glass-opacity-bg); backdrop-filter: var(--blur-factor); -webkit-backdrop-filter: var(--blur-factor);
    border: 1px solid var(--border-faint-line); border-radius: 16px; padding: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
  }
  .input-row {
    display: flex; align-items: center; gap: 14px; background: rgba(2, 4, 8, 0.4);
    border: 1px solid var(--border-faint-line); border-radius: 10px; padding: 12px 18px; margin-bottom: 16px;
    position: relative; transition: border-color 0.3s;
  }
  .input-row:focus-within { border-color: rgba(15, 204, 180, 0.4); }
  .input-icon { width: 18px; height: 18px; color: var(--neon-cyan); opacity: 0.8; }
  .input-row input {
    flex: 1; background: transparent; border: none; outline: none;
    font-size: 0.9rem; color: var(--font-primary); font-family: inherit;
  }
  .input-row input::placeholder { color: var(--font-secondary); opacity: 0.7; }

  .pipeline-triggers { display: flex; gap: 10px; flex-wrap: wrap; }
  .pipe-btn {
    background: rgba(255,255,255,0.02); border: 1px solid var(--border-faint-line);
    color: var(--font-secondary); font-size: 0.82rem; font-weight: 600;
    padding: 10px 18px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pipe-btn svg { width: 14px; height: 14px; opacity: 0.7; }
  .pipe-btn:hover { color: var(--font-primary); background: rgba(255,255,255,0.06); border-color: var(--border-mid-line); }
  
  .fill-blue:hover { background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3); color: var(--neon-blue); }
  .fill-green:hover { background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3); color: var(--neon-green); }
  .fill-purple:hover { background: rgba(139, 92, 246, 0.08); border-color: rgba(139, 92, 246, 0.3); color: var(--neon-purple); }
  
  .pipe-btn.action-submit {
    margin-left: auto; background: var(--neon-cyan); color: var(--bg-dark-base);
    font-weight: 700; border: none; padding: 10px 24px; box-shadow: 0 4px 16px rgba(15, 204, 180, 0.25);
  }
  .pipe-btn.action-submit:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(15, 204, 180, 0.35); }

  /* VIDEO CANVAS WITH AMBIENT FILL GRAPHIC */
  .video-canvas-viewport {
    flex: 1; background: #020408; border-radius: 16px;
    border: 1px solid var(--border-faint-line); position: relative;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    min-height: 400px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);
  }
  .canvas-blur-backing {
    position: absolute; inset: 0; opacity: 0.05;
    background: radial-gradient(circle at center, var(--neon-cyan), transparent 60%);
    filter: blur(40px); animation: pulsingGrad 8s infinite ease-in-out;
  }
  @keyframes pulsingGrad { 0%, 100% { transform: scale(1); opacity: 0.03; } 50% { transform: scale(1.2); opacity: 0.07; } }
  
  .canvas-empty-state { text-align: center; max-width: 440px; padding: 32px; position: relative; z-index: 2; }
  .empty-state-icon { width: 72px; height: 72px; margin: 0 auto 24px; color: var(--neon-cyan); filter: drop-shadow(0 0 12px rgba(15,204,180,0.2)); }
  .canvas-empty-state h4 { font-size: 1.25rem; font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.01em; }
  .canvas-empty-state p { font-size: 0.88rem; color: var(--font-secondary); line-height: 1.6; }

  /* SIDEBAR SURFACE HOUSING (RIGHT) */
  .dashboard-sidebar-container {
    background: var(--bg-dark-surface); border-left: 1px solid var(--border-faint-line);
    display: flex; flex-direction: column; height: 100%; overflow: hidden;
    box-shadow: -10px 0 30px rgba(0,0,0,0.15);
  }

  /* ACCENTED LINK SHARE COMPONENT */
  .invite-management-surface { padding: 24px; border-bottom: 1px solid var(--border-faint-line); }
  .surface-meta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .surface-meta-header h5 { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--font-secondary); }
  
  .live-counter {
    display: flex; align-items: center; gap: 6px; font-size: 0.72rem; font-weight: 600;
    color: var(--neon-green); background: rgba(16, 185, 129, 0.06); padding: 4px 10px; border-radius: 100px;
  }
  .pulse-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--neon-green); animation: pulseAnim 2s infinite; }
  @keyframes pulseAnim { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); } 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }

  .copy-link-group {
    display: flex; background: rgba(2, 4, 8, 0.5); border: 1px solid var(--border-faint-line);
    border-radius: 8px; padding: 5px; align-items: center; justify-content: space-between; gap: 10px;
  }
  .mock-url-display {
    padding-left: 10px; font-size: 0.82rem; color: var(--font-secondary);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: monospace;
  }
  .copy-trigger {
    background: var(--font-primary); color: var(--bg-dark-base); border: none;
    font-size: 0.78rem; font-weight: 700; padding: 8px 16px; border-radius: 6px;
    cursor: pointer; display: flex; align-items: center; gap: 6px;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); flex-shrink: 0;
  }
  .copy-trigger svg { width: 12px; height: 12px; }
  .copy-trigger:hover { opacity: 0.95; transform: translateY(-0.5px); }
  .copy-trigger.copied { background: var(--neon-green); color: #fff; }

  /* STREAM SOCIAL CHAT CORE SCREEN MODULE */
  .chat-module-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .module-navigation-tabs { padding: 18px 24px; border-bottom: 1px solid var(--border-faint-line); background: rgba(0,0,0,0.05); }
  .tab-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--font-primary); opacity: 0.9; }

  .message-scroller-layer { flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 18px; overflow-y: auto; }
  
  .chat-message-node { display: flex; gap: 12px; align-items: flex-start; }
  .node-avatar {
    width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 700; color: #fff; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
  .node-content { flex: 1; min-width: 0; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.02); padding: 10px 14px; border-radius: 10px; }
  .meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
  .user-name { font-size: 0.78rem; font-weight: 700; color: var(--font-primary); }
  .timestamp { font-size: 0.68rem; color: var(--font-secondary); }
  .message-body { font-size: 0.85rem; color: var(--font-primary); opacity: 0.85; line-height: 1.5; word-break: break-word; }

  /* UX Enhancement for User's Own Messages */
  .chat-message-node.self-message { flex-direction: row-reverse; }
  .chat-message-node.self-message .node-content { background: rgba(59, 130, 246, 0.04); border-color: rgba(59, 130, 246, 0.15); }
  .chat-message-node.self-message .user-name { color: var(--neon-blue); }

  /* INTEGRATED INPUT COMPONENT WRAPPER */
  .feed-input-footer { padding: 18px 24px 24px; border-top: 1px solid var(--border-faint-line); background: rgba(4, 8, 14, 0.3); }
  .chat-input-wrapper {
    display: flex; background: var(--bg-dark-elevation); border: 1px solid var(--border-faint-line);
    border-radius: 10px; padding: 4px 4px 4px 14px; align-items: center; gap: 10px; transition: border-color 0.25s;
  }
  .chat-input-wrapper:focus-within { border-color: rgba(5b, 130, 246, 0.4); }
  .chat-input-wrapper input {
    flex: 1; background: transparent; border: none; outline: none;
    font-size: 0.88rem; color: var(--font-primary); font-family: inherit;
  }
  .chat-input-wrapper input::placeholder { color: var(--font-secondary); opacity: 0.6; }
  
  .message-dispatch-trigger {
    width: 34px; height: 34px; border-radius: 7px; background: rgba(255,255,255,0.03);
    color: var(--font-secondary); border: 1px solid var(--border-faint-line); cursor: pointer; display: flex;
    align-items: center; justify-content: center; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); flex-shrink: 0;
  }
  .message-dispatch-trigger svg { width: 14px; height: 14px; transform: translateX(1px); }
  .chat-input-wrapper input:not(:placeholder-shown) + .message-dispatch-trigger {
    background: var(--neon-blue); color: #fff; border-color: var(--neon-blue); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  .message-dispatch-trigger:hover { opacity: 0.95; }

  /* RESPONSE DEGRADATION FLUID LAYOUT OVERRIDES */
  @media (max-width: 1024px) {
    .workspace-viewport { grid-template-columns: 1fr; overflow-y: auto; }
    .dashboard-sidebar-container { height: auto; min-height: 500px; border-left: none; border-top: 1px solid var(--border-faint-line); }
    .media-engine-container { height: auto; overflow: visible; }
  }
</style>