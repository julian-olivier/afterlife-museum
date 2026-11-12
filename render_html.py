"""
Renders the 100% 3D Google Earth-style Virtual Museum Exhibition website into index.html.
Removes 2D catalog and download button per user requirements.
"""

from build_exhibit_data import EXHIBIT_DATA

def build_html():
    d = EXHIBIT_DATA
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{d['title']}</title>
    <meta name="description" content="{d['subtitle']} - An interactive 3D virtual museum exhibition exploring afterlife mythologies across Ancient Egypt, Ancient Greece, Norse Scandinavia, Han China, and Indigenous North America.">
    <meta name="author" content="{d['student_name']}">
    
    <!-- Google Fonts: Editorial Serif + Crisp Modern Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Main Exhibition Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏛️</text></svg>">
</head>
<body class="museum-dark">

    <!-- Top Navigation Bar -->
    <header class="museum-header" id="header">
        <div class="nav-container">
            <div class="brand">
                <span class="museum-badge">{d['course']}</span>
                <span class="brand-title">THE THRESHOLD OF ETERNITY</span>
            </div>
            
            <nav class="nav-links" id="nav-menu">
                <button class="nav-teleport-btn active" data-teleport="entrance">🏛️ Rotunda</button>
                <button class="nav-teleport-btn" data-teleport="egypt">🪶 I: Egypt</button>
                <button class="nav-teleport-btn" data-teleport="greece">🏺 II: Greece</button>
                <button class="nav-teleport-btn" data-teleport="norse">⚔️ III: Norse</button>
                <button class="nav-teleport-btn" data-teleport="china">📜 IV: China</button>
                <button class="nav-teleport-btn" data-teleport="native">🌌 V: Native America</button>
                <button class="nav-teleport-btn" data-teleport="synthesis">⚖️ Synthesis &amp; Sources</button>
            </nav>

            <div class="nav-actions">
                <button class="theme-toggle" id="theme-toggle" title="Switch Gallery Lighting">
                    <span id="theme-icon">🌙</span>
                </button>
                <button class="mobile-menu-btn" id="mobile-toggle" aria-label="Toggle navigation menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </header>

    <!-- ==========================================================================
         PRIMARY 3D VIRTUAL MUSEUM VIEWPORT (GOOGLE EARTH STYLE)
         ========================================================================== -->
    <main id="museum-viewport-3d" class="museum-3d-wrapper">
        <div id="museum-canvas-container" class="museum-3d-canvas"></div>

        <!-- 3D HUD: Current Location Banner -->
        <div class="hud-top-bar">
            <div class="hud-location-badge">
                <span class="hud-pin">📍</span>
                <span id="hud-current-wing">Grand Rotunda: Curatorial Entrance &amp; Thesis</span>
            </div>
            <div class="hud-tour-controls">
                <div id="hud-tour-timer-pill" class="hud-tour-timer-pill" aria-live="polite">
                    <span class="timer-sand">⏳</span>
                    <span id="hud-tour-timer-text">Next: <strong>Wing I: Egypt</strong> in <strong>9s</strong></span>
                    <div class="hud-tour-progress"><div id="hud-tour-progress-fill" class="hud-tour-progress-bar"></div></div>
                </div>
                <button id="start-tour-btn" class="hud-tour-btn" title="Start automated cinematic tour through all wings">
                    <span class="icon">🎬</span> Start Guided Tour
                </button>
            </div>
        </div>

        <!-- 3D HUD: Google Earth Style Interaction Hints -->
        <div class="hud-controls-hint">
            <div class="hint-pill highlight">
                <span class="key-icon">🏛️</span> Select Any Wing on the Task Bar to Travel
            </div>
            <div class="hint-pill">
                <span class="key-icon">🖱️</span> Click &amp; Drag to Look 360°
            </div>
            <div class="hint-pill">
                <span class="key-icon">✦</span> Click Exhibit or Press <span class="key-combo">E</span> to Read
            </div>
        </div>

        <!-- 3D HUD: Bottom Teleport Dock -->
        <div class="hud-bottom-dock">
            <div class="dock-container">
                <span class="dock-label">SIGNIFICANT LOCATIONS:</span>
                <button class="dock-btn active" data-teleport="entrance">🏛️ Rotunda</button>
                <button class="dock-btn" data-teleport="egypt">🪶 Wing I: Egypt</button>
                <button class="dock-btn" data-teleport="greece">🏺 Wing II: Greece</button>
                <button class="dock-btn" data-teleport="norse">⚔️ Wing III: Norse</button>
                <button class="dock-btn" data-teleport="china">📜 Wing IV: China</button>
                <button class="dock-btn" data-teleport="native">🌌 Wing V: Native America</button>
                <button class="dock-btn" data-teleport="synthesis">⚖️ Synthesis &amp; Sources</button>
            </div>
        </div>
    </main>

    <!-- ==========================================================================
         CURATORIAL READING & ARTIFACT LIGHTBOX MODAL
         Triggered by clicking any 3D exhibit in the museum
         ========================================================================== -->
    <div id="artifact-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="modal-container">
            <button class="modal-close-btn" id="modal-close" aria-label="Close Lightbox">&times;</button>
            <div class="modal-content">
                <div class="modal-image-col">
                    <div class="modal-img-wrap">
                        <img id="modal-img" src="" alt="Artifact Lightbox View">
                    </div>
                    <div class="modal-controls">
                        <button id="zoom-in-btn" class="ctrl-btn" title="Zoom In">+</button>
                        <button id="zoom-out-btn" class="ctrl-btn" title="Zoom Out">−</button>
                        <button id="zoom-reset-btn" class="ctrl-btn" title="Reset Zoom">Reset</button>
                    </div>
                </div>
                <div class="modal-info-col">
                    <span class="modal-wing-badge" id="modal-wing-badge">Wing I</span>
                    <h3 id="modal-title" class="modal-artifact-title">Artifact Title</h3>
                    
                    <dl class="modal-meta-list">
                        <div><dt>Culture / Origin:</dt> <dd id="modal-culture">Culture</dd></div>
                        <div><dt>Period / Date:</dt> <dd id="modal-date">Date</dd></div>
                        <div><dt>Medium / Materials:</dt> <dd id="modal-medium">Medium</dd></div>
                        <div><dt>Dimensions:</dt> <dd id="modal-dimensions">Dimensions</dd></div>
                        <div><dt>Repository / Accession:</dt> <dd id="modal-repository">Repository</dd></div>
                    </dl>

                    <div class="modal-analysis-box">
                        <h4>Mythological &amp; Societal Analysis</h4>
                        <div id="modal-scholarly-text" class="scholarly-full-text"></div>
                    </div>

                    <div class="modal-analysis-box">
                        <h4>Visual &amp; Thematic Connection</h4>
                        <p id="modal-analysis">Analysis text</p>
                    </div>

                    <div class="modal-actions-row">
                        <button class="modal-next-btn" id="modal-next-btn">Next Exhibition Wing ➔</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CENTRAL THESIS MODAL (TRIGGERED WHEN CLICKING ROTUNDA MONUMENT) -->
    <div id="thesis-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="modal-container thesis-modal-box">
            <button class="modal-close-btn" id="thesis-modal-close" aria-label="Close Thesis Modal">&times;</button>
            <div class="thesis-modal-content">
                <div class="plaque-header">
                    <span class="gold-icon">🏛️</span>
                    <span class="plaque-tag">CURATORIAL THESIS &amp; FRAMEWORK</span>
                </div>
                <h2 class="thesis-modal-title">{d['title']}</h2>
                <p class="thesis-modal-subtitle">{d['subtitle']}</p>
                
                <div class="thesis-highlight-card">
                    <h3>Thesis Statement</h3>
                    <p>{d['thesis']}</p>
                </div>

                <div class="curatorial-intro-block">
                    <h3>Exhibition Introduction</h3>
                    <p>{d['introduction']}</p>
                </div>

                <div class="framework-summary-grid">
                    <div class="fw-card">
                        <span class="fw-num">I</span>
                        <h4>Ancient Egypt</h4>
                        <p>Restoration of cosmic harmony (<em>ma'at</em>); moral judgment via Weighing of the Heart.</p>
                    </div>
                    <div class="fw-card">
                        <span class="fw-num">II</span>
                        <h4>Ancient Greece</h4>
                        <p>Shadowy Hades; insubstantial shades elevating mortal civic glory (<em>kleos</em>).</p>
                    </div>
                    <div class="fw-card">
                        <span class="fw-num">III</span>
                        <h4>Norse Mythology</h4>
                        <p>Martial fatalism; einherjar summoned to Valhalla for doom at Ragnarök.</p>
                    </div>
                    <div class="fw-card">
                        <span class="fw-num">IV</span>
                        <h4>Ancient China</h4>
                        <p>Dual soul (<em>hun</em> &amp; <em>po</em>); Han imperial bureaucracy &amp; filial piety (<em>xiao</em>).</p>
                    </div>
                    <div class="fw-card">
                        <span class="fw-num">V</span>
                        <h4>Native North America</h4>
                        <p>Celestial Path of Souls (<em>Wanagi Tacanku</em>); living relational web across the cosmos.</p>
                    </div>
                </div>

                <div class="modal-actions-row">
                    <button class="modal-next-btn" onclick="document.getElementById('thesis-modal').classList.remove('open'); document.body.classList.remove('modal-active'); if(window.museumInstance) {{ window.museumInstance.resumeTourFromInspection(); window.museumInstance.teleportTo('egypt'); }}">Enter Wing I: Ancient Egypt ➔</button>
                </div>
            </div>
        </div>
    </div>

    <!-- SYNTHESIS & WORKS CITED MODAL (TRIGGERED WHEN CLICKING SYNTHESIS BOARD) -->
    <div id="synthesis-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="modal-container synthesis-modal-box">
            <button class="modal-close-btn" id="synthesis-modal-close" aria-label="Close Synthesis Modal">&times;</button>
            <div class="synthesis-modal-content">
                <div class="plaque-header">
                    <span class="gold-icon">⚖️</span>
                    <span class="plaque-tag">COMPARATIVE SYNTHESIS &amp; WORKS CITED</span>
                </div>
                <h2 class="thesis-modal-title">Comparative Curatorial Synthesis &amp; Conclusion</h2>
                
                <div class="synthesis-text-block">
    """

    for p in d["synthesis"].split("\n\n"):
        html += f"<p class='scholarly-p'>{p}</p>"

    html += f"""
                </div>

                <h3 class="modal-subheading">Works Cited (MLA 9th Edition)</h3>
                <p class="modal-subtext">Incorporating 14 peer-reviewed scholarly monographs, university press books, and classical primary epics.</p>

                <div class="modal-bibliography-list">
    """

    for entry in d["works_cited"]:
        html += f"""
                    <div class="citation-card">
                        <div class="citation-header">
                            <span class="pub-type-badge">{entry['type']}</span>
                            <span class="pub-press-badge">{entry['publisher']}</span>
                            <button class="copy-cit-btn" data-cit="{entry['citation']}" title="Copy MLA Citation">
                                <span class="copy-icon">📋</span> Copy MLA
                            </button>
                        </div>
                        <p class="citation-text">{entry['citation']}</p>
                        <p class="citation-annotation"><em>Context:</em> {entry['annotation']}</p>
                    </div>
        """

    html += f"""
                </div>
            </div>
        </div>
    </div>

    <!-- Three.js 3D Engine & Libraries -->
    <script src="assets/js/three.min.js"></script>
    <script src="assets/js/OrbitControls.js"></script>
    <script src="assets/js/tween.umd.js"></script>
    <script src="assets/js/artifact_textures.js"></script>
    <script src="assets/js/museum3d.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>
"""
    return html

if __name__ == "__main__":
    content = build_html()
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("Rendered 100% 3D Google Earth-style index.html successfully!")
