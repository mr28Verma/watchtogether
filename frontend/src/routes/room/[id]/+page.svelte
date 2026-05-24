<script>
  import { onMount } from "svelte";
  import { socket } from "$lib/socket";

  let streamInputUrl = "";
  let uploadedVideoType = "";
  let currentVideoUrl = $state("");
  let inviteCopied = $state(false);
  let isMobileLandscape = false;
  let roomId = "";
  let roomLink = "";

  // File Cast UI state
  let showFileCastPanel = $state(false);
  let isUploading = $state(false);
  let uploadProgress = $state(0);

  let player;
  let playerReady = false;
  let isSyncing = false;

  // Username and Auth states
  let username = $state("");
  let isUsernameSubmitted = $state(false);
  let checkingAuth = $state(true);

  // Core persistence states
  let isCreator = $state(false);
  let messages = $state([]);
  let newMessage = $state("");
  let connectedCount = $state(1);

  // Initialize context and sync with localStorage safely before mounting
  if (typeof window !== "undefined") {
    const savedName = localStorage.getItem("watchtogether_user");
    if (savedName) {
      username = savedName;
      isUsernameSubmitted = true;
    }
    checkingAuth = false;

    const segments = window.location.pathname.split("/").filter(Boolean);
    const pathRoomId = segments[segments.length - 1];

    roomId = pathRoomId || "ouxz40";
    roomLink = `${window.location.origin}/room/${roomId}`;

    // Host persistence: Check if this tab session was flagged as the creator
    const sessionCreatorKey = `watchtogether_creator_${roomId}`;
    if (
      sessionStorage.getItem(sessionCreatorKey) === "true" ||
      !pathRoomId ||
      pathRoomId === "room"
    ) {
      isCreator = true;
      sessionStorage.setItem(sessionCreatorKey, "true");
    }

    // Message persistence: Hydrate past room message logs
    const savedMessages = localStorage.getItem(
      `watchtogether_messages_${roomId}`,
    );
    if (savedMessages) {
      try {
        messages = JSON.parse(savedMessages);
      } catch (e) {
        console.error("Failed to restore message cache:", e);
      }
    }
  }

  // Helper: determine if a URL is a cloudinary/uploaded video (not youtube)
  function isCloudinaryUrl(url) {
    if (!url) return false;
    return (
      !url.includes("youtube.com") &&
      !url.includes("youtu.be")
    );
  }

  onMount(() => {
    if (socket.disconnected) {
      socket.connect();
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    socket.on("room-state", (state) => {
      if (!state.videoUrl) return;

      currentVideoUrl = state.videoUrl;

      // YOUTUBE RESTORE
      if (
        state.videoUrl.includes("youtube.com") ||
        state.videoUrl.includes("youtu.be")
      ) {
        const videoId = extractYoutubeVideoId(state.videoUrl);

        setTimeout(() => {
          createYoutubePlayer(videoId);

          const waitForPlayer = setInterval(() => {
            if (player && playerReady) {
              clearInterval(waitForPlayer);

              player.seekTo(state.currentTime || 0, true);

              setTimeout(() => {
                if (state.playing) {
                  player.playVideo();
                } else {
                  player.pauseVideo();
                }
              }, 300);
            }
          }, 200);
        }, 300);
      }

      // CLOUDINARY RESTORE
      else {
        setTimeout(() => {
          const video = document.getElementById("cloudinary-video");

          if (!video) return;

          video.currentTime = state.currentTime || 0;

          if (state.playing) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }, 1000);
      }
    });

    socket.on("connect", () => {
      console.log("CONNECTED:", socket.id);

      socket.emit("join-room", {
        roomId,
        username: username || "Anonymous",
      });

      setTimeout(() => {
        socket.emit("request-presence", { roomId });
      }, 500);
    });

    socket.on("connect_error", (err) => {
      console.log("SOCKET ERROR:", err.message);
    });

    // Handle real-time user count sync from server rooms
    socket.on("room-presence", (data) => {
      connectedCount = data.count;
    });

    socket.on("video-synced", (data) => {
      currentVideoUrl = data.videoUrl;

      if (
        data.videoUrl.includes("youtube.com") ||
        data.videoUrl.includes("youtu.be")
      ) {
        const videoId = extractYoutubeVideoId(data.videoUrl);

        setTimeout(() => {
          createYoutubePlayer(videoId);
        }, 200);
      }
      // Cloudinary video: the <video> element will reactively render via currentVideoUrl
    });

    socket.on("video-play", (data) => {
      // Determine type from current URL if not provided
      const isCloudinary = data.type === "cloudinary" || isCloudinaryUrl(currentVideoUrl);

      if (isCloudinary) {
        const video = document.getElementById("cloudinary-video");

        if (!video) return;

        isSyncing = true;

        video.currentTime = data.time;
        video.play().catch(() => {});

        setTimeout(() => {
          isSyncing = false;
        }, 800);

        return;
      }

      // YOUTUBE
      if (!playerReady || !player) return;

      isSyncing = true;

      player.seekTo(data.time, true);
      player.playVideo();

      setTimeout(() => {
        isSyncing = false;
      }, 800);
    });

    socket.on("video-pause", (data) => {
      // Determine type from current URL if not provided
      const isCloudinary = data.type === "cloudinary" || isCloudinaryUrl(currentVideoUrl);

      if (isCloudinary) {
        const video = document.getElementById("cloudinary-video");

        if (!video) return;

        isSyncing = true;

        video.currentTime = data.time;
        video.pause();

        setTimeout(() => {
          isSyncing = false;
        }, 800);

        return;
      }

      // YOUTUBE
      if (!playerReady || !player) return;

      isSyncing = true;

      player.seekTo(data.time, true);
      player.pauseVideo();

      setTimeout(() => {
        isSyncing = false;
      }, 800);
    });

    socket.on("receive-message", (data) => {
      messages = [
        ...messages,
        {
          id: Date.now() + Math.random(),
          user: data.user,
          text: data.text,
          time: data.time,
          isHost: data.isHost ?? false,
        },
      ];

      localStorage.setItem(
        `watchtogether_messages_${roomId}`,
        JSON.stringify(messages),
      );

      setTimeout(() => {
        const scroller = document.querySelector(".message-scroller-layer");
        if (scroller) {
          scroller.scrollTop = scroller.scrollHeight;
        }
      }, 50);
    });

    socket.on("system-message", (data) => {
      messages = [
        ...messages,
        {
          id: Date.now() + Math.random(),
          user: "SYSTEM",
          text: data.text,
          time: data.time,
          isSystem: true,
        },
      ];

      localStorage.setItem(
        `watchtogether_messages_${roomId}`,
        JSON.stringify(messages),
      );

      setTimeout(() => {
        const scroller = document.querySelector(".message-scroller-layer");

        if (scroller) {
          scroller.scrollTop = scroller.scrollHeight;
        }
      }, 50);
    });

    const checkOrientation = () => {
      isMobileLandscape =
        window.innerWidth < 960 && window.innerWidth > window.innerHeight;
    };

    window.addEventListener("resize", checkOrientation);
    checkOrientation();

    setTimeout(() => {
      const scroller = document.querySelector(".message-scroller-layer");
      if (scroller) scroller.scrollTop = scroller.scrollHeight;
    }, 100);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      socket.off("connect");
      socket.off("connect_error");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("receive-message");
      socket.off("room-presence");
      socket.off("video-synced");
      socket.off("video-play");
      socket.off("video-pause");
      socket.off("room-state");
    };
  });

  function handleUsernameSubmit() {
    if (!username.trim()) return;
    localStorage.setItem("watchtogether_user", username.trim());
    isUsernameSubmitted = true;
  }

  async function copyInvite() {
    if (!roomLink) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(roomLink);
        showCopied();
        return;
      } catch (err) {
        console.warn("Clipboard API failed, trying execCommand fallback:", err);
      }
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = roomLink;
      textarea.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;opacity:0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (ok) {
        showCopied();
      } else {
        throw new Error("execCommand returned false");
      }
    } catch (err) {
      console.error("Failed to copy room link:", err);
    }
  }

  function showCopied() {
    inviteCopied = true;
    setTimeout(() => {
      inviteCopied = false;
    }, 2000);
  }

  // Triggered from the hidden input OR the File Cast panel
  async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    isUploading = true;
    uploadProgress = 0;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "watchtogether_upload");

    try {
      // Use XMLHttpRequest to track upload progress
      const data = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            uploadProgress = Math.round((e.loaded / e.total) * 100);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));

        xhr.open("POST", "https://api.cloudinary.com/v1_1/ddnw2emhi/video/upload");
        xhr.send(formData);
      });

      currentVideoUrl = data.secure_url;
      uploadedVideoType = "cloudinary";
      showFileCastPanel = false;
      isUploading = false;
      uploadProgress = 0;

      socket.emit("sync-video", {
        roomId,
        videoUrl: data.secure_url,
        publicId: data.public_id,
        type: "cloudinary",
      });

      console.log("Uploaded:", data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
      isUploading = false;
      uploadProgress = 0;
    }

    // Reset the input so the same file can be re-uploaded if needed
    event.target.value = "";
  }

  function handleMediaSubmit() {
    if (!streamInputUrl.trim()) return;

    currentVideoUrl = streamInputUrl;

    const isYT =
      streamInputUrl.includes("youtube.com") ||
      streamInputUrl.includes("youtu.be");

    socket.emit("sync-video", {
      roomId,
      videoUrl: streamInputUrl,
      type: isYT ? "youtube" : "cloudinary",
    });

    // AUTO CREATE YOUTUBE PLAYER
    if (isYT) {
      const videoId = extractYoutubeVideoId(streamInputUrl);

      setTimeout(() => {
        createYoutubePlayer(videoId);
      }, 200);
    }

    streamInputUrl = "";
  }

  function sendMessage() {
    if (!newMessage.trim()) return;

    const displayUser = username.trim() || "You";

    const messageData = {
      roomId,
      user: displayUser,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isHost: isCreator,
    };

    messages = [
      ...messages,
      {
        id: Date.now(),
        ...messageData,
      },
    ];

    localStorage.setItem(
      `watchtogether_messages_${roomId}`,
      JSON.stringify(messages),
    );

    socket.emit("send-message", messageData);
    newMessage = "";

    setTimeout(() => {
      const scroller = document.querySelector(".message-scroller-layer");
      if (scroller) {
        scroller.scrollTop = scroller.scrollHeight;
      }
    }, 50);
  }

  function createYoutubePlayer(videoId) {
    if (!videoId) return;

    // If player already exists
    if (player && playerReady) {
      player.loadVideoById(videoId);
      return;
    }

    // Wait until YouTube API loads
    const waitForYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(waitForYT);

        player = new window.YT.Player("youtube-player", {
          width: "100%",
          height: "100%",
          videoId,

          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
          },

          events: {
            onReady: (event) => {
              playerReady = true;
              event.target.playVideo();
            },

            onStateChange: handlePlayerStateChange,
          },
        });
      }
    }, 300);
  }

  function handlePlayerStateChange(event) {
    if (isSyncing || !playerReady) return;

    const currentTime = player.getCurrentTime();

    if (event.data === YT.PlayerState.PLAYING) {
      socket.emit("video-play", {
        roomId,
        time: currentTime,
        type: "youtube",
      });
    }

    if (event.data === YT.PlayerState.PAUSED) {
      socket.emit("video-pause", {
        roomId,
        time: currentTime,
        type: "youtube",
      });
    }
  }

  function handleCloudinaryPlay(event) {
    if (isSyncing) return;

    socket.emit("video-play", {
      roomId,
      time: event.target.currentTime,
      type: "cloudinary",
    });
  }

  function handleCloudinaryPause(event) {
    if (isSyncing) return;

    socket.emit("video-pause", {
      roomId,
      time: event.target.currentTime,
      type: "cloudinary",
    });
  }

  function extractYoutubeVideoId(url) {
    try {
      const parsed = new URL(url);

      let videoId = parsed.searchParams.get("v");

      if (!videoId && parsed.hostname.includes("youtu.be")) {
        videoId = parsed.pathname.slice(1);
      }

      return videoId;
    } catch {
      return null;
    }
  }

  function leaveRoom() {
    socket.disconnect();

    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  }

  function toggleFullscreenElement() {
    const container = document.querySelector(".video-canvas-viewport");

    if (!document.fullscreenElement) {
      container?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function triggerFilePicker() {
    document.getElementById("file-cast-input").click();
  }
</script>

{#if !checkingAuth && !isUsernameSubmitted}
  <div class="identity-gate-overlay">
    <div class="identity-modal-card">
      <div class="brand-logo-frame large">
        <svg
          class="logo-svg"
          viewBox="0 0 180 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z"
            fill="#0fccb4"
          />
          <polygon points="106,46 180,85 106,124" fill="#f5a623" />
          <circle cx="90" cy="85" r="10" fill="#e8f0ff" />
        </svg>
      </div>
      <h3>Enter the Room</h3>
      <p>
        Configure your nickname identity before accessing the cluster node
        pipeline.
      </p>

      <div class="gate-input-wrapper">
        <input
          type="text"
          placeholder="Type username..."
          bind:value={username}
          on:keydown={(e) => e.key === "Enter" && handleUsernameSubmit()}
        />
        <button
          type="button"
          on:click={handleUsernameSubmit}
          disabled={!username.trim()}
        >
          Join Room
        </button>
      </div>
    </div>
  </div>
{/if}

<main class="workspace-viewport" class:landscape-mode={isMobileLandscape}>
  <div class="ambient-glow decoration-left"></div>
  <div class="ambient-glow decoration-right"></div>

  <section class="media-engine-container">
    <header class="room-top-bar">
      <div class="identity-lockup">
        <a href="/" class="brand-identity-link">
          <div class="brand-logo-frame">
            <svg
              class="logo-svg"
              viewBox="0 0 180 180"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z"
                fill="#0fccb4"
              />
              <polygon points="106,46 180,85 106,124" fill="#f5a623" />
              <circle cx="90" cy="85" r="10" fill="#e8f0ff" />
            </svg>
          </div>
          <span class="app-title">WatchTogether</span>
        </a>
      </div>

      <div class="system-status">
        <button
          class="leave-room-trigger"
          title="Leave Room"
          on:click={leaveRoom}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            /></svg
          >
        </button>
      </div>
    </header>

    <div class="video-canvas-viewport">
      <div class="canvas-blur-backing"></div>

      <div class="canvas-control-overlay">
        <button
          class="fullscreen-trigger-btn"
          on:click={toggleFullscreenElement}
          title="Toggle Fullscreen"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4"
            /></svg
          >
        </button>
      </div>

      {#if currentVideoUrl}
        {#if currentVideoUrl.includes("youtube.com") || currentVideoUrl.includes("youtu.be")}
          <div id="youtube-player"></div>
        {:else}
          <video
            id="cloudinary-video"
            controls
            autoplay
            playsinline
            style="width:100%; height:100%; object-fit:contain;"
            on:play={handleCloudinaryPlay}
            on:pause={handleCloudinaryPause}
          >
            <source src={currentVideoUrl} type="video/mp4" />
          </video>
        {/if}
      {:else}
        <div class="canvas-empty-state">
          <div class="empty-state-icon">
            <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40,30 C-10,70 -10,110 40,150 L85,105 C60,85 60,45 85,25Z"
                fill="currentColor"
                opacity="0.12"
              />
              <polygon
                points="106,46 180,85 106,124"
                fill="currentColor"
                opacity="0.25"
              />
            </svg>
          </div>

          <h4>Ready to Watch</h4>

          <p>Paste a YouTube link or cast a local file to start streaming together.</p>
        </div>
      {/if}
    </div>

    <div class="source-injector-card">
      <div class="input-row">
        <svg
          class="input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          /></svg
        >
        <input
          type="text"
          placeholder="Paste a YouTube URL or video stream link..."
          bind:value={streamInputUrl}
          on:keydown={(e) => e.key === "Enter" && handleMediaSubmit()}
        />
      </div>

      <!-- File Cast Panel: shown inline when File Cast is clicked -->
      {#if showFileCastPanel}
        <div class="file-cast-panel">
          <div class="file-cast-panel-header">
            <span class="file-cast-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              File Cast
            </span>
            <button class="file-cast-close" on:click={() => (showFileCastPanel = false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {#if isUploading}
            <div class="upload-progress-wrapper">
              <div class="upload-progress-label">
                <span>Uploading…</span>
                <span>{uploadProgress}%</span>
              </div>
              <div class="upload-progress-track">
                <div class="upload-progress-bar" style="width: {uploadProgress}%"></div>
              </div>
            </div>
          {:else}
            <!-- Hidden actual file input -->
            <input
              id="file-cast-input"
              type="file"
              accept="video/*"
              style="display:none"
              on:change={handleFileUpload}
            />
            <div class="file-cast-drop-zone" on:click={triggerFilePicker}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              <p class="drop-zone-label">Click to choose a video file</p>
              <p class="drop-zone-sub">MP4, MOV, WebM, MKV supported</p>
            </div>

            <button class="file-cast-upload-btn" on:click={triggerFilePicker}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload & Cast
            </button>
          {/if}
        </div>
      {/if}

      <div class="pipeline-triggers">
        <button
          on:click={handleMediaSubmit}
          class="pipe-btn fill-blue"
          title="Screenshare"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            ><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path
              d="M8 21h8m-4-4v4"
            /></svg
          >
          <span>Screenshare</span>
        </button>
        <button
          on:click={handleMediaSubmit}
          class="pipe-btn fill-green"
          title="VBrowser"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            ><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg
          >
          <span>VBrowser</span>
        </button>
        <button
          on:click={() => (showFileCastPanel = !showFileCastPanel)}
          class="pipe-btn fill-purple"
          class:active-panel={showFileCastPanel}
          title="File Cast"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            ><path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            /><polyline points="14 2 14 8 20 8" /></svg
          >
          <span>File Cast</span>
        </button>
        <button on:click={handleMediaSubmit} class="pipe-btn action-submit">
          <svg viewBox="0 0 24 24" fill="currentColor"
            ><polygon points="5 3 19 12 5 21 5 3" /></svg
          >
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
          <span>{connectedCount} connected</span>
        </div>
      </div>

      <div class="copy-link-group">
        <div class="mock-url-display" title={roomLink}>
          {roomLink}
        </div>
        <button
          on:click={copyInvite}
          class="copy-trigger"
          class:copied={inviteCopied}
        >
          {#if inviteCopied}
            ✓ Copied
          {:else}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              ><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              /></svg
            >
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
          <div
            class="chat-card-wrapper"
            class:self-card={msg.user === username || msg.user === "You"}
            class:system-card={msg.isSystem}
          >
            <div class="chat-card-header">
              <span class="card-author" class:host-accent={msg.isHost}
                >{msg.user}</span
              >
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
            on:keydown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            type="button"
            on:click={() => sendMessage()}
            class="message-dispatch-trigger"
            class:has-text={newMessage.trim() !== ""}
            aria-label="Send Message"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              ><line x1="22" y1="2" x2="11" y2="13" /><polygon
                points="22 2 15 22 11 13 2 9 22 2"
              /></svg
            >
          </button>
        </div>
      </div>
    </div>
  </aside>
</main>

<style>
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

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html),
  :global(body) {
    height: 100%;
    width: 100%;
    background-color: var(--bg-dark-base);
    color: var(--font-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    position: relative;
  }

  .system-card {
    align-self: center;
    max-width: 100%;
  }

  .system-card .chat-card-bubble {
    background: rgba(255, 255, 255, 0.04);
    border: 1px dashed rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 8px 14px;
    text-align: center;
  }

  .system-card .chat-card-bubble p {
    color: #94a3b8;
    font-size: 0.75rem;
  }

  .system-card .card-author {
    display: none;
  }

  #youtube-player {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }

  #youtube-player iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Identity Gate Modal Styles */
  .identity-gate-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4, 8, 14, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .identity-modal-card {
    background: var(--bg-dark-surface);
    border: 1px solid var(--border-mid-line);
    border-radius: 16px;
    padding: 32px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  }
  .brand-logo-frame.large {
    width: 56px;
    height: 56px;
    margin: 0 auto 20px;
  }
  .identity-modal-card h3 {
    font-family: "Syne", sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 8px;
    color: var(--font-primary);
  }
  .identity-modal-card p {
    font-size: 0.88rem;
    color: var(--font-secondary);
    line-height: 1.5;
    margin-bottom: 24px;
  }
  .gate-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .gate-input-wrapper input {
    background: rgba(2, 4, 8, 0.6);
    border: 1px solid var(--border-mid-line);
    border-radius: 10px;
    padding: 14px;
    color: var(--font-primary);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .gate-input-wrapper input:focus {
    border-color: var(--neon-cyan);
  }
  .gate-input-wrapper button {
    background: var(--neon-cyan);
    color: var(--bg-dark-base);
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .gate-input-wrapper button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .gate-input-wrapper button:not(:disabled):hover {
    opacity: 0.9;
  }

  .ambient-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.02;
    filter: blur(100px);
    z-index: 1;
  }
  .decoration-left {
    top: -100px;
    left: -100px;
    background: var(--neon-cyan);
  }
  .decoration-right {
    bottom: -100px;
    right: 100px;
    background: var(--neon-purple);
  }

  .room-top-bar {
    height: 44px;
    padding-bottom: 8px;
    background: transparent;
    border-bottom: 1px solid var(--border-faint-line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
  }
  .brand-identity-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: inherit;
  }
  .brand-logo-frame {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .logo-svg {
    width: 100%;
    height: 100%;
  }
  .app-title {
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    font-family: "Syne", sans-serif;
  }

  .system-status {
    display: flex;
    align-items: center;
  }
  .leave-room-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f43f5e;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    background: rgba(244, 63, 94, 0.05);
    border: 1px solid rgba(244, 63, 94, 0.15);
    transition: all 0.2s;
  }
  .leave-room-trigger svg {
    width: 14px;
    height: 14px;
  }
  .leave-room-trigger:hover {
    background: #f43f5e;
    color: #fff;
    border-color: #f43f5e;
  }

  .workspace-viewport {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 380px;
    position: relative;
    z-index: 2;
  }

  .media-engine-container {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    height: 100%;
  }

  .source-injector-card {
    background: var(--glass-opacity-bg);
    backdrop-filter: var(--blur-factor);
    -webkit-backdrop-filter: var(--blur-factor);
    border: 1px solid var(--border-faint-line);
    border-radius: 14px;
    padding: 16px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }
  .input-row {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(2, 4, 8, 0.4);
    border: 1px solid var(--border-faint-line);
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 12px;
  }
  .input-icon {
    width: 16px;
    height: 16px;
    color: var(--neon-cyan);
    opacity: 0.7;
  }
  .input-row input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.85rem;
    color: var(--font-primary);
    font-family: inherit;
  }
  .input-row input::placeholder {
    color: var(--font-secondary);
    opacity: 0.6;
  }

  /* ── File Cast Panel ── */
  .file-cast-panel {
    background: rgba(139, 92, 246, 0.04);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
    animation: panel-in 0.18s ease;
  }

  @keyframes panel-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .file-cast-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .file-cast-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--neon-purple);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .file-cast-title svg {
    width: 13px;
    height: 13px;
  }

  .file-cast-close {
    background: none;
    border: none;
    color: var(--font-secondary);
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
  }
  .file-cast-close svg {
    width: 14px;
    height: 14px;
  }
  .file-cast-close:hover {
    color: var(--font-primary);
    background: rgba(255,255,255,0.05);
  }

  .file-cast-drop-zone {
    border: 1px dashed rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: border-color 0.2s, background 0.2s;
  }
  .file-cast-drop-zone:hover {
    border-color: rgba(139, 92, 246, 0.6);
    background: rgba(139, 92, 246, 0.06);
  }
  .file-cast-drop-zone svg {
    width: 26px;
    height: 26px;
    color: var(--neon-purple);
    opacity: 0.7;
    margin-bottom: 2px;
  }
  .drop-zone-label {
    font-size: 0.82rem;
    color: var(--font-primary);
    font-weight: 600;
  }
  .drop-zone-sub {
    font-size: 0.72rem;
    color: var(--font-secondary);
  }

  .file-cast-upload-btn {
    width: 100%;
    background: var(--neon-purple);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .file-cast-upload-btn svg {
    width: 14px;
    height: 14px;
  }
  .file-cast-upload-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  /* Upload progress */
  .upload-progress-wrapper {
    padding: 4px 0 2px;
  }
  .upload-progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--font-secondary);
    margin-bottom: 8px;
  }
  .upload-progress-track {
    height: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .upload-progress-bar {
    height: 100%;
    background: var(--neon-purple);
    border-radius: 99px;
    transition: width 0.2s ease;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
  }

  /* Active state for File Cast button */
  .pipe-btn.active-panel {
    background: rgba(139, 92, 246, 0.12);
    border-color: rgba(139, 92, 246, 0.35);
    color: var(--neon-purple);
  }

  .pipeline-triggers {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .pipe-btn {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-faint-line);
    color: var(--font-secondary);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }
  .pipe-btn svg {
    width: 12px;
    height: 12px;
  }
  .pipe-btn:hover {
    color: var(--font-primary);
    background: rgba(255, 255, 255, 0.05);
  }

  .fill-blue:hover {
    background: rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.25);
    color: var(--neon-blue);
  }
  .fill-green:hover {
    background: rgba(16, 185, 129, 0.08);
    border-color: rgba(16, 185, 129, 0.25);
    color: var(--neon-green);
  }
  .fill-purple:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.25);
    color: var(--neon-purple);
  }

  .pipe-btn.action-submit {
    margin-left: auto;
    background: var(--neon-cyan);
    color: var(--bg-dark-base);
    font-weight: 700;
    border: none;
  }
  .pipe-btn.action-submit:hover {
    opacity: 0.95;
  }

  .video-canvas-viewport {
    flex: 1;
    background: #020408;
    border-radius: 14px;
    border: 1px solid var(--border-faint-line);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 320px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  .canvas-blur-backing {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background: radial-gradient(
      circle at center,
      var(--neon-cyan),
      transparent 60%
    );
  }

  .canvas-control-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
  }
  .fullscreen-trigger-btn {
    background: rgba(4, 8, 14, 0.6);
    border: 1px solid var(--border-faint-line);
    color: var(--font-primary);
    border-radius: 6px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition:
      background 0.2s,
      border-color 0.2s;
  }
  .fullscreen-trigger-btn:hover {
    background: rgba(4, 8, 14, 0.8);
    border-color: rgba(255, 255, 255, 0.2);
  }
  .fullscreen-trigger-btn svg {
    width: 14px;
    height: 14px;
    color: var(--neon-cyan);
  }

  .canvas-empty-state {
    text-align: center;
    max-width: 380px;
    padding: 24px;
    position: relative;
    z-index: 2;
  }
  .empty-state-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 16px;
    color: var(--neon-cyan);
  }
  .canvas-empty-state h4 {
    font-size: 1.1rem;
    font-family: "Syne", sans-serif;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .canvas-empty-state p {
    font-size: 0.82rem;
    color: var(--font-secondary);
    line-height: 1.5;
  }

  .dashboard-sidebar-container {
    background: var(--bg-dark-surface);
    border-left: 1px solid var(--border-faint-line);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .invite-management-surface {
    padding: 20px;
    border-bottom: 1px solid var(--border-faint-line);
  }
  .surface-meta-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .surface-meta-header h5 {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--font-secondary);
  }

  .live-counter {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--neon-green);
  }
  .pulse-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--neon-green);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    100% {
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
  }

  .copy-link-group {
    display: flex;
    background: rgba(2, 4, 8, 0.4);
    border: 1px solid var(--border-faint-line);
    border-radius: 6px;
    padding: 4px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .mock-url-display {
    padding-left: 8px;
    font-size: 0.78rem;
    color: var(--font-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: monospace;
    flex: 1;
    min-width: 0;
  }
  .copy-trigger {
    background: var(--font-primary);
    color: var(--bg-dark-base);
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    transition:
      background 0.2s,
      color 0.2s;
  }
  .copy-trigger svg {
    width: 10px;
    height: 10px;
  }
  .copy-trigger.copied {
    background: var(--neon-green);
    color: #fff;
  }

  .chat-module-surface {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  .module-navigation-tabs {
    padding: 14px 20px;
    border-bottom: 1px solid var(--border-faint-line);
  }
  .tab-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--font-primary);
    opacity: 0.8;
  }
  .message-scroller-layer {
    flex: 1;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .chat-card-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 88%;
    align-self: flex-start;
    position: relative;
  }
  .chat-card-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    padding: 0 4px;
  }
  .card-author {
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--neon-purple);
  }
  .card-author.host-accent {
    color: var(--neon-cyan);
  }
  .host-tag {
    font-size: 0.58rem;
    font-weight: 900;
    background: rgba(15, 204, 180, 0.15);
    color: var(--neon-cyan);
    padding: 1px 4px;
    border-radius: 3px;
    letter-spacing: 0.02em;
  }
  .card-time {
    font-size: 0.62rem;
    color: var(--font-secondary);
    font-family: monospace;
    margin-left: auto;
  }

  .chat-card-bubble {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-faint-line);
    border-radius: 16px 16px 16px 2px;
    padding: 12px 16px;
    box-shadow: -4px 8px 24px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.2s,
      border-color 0.2s;
  }
  .chat-card-bubble:hover {
    transform: translateY(-2px) scale(1.01);
    border-color: var(--border-mid-line);
  }
  .chat-card-bubble p {
    font-size: 0.85rem;
    color: var(--font-primary);
    opacity: 0.92;
    line-height: 1.5;
    word-break: break-word;
  }

  .chat-card-wrapper.self-card {
    align-self: flex-end;
  }
  .chat-card-wrapper.self-card .chat-card-bubble {
    border-radius: 16px 16px 2px 16px;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.08) 0%,
      rgba(59, 130, 246, 0.02) 100%
    );
    border-color: rgba(59, 130, 246, 0.2);
    box-shadow: 4px 8px 24px rgba(59, 130, 246, 0.06);
  }
  .chat-card-wrapper.self-card .card-author {
    color: var(--neon-blue);
  }

  .feed-input-footer {
    padding: 16px 20px 20px;
    border-top: 1px solid var(--border-faint-line);
    background: linear-gradient(to top, rgba(4, 8, 14, 0.4), transparent);
  }
  .chat-input-wrapper {
    display: flex;
    background: rgba(2, 4, 8, 0.5);
    border: 1px solid var(--border-faint-line);
    border-radius: 12px;
    padding: 4px 4px 4px 14px;
    align-items: center;
    gap: 10px;
    transition:
      border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .chat-input-wrapper:focus-within {
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.08);
  }
  .chat-input-wrapper input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.85rem;
    color: var(--font-primary);
    font-family: inherit;
  }
  .chat-input-wrapper input::placeholder {
    color: var(--font-secondary);
    opacity: 0.5;
  }

  .message-dispatch-trigger {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.01);
    color: var(--font-secondary);
    border: 1px solid var(--border-faint-line);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.25s ease;
  }
  .message-dispatch-trigger svg {
    width: 13px;
    height: 13px;
  }
  .message-dispatch-trigger.has-text {
    background: var(--neon-blue);
    color: #fff;
    border-color: var(--neon-blue);
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.35);
  }
  .message-dispatch-trigger.has-text:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    .workspace-viewport {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .media-engine-container {
      padding: 12px;
      gap: 12px;
      overflow: visible;
      height: auto;
    }
    .room-top-bar {
      height: 40px;
      padding-bottom: 4px;
    }
    .video-canvas-viewport {
      min-height: calc(56.25vw - 24px);
      border-radius: 10px;
    }
    .canvas-empty-state {
      padding: 16px;
    }
    .empty-state-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 12px;
    }
    .canvas-empty-state h4 {
      font-size: 0.95rem;
    }
    .canvas-empty-state p {
      font-size: 0.78rem;
    }
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
      margin: 0;
    }
    .pipe-btn span {
      display: none;
    }
    .pipe-btn.action-submit span {
      display: inline;
    }
    .dashboard-sidebar-container {
      border-left: none;
      border-top: 1px solid var(--border-faint-line);
      height: 400px;
      background: linear-gradient(
        to bottom,
        var(--bg-dark-surface),
        var(--bg-dark-base)
      );
    }
    .invite-management-surface {
      padding: 14px 16px;
    }
    .message-scroller-layer {
      padding: 14px 16px;
    }
    .feed-input-footer {
      padding: 10px 16px 16px;
    }
  }

  .workspace-viewport.landscape-mode {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: -webkit-fill-available !important;
    display: block !important;
    z-index: 99999 !important;
    background: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .workspace-viewport.landscape-mode .media-engine-container {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
    display: block !important;
    z-index: 100 !important;
  }
  .workspace-viewport.landscape-mode .room-top-bar,
  .workspace-viewport.landscape-mode .source-injector-card,
  .workspace-viewport.landscape-mode .dashboard-sidebar-container,
  .workspace-viewport.landscape-mode .ambient-glow {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  .workspace-viewport.landscape-mode .video-canvas-viewport {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: -webkit-fill-available !important;
    max-width: 100% !important;
    max-height: 100% !important;
    border-radius: 0 !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: 200 !important;
  }

  .video-canvas-viewport:fullscreen {
    padding: 0 !important;
    background: #000;
    border: none !important;
    border-radius: 0 !important;
  }
  .video-canvas-viewport:fullscreen .canvas-control-overlay {
    top: 24px;
    right: 24px;
  }
</style>