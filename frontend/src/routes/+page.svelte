<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StreamTogether — Watch With Everyone</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Deep Midnight & Electric Neon Theme */
      --bg-dark: #070913;
      --bg-surface: #0f132a;
      --bg-surface-elevated: #181d3d;
      
      --accent-primary: #6366f1; /* Neon Indigo */
      --accent-primary-glow: rgba(99, 102, 241, 0.15);
      --accent-secondary: #00f2fe; /* Cyber Cyan */
      --accent-secondary-glow: rgba(0, 242, 254, 0.15);
      
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      
      --border-glow: rgba(255, 255, 255, 0.06);
      --border-active: rgba(99, 102, 241, 0.4);
      
      --gradient-brand: linear-gradient(135deg, #6366f1 0%, #00f2fe 100%);
      --gradient-surface: linear-gradient(180deg, #111632 0%, #0b0e22 100%);
      
      --success: #10b981;
      --warning: #f59e0b;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-dark);
      color: var(--text-main);
      overflow-x: hidden;
      letter-spacing: -0.01em;
    }

    h1, h2, h3, h4, .logo {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── NAV ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 56px;
      background: rgba(7, 9, 19, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-glow);
    }
    .logo {
      display: flex; align-items: center; gap: 12px;
      font-weight: 800; font-size: 1.4rem;
      color: var(--text-main); text-decoration: none;
      letter-spacing: -0.03em;
    }
    .logo-dot {
      width: 32px; height: 32px; border-radius: 10px;
      background: var(--gradient-brand);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem; color: #070913; font-weight: 800;
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
    }
    .nav-links { display: flex; align-items: center; gap: 32px; }
    .nav-links a {
      font-size: 0.95rem; font-weight: 500; color: var(--text-muted);
      text-decoration: none; transition: color 0.2s, text-shadow 0.2s;
    }
    .nav-links a:hover { 
      color: var(--text-main); 
      text-shadow: 0 0 10px rgba(255,255,255,0.2);
    }
    .nav-cta {
      background: rgba(255, 255, 255, 0.06); 
      color: var(--text-main) !important;
      padding: 10px 24px; border-radius: 12px;
      font-weight: 600 !important; 
      border: 1px solid var(--border-glow);
      transition: all 0.2s ease !important;
    }
    .nav-cta:hover { 
      background: var(--text-main) !important; 
      color: var(--bg-dark) !important;
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(255,255,255,0.1);
    }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 140px 24px 80px;
      position: relative; overflow: hidden;
    }
    .hero-bg-blobs {
      position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0;
    }
    .blob {
      position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15;
    }
    .blob-1 {
      width: 600px; height: 600px; top: -150px; right: -100px;
      background: var(--accent-primary);
      animation: float 10s ease-in-out infinite;
    }
    .blob-2 {
      width: 500px; height: 500px; bottom: -100px; left: -100px;
      background: var(--accent-secondary);
      animation: float 14s ease-in-out infinite reverse;
    }
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -40px) scale(1.08); }
      66% { transform: translate(-25px, 30px) scale(0.95); }
    }

    .hero-badge {
      display: inline-flex; align-items: center; gap: 10px;
      background: rgba(0, 242, 254, 0.06); 
      border: 1px solid rgba(0, 242, 254, 0.2);
      border-radius: 100px; padding: 8px 20px 8px 12px;
      font-size: 0.85rem; font-weight: 500; color: #a5f3fc;
      margin-bottom: 32px; animation: fadeUp 0.6s ease both;
      position: relative; z-index: 1;
    }
    .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-secondary); box-shadow: 0 0 10px var(--accent-secondary); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }

    .hero h1 {
      font-weight: 800;
      font-size: clamp(2.5rem, 6.5vw, 5.2rem);
      line-height: 1.1; letter-spacing: -0.04em;
      max-width: 900px; margin-bottom: 28px;
      animation: fadeUp 0.7s ease 0.1s both;
      position: relative; z-index: 1;
    }
    .hero h1 em {
      font-style: normal;
      background: var(--gradient-brand);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .hero-sub {
      font-size: clamp(1rem, 3vw, 1.2rem); line-height: 1.7; color: var(--text-muted);
      max-width: 620px; margin-bottom: 48px; font-weight: 400;
      animation: fadeUp 0.7s ease 0.2s both;
      position: relative; z-index: 1;
    }

    .hero-actions {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      margin-bottom: 80px; animation: fadeUp 0.7s ease 0.3s both;
      position: relative; z-index: 1;
      width: 100%;
    }
    .btn-primary {
      background: var(--gradient-brand); color: #070913; border: none;
      padding: 16px 40px; border-radius: 14px; font-size: 1rem; font-weight: 700;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.3);
      transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-primary:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 12px 40px rgba(0, 242, 254, 0.4); 
    }
    .btn-secondary {
      background: rgba(255,255,255,0.03); color: var(--text-main); border: 1px solid var(--border-glow);
      padding: 16px 36px; border-radius: 14px; font-size: 1rem; font-weight: 600;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover { 
      border-color: rgba(255,255,255,0.2); 
      background: rgba(255,255,255,0.06);
      transform: translateY(-2px); 
    }
    
    /* GitHub Button Variant */
    .btn-github {
      background: #24292e; color: #fff; border: 1px solid rgba(255,255,255,0.1);
      padding: 16px 36px; border-radius: 14px; font-size: 1rem; font-weight: 600;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      text-decoration: none;
    }
    .btn-github:hover {
      background: #2f363d;
      border-color: rgba(255,255,255,0.25);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }

    /* ── SKELETON LOADING EFFECTS ── */
    .skeleton {
      position: relative;
      overflow: hidden;
      background: #1e293b !important;
    }
    .skeleton::after {
      content: "";
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      transform: translateX(-100%);
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.05) 20%,
        rgba(255, 255, 255, 0.1) 60%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 2s infinite;
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }

    .skeleton-text {
      height: 12px;
      border-radius: 4px;
      background: #1e293b;
      margin-bottom: 8px;
    }
    .skeleton-text.w-70 { width: 70%; }
    .skeleton-text.w-50 { width: 50%; }
    .skeleton-text.w-30 { width: 30%; }

    /* ── HERO PREVIEW ── */
    .hero-preview {
      width: min(1000px, 100%); position: relative;
      animation: fadeUp 0.8s ease 0.4s both;
      z-index: 1;
    }
    .preview-card {
      background: var(--bg-surface); border-radius: 24px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 4px 24px rgba(99,102,241,0.05);
      overflow: hidden; border: 1px solid var(--border-glow);
    }
    .preview-topbar {
      display: flex; align-items: center; gap: 8px; padding: 16px 24px;
      background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border-glow);
      overflow: hidden;
    }
    .preview-topbar span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .topbar-dot { width: 12px; height: 12px; border-radius: 50%; opacity: 0.7; flex-shrink: 0; }
    .preview-body { display: grid; grid-template-columns: 1fr 320px; }
    
    .preview-video {
      aspect-ratio: 16/9; position: relative; background: #02040a;
      overflow: hidden; display: flex; align-items: center; justify-content: center;
    }
    .video-placeholder {
      width: 100%; height: 100%; padding: 16px;
      background: linear-gradient(135deg, #0b0f19 0%, #171d31 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
    }
    .play-btn {
      width: 68px; height: 68px; border-radius: 50%;
      background: var(--gradient-brand);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; color: #070913; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer;
    }
    .play-btn:hover { transform: scale(1.1); box-shadow: 0 0 40px rgba(0,242,254,0.6); }
    .video-title { color: var(--text-main); font-size: 0.95rem; font-weight: 500; text-align: center; }
    .video-progress {
      position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    }
    .video-progress-bar {
      height: 100%; width: 42%; background: var(--accent-secondary);
      box-shadow: 0 0 10px var(--accent-secondary);
    }
    
    .preview-sidebar {
      background: rgba(255,255,255,0.01); border-left: 1px solid var(--border-glow);
      display: flex; flex-direction: column;
    }
    .sidebar-header {
      padding: 16px 20px; border-bottom: 1px solid var(--border-glow);
      display: flex; align-items: center; justify-content: space-between;
    }
    .sidebar-header span { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
    .online-count { background: rgba(16, 185, 129, 0.1); color: var(--success); font-size: 0.8rem; font-weight: 600; padding: 4px 12px; border-radius: 100px; border: 1px solid rgba(16, 185, 129, 0.2); }
    
    .chat-messages { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 14px; overflow: hidden; }
    .chat-msg { display: flex; gap: 12px; align-items: flex-start; }
    .avatar {
      width: 32px; height: 32px; border-radius: 10px; flex-shrink: 0;
      font-size: 0.8rem; color: #fff; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .msg-content { flex: 1; }
    .msg-name { font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; }
    .msg-text { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; text-align: left; }
    
    .chat-input {
      padding: 16px; border-top: 1px solid var(--border-glow);
      display: flex; gap: 10px; align-items: center;
    }
    .chat-input input {
      flex: 1; border: 1px solid var(--border-glow); border-radius: 12px;
      padding: 10px 16px; font-size: 0.88rem; background: var(--bg-surface-elevated); outline: none;
      font-family: 'Inter', sans-serif; color: var(--text-main);
      transition: border-color 0.2s;
    }
    .chat-input input:focus { border-color: var(--accent-primary); }
    .chat-send {
      width: 38px; height: 38px; border-radius: 12px; background: var(--accent-primary);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: white; font-size: 0.9rem; transition: background 0.2s;
    }
    .chat-send:hover { background: #4f46e5; }
    
    .preview-reactions {
      position: absolute; right: 340px; bottom: 24px;
      display: flex; flex-direction: column; gap: 8px; pointer-events: none;
    }
    .reaction-bubble {
      background: var(--bg-surface-elevated); border-radius: 12px; padding: 6px 14px;
      font-size: 0.88rem; box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      border: 1px solid var(--border-glow);
      animation: floatUp 3s ease infinite;
      display: flex; align-items: center; gap: 6px; color: var(--text-main);
      white-space: nowrap;
    }
    .reaction-bubble:nth-child(2) { animation-delay: 0.8s; }
    .reaction-bubble:nth-child(3) { animation-delay: 1.6s; }
    @keyframes floatUp {
      0%   { opacity:0; transform:translateY(15px); }
      15%  { opacity:1; }
      85%  { opacity:1; }
      100% { opacity:0; transform:translateY(-45px); }
    }

    /* ── CONCEPT / VALUE STRIP ── */
    .social-strip {
      background: rgba(15, 19, 42, 0.4); border-top: 1px solid var(--border-glow); border-bottom: 1px solid var(--border-glow);
      padding: 32px 56px;
      display: flex; align-items: center; justify-content: center; gap: 64px;
      overflow: hidden; backdrop-filter: blur(10px);
    }
    .social-item { display: flex; align-items: center; gap: 14px; white-space: nowrap; }
    .social-num { font-size: 1.35rem; color: var(--text-main); font-weight: 700; display: flex; align-items: center; }
    .social-label { font-size: 0.92rem; color: var(--text-muted); font-weight: 500; }
    .social-divider { width: 1px; height: 32px; background: var(--border-glow); }

    /* ── FEATURES ── */
    .section { padding: 120px 56px; position: relative; }
    .section-label {
      display: inline-block; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; background: var(--gradient-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 16px;
    }
    .section-title {
      font-weight: 800;
      font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.15;
      letter-spacing: -0.03em; margin-bottom: 20px;
    }
    .section-sub { font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; max-width: 540px; font-weight: 400; }

    .features-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 64px;
    }
    .feature-card {
      background: var(--gradient-surface); border-radius: 24px; padding: 40px;
      border: 1px solid var(--border-glow);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative; overflow: hidden;
      text-align: left;
    }
    .feature-card:hover { 
      transform: translateY(-8px); 
      border-color: var(--border-active);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
    }
    
    .feature-icon {
      width: 56px; height: 56px; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; margin-bottom: 28px; transition: transform 0.3s ease;
    }
    .feature-card:hover .feature-icon { transform: scale(1.1) rotate(4deg); }
    
    .ic-coral { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    .ic-teal  { background: rgba(0, 242, 254, 0.1); color: var(--accent-secondary); }
    .ic-purple{ background: rgba(99, 102, 241, 0.1); color: var(--accent-primary); }
    .ic-gold  { background: rgba(245, 166, 35, 0.1); color: var(--warning); }

    .feature-card h3 {
      font-weight: 700; font-size: 1.25rem;
      margin-bottom: 12px; color: var(--text-main);
    }
    .feature-card p {
      font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;
    }

    /* ── HOW IT WORKS ── */
    .how-section {
      background: #0b0e22; border-top: 1px solid var(--border-glow); border-bottom: 1px solid var(--border-glow); padding: 120px 56px;
    }

    .steps-row {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; margin-top: 72px;
      position: relative;
    }
    .steps-row::before {
      content: ''; position: absolute; top: 32px; left: 15%; right: 15%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2) 20%, rgba(99, 102, 241, 0.2) 80%, transparent);
    }
    .step { text-align: center; position: relative; }
    .step-num {
      width: 64px; height: 64px; border-radius: 20px; margin: 0 auto 28px;
      background: var(--bg-surface-elevated); border: 1px solid var(--border-glow);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 1.2rem; color: var(--accent-secondary);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    }
    .step:hover .step-num {
      border-color: var(--accent-secondary);
      box-shadow: 0 0 20px var(--accent-secondary-glow);
      transform: translateY(-2px);
    }
    .step h3 { font-weight: 700; font-size: 1.25rem; margin-bottom: 12px; color: var(--text-main); }
    .step p  { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; }

    /* ── SOURCES ── */
    .sources-section { padding: 120px 56px; }
    .sources-grid {
      display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 64px;
      max-width: 900px; margin-left: auto; margin-right: auto;
    }
    .source-pill {
      display: flex; align-items: center; gap: 12px;
      background: var(--bg-surface); border: 1px solid var(--border-glow); border-radius: 14px;
      padding: 14px 24px; font-weight: 600; font-size: 0.95rem; color: var(--text-main);
      transition: all 0.2s ease;
      cursor: default;
    }
    .source-pill:hover {
      border-color: var(--text-muted);
      transform: translateY(-2px);
      background: var(--bg-surface-elevated);
    }
    .source-icon { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }

    /* ── TESTIMONIALS ── */
    .testimonials-section { padding: 120px 56px; background: linear-gradient(180deg, var(--bg-dark) 0%, #090c1a 100%); }
    .testimonials-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 64px;
    }
    .testi-card {
      background: var(--bg-surface); border-radius: 24px; padding: 36px;
      border: 1px solid var(--border-glow);
      transition: all 0.25s ease;
    }
    .testi-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
    .testi-stars { color: var(--warning); font-size: 0.9rem; margin-bottom: 18px; letter-spacing: 2px; }
    .testi-text { font-size: 1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 24px; font-style: italic; }
    .testi-author { display: flex; align-items: center; gap: 14px; }
    .testi-avatar {
      width: 40px; height: 40px; border-radius: 12px;
      font-size: 0.85rem; color: white; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .testi-name { font-weight: 700; font-size: 0.95rem; color: var(--text-main); }
    .testi-handle { font-size: 0.8rem; color: var(--text-dim); margin-top: 1px; }

    /* ── CTA ── */
    .cta-section {
      margin: 80px 56px; border-radius: 32px;
      background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), var(--gradient-surface);
      padding: 96px 32px; text-align: center; position: relative; overflow: hidden;
      border: 1px solid var(--border-glow);
      box-shadow: 0 40px 80px rgba(0,0,0,0.4);
    }
    .cta-section h2 {
      font-weight: 800;
      font-size: clamp(2rem, 5vw, 3.5rem); color: var(--text-main); margin-bottom: 20px;
      position: relative; z-index: 1; letter-spacing: -0.03em;
    }
    .cta-section p {
      color: var(--text-muted); font-size: 1.2rem; margin-bottom: 44px;
      position: relative; z-index: 1; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;
    }
    .cta-actions { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 1; flex-wrap: wrap; }
    .btn-white {
      background: var(--text-main); color: var(--bg-dark); border: none;
      padding: 16px 40px; border-radius: 14px; font-size: 1rem; font-weight: 700;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.2s ease;
      box-shadow: 0 8px 24px rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
    }
    .btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,255,255,0.2); }
    .btn-outline-white {
      background: transparent; color: var(--text-main); border: 1px solid rgba(255,255,255,0.15);
      padding: 16px 36px; border-radius: 14px; font-size: 1rem; font-weight: 600;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .btn-outline-white:hover { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.02); transform: translateY(-2px); }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid var(--border-glow); padding: 64px 56px 40px; background: #04060d;
    }
    .footer-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 64px; }
    .footer-brand p { font-size: 0.95rem; color: var(--text-muted); margin-top: 14px; max-width: 260px; line-height: 1.6; }
    .footer-cols { display: flex; gap: 80px; }
    .footer-col h4 { font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px; letter-spacing: 0.05em; text-transform: uppercase; }
    .footer-col a { display: block; font-size: 0.92rem; color: var(--text-muted); text-decoration: none; margin-bottom: 12px; transition: color 0.2s; }
    .footer-col a:hover { color: var(--accent-secondary); }
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 32px; border-top: 1px solid var(--border-glow);
    }
    .footer-bottom p { font-size: 0.88rem; color: var(--text-dim); }
    .footer-socials { display: flex; gap: 12px; }
    .social-btn {
      width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-glow); display: flex; align-items: center; justify-content: center;
      font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease;
      text-decoration: none; color: var(--text-muted);
    }
    .social-btn:hover { border-color: var(--text-muted); color: var(--text-main); transform: translateY(-2px); }

    /* ── RESPONSIVE & MOBILE UX REFACTOR ── */
    @media (max-width: 1024px) {
      .preview-body { grid-template-columns: 1fr; }
      .preview-sidebar { border-left: none; border-top: 1px solid var(--border-glow); max-height: 400px; }
      .preview-reactions { right: 24px; bottom: auto; top: 24px; }
    }

    @media (max-width: 900px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .section, .sources-section, .testimonials-section, .how-section { padding: 80px 24px; }
      .features-grid, .testimonials-grid, .steps-row { grid-template-columns: 1fr; gap: 24px; }
      .steps-row::before { display: none; }
      .social-strip { padding: 32px 24px; gap: 24px; flex-wrap: wrap; justify-content: grid; grid-template-columns: repeat(2, 1fr); }
      .social-divider { display: none; }
      .cta-section { margin: 40px 24px; padding: 64px 24px; }
      .footer-top { flex-direction: column; gap: 48px; }
      .footer-cols { flex-direction: row; flex-wrap: wrap; gap: 40px; justify-content: space-between; width: 100%; }
      .footer-bottom { flex-direction: column; gap: 24px; text-align: center; }
    }

    @media (max-width: 600px) {
      nav { padding: 12px 16px; }
      .logo { font-size: 1.2rem; gap: 8px; }
      .logo-dot { width: 28px; height: 28px; border-radius: 8px; }
      
      .hero { padding: 120px 16px 60px; }
      .hero-badge { font-size: 0.75rem; padding: 6px 14px 6px 10px; margin-bottom: 24px; }
      .hero h1 { margin-bottom: 16px; }
      .hero-sub { margin-bottom: 32px; }
      
      .hero-actions { flex-direction: column; gap: 12px; width: 100%; max-width: 320px; }
      .btn-primary, .btn-github, .btn-white, .btn-outline-white { width: 100%; padding: 14px 24px; font-size: 0.95rem; border-radius: 12px; }
      
      .preview-card { border-radius: 16px; }
      .preview-topbar { padding: 12px 16px; font-size: 0.75rem; }
      .video-placeholder { padding: 24px 16px; gap: 12px; }
      .play-btn { width: 52px; height: 52px; font-size: 1.1rem; }
      .video-title { font-size: 0.85rem; }
      .preview-reactions { display: none; } /* Hide cluttering absolute reactions on tiny screens */
      .preview-sidebar { display: flex; max-height: 320px; }
      .chat-messages { padding: 16px; gap: 10px; }
      .chat-input { padding: 12px; }
      .chat-input input { padding: 8px 12px; font-size: 0.8rem; border-radius: 10px; }
      .chat-send { width: 34px; height: 34px; border-radius: 10px; }
      
      .social-strip { grid-template-columns: 1fr; gap: 20px; padding: 24px 16px; }
      .social-item { gap: 10px; }
      .social-num { font-size: 1.15rem; }
      .social-label { font-size: 0.85rem; }

      .section, .sources-section, .testimonials-section, .how-section { padding: 60px 16px; }
      .section-title { margin-bottom: 12px; }
      .section-sub { font-size: 1rem; line-height: 1.6; }
      
      .features-grid { margin-top: 40px; gap: 16px; }
      .feature-card { padding: 24px; border-radius: 16px; }
      .feature-icon { width: 44px; height: 44px; border-radius: 12px; font-size: 1.25rem; margin-bottom: 20px; }
      .feature-card h3 { font-size: 1.15rem; }
      .feature-card p { font-size: 0.88rem; line-height: 1.5; }
      
      .steps-row { margin-top: 40px; gap: 32px; }
      .step-num { width: 52px; height: 52px; border-radius: 14px; margin-bottom: 16px; font-size: 1.1rem; }
      .step h3 { font-size: 1.15rem; }
      .step p { font-size: 0.88rem; }
      
      .sources-grid { margin-top: 36px; gap: 8px; }
      .source-pill { padding: 10px 16px; font-size: 0.85rem; border-radius: 10px; gap: 8px; }
      .source-icon { width: 20px; height: 20px; font-size: 0.75rem; }
      
      .testimonials-section .testimonials-grid { margin-top: 40px; gap: 16px; }
      .testi-card { padding: 24px; border-radius: 16px; }
      .testi-text { font-size: 0.92rem; margin-bottom: 16px; }
      
      .cta-section { margin: 32px 16px; padding: 48px 16px; border-radius: 20px; }
      .cta-actions { flex-direction: column; gap: 12px; width: 100%; max-width: 280px; margin: 0 auto; }
      
      footer { padding: 48px 16px 32px; }
      .footer-cols { grid-template-columns: 1fr; gap: 32px; }
      .footer-col h4 { margin-bottom: 12px; }
      .footer-col a { margin-bottom: 8px; font-size: 0.88rem; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="logo">
    <div class="logo-dot">▶</div>
    StreamTogether
  </a>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#how">How it works</a>
    <a href="#sources">Platforms</a>
    <a href="https://github.com/mr28Verma/watchtogether" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      GitHub
    </a>
    <a href="#" class="nav-cta">Launch App</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg-blobs">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </div>

  <div class="hero-badge">
    <div class="badge-dot"></div>
    Open-source WebRTC protocol enabled
  </div>

  <h1>Watch anything,<br /><em>together</em>, in sync.</h1>
  <p class="hero-sub">Create a room in seconds. Share the link. Stream YouTube, your own files, or launch a shared browser — everyone stays perfectly synced in real time.</p>

  <div class="hero-actions">
    <button class="btn-primary">▶ &nbsp;Create a Room</button>
    <a href="https://github.com/mr28Verma/watchtogether" target="_blank" class="btn-github">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      View on GitHub
    </a>
  </div>

  <!-- Preview Window with Skeletons -->
  <div class="hero-preview">
    <div class="preview-card">
      <div class="preview-topbar">
        <div class="topbar-dot" style="background:#ef4444;"></div>
        <div class="topbar-dot" style="background:#f59e0b;"></div>
        <div class="topbar-dot" style="background:#10b981;"></div>
        <span style="margin-left:12px;font-size:0.85rem;color:var(--text-muted);font-weight:500;">streamtogether.app/room/movie-night</span>
      </div>
      <div class="preview-body">
        <div class="preview-video">
          <div class="video-placeholder">
            <div class="play-btn">▶</div>
            <p class="video-title">Interstellar (2014) — 4K HDR stream</p>
          </div>
          <div class="video-progress">
            <div class="video-progress-bar"></div>
          </div>
          <!-- Floating reactions -->
          <div class="preview-reactions">
            <div class="reaction-bubble">😮 Mind-blown!</div>
            <div class="reaction-bubble">🔥 Best scene ever</div>
            <div class="reaction-bubble">😂 lol same</div>
          </div>
        </div>
        <div class="preview-sidebar">
          <div class="sidebar-header">
            <span>Live Chat</span>
            <div class="online-count">● 8 online</div>
          </div>
          <div class="chat-messages">
            <div class="chat-msg">
              <div class="avatar" style="background:#6366f1;">A</div>
              <div class="msg-content">
                <div class="msg-name">Alex</div>
                <div class="msg-text">This part always gets me 😭</div>
              </div>
            </div>
            <div class="chat-msg">
              <div class="avatar" style="background:#a855f7;">S</div>
              <div class="msg-content">
                <div class="msg-name">Sophie</div>
                <div class="msg-text">Same! Nolan is an absolute genius</div>
              </div>
            </div>
            
            <!-- Skeleton Chat State Message -->
            <div class="chat-msg">
              <div class="avatar skeleton"></div>
              <div class="msg-content">
                <div class="skeleton-text w-30 skeleton"></div>
                <div class="skeleton-text w-70 skeleton"></div>
              </div>
            </div>

            <div class="chat-msg">
              <div class="avatar" style="background:#f59e0b;">M</div>
              <div class="msg-content">
                <div class="msg-name">Max</div>
                <div class="msg-text">😂 go go go we'll wait!</div>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <input type="text" placeholder="Say something..." />
            <button class="chat-send">➤</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- REAL VALUE STRIP -->
<div class="social-strip">
  <div class="social-item">
    <span class="social-num">⚡ &nbsp; 0ms</span>
    <span class="social-label">Perceived Delay</span>
  </div>
  <div class="social-item">
    <span class="social-num">🔒 &nbsp; E2E</span>
    <span class="social-label">Private Rooms</span>
  </div>
  <div class="social-item">
    <span class="social-num">🛠 &nbsp; Pure CSS</span>
    <span class="social-label">Light Layout</span>
  </div>
  <div class="social-item">
    <span class="social-num">🍿 &nbsp; Zero Ads</span>
    <span class="social-label">Clean Interface</span>
  </div>
</div>

<!-- FEATURES -->
<section class="section" id="features">
  <div style="max-width:1200px; margin:0 auto;">
    <span class="section-label">Features</span>
    <h2 class="section-title">Everything you need for<br />the perfect watch night</h2>
    <p class="section-sub">No downloads, no extensions, no sign-ups required. Just seamless sync directly in your modern web browser.</p>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon ic-coral">🔗</div>
        <h3>Instant Setup</h3>
        <p>Generate a shareable room link in one click. Your friends join instantly from any phone, tablet, or laptop.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon ic-teal">⚡</div>
        <h3>Flawless Sync</h3>
        <p>Play, pause, seek — every click is instantly mirrored to all viewers. Nobody gets left behind or accidentally spoiled.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon ic-purple">💬</div>
        <h3>Live Chat</h3>
        <p>Chat seamlessly, react with fast floating emojis, and share the collective hype as the story unfolds.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon ic-gold">🌐</div>
        <h3>Cloud Browser</h3>
        <p>Stream premium services like Netflix, Disney+, or Hulu safely through a lightning-fast virtual cloud session.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon ic-coral">📁</div>
        <h3>Local Files</h3>
        <p>Have local video files saved on your desktop? Simply stream them directly to the room with zero lag or delay.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon ic-teal">🎤</div>
        <h3>Integrated Audio</h3>
        <p>Hear each other laugh, gasp, and comment out loud with built-in latency-optimized group voice chat options.</p>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how-section" id="how">
  <div style="max-width:1200px; margin:0 auto;">
    <span class="section-label">Frictionless Flow</span>
    <h2 class="section-title">Watch together in<br />three effortless steps</h2>
    <p class="section-sub">We’ve removed every roadblock. No setups, no configuration, just instant streaming entertainment.</p>
    <div class="steps-row">
      <div class="step">
        <div class="step-num">01</div>
        <h3>Launch Your Room</h3>
        <p>Hit the action button and your private streaming arena is generated instantly. The unique link is auto-copied.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <h3>Invite Your Crew</h3>
        <p>Drop the link into your group chat. Friends click and hop straight in — no account setups required.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <h3>Stream & Enjoy</h3>
        <p>Paste a video link, start the cloud browser, or play a video file. Sit back and watch it unfold in perfect symmetry.</p>
      </div>
    </div>
  </div>
</section>

<!-- SOURCES -->
<section class="sources-section" id="sources" style="text-align:center;">
  <span class="section-label">Compatibility</span>
  <h2 class="section-title">Stream from any platform</h2>
  <p class="section-sub" style="margin:0 auto;">Stream safely from your favorite media portals or natively broadcast your own private archives.</p>
  <div class="sources-grid">
    <div class="source-pill"><div class="source-icon" style="background:#ff0000;color:white;">▶</div> YouTube</div>
    <div class="source-pill"><div class="source-icon" style="background:#e50914;color:white;font-size:0.65rem;font-weight:700;">N</div> Netflix</div>
    <div class="source-pill"><div class="source-icon" style="background:#113ccf;color:white;font-size:0.6rem;font-weight:700;">D+</div> Disney+</div>
    <div class="source-pill"><div class="source-icon" style="background:#1ce783;color:#1a1a1a;font-size:0.7rem;font-weight:700;">H</div> Hulu</div>
    <div class="source-pill"><div class="source-icon" style="background:#6441a5;color:white;font-size:0.75rem;">⬛</div> Twitch</div>
    <div class="source-pill"><div class="source-icon" style="background:#f47521;color:white;">🎞</div> Plex</div>
    <div class="source-pill"><div class="source-icon" style="background:#003087;color:white;font-size:0.6rem;font-weight:700;">A</div> Prime Video</div>
    <div class="source-pill"><div class="source-icon" style="background:rgba(255,255,255,0.1);color:white;font-size:0.8rem;">📁</div> Your Files</div>
    <div class="source-pill"><div class="source-icon" style="background:rgba(0, 242, 254, 0.2);color:var(--accent-secondary);font-size:0.8rem;">🌐</div> Any Website</div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section">
  <div style="max-width:1200px; margin:0 auto; text-align:center;">
    <span class="section-label">User Praise</span>
    <h2 class="section-title">What the community says</h2>
    <div class="testimonials-grid" style="text-align:left; margin-top:64px;">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"Used this every single weekend during long distance. The sync latency is non-existent — it genuinely feels like we are on the exact same sofa."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:var(--accent-primary);">P</div>
          <div>
            <div class="testi-name">Priya M.</div>
            <div class="testi-handle">@priyawatch</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"Our whole discord group uses it for casual watch parties now. Zero layout hassle — copy a link and start rolling. Chat implementation is incredibly clean."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:#a855f7;">D</div>
          <div>
            <div class="testi-name">David K.</div>
            <div class="testi-handle">@davidcodes</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"I teach remote film history classes and utilize this web app to critique layouts with students. Shared instant live feedback is absolute gold."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:var(--accent-secondary);color:#070913;">L</div>
          <div>
            <div class="testi-name">Prof. Laura S.</div>
            <div class="testi-handle">Film Studies Faculty</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<div class="cta-section">
  <span class="section-label">Get Started</span>
  <h2>Your next dynamic movie night<br />starts right now.</h2>
  <p>No credit cards, no logins, no paywalls. Launch a completely secure room and begin watching within 5 seconds.</p>
  <div class="cta-actions">
    <button class="btn-white">▶ Create a Free Room</button>
    <a href="https://github.com/mr28Verma/watchtogether" target="_blank" class="btn-outline-white" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      Star on GitHub
    </a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <a href="#" class="logo">
        <div class="logo-dot">▶</div>
        StreamTogether
      </a>
      <p>Watch premium media synchronised perfectly with anyone, anywhere. Free forever.</p>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">How it works</a>
        <a href="#">Platforms</a>
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
        <a href="#">Cookie settings</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 StreamTogether. All rights reserved.</p>
    <div class="footer-socials">
      <a class="social-btn" href="https://github.com/mr28Verma/watchtogether" target="_blank" title="GitHub">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a class="social-btn" href="https://www.linkedin.com/in/saksham-verma-9275b631b/">in</a>
    </div>
  </div>
</footer>

</body>
</html>