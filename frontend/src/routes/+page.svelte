<script>
  import { onMount } from 'svelte';

  let isStuck = false;

  onMount(() => {
    const handleScroll = () => {
      isStuck = window.scrollY > 30;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleCreate() {
    const id = Math.random().toString(36).slice(2, 8);
    //window.location.href = '/room/' + id;
    window.location.href = '/room';
  }
</script>

<!-- NAV -->
<nav class:stuck={isStuck}>
  <a href="#top" class="brand">
    <svg class="logo-svg" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="#0fccb4"/>
      <polygon points="106,46 180,85 106,124" fill="#f5a623"/>
      <circle cx="90" cy="85" r="10" fill="#e8f0ff"/>
    </svg>
    WatchTogether
  </a>
  <div class="nav-r">
    <a href="#features" class="nav-link">Features</a>
    <a href="#how" class="nav-link">How it works</a>
    <a href="https://github.com/mr28Verma/watchtogether" target="_blank" rel="noreferrer" class="nav-gh">
      <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub
    </a>
    <button on:click={handleCreate} class="nav-cta-btn">Launch App</button>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="top">
  <div class="hero-grid"></div>
  <div class="glow g1"></div>
  <div class="glow g2"></div>

  <div class="hero-inner">
    <h1>
      Watch anything<br/>
      <span class="h1-accent">together, in sync.</span>
    </h1>

    <p class="hero-sub">
      Create a room in seconds. Share the link. Stream YouTube, local files, or a shared browser — everyone stays perfectly synced in real time.
    </p>

    <div class="hero-cta">
      <button on:click={handleCreate} class="btn-primary">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Create a Room
      </button>

      <button on:click={handleCreate} class="btn-primary">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Join a Room
      </button>
      
    </div>

    <!-- DESKTOP: Browser Mockup -->
    <div class="browser-mockup">
      <div class="browser">
        <div class="browser-bar">
          <div class="win-dots">
            <div class="wd" style="background:#ef4444;"></div>
            <div class="wd" style="background:#f59e0b;"></div>
            <div class="wd" style="background:#22c55e;"></div>
          </div>
          <div class="urlbar">
            <div class="urlbar-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              watchtogether.app/room/movie-night
            </div>
          </div>
          <div style="width:72px;"></div>
        </div>
        <div class="browser-body">
          <div class="vpane">
            <div class="vbg"></div>
            <img src="https://www.hollywoodreporter.com/wp-content/uploads/2014/10/interstellar_a_0.jpg?w=1440&h=810&crop=1" alt="Now playing" class="vpane-img"/>
            <div class="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            <div class="movie-label">Interstellar (2014) — 4K HDR</div>
            <div class="viewers">
              <div class="vav" style="background:#0fccb4;">A</div>
              <div class="vav" style="background:#f5a623;">S</div>
              <div class="vav" style="background:#3b82f6;">M</div>
              <div class="vav" style="background:#ef4444;">R</div>
              <div class="vcount">+4 watching</div>
            </div>
            <div class="scrubber">
              <div class="scrub-track"><div class="scrub-fill"></div></div>
              <div class="scrub-head"></div>
            </div>
            <div class="rxns">
              <div class="rxn">mind blown</div>
              <div class="rxn">best scene ever</div>
              <div class="rxn">same, lol</div>
            </div>
          </div>
          <div class="chat">
            <div class="chat-head">
              <span class="chat-title">Live Chat</span>
              <div class="online-badge"><div class="ob-dot"></div>8 online</div>
            </div>
            <div class="msgs">
              <div class="msg">
                <div class="av" style="background:#0fccb4;">A</div>
                <div class="mc"><div class="mn">Alex</div><div class="mt">This part always gets me</div></div>
              </div>
              <div class="msg">
                <div class="av" style="background:#f5a623;">S</div>
                <div class="mc"><div class="mn">Sophie</div><div class="mt">Nolan is an absolute genius</div></div>
              </div>
              <div class="msg">
                <div class="sk sk-av"></div>
                <div class="mc"><div class="sk sk-ln" style="width:38%;"></div><div class="sk sk-ln" style="width:65%;"></div></div>
              </div>
              <div class="msg">
                <div class="av" style="background:#f5a623;">M</div>
                <div class="mc"><div class="mn">Max</div><div class="mt">pause! we'll wait haha</div></div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Say something…"/>
              <button class="send"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE: Phone Mockup -->
    <div class="phone-mockup">
      <div class="phone-shell">
        <div class="phone-notch">
          <div class="notch-cam"></div>
          <div class="notch-light"></div>
          <div class="notch-cam"></div>
        </div>
        <div class="phone-screen">
          <div class="p-header">
            <div class="p-logo">WatchTogether</div>
            <div class="p-badge"><div class="p-badge-dot"></div>Live</div>
          </div>
          <div class="p-video">
            <img src="https://www.hollywoodreporter.com/wp-content/uploads/2014/10/interstellar_a_0.jpg?w=800&h=450&crop=1" alt="Now playing"/>
            <div class="p-video-overlay">
              <div class="p-play"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            </div>
            <div class="p-watchers"><div class="p-wdot"></div>8 watching</div>
            <div class="p-label">Interstellar (2014) — 4K HDR</div>
            <div class="p-progress"><div class="p-progress-fill"></div></div>
          </div>
          <div class="p-chat">
            <div class="p-chat-head">
              <div class="p-chat-label">Live Chat</div>
              <div class="p-chat-online"><div class="p-badge-dot"></div>8 online</div>
            </div>
            <div class="p-msgs">
              <div class="p-msg">
                <div class="p-av" style="background:#0fccb4;">A</div>
                <div class="p-mc"><div class="p-name">Alex</div><div class="p-text">This part always gets me 😭</div></div>
              </div>
              <div class="p-msg">
                <div class="p-av" style="background:#f5a623;">S</div>
                <div class="p-mc"><div class="p-name">Sophie</div><div class="p-text">Nolan is an absolute genius</div></div>
              </div>
              <div class="p-msg">
                <div class="p-av" style="background:#3b82f6;">M</div>
                <div class="p-mc"><div class="p-name">Max</div><div class="p-text">pause! we'll wait haha</div></div>
              </div>
            </div>
            <div class="p-input">
              <input type="text" placeholder="Say something…"/>
              <button class="p-send"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg></button>
            </div>
          </div>
        </div>
        <div class="phone-bar"><div class="home-bar"></div></div>
      </div>
    </div>
  </div>
</section>

<!-- STRIP -->
<div class="strip">
  <div class="stat"><div class="stat-n">&lt;<span>5</span>ms</div><div class="stat-l">Sync delay across all viewers</div></div>
  <div class="stat"><div class="stat-n">E2E</div><div class="stat-l">End-to-end encrypted rooms</div></div>
  <div class="stat"><div class="stat-n">0</div><div class="stat-l">Downloads or extensions needed</div></div>
  <div class="stat"><div class="stat-n">Free</div><div class="stat-l">No paywalls, ever</div></div>
</div>

<!-- FEATURES -->
<section class="section" id="features">
  <div class="section-inner">
    <span class="tag">Features</span>
    <h2 class="section-h">Everything for the perfect<br/>watch night</h2>
    <p class="section-sub">No sign-ups, no extensions. Seamless sync straight from your browser.</p>
    <div class="feat-mosaic">
      <div class="feat-card fc-1">
        <div class="feat-icon" style="background:rgba(15,204,180,0.08);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0fccb4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
        </div>
        <h3>Instant Room Setup</h3>
        <p>One click generates a unique room link. Friends join from any phone, tablet, or laptop — no friction, no accounts.</p>
      </div>
      <div class="feat-card fc-2">
        <div class="feat-icon" style="background:rgba(245,166,35,0.08);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </div>
        <h3>Flawless Sync</h3>
        <p>Play, pause, seek — every action is instantly mirrored across all viewers. Nobody gets left behind or accidentally spoiled.</p>
      </div>
      <div class="feat-card fc-3">
        <div class="feat-icon" style="background:rgba(59,130,246,0.08);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <h3>Live Chat</h3>
        <p>Real-time messages and reactions as the story unfolds.</p>
      </div>
      <div class="feat-card fc-4">
        <div class="feat-icon" style="background:rgba(15,204,180,0.08);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0fccb4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h3>Cloud Browser</h3>
        <p>Stream Netflix, Hulu, Disney+ via a virtual cloud session.</p>
      </div>
      <div class="feat-card fc-5">
        <div class="feat-icon" style="background:rgba(245,166,35,0.08);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.41a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <h3>Voice Chat</h3>
        <p>Built-in group voice with near-zero latency.</p>
      </div>
      <div class="feat-card fc-6">
        <div class="fc-6-text">
          <div class="feat-badge">Local files</div>
          <h3>Stream directly from your desktop</h3>
          <p>Have a movie saved locally? Just drop it into the room and stream it live to every viewer with zero upload lag or quality loss.</p>
        </div>
        <div class="feat-mini-browser">
          <div class="fmb-bar">
            <div class="fmbd" style="background:#ef4444;"></div>
            <div class="fmbd" style="background:#f59e0b;"></div>
            <div class="fmbd" style="background:#22c55e;"></div>
          </div>
          <div class="fmb-body">
            <div class="fmb-row"><div class="fmb-av" style="background:#0fccb4;"></div><div class="fmb-lines"><div class="fmb-line" style="width:55%;"></div><div class="fmb-line lit" style="width:80%;"></div></div></div>
            <div class="fmb-row"><div class="fmb-av" style="background:#f5a623;"></div><div class="fmb-lines"><div class="fmb-line" style="width:40%;"></div><div class="fmb-line" style="width:65%;"></div></div></div>
            <div class="fmb-row"><div class="fmb-av sk" style="width:24px;height:24px;border-radius:6px;flex-shrink:0;"></div><div class="fmb-lines"><div class="fmb-line sk" style="width:45%;"></div><div class="fmb-line sk" style="width:70%;"></div></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how-section" id="how">
  <div class="section-inner">
    <span class="tag">How it works</span>
    <h2 class="section-h">Up and watching in<br/>three steps</h2>
    <p class="section-sub">No config. No installs. Just streaming.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <h3>Create your room</h3>
        <p>Hit the button. Your private streaming room is generated instantly with a unique shareable link — auto-copied to clipboard.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <h3>Invite your crew</h3>
        <p>Drop the link in your group chat. Friends click and join immediately — no account or install required on their end.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <h3>Stream and enjoy</h3>
        <p>Hit play. Everyone stays in perfect sync while the live chat fills with reactions in real time.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="cta-box">
    <span class="tag">Get started</span>
    <h2>Your next watch night<br/>starts right now.</h2>
    <p>No credit cards, no logins, no paywalls. Launch a secure room and start watching in under 5 seconds.</p>
    <div class="cta-btns">
      <button on:click={handleCreate} class="btn-cta">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Create a Free Room
      </button>
      <a href="https://github.com/mr28Verma/watchtogether" target="_blank" rel="noreferrer" class="btn-cta-ghost">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
        Star on GitHub
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-top">
    <div class="footer-about">
      <a href="#top" class="brand">
        <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="#0fccb4"/>
          <polygon points="106,46 180,85 106,124" fill="#f5a623"/>
          <circle cx="90" cy="85" r="10" fill="#e8f0ff"/>
        </svg>
        WatchTogether
      </a>
      <p>Watch anything with anyone, perfectly in sync. Free, open-source, forever.</p>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#features">Features</a><a href="#how">How it works</a><a href="#top">Changelog</a>
      </div>
      <div class="footer-col">
        <h4>Developer</h4>
        <a href="https://github.com/mr28Verma/watchtogether" target="_blank" rel="noreferrer">Repository</a>
        <a href="https://github.com/mr28Verma" target="_blank" rel="noreferrer">GitHub Profile</a>
        <a href="#top">Documentation</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="#top">Privacy Policy</a><a href="#top">Terms of Use</a><a href="#top">Cookies</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2026 WatchTogether. All rights reserved.</span>
    <div class="socials">
      <a class="soc" href="https://github.com/mr28Verma/watchtogether" target="_blank" rel="noreferrer" title="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a class="soc" href="https://www.linkedin.com/in/saksham-verma-9275b631b/" target="_blank" rel="noreferrer" title="LinkedIn" style="font-size:.78rem;font-weight:700;font-family:'Syne',sans-serif;">in</a>
    </div>
  </div>
</footer>

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #070c12;
    --bg1:      #0c1420;
    --bg2:      #111c2e;
    --bg3:      #162238;
    --teal:     #0fccb4;
    --teal-d:   #0a9e8c;
    --teal-g:   rgba(15,204,180,0.12);
    --amber:    #f5a623;
    --amber-g:  rgba(245,166,35,0.12);
    --red:      #ff5757;
    --slate:    #c8d8f0;
    --muted:    #5c7090;
    --faint:    #2a3a55;
    --line:     rgba(255,255,255,0.06);
    --line-md:  rgba(255,255,255,0.11);
    --text:     #e8f0ff;
  }

  :global(html) { 
    scroll-behavior: smooth; 
    font-family: 'DM Sans', sans-serif;
    background: #070c12;
    color: #e8f0ff;
    overflow-x: hidden;
  }

  :global(body)::after {
    content: '';
    position: fixed; inset: 0; z-index: 9999;
    pointer-events: none; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E");
  }

  h1, h2, h3, .brand { font-family: 'Syne', sans-serif; }

  /* ─── NAV ─── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(7,12,18,0.55);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-bottom: 1px solid var(--line);
    transition: padding .3s ease, background .3s ease;
  }
  nav.stuck { padding: 12px 60px; background: rgba(7,12,18,0.9); }

  .brand {
    display: flex; align-items: center; gap: 10px;
    font-size: 1.22rem; font-weight: 800; letter-spacing: -.03em;
    color: var(--text); text-decoration: none;
  }
  .logo-svg { width: 30px; height: 30px; flex-shrink: 0; }

  .nav-r { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    font-size: .86rem; font-weight: 500; color: var(--muted);
    text-decoration: none; padding: 8px 14px; border-radius: 8px;
    transition: color .2s, background .2s;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  
  .nav-gh {
    display: flex; align-items: center; gap: 6px;
    font-size: .86rem; font-weight: 500; color: var(--muted);
    text-decoration: none; padding: 8px 14px; border-radius: 8px;
    transition: color .2s, background .2s;
  }
  .nav-gh:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .nav-gh svg { width: 15px; height: 15px; fill: currentColor; }
  
  .nav-cta-btn {
    background: var(--teal); color: #000;
    padding: 9px 22px; border-radius: 100px;
    font-size: .86rem; font-weight: 700; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: opacity .2s, transform .2s;
    box-shadow: 0 0 28px rgba(15,204,180,0.28);
  }
  .nav-cta-btn:hover { opacity: .85; transform: translateY(-1px); }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 160px 24px 80px;
    text-align: center; position: relative; overflow: hidden;
  }

  .hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 75%);
  }

  .glow { position: absolute; pointer-events: none; border-radius: 50%; filter: blur(90px); }
  .g1 { width: 600px; height: 600px; top: -150px; left: -100px; background: rgba(15,204,180,0.08); animation: drift 16s ease-in-out infinite; }
  .g2 { width: 450px; height: 450px; bottom: -60px; right: -80px; background: rgba(245,166,35,0.05); animation: drift 20s ease-in-out infinite reverse; }

  @keyframes drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-35px)} }

  .hero-inner { position: relative; z-index: 1; max-width: 820px; width: 100%; }

  h1 {
    font-size: clamp(3rem, 7.5vw, 5.8rem);
    font-weight: 900; line-height: .96;
    letter-spacing: -.05em; margin-bottom: 28px;
    animation: rise .6s cubic-bezier(.22,1,.36,1) .07s both;
  }
  .h1-accent {
    display: block;
    background: linear-gradient(118deg, #0fccb4 0%, #3dd8c8 45%, #f5a623 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .hero-sub {
    font-size: clamp(1rem, 2.2vw, 1.12rem);
    color: var(--muted); line-height: 1.8; max-width: 480px;
    margin: 0 auto 52px;
    animation: rise .6s cubic-bezier(.22,1,.36,1) .14s both;
  }

  .hero-cta {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 80px;
    animation: rise .6s cubic-bezier(.22,1,.36,1) .21s both;
  }
  .btn-primary {
    background: var(--teal); color: #050e14; border: none;
    padding: 14px 34px; border-radius: 100px;
    font-size: .95rem; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 9px;
    box-shadow: 0 0 40px rgba(15,204,180,0.32);
    transition: opacity .2s, transform .2s, box-shadow .2s;
  }
  .btn-primary:hover { opacity: .87; transform: translateY(-2px); box-shadow: 0 10px 44px rgba(15,204,180,.44); }
  .btn-primary svg { width: 14px; height: 14px; fill: #050e14; }
  
  .btn-ghost {
    background: rgba(255,255,255,.04); color: var(--muted);
    border: 1px solid var(--line-md);
    padding: 14px 28px; border-radius: 100px;
    font-size: .95rem; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; transition: all .2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,.22); color: var(--text); }
  .btn-ghost svg { width: 16px; height: 16px; fill: currentColor; }

  @keyframes rise { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

  /* ─── DESKTOP MOCKUP ─── */
  .browser-mockup {
    position: relative; z-index: 1;
    animation: rise .7s cubic-bezier(.22,1,.36,1) .28s both;
    display: flex; justify-content: center;
    width: min(980px, 100%);
    margin: 0 auto;
  }
  .browser-mockup::before {
    content: ''; position: absolute; inset: -1px; border-radius: 21px;
    background: linear-gradient(135deg, rgba(15,204,180,.45) 0%, rgba(245,166,35,.25) 50%, transparent 70%);
    pointer-events: none;
  }
  .browser {
    background: var(--bg1); border-radius: 20px;
    border: 1px solid var(--line); overflow: hidden;
    box-shadow: 0 60px 120px rgba(0,0,0,.75);
    width: 100%;
  }
  .browser-bar {
    display: flex; align-items: center; gap: 0; padding: 13px 18px;
    background: rgba(255,255,255,.02); border-bottom: 1px solid var(--line);
  }
  .win-dots { display: flex; gap: 6px; margin-right: 14px; }
  .wd { width: 11px; height: 11px; border-radius: 50%; }
  .urlbar { flex: 1; display: flex; justify-content: center; }
  .urlbar-inner {
    background: rgba(255,255,255,.04); border: 1px solid var(--line);
    border-radius: 8px; padding: 5px 14px;
    font-size: .78rem; color: var(--muted);
    display: flex; align-items: center; gap: 6px;
  }
  .urlbar-inner svg { width: 10px; height: 10px; opacity: .5; }
  .browser-body { display: grid; grid-template-columns: 1fr 290px; }

  .phone-mockup { display: none; }

  /* video pane */
  .vpane {
    aspect-ratio: 16/9; background: #03050d;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .vpane-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 0;
  }
  .vbg {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(170deg, rgba(4,12,25,.5) 0%, rgba(7,18,35,.4) 55%, rgba(3,9,18,.55) 100%);
  }
  .play-btn {
    position: relative; z-index: 2;
    width: 66px; height: 66px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--amber));
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 50px rgba(15,204,180,.38);
    transition: transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .play-btn::before {
    content: ''; position: absolute; inset: -4px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--amber));
    opacity: .22; animation: ripple 2.8s ease-in-out infinite;
  }
  @keyframes ripple { 0%,100%{transform:scale(1);opacity:.22} 50%{transform:scale(1.35);opacity:0} }
  .play-btn:hover { transform: scale(1.1); }
  .play-btn svg { width: 24px; height: 24px; fill: #fff; margin-left: 4px; }

  .movie-label {
    position: absolute; z-index: 2; bottom: 40px;
    font-size: .82rem; font-weight: 500; color: rgba(255,255,255,.5);
  }
  .viewers {
    position: absolute; z-index: 2; top: 14px; left: 16px;
    display: flex; align-items: center;
  }
  .vav {
    width: 26px; height: 26px; border-radius: 50%;
    border: 2px solid var(--bg1);
    display: flex; align-items: center; justify-content: center;
    font-size: .62rem; font-weight: 700; color: #fff;
    margin-left: -7px;
  }
  .vav:first-child { margin-left: 0; }
  .vcount {
    margin-left: 8px;
    background: rgba(0,0,0,.65); border: 1px solid var(--line-md);
    border-radius: 100px; padding: 3px 10px;
    font-size: .72rem; color: var(--muted);
    backdrop-filter: blur(10px);
  }
  .scrubber { position: absolute; bottom: 0; left: 0; right: 0; }
  .scrub-track { height: 3px; background: rgba(255,255,255,.07); }
  .scrub-fill {
    height: 100%; width: 38%;
    background: linear-gradient(90deg, var(--teal), var(--amber));
  }
  .scrub-head {
    position: absolute; top: -4px; left: 38%; transform: translateX(-50%);
    width: 11px; height: 11px; border-radius: 50%; background: #fff;
    box-shadow: 0 0 10px rgba(15,204,180,.8);
  }
  .rxns {
    position: absolute; z-index: 2; right: 14px; bottom: 26px;
    display: flex; flex-direction: column; gap: 6px; pointer-events: none;
  }
  .rxn {
    background: rgba(7,12,18,.82); border: 1px solid var(--line-md);
    border-radius: 100px; padding: 5px 12px;
    font-size: .78rem; color: var(--text); backdrop-filter: blur(12px);
    animation: rxnfloat 3.8s ease infinite;
  }
  .rxn:nth-child(2){ animation-delay:1.3s; }
  .rxn:nth-child(3){ animation-delay:2.6s; }
  @keyframes rxnfloat { 0%{opacity:0;transform:translateY(10px)} 12%{opacity:1} 82%{opacity:1} 100%{opacity:0;transform:translateY(-40px)} }

  /* chat panel */
  .chat {
    display: flex; flex-direction: column;
    background: var(--bg2); border-left: 1px solid var(--line);
  }
  .chat-head {
    padding: 13px 17px; border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between;
  }
  .chat-title { font-size: .75rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
  .online-badge {
    display: flex; align-items: center; gap: 5px;
    background: rgba(15,204,180,.08); border: 1px solid rgba(15,204,180,.2);
    border-radius: 100px; padding: 3px 10px;
    font-size: .7rem; font-weight: 600; color: var(--teal);
  }
  .ob-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); animation: blink 2s infinite; }
  .msgs { flex: 1; padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
  .msg { display: flex; gap: 10px; align-items: flex-start; }
  .av {
    width: 27px; height: 27px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: .65rem; font-weight: 700; color: #fff;
  }
  .mc { flex: 1; min-width: 0; }
  .mn { font-size: .75rem; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .mt { font-size: .8rem; color: var(--muted); line-height: 1.45; text-align: left; }
  .sk { background: var(--bg3); border-radius: 6px; position: relative; overflow: hidden; }
  .sk::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent); animation:shimmer 2s infinite; }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  .sk-av { width:27px; height:27px; border-radius:8px; flex-shrink:0; }
  .sk-ln { height:9px; border-radius:4px; margin-bottom:5px; }
  .chat-input {
    padding: 11px; border-top: 1px solid var(--line);
    display: flex; gap: 8px;
  }
  .chat-input input {
    flex: 1; background: var(--bg3); border: 1px solid var(--line);
    border-radius: 9px; padding: 8px 13px;
    font-size: .8rem; color: var(--text); outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color .2s;
  }
  .chat-input input::placeholder { color: var(--faint); }
  .chat-input input:focus { border-color: rgba(15,204,180,.35); }
  .send {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: var(--teal); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: opacity .2s;
  }
  .send:hover { opacity: .84; }
  .send svg { width: 14px; height: 14px; fill: #050e14; }

  /* ─── STRIP ─── */
  .strip {
    display: grid; grid-template-columns: repeat(4,1fr);
    background: var(--bg1);
    border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  }
  .stat {
    padding: 30px 36px;
    border-right: 1px solid var(--line);
    display: flex; flex-direction: column; gap: 6px;
    transition: background .2s;
  }
  .stat:last-child { border-right: none; }
  .stat:hover { background: rgba(255,255,255,.015); }
  .stat-n { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:800; letter-spacing:-.04em; color:var(--text); }
  .stat-n span { color: var(--teal); }
  .stat-l { font-size:.83rem; color:var(--muted); line-height:1.4; }

  /* ─── FEATURES ─── */
  .section { padding: 120px 60px; }
  .section-inner { max-width: 1140px; margin: 0 auto; }
  .tag {
    display: inline-block; font-size:.73rem; font-weight:600;
    letter-spacing:.1em; text-transform:uppercase;
    color: var(--teal); margin-bottom:16px;
  }
  .section-h { font-size:clamp(2rem,4.2vw,3rem); font-weight:800; letter-spacing:-.035em; line-height:1.08; margin-bottom:16px; }
  .section-sub { font-size:1.02rem; color:var(--muted); line-height:1.75; max-width:480px; }

  .feat-mosaic {
    display: grid; grid-template-columns: repeat(6,1fr);
    gap: 2px; margin-top: 60px;
    background: var(--line); border-radius: 20px;
    border: 1px solid var(--line); overflow: hidden;
  }
  .feat-card {
    background: var(--bg1); padding: 36px 32px;
    transition: background .25s; cursor: default;
  }
  .feat-card:hover { background: var(--bg2); }
  .fc-1 { grid-column:span 3; }
  .fc-2 { grid-column:span 3; }
  .fc-3 { grid-column:span 2; }
  .fc-4 { grid-column:span 2; }
  .fc-5 { grid-column:span 2; }
  .fc-6 { grid-column:span 6; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:40px; }

  .feat-icon {
    width:44px; height:44px; border-radius:12px;
    border: 1px solid var(--line-md);
    display:flex; align-items:center; justify-content:center;
    margin-bottom:24px;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .25s;
  }
  .feat-card:hover .feat-icon { transform:scale(1.1) rotate(4deg); border-color:rgba(15,204,180,.25); }
  .feat-icon svg { width:20px; height:20px; }
  .feat-card h3 { font-size:1.08rem; font-weight:700; letter-spacing:-.02em; margin-bottom:10px; }
  .feat-card p { font-size:.88rem; color:var(--muted); line-height:1.65; }
  .feat-badge {
    display:inline-block; background:rgba(15,204,180,.1); color:var(--teal);
    border: 1px solid rgba(15,204,180,.22);
    border-radius:100px; padding:4px 14px;
    font-size:.72rem; font-weight:600; letter-spacing:.05em;
    text-transform:uppercase; margin-bottom:16px;
  }
  .fc-6-text h3 { font-size:1.5rem; font-weight:800; letter-spacing:-.03em; margin-bottom:12px; }
  .fc-6-text p { font-size:.92rem; color:var(--muted); line-height:1.7; max-width:360px; }
  .feat-mini-browser {
    background: var(--bg); border-radius:12px;
    border: 1px solid var(--line-md); overflow:hidden;
  }
  .fmb-bar { display:flex; align-items:center; gap:5px; padding:10px 14px; background:rgba(255,255,255,.02); border-bottom:1px solid var(--line); }
  .fmbd { width:8px; height:8px; border-radius:50%; }
  .fmb-body { padding:16px; display:flex; flex-direction:column; gap:10px; }
  .fmb-row { display:flex; align-items:center; gap:10px; }
  .fmb-av { width:24px; height:24px; border-radius:6px; flex-shrink:0; }
  .fmb-lines { flex:1; display:flex; flex-direction:column; gap:4px; }
  .fmb-line { height:8px; border-radius:3px; background:var(--bg3); }
  .fmb-line.lit { background:rgba(15,204,180,.18); }

  /* ─── HOW IT WORKS ─── */
  .how-section {
    background: var(--bg1);
    border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
    padding: 120px 60px;
  }
  .steps { display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:72px; position:relative; }
  .steps::before {
    content:''; position:absolute; top:29px; left:12%; right:12%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(15,204,180,.3) 30%,rgba(15,204,180,.3) 70%,transparent);
  }
  .step { padding:0 32px; text-align:center; }
  .step-num {
    width:58px; height:58px; border-radius:16px;
    background:var(--bg2); border:1px solid var(--line-md);
    display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem;
    color:var(--amber); margin:0 auto 24px; position:relative; z-index:1;
    transition:border-color .25s,box-shadow .25s,transform .25s;
  }
  .step:hover .step-num { border-color:var(--amber); box-shadow:0 0 22px rgba(245,166,35,.16); transform:translateY(-3px); }
  .step h3 { font-size:1.12rem; font-weight:700; margin-bottom:10px; letter-spacing:-.02em; }
  .step p { font-size:.88rem; color:var(--muted); line-height:1.7; }

  /* ─── CTA ─── */
  .cta-section { padding:80px 60px 100px; }
  .cta-box {
    max-width:1140px; margin:0 auto; border-radius:24px;
    background:var(--bg1); border:1px solid var(--line);
    padding:100px 40px; text-align:center;
    position:relative; overflow:hidden;
  }
  .cta-box::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse 50% 70% at 50% -5%,rgba(15,204,180,.1),transparent),
      radial-gradient(ellipse 30% 40% at 85% 100%,rgba(245,166,35,.06),transparent);
    pointer-events:none;
  }
  .cta-box::after {
    content:''; position:absolute; inset:0;
    background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
    background-size:44px 44px;
    mask-image:radial-gradient(ellipse 75% 80% at 50% 50%,black 25%,transparent 80%);
    -webkit-mask-image:radial-gradient(ellipse 75% 80% at 50% 50%,black 25%,transparent 80%);
    pointer-events:none;
  }
  .cta-box h2 { font-size:clamp(2rem,5vw,3.6rem); font-weight:900; letter-spacing:-.04em; margin-bottom:18px; position:relative; z-index:1; }
  .cta-box p { color:var(--muted); font-size:1.05rem; line-height:1.7; max-width:440px; margin:0 auto 44px; position:relative; z-index:1; }
  .cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
  .btn-cta {
    background:var(--text); color:var(--bg); border:none;
    padding:14px 36px; border-radius:100px;
    font-size:.95rem; font-weight:700; cursor:pointer;
    font-family:'DM Sans',sans-serif; transition:opacity .2s,transform .2s;
    display:flex; align-items:center; gap:8px;
  }
  .btn-cta:hover { opacity:.88; transform:translateY(-2px); }
  .btn-cta svg { width:14px; height:14px; fill:var(--bg); }
  .btn-cta-ghost {
    background:transparent; color:var(--muted);
    border:1px solid var(--line-md); padding:14px 30px;
    border-radius:100px; font-size:.95rem; font-weight:500;
    cursor:pointer; font-family:'DM Sans',sans-serif;
    display:flex; align-items:center; gap:8px;
    text-decoration:none; transition:all .2s;
  }
  .btn-cta-ghost:hover { border-color:rgba(255,255,255,.22); color:var(--text); }
  .btn-cta-ghost svg { width:16px; height:16px; fill:currentColor; }

  /* ─── FOOTER ─── */
  footer { border-top:1px solid var(--line); padding:60px 60px 36px; background:var(--bg); }
  .footer-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:52px; }
  .footer-about p { font-size:.87rem; color:var(--muted); margin-top:12px; max-width:230px; line-height:1.65; }
  .footer-cols { display:flex; gap:72px; }
  .footer-col h4 { font-size:.75rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:18px; }
  .footer-col a { display:block; font-size:.87rem; color:var(--faint); text-decoration:none; margin-bottom:10px; transition:color .2s; }
  .footer-col a:hover { color:var(--teal); }
  .footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:28px; border-top:1px solid var(--line); }
  .footer-copy { font-size:.82rem; color:var(--faint); }
  .socials { display:flex; gap:8px; }
  .soc {
    width:34px; height:34px; border-radius:9px;
    border:1px solid var(--line); background:transparent;
    display:flex; align-items:center; justify-content:center;
    color:var(--faint); text-decoration:none; transition:all .2s;
  }
  .soc:hover { border-color:var(--line-md); color:var(--text); background:rgba(255,255,255,.03); }
  .soc svg { width:15px; height:15px; fill:currentColor; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .feat-mosaic { grid-template-columns:repeat(2,1fr); }
    .fc-1,.fc-2,.fc-3,.fc-4,.fc-5 { grid-column:span 1; }
    .fc-6 { grid-column:span 2; }
    .browser-body { grid-template-columns:1fr; }
    .chat { border-left:none; border-top:1px solid var(--line); max-height:300px; }
    .rxns { display:none; }
  }

  @media (max-width: 900px) {
    nav { padding:14px 24px; }
    nav.stuck { padding:10px 24px; }
    .nav-link, .nav-gh { display:none; }
    .section, .how-section, .cta-section { padding:80px 24px; }
    .strip { grid-template-columns:repeat(2,1fr); }
    .stat:nth-child(2){ border-right:none; }
    .stat:nth-child(3){ border-top:1px solid var(--line); }
    .steps { grid-template-columns:1fr; gap:40px; }
    .steps::before { display:none; }
    .footer-top { flex-direction:column; gap:40px; }
    .footer-cols { flex-wrap:wrap; gap:40px; }
    .footer-bottom { flex-direction:column; gap:16px; text-align:center; }
    .fc-6 { grid-template-columns:1fr; }
  }

  /* ─── MOBILE: PHONE MOCKUP ─── */
  @media (max-width: 700px) {
    nav { padding:12px 16px; }
    .hero { padding:120px 16px 60px; }
    .hero-cta { flex-direction:column; align-items:center; }
    .btn-primary, .btn-ghost { width:100%; max-width:280px; justify-content:center; }

    .browser-mockup { display:none; }
    .phone-mockup { display: flex; justify-content: center; margin-top: 0; }

    .phone-shell {
      position: relative;
      width: 300px;
      background: #0a0e18;
      border-radius: 44px;
      border: 2px solid rgba(255,255,255,0.12);
      box-shadow:
        0 0 0 1px rgba(0,0,0,.6),
        0 0 60px rgba(15,204,180,.15),
        0 50px 100px rgba(0,0,0,.8),
        inset 0 1px 0 rgba(255,255,255,.08);
      padding: 14px 10px 10px;
      overflow: hidden;
    }

    .phone-notch {
      width: 90px; height: 24px; margin: 0 auto 10px;
      background: #0a0e18; border-radius: 0 0 18px 18px;
      border: 2px solid rgba(255,255,255,.1);
      border-top: none;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      position: relative; z-index: 5;
    }
    .notch-cam { width:8px; height:8px; border-radius:50%; background:#1a2035; border:1px solid rgba(255,255,255,.1); }
    .notch-light { width:16px; height:4px; border-radius:2px; background:#1a2035; }

    .phone-shell::before {
      content:'';
      position:absolute; left:-3px; top:80px;
      width:3px; height:30px; border-radius:2px 0 0 2px;
      background:rgba(255,255,255,.08);
      box-shadow:0 40px 0 rgba(255,255,255,.08);
    }
    .phone-shell::after {
      content:'';
      position:absolute; right:-3px; top:100px;
      width:3px; height:50px; border-radius:0 2px 2px 0;
      background:rgba(255,255,255,.08);
    }

    .phone-screen {
      border-radius: 32px; overflow: hidden;
      background: var(--bg);
      border: 1px solid rgba(255,255,255,.06);
    }

    .p-header {
      background: var(--bg1); padding: 10px 14px;
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--line);
    }
    .p-logo { font-family:'Syne',sans-serif; font-size:.78rem; font-weight:800; color:var(--teal); }
    .p-badge {
      font-size:.6rem; background:rgba(15,204,180,.1);
      border:1px solid rgba(15,204,180,.2); color:var(--teal);
      border-radius:100px; padding:2px 8px; font-weight:600;
      display:flex; align-items:center; gap:4px;
    }
    .p-badge-dot { width:4px; height:4px; border-radius:50%; background:var(--teal); animation:blink 2s infinite; }

    .p-video {
      position:relative; background:#03050d; overflow:hidden;
      aspect-ratio: 16/9;
    }
    .p-video img { width:100%; height:100%; object-fit:cover; display:block; }
    .p-video-overlay {
      position:absolute; inset:0;
      background:linear-gradient(170deg,rgba(4,12,25,.5),rgba(4,12,25,.3));
      display:flex; align-items:center; justify-content:center;
    }
    .p-play {
      width:42px; height:42px; border-radius:50%;
      background:linear-gradient(135deg,var(--teal),var(--amber));
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 0 30px rgba(15,204,180,.4);
    }
    .p-play svg { width:16px; height:16px; fill:#fff; margin-left:3px; }
    .p-watchers {
      position:absolute; top:8px; left:10px;
      display:flex; align-items:center; gap:4px;
      background:rgba(0,0,0,.65); border:1px solid var(--line-md);
      border-radius:100px; padding:3px 8px;
      font-size:.62rem; color:var(--muted); backdrop-filter:blur(8px);
    }
    .p-wdot { width:5px; height:5px; border-radius:50%; background:var(--teal); animation:blink 2s infinite; }
    .p-progress {
      position:absolute; bottom:0; left:0; right:0; height:3px;
      background:rgba(255,255,255,.07);
    }
    .p-progress-fill {
      width:38%; height:100%;
      background:linear-gradient(90deg,var(--teal),var(--amber));
    }
    .p-label {
      position:absolute; bottom:10px; left:50%; transform:translateX(-50%);
      font-size:.65rem; color:rgba(255,255,255,.45); white-space:nowrap;
    }

    .p-chat { padding:10px 12px; background:var(--bg2); }
    .p-chat-head {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:8px;
    }
    .p-chat-label { font-size:.62rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; }
    .p-chat-online {
      font-size:.6rem; color:var(--teal); font-weight:600;
      background:rgba(15,204,180,.08); border:1px solid rgba(15,204,180,.18);
      border-radius:100px; padding:2px 7px;
      display:flex; align-items:center; gap:3px;
    }
    .p-msgs { display:flex; flex-direction:column; gap:8px; }
    .p-msg { display:flex; gap:7px; align-items:flex-start; }
    .p-av {
      width:20px; height:20px; border-radius:6px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-size:.55rem; font-weight:700; color:#fff;
    }
    .p-mc { flex:1; }
    .p-name { font-size:.6rem; font-weight:600; color:var(--text); margin-bottom:2px; }
    .p-text { font-size:.65rem; color:var(--muted); line-height:1.4; }

    .p-input {
      display:flex; gap:6px; margin-top:8px; padding-top:8px;
      border-top:1px solid var(--line);
    }
    .p-input input {
      flex:1; background:var(--bg3); border:1px solid var(--line);
      border-radius:8px; padding:6px 10px;
      font-size:.65rem; color:var(--text); outline:none;
      font-family:'DM Sans',sans-serif;
    }
    .p-input input::placeholder { color:var(--faint); }
    .p-send {
      width:26px; height:26px; border-radius:7px; flex-shrink:0;
      background:var(--teal); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    }
    .p-send svg { width:11px; height:11px; fill:#050e14; }

    .phone-bar {
      height:20px; display:flex; align-items:center; justify-content:center;
      margin-top:6px;
    }
    .home-bar { width:80px; height:4px; border-radius:2px; background:rgba(255,255,255,.2); }

    .strip { grid-template-columns:1fr; }
    .stat { border-right:none; border-bottom:1px solid var(--line); }
    .stat:last-child { border-bottom:none; }
    .section,.how-section,.cta-section { padding:60px 16px; }
    .feat-mosaic { grid-template-columns:1fr; }
    .fc-1,.fc-2,.fc-3,.fc-4,.fc-5,.fc-6 { grid-column:span 1; }
    .cta-btns { flex-direction:column; align-items:center; }
    .btn-cta,.btn-cta-ghost { width:100%; max-width:260px; justify-content:center; }
    footer { padding:48px 16px 28px; }
    .footer-cols { flex-direction:column; gap:32px; }
  }
</style>