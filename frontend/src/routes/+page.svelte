<script>
  import { onMount } from 'svelte';

  let navStuck = false;

  onMount(() => {
    const handleScroll = () => {
      navStuck = window.scrollY > 30;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleCreate() {
    const id = Math.random().toString(36).slice(2, 8);
    alert('Room created!\nLink: watchtogether.app/room/' + id);
  }
</script>

<!-- NAV -->
<nav id="nav" class:stuck={navStuck}>
  <a href="#" class="brand">
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="#7c6fff"/>
      <polygon points="106,46 180,85 106,124" fill="#2dd4bf"/>
      <circle cx="90" cy="85" r="10" fill="#edf0f8"/>
    </svg>
    WatchTogether
  </a>
  <div class="nav-r">
    <a href="#features" class="nav-link">Features</a>
    <a href="#how" class="nav-link">How it works</a>
    <a href="https://github.com/mr28Verma/watchtogether" target="_blank" class="nav-gh">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      GitHub
    </a>
    <a href="#" class="nav-cta">Launch App</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-dots"></div>
  <div class="glow g1"></div>
  <div class="glow g2"></div>

  <div class="hero-inner">
    <div class="eyebrow">
      <div class="eyebrow-dot"></div>
      Open-source · WebRTC · Zero signup
    </div>

    <h1>
      Watch anything<br />
      <span class="h1-accent">together, in sync.</span>
    </h1>

    <p class="hero-sub">
      Create a room in seconds. Share the link. Stream YouTube, local files, or a shared browser — everyone stays perfectly synced in real time.
    </p>

    <div class="hero-cta">
      <button class="btn-primary" on:click={handleCreate}>
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Create a Room
      </button>
      <a href="https://github.com/mr28Verma/watchtogether" target="_blank" class="btn-ghost">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
        View on GitHub
      </a>
    </div>

    <!-- BROWSER MOCKUP -->
    <div class="mockup-outer">
      <div class="browser">
        <div class="browser-bar">
          <div class="win-dots">
            <div class="wd" style="background:#ef4444;"></div>
            <div class="wd" style="background:#f59e0b;"></div>
            <div class="wd" style="background:#22c55e;"></div>
          </div>
          <div class="urlbar">
            <div class="urlbar-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              watchtogether.app/room/movie-night
            </div>
          </div>
          <div style="width:72px;"></div>
        </div>
        <div class="browser-body">
          <!-- VIDEO -->
          <div class="vpane">
            <div class="vbg"></div>
            <img
              src="https://www.hollywoodreporter.com/wp-content/uploads/2014/10/interstellar_a_0.jpg?w=1440&h=810&crop=1"
              alt="Now playing"
              class="vpane-img"
            />
            <div class="play-btn">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div class="movie-label">Interstellar (2014) — 4K HDR</div>
            <div class="viewers">
              <div class="vav" style="background:#7c6fff;">A</div>
              <div class="vav" style="background:#a855f7;">S</div>
              <div class="vav" style="background:#f59e0b;">M</div>
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
          <!-- CHAT -->
          <div class="chat">
            <div class="chat-head">
              <span class="chat-title">Live Chat</span>
              <div class="online-badge"><div class="ob-dot"></div>8 online</div>
            </div>
            <div class="msgs">
              <div class="msg">
                <div class="av" style="background:#7c6fff;">A</div>
                <div class="mc">
                  <div class="mn">Alex</div>
                  <div class="mt">This part always gets me</div>
                </div>
              </div>
              <div class="msg">
                <div class="av" style="background:#a855f7;">S</div>
                <div class="mc">
                  <div class="mn">Sophie</div>
                  <div class="mt">Nolan is an absolute genius</div>
                </div>
              </div>
              <div class="msg">
                <div class="sk sk-av"></div>
                <div class="mc">
                  <div class="sk sk-ln" style="width:38%;"></div>
                  <div class="sk sk-ln" style="width:65%;"></div>
                </div>
              </div>
              <div class="msg">
                <div class="av" style="background:#f59e0b;">M</div>
                <div class="mc">
                  <div class="mn">Max</div>
                  <div class="mt">pause! we'll wait haha</div>
                </div>
              </div>
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Say something…" />
              <button class="send">
                <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STRIP -->
<div class="strip">
  <div class="stat">
    <div class="stat-n">&lt;<span>5</span>ms</div>
    <div class="stat-l">Sync delay across all viewers</div>
  </div>
  <div class="stat">
    <div class="stat-n">E2E</div>
    <div class="stat-l">End-to-end encrypted rooms</div>
  </div>
  <div class="stat">
    <div class="stat-n">0</div>
    <div class="stat-l">Downloads or extensions needed</div>
  </div>
  <div class="stat">
    <div class="stat-n">Free</div>
    <div class="stat-l">No paywalls, ever</div>
  </div>
</div>

<!-- FEATURES -->
<section class="section" id="features">
  <div class="section-inner">
    <span class="tag">Features</span>
    <h2 class="section-h">Everything for the perfect<br />watch night</h2>
    <p class="section-sub">No sign-ups, no extensions. Seamless sync straight from your browser.</p>

    <div class="feat-mosaic">
      <div class="feat-card fc-1">
        <div class="feat-icon" style="background:rgba(124,111,255,0.1);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#7c6fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
            <polyline points="13 2 13 9 20 9"/>
          </svg>
        </div>
        <h3>Instant Room Setup</h3>
        <p>One click generates a unique room link. Friends join from any phone, tablet, or laptop — no friction, no accounts.</p>
      </div>

      <div class="feat-card fc-2">
        <div class="feat-icon" style="background:rgba(45,212,191,0.1);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 2 13 9 20 9"/>
            <polygon points="23 7 16 12 23 17 23 7"/>
            <path d="M2 2l20 20"/>
          </svg>
        </div>
        <h3>Flawless Sync</h3>
        <p>Play, pause, seek — every action is instantly mirrored across all viewers. Nobody gets left behind or accidentally spoiled.</p>
      </div>

      <div class="feat-card fc-3">
        <div class="feat-icon" style="background:rgba(168,85,247,0.1);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <h3>Live Chat</h3>
        <p>Real-time messages and reactions as the story unfolds.</p>
      </div>

      <div class="feat-card fc-4">
        <div class="feat-icon" style="background:rgba(251,191,36,0.1);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        <h3>Cloud Browser</h3>
        <p>Stream Netflix, Hulu, Disney+ via a virtual cloud session.</p>
      </div>

      <div class="feat-card fc-5">
        <div class="feat-icon" style="background:rgba(239,68,68,0.1);">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.41a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
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
            <div class="fmb-row">
              <div class="fmb-av" style="background:#7c6fff;"></div>
              <div class="fmb-lines">
                <div class="fmb-line" style="width:55%;"></div>
                <div class="fmb-line lit" style="width:80%;"></div>
              </div>
            </div>
            <div class="fmb-row">
              <div class="fmb-av" style="background:#a855f7;"></div>
              <div class="fmb-lines">
                <div class="fmb-line" style="width:40%;"></div>
                <div class="fmb-line" style="width:65%;"></div>
              </div>
            </div>
            <div class="fmb-row">
              <div class="fmb-av sk" style="width:24px;height:24px;border-radius:6px;flex-shrink:0;"></div>
              <div class="fmb-lines">
                <div class="fmb-line sk" style="width:45%;"></div>
                <div class="fmb-line sk" style="width:70%;"></div>
              </div>
            </div>
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
    <h2 class="section-h">Up and watching in<br />three steps</h2>
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
    <h2>Your next watch night<br />starts right now.</h2>
    <p>No credit cards, no logins, no paywalls. Launch a secure room and start watching in under 5 seconds.</p>
    <div class="cta-btns">
      <button class="btn-cta" on:click={handleCreate}>
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Create a Free Room
      </button>
      <a href="https://github.com/mr28Verma/watchtogether" target="_blank" class="btn-cta-ghost">
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
      <a href="#" class="brand">
        <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z" fill="#7c6fff"/>
          <polygon points="106,46 180,85 106,124" fill="#2dd4bf"/>
          <circle cx="90" cy="85" r="10" fill="#edf0f8"/>
        </svg>
        WatchTogether
      </a>
      <p>Watch anything with anyone, perfectly in sync. Free, open-source, forever.</p>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">How it works</a>
        <a href="#">Changelog</a>
      </div>
      <div class="footer-col">
        <h4>Developer</h4>
        <a href="https://github.com/mr28Verma/watchtogether" target="_blank">Repository</a>
        <a href="https://github.com/mr28Verma" target="_blank">GitHub Profile</a>
        <a href="#">Documentation</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2026 WatchTogether. All rights reserved.</span>
    <div class="socials">
      <a class="soc" href="https://github.com/mr28Verma/watchtogether" target="_blank" title="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a class="soc" href="https://www.linkedin.com/in/saksham-verma-9275b631b/" target="_blank" title="LinkedIn" style="font-size:0.78rem;font-weight:700;font-family:'Cabinet Grotesk',sans-serif;">in</a>
    </div>
  </div>
</footer>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :global(:root) {
    --ink:      #09090f;
    --ink-1:    #0f1020;
    --ink-2:    #161829;
    --ink-3:    #1e2138;
    --violet:   #7c6fff;
    --violet-d: #5b4fe8;
    --violet-g: rgba(124,111,255,0.18);
    --aqua:     #2dd4bf;
    --aqua-g:   rgba(45,212,191,0.12);
    --text:     #edf0f8;
    --muted:    #7880a0;
    --faint:    #3a3f60;
    --line:     rgba(255,255,255,0.07);
    --line-md:  rgba(255,255,255,0.12);
  }

  :global(html) { scroll-behavior: smooth; }
  :global(body) {
    font-family: 'Instrument Sans', sans-serif;
    background: var(--ink);
    color: var(--text);
    overflow-x: hidden;
  }
  :global(h1), :global(h2), :global(h3), .brand { font-family: 'Cabinet Grotesk', sans-serif; }

  /* grain overlay */
  :global(body)::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E");
  }

  /* ─── NAV ─── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(9,9,15,0.55);
    backdrop-filter: blur(22px);
    border-bottom: 1px solid var(--line);
    transition: padding 0.3s ease, background 0.3s ease;
  }
  nav.stuck { padding: 12px 60px; background: rgba(9,9,15,0.88); }

  .brand {
    display: flex; align-items: center; gap: 10px;
    font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em;
    color: var(--text); text-decoration: none;
  }
  .brand svg { width: 28px; height: 28px; flex-shrink: 0; }

  .nav-r { display: flex; align-items: center; gap: 6px; }
  .nav-link {
    font-size: 0.87rem; font-weight: 500; color: var(--muted);
    text-decoration: none; padding: 8px 14px; border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .nav-gh {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.87rem; font-weight: 500; color: var(--muted);
    text-decoration: none; padding: 8px 14px; border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-gh:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .nav-cta {
    background: var(--violet); color: #fff;
    padding: 9px 22px; border-radius: 100px;
    font-size: 0.87rem; font-weight: 600; text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 0 28px rgba(124,111,255,0.32);
  }
  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 160px 24px 80px;
    text-align: center;
    position: relative; overflow: hidden;
  }

  .hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(124,111,255,0.16) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: radial-gradient(ellipse 80% 65% at 50% 40%, black 15%, transparent 80%);
  }

  .glow {
    position: absolute; pointer-events: none; border-radius: 50%;
    filter: blur(90px);
  }
  .g1 { width: 700px; height: 700px; top: -200px; left: -150px; background: rgba(124,111,255,0.11); animation: drift 14s ease-in-out infinite; }
  .g2 { width: 500px; height: 500px; bottom: -80px; right: -100px; background: rgba(45,212,191,0.07); animation: drift 18s ease-in-out infinite reverse; }

  @keyframes drift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }

  .hero-inner { position: relative; z-index: 1; max-width: 840px; }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(45,212,191,0.25);
    background: rgba(45,212,191,0.06);
    border-radius: 100px; padding: 6px 16px 6px 10px;
    font-size: 0.75rem; font-weight: 600; color: #5eead4;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 36px;
    animation: rise 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }
  .eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--aqua);
    animation: blink 2.2s ease infinite;
  }
  @keyframes blink {
    0%,100%{ opacity:1; box-shadow:0 0 0 0 rgba(45,212,191,0.6) }
    50%{ opacity:0.4; box-shadow:0 0 0 5px rgba(45,212,191,0) }
  }

  h1 {
    font-size: clamp(3rem, 7.5vw, 6rem);
    font-weight: 900; line-height: 0.96;
    letter-spacing: -0.05em;
    margin-bottom: 28px;
    animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.07s both;
  }
  .h1-accent {
    display: block;
    background: linear-gradient(115deg, #a78bfa 0%, var(--violet) 35%, var(--aqua) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .hero-sub {
    font-size: clamp(1rem, 2.4vw, 1.15rem);
    color: var(--muted); line-height: 1.75;
    max-width: 500px; margin: 0 auto 52px;
    animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.14s both;
  }

  .hero-cta {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 80px;
    animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.21s both;
  }

  .btn-primary {
    background: var(--violet); color: #fff; border: none;
    padding: 14px 34px; border-radius: 100px;
    font-size: 0.95rem; font-weight: 600;
    cursor: pointer; font-family: 'Instrument Sans', sans-serif;
    display: flex; align-items: center; gap: 9px;
    box-shadow: 0 0 40px rgba(124,111,255,0.38);
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { opacity: 0.87; transform: translateY(-2px); box-shadow: 0 10px 44px rgba(124,111,255,0.48); }
  .btn-primary svg { width: 14px; height: 14px; fill: #fff; }

  .btn-ghost {
    background: rgba(255,255,255,0.04); color: var(--muted);
    border: 1px solid var(--line-md);
    padding: 14px 28px; border-radius: 100px;
    font-size: 0.95rem; font-weight: 500;
    cursor: pointer; font-family: 'Instrument Sans', sans-serif;
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.22); color: var(--text); background: rgba(255,255,255,0.06); }
  .btn-ghost svg { width: 16px; height: 16px; fill: currentColor; }

  @keyframes rise { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

  /* ─── BROWSER MOCKUP ─── */
  .mockup-outer {
    position: relative; z-index: 1;
    width: min(980px, 100%);
    animation: rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both;
  }
  .mockup-outer::before {
    content: ''; position: absolute; inset: -1px;
    border-radius: 21px;
    background: linear-gradient(135deg, rgba(124,111,255,0.55) 0%, rgba(45,212,191,0.3) 50%, transparent 70%);
    pointer-events: none;
  }

  .browser {
    position: relative;
    background: var(--ink-1); border-radius: 20px;
    border: 1px solid var(--line); overflow: hidden;
    box-shadow: 0 60px 120px rgba(0,0,0,0.7);
  }

  .browser-bar {
    display: flex; align-items: center; gap: 0;
    padding: 13px 18px;
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid var(--line);
  }
  .win-dots { display: flex; gap: 6px; margin-right: 14px; }
  .wd { width: 11px; height: 11px; border-radius: 50%; }
  .urlbar { flex: 1; display: flex; justify-content: center; }
  .urlbar-inner {
    background: rgba(255,255,255,0.04); border: 1px solid var(--line);
    border-radius: 8px; padding: 5px 14px;
    font-size: 0.78rem; color: var(--faint);
    display: flex; align-items: center; gap: 6px;
  }
  .urlbar-inner svg { width: 10px; height: 10px; opacity: 0.5; }

  .browser-body { display: grid; grid-template-columns: 1fr 290px; }

  .vpane {
    aspect-ratio: 16/9;
    background: #03050d;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .vpane-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .vbg {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(170deg, rgba(6,14,31,0.55) 0%, rgba(11,22,40,0.45) 55%, rgba(4,10,20,0.6) 100%);
  }
  .vbg::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(1px 1px at 18% 24%, rgba(255,255,255,0.5) 0, transparent 100%),
      radial-gradient(1px 1px at 72% 12%, rgba(255,255,255,0.35) 0, transparent 100%),
      radial-gradient(2px 2px at 89% 58%, rgba(255,255,255,0.3) 0, transparent 100%),
      radial-gradient(1px 1px at 44% 76%, rgba(255,255,255,0.25) 0, transparent 100%),
      radial-gradient(1px 1px at 8%  65%, rgba(255,255,255,0.4) 0, transparent 100%),
      radial-gradient(1px 1px at 55% 38%, rgba(255,255,255,0.2) 0, transparent 100%);
  }
  .play-btn {
    position: relative; z-index: 2;
    width: 68px; height: 68px; border-radius: 50%;
    background: linear-gradient(135deg, var(--violet), var(--aqua));
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 50px rgba(124,111,255,0.4);
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .play-btn::before {
    content: ''; position: absolute; inset: -4px; border-radius: 50%;
    background: linear-gradient(135deg, var(--violet), var(--aqua));
    opacity: 0.25; animation: ripple 2.6s ease-in-out infinite;
  }
  @keyframes ripple { 0%,100%{transform:scale(1);opacity:0.25} 50%{transform:scale(1.3);opacity:0} }
  .play-btn:hover { transform: scale(1.1); }
  .play-btn svg { width: 24px; height: 24px; fill: #fff; margin-left: 4px; }

  .movie-label {
    position: absolute; z-index: 2; bottom: 40px;
    font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.55);
  }

  .viewers {
    position: absolute; z-index: 2; top: 14px; left: 16px;
    display: flex; align-items: center;
  }
  .vav {
    width: 26px; height: 26px; border-radius: 50%;
    border: 2px solid var(--ink-1);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.62rem; font-weight: 700; color: #fff;
    margin-left: -7px;
  }
  .vav:first-child { margin-left: 0; }
  .vcount {
    margin-left: 8px;
    background: rgba(0,0,0,0.65); border: 1px solid var(--line-md);
    border-radius: 100px; padding: 3px 10px;
    font-size: 0.72rem; color: var(--muted);
    backdrop-filter: blur(10px);
  }

  .scrubber { position: absolute; bottom: 0; left: 0; right: 0; }
  .scrub-track { height: 3px; background: rgba(255,255,255,0.07); }
  .scrub-fill {
    height: 100%; width: 38%;
    background: linear-gradient(90deg, var(--violet), var(--aqua));
  }
  .scrub-head {
    position: absolute; top: -4px; left: 38%; transform: translateX(-50%);
    width: 11px; height: 11px; border-radius: 50%; background: #fff;
    box-shadow: 0 0 10px rgba(124,111,255,0.8);
  }

  .rxns {
    position: absolute; z-index: 2; right: 14px; bottom: 26px;
    display: flex; flex-direction: column; gap: 6px;
    pointer-events: none;
  }
  .rxn {
    background: rgba(10,11,20,0.8); border: 1px solid var(--line-md);
    border-radius: 100px; padding: 5px 12px;
    font-size: 0.78rem; color: var(--text);
    backdrop-filter: blur(12px);
    animation: rxnfloat 3.8s ease infinite;
  }
  .rxn:nth-child(2) { animation-delay: 1.3s; }
  .rxn:nth-child(3) { animation-delay: 2.6s; }
  @keyframes rxnfloat {
    0%   { opacity:0; transform:translateY(10px); }
    12%  { opacity:1; }
    82%  { opacity:1; }
    100% { opacity:0; transform:translateY(-40px); }
  }

  .chat {
    display: flex; flex-direction: column;
    background: var(--ink-2); border-left: 1px solid var(--line);
  }
  .chat-head {
    padding: 13px 17px; border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between;
  }
  .chat-title { font-size: 0.75rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
  .online-badge {
    display: flex; align-items: center; gap: 5px;
    background: rgba(45,212,191,0.08); border: 1px solid rgba(45,212,191,0.2);
    border-radius: 100px; padding: 3px 10px;
    font-size: 0.7rem; font-weight: 600; color: #5eead4;
  }
  .ob-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--aqua); animation: blink 2s infinite; }

  .msgs { flex: 1; padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
  .msg { display: flex; gap: 10px; align-items: flex-start; }
  .av {
    width: 27px; height: 27px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 700; color: #fff;
  }
  .mc { flex: 1; min-width: 0; }
  .mn { font-size: 0.75rem; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .mt { font-size: 0.8rem; color: var(--muted); line-height: 1.45; text-align: left; }

  .sk { background: var(--ink-3); border-radius: 6px; position: relative; overflow: hidden; }
  .sk::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.045),transparent);
    animation: shimmer 1.9s infinite;
  }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  .sk-av { width: 27px; height: 27px; border-radius: 8px; flex-shrink: 0; }
  .sk-ln { height: 9px; border-radius: 4px; margin-bottom: 5px; }

  .chat-input {
    padding: 11px; border-top: 1px solid var(--line);
    display: flex; gap: 8px;
  }
  .chat-input input {
    flex: 1; background: var(--ink-3); border: 1px solid var(--line);
    border-radius: 9px; padding: 8px 13px;
    font-size: 0.8rem; color: var(--text); outline: none;
    font-family: 'Instrument Sans', sans-serif;
    transition: border-color 0.2s;
  }
  .chat-input input::placeholder { color: var(--faint); }
  .chat-input input:focus { border-color: rgba(124,111,255,0.4); }
  .send {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: var(--violet); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.2s;
  }
  .send:hover { opacity: 0.84; }
  .send svg { width: 14px; height: 14px; fill: #fff; }

  /* ─── STRIP ─── */
  .strip {
    display: grid; grid-template-columns: repeat(4,1fr);
    background: var(--ink-1);
    border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  }
  .stat {
    padding: 30px 36px;
    border-right: 1px solid var(--line);
    display: flex; flex-direction: column; gap: 6px;
    transition: background 0.2s;
  }
  .stat:last-child { border-right: none; }
  .stat:hover { background: rgba(255,255,255,0.015); }
  .stat-n {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 1.6rem; font-weight: 800; letter-spacing: -0.04em;
    color: var(--text);
  }
  .stat-n span { color: var(--violet); }
  .stat-l { font-size: 0.83rem; color: var(--muted); line-height: 1.4; }

  /* ─── SECTION COMMONS ─── */
  .section { padding: 120px 60px; }
  .section-inner { max-width: 1140px; margin: 0 auto; }
  .tag {
    display: inline-block; font-size: 0.73rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--violet); margin-bottom: 16px;
  }
  .section-h {
    font-size: clamp(2rem, 4.2vw, 3rem); font-weight: 800;
    letter-spacing: -0.035em; line-height: 1.08; margin-bottom: 16px;
  }
  .section-sub { font-size: 1.02rem; color: var(--muted); line-height: 1.75; max-width: 480px; }

  /* ─── FEATURES ─── */
  .feat-mosaic {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
    margin-top: 60px;
    background: var(--line);
    border-radius: 20px;
    border: 1px solid var(--line);
    overflow: hidden;
  }
  .feat-card {
    background: var(--ink-1); padding: 36px 32px;
    transition: background 0.25s;
    cursor: default;
  }
  .feat-card:hover { background: var(--ink-2); }

  .fc-1 { grid-column: span 3; }
  .fc-2 { grid-column: span 3; }
  .fc-3 { grid-column: span 2; }
  .fc-4 { grid-column: span 2; }
  .fc-5 { grid-column: span 2; }
  .fc-6 { grid-column: span 6; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px; }

  .feat-icon {
    width: 44px; height: 44px; border-radius: 12px;
    border: 1px solid var(--line-md);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s;
  }
  .feat-card:hover .feat-icon { transform: scale(1.1) rotate(4deg); border-color: var(--violet-g); }
  .feat-icon svg { width: 20px; height: 20px; }

  .feat-card h3 { font-size: 1.08rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 10px; }
  .feat-card p { font-size: 0.88rem; color: var(--muted); line-height: 1.65; }

  .fc-6-text .feat-badge {
    display: inline-block; background: var(--violet-g); color: #a78bfa;
    border: 1px solid rgba(124,111,255,0.25);
    border-radius: 100px; padding: 4px 14px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em;
    text-transform: uppercase; margin-bottom: 16px;
  }
  .fc-6-text h3 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 12px; }
  .fc-6-text p { font-size: 0.92rem; color: var(--muted); line-height: 1.7; max-width: 360px; }

  .feat-mini-browser {
    background: var(--ink); border-radius: 12px;
    border: 1px solid var(--line-md); overflow: hidden;
  }
  .fmb-bar {
    display: flex; align-items: center; gap: 5px; padding: 10px 14px;
    background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--line);
  }
  .fmbd { width: 8px; height: 8px; border-radius: 50%; }
  .fmb-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
  .fmb-row { display: flex; align-items: center; gap: 10px; }
  .fmb-av { width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0; }
  .fmb-lines { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .fmb-line { height: 8px; border-radius: 3px; background: var(--ink-3); }
  .fmb-line.lit { background: var(--violet-g); }

  /* ─── HOW IT WORKS ─── */
  .how-section {
    background: var(--ink-1);
    border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
    padding: 120px 60px;
  }
  .steps {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 0; margin-top: 72px; position: relative;
  }
  .steps::before {
    content: ''; position: absolute; top: 29px; left: 12%; right: 12%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,111,255,0.3) 30%, rgba(124,111,255,0.3) 70%, transparent);
  }
  .step { padding: 0 32px; text-align: center; }
  .step-num {
    width: 58px; height: 58px; border-radius: 16px;
    background: var(--ink-2); border: 1px solid var(--line-md);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cabinet Grotesk', sans-serif; font-weight: 800; font-size: 1.1rem;
    color: var(--aqua); margin: 0 auto 24px; position: relative; z-index: 1;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }
  .step:hover .step-num {
    border-color: var(--aqua);
    box-shadow: 0 0 22px rgba(45,212,191,0.16);
    transform: translateY(-3px);
  }
  .step h3 { font-size: 1.12rem; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.02em; }
  .step p { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }

  /* ─── CTA ─── */
  .cta-section { padding: 80px 60px 100px; }
  .cta-box {
    max-width: 1140px; margin: 0 auto;
    border-radius: 24px;
    background: var(--ink-1); border: 1px solid var(--line);
    padding: 100px 40px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 50% 70% at 50% -5%, rgba(124,111,255,0.13), transparent),
      radial-gradient(ellipse 30% 40% at 85% 100%, rgba(45,212,191,0.06), transparent);
    pointer-events: none;
  }
  .cta-box::after {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 75% 80% at 50% 50%, black 25%, transparent 80%);
    pointer-events: none;
  }
  .cta-box h2 {
    font-size: clamp(2rem, 5vw, 3.6rem); font-weight: 900;
    letter-spacing: -0.04em; margin-bottom: 18px;
    position: relative; z-index: 1;
  }
  .cta-box p {
    color: var(--muted); font-size: 1.05rem; line-height: 1.7;
    max-width: 440px; margin: 0 auto 44px;
    position: relative; z-index: 1;
  }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
  .btn-cta {
    background: var(--text); color: var(--ink); border: none;
    padding: 14px 36px; border-radius: 100px;
    font-size: 0.95rem; font-weight: 700;
    cursor: pointer; font-family: 'Instrument Sans', sans-serif;
    transition: opacity 0.2s, transform 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-cta:hover { opacity: 0.88; transform: translateY(-2px); }
  .btn-cta svg { width: 14px; height: 14px; fill: var(--ink); }
  .btn-cta-ghost {
    background: transparent; color: var(--muted);
    border: 1px solid var(--line-md);
    padding: 14px 30px; border-radius: 100px;
    font-size: 0.95rem; font-weight: 500;
    cursor: pointer; font-family: 'Instrument Sans', sans-serif;
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; transition: all 0.2s;
  }
  .btn-cta-ghost:hover { border-color: rgba(255,255,255,0.22); color: var(--text); }
  .btn-cta-ghost svg { width: 16px; height: 16px; fill: currentColor; }

  /* ─── FOOTER ─── */
  footer {
    border-top: 1px solid var(--line); padding: 60px 60px 36px;
    background: var(--ink);
  }
  .footer-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 52px;
  }
  .footer-about p { font-size: 0.87rem; color: var(--muted); margin-top: 12px; max-width: 230px; line-height: 1.65; }
  .footer-cols { display: flex; gap: 72px; }
  .footer-col h4 {
    font-size: 0.75rem; font-weight: 700; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 18px;
  }
  .footer-col a {
    display: block; font-size: 0.87rem; color: var(--faint);
    text-decoration: none; margin-bottom: 10px; transition: color 0.2s;
  }
  .footer-col a:hover { color: var(--aqua); }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 28px; border-top: 1px solid var(--line);
  }
  .footer-copy { font-size: 0.82rem; color: var(--faint); }
  .socials { display: flex; gap: 8px; }
  .soc {
    width: 34px; height: 34px; border-radius: 9px;
    border: 1px solid var(--line); background: transparent;
    display: flex; align-items: center; justify-content: center;
    color: var(--faint); text-decoration: none;
    transition: all 0.2s;
  }
  .soc:hover { border-color: var(--line-md); color: var(--text); background: rgba(255,255,255,0.03); }
  .soc svg { width: 15px; height: 15px; fill: currentColor; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .feat-mosaic { grid-template-columns: repeat(2,1fr); }
    .fc-1,.fc-2,.fc-3,.fc-4,.fc-5 { grid-column: span 1; }
    .fc-6 { grid-column: span 2; }
    .browser-body { grid-template-columns: 1fr; }
    .chat { border-left: none; border-top: 1px solid var(--line); max-height: 300px; }
    .rxns { display: none; }
  }
  @media (max-width: 900px) {
    nav { padding: 14px 24px; }
    nav.stuck { padding: 10px 24px; }
    .nav-r .nav-link { display: none; }
    .nav-r .nav-gh { display: none; }
    .section, .how-section, .cta-section { padding: 80px 24px; }
    .strip { grid-template-columns: repeat(2,1fr); }
    .stat:nth-child(2) { border-right: none; }
    .stat:nth-child(3) { border-top: 1px solid var(--line); }
    .steps { grid-template-columns: 1fr; gap: 40px; }
    .steps::before { display: none; }
    .footer-top { flex-direction: column; gap: 40px; }
    .footer-cols { flex-wrap: wrap; gap: 40px; }
    .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .fc-6 { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    nav { padding: 12px 16px; }
    .hero { padding: 120px 16px 60px; }
    .hero-cta { flex-direction: column; align-items: center; }
    .btn-primary, .btn-ghost { width: 100%; max-width: 280px; justify-content: center; }
    .strip { grid-template-columns: 1fr; }
    .stat { border-right: none; border-bottom: 1px solid var(--line); }
    .stat:last-child { border-bottom: none; }
    .section, .how-section, .cta-section { padding: 60px 16px; }
    .feat-mosaic { grid-template-columns: 1fr; }
    .fc-1,.fc-2,.fc-3,.fc-4,.fc-5,.fc-6 { grid-column: span 1; }
    .cta-section { padding: 40px 16px 60px; }
    .cta-btns { flex-direction: column; align-items: center; }
    .btn-cta, .btn-cta-ghost { width: 100%; max-width: 260px; justify-content: center; }
    footer { padding: 48px 16px 28px; }
    .footer-cols { flex-direction: column; gap: 32px; }
  }
</style>