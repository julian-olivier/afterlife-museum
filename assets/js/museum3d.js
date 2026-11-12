/**
 * THE THRESHOLD OF ETERNITY: TRUE FIRST-PERSON POV 3D MUSEUM ENGINE
 * Built with Three.js (r128) and TWEEN.js
 * Course: CLT 2375 • Comparative Mythology
 * 
 * Features:
 * - 100% True First-Person Point of View (POV): Camera turns on its own axis (Yaw & Pitch)
 * - Zero clipping or ending up outside the building: Camera position is locked to eye-level inside museum
 * - Google Earth-style point-to-point travel: Select any wing on the task bar (top nav or bottom dock)
 * - 360° panoramic examination at each significant station
 * - Clickable 3D artifacts and reading stelae triggering curatorial reading lightbox
 * - Guided automatic cinematic tour with live countdown timer across all 5 wings
 */

class Museum3D {
    constructor() {
        this.container = document.getElementById('museum-canvas-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Interactive 3D objects
        this.interactiveObjects = []; // Exhibits (artifacts, stelae, monuments)
        this.hoveredObject = null;
        this.currentLocation = 'entrance';
        this.isTraveling = false;

        // TRUE FIRST-PERSON POV CAMERA ROTATION (PITCH & YAW)
        this.yaw = 0;              // Horizontal look angle in radians
        this.pitch = 0;            // Vertical look angle in radians (clamped)
        this.cameraHeight = 2.2;   // Fixed eye-level height in units/meters
        this.isDragging = false;
        this.mouseDownPos = { x: 0, y: 0 };
        this.prevMousePos = { x: 0, y: 0 };

        // Guided Tour state with active countdown timer
        this.tourIndex = 0;
        this.isTourRunning = false;
        this.isTourPaused = false;
        this.tourTimeout = null;
        this.tourDuration = 9; // seconds to view each wing
        this.tourSecondsLeft = 9;
        this.tourTimerInterval = null;
        this.tourWaypoints = [
            'entrance',
            'egypt',
            'greece',
            'norse',
            'china',
            'native',
            'synthesis'
        ];

        // The 7 Significant Locations in the Museum
        this.waypoints = {
            entrance: {
                id: 'entrance',
                label: "🏛️ Grand Rotunda & Thesis",
                shortLabel: "Rotunda",
                badgeText: "📍 Grand Rotunda",
                beaconPos: { x: 0, y: 0.05, z: 12 },
                camPos: { x: 0, y: 2.2, z: 12 },
                target: { x: 0, y: 2.2, z: 0 },
                title: "Grand Rotunda: Curatorial Entrance & Thesis"
            },
            egypt: {
                id: 'egypt',
                label: "🪶 Wing I: Ancient Egypt",
                shortLabel: "Wing I: Egypt",
                badgeText: "📍 Wing I: Egypt",
                beaconPos: { x: 0, y: 0.05, z: -26 },
                camPos: { x: 0, y: 2.3, z: -26 },
                target: { x: 0, y: 4.5, z: -44 },
                title: "Wing I: Ancient Egypt — The Duat and Ma'at"
            },
            greece: {
                id: 'greece',
                label: "🏺 Wing II: Ancient Greece",
                shortLabel: "Wing II: Greece",
                badgeText: "📍 Wing II: Greece",
                beaconPos: { x: 24, y: 0.05, z: -12 },
                camPos: { x: 24, y: 2.3, z: -12 },
                target: { x: 44, y: 4.5, z: -12 },
                title: "Wing II: Ancient Greece — Hades & The Homeric Psyche"
            },
            norse: {
                id: 'norse',
                label: "⚔️ Wing III: Norse Mythology",
                shortLabel: "Wing III: Norse",
                badgeText: "📍 Wing III: Norse",
                beaconPos: { x: 24, y: 0.05, z: 24 },
                camPos: { x: 24, y: 2.3, z: 24 },
                target: { x: 44, y: 4.5, z: 24 },
                title: "Wing III: Norse Mythology — Valhalla & Helheim"
            },
            china: {
                id: 'china',
                label: "📜 Wing IV: Ancient China",
                shortLabel: "Wing IV: China",
                badgeText: "📍 Wing IV: China",
                beaconPos: { x: -24, y: 0.05, z: -12 },
                camPos: { x: -24, y: 2.3, z: -12 },
                target: { x: -44, y: 4.5, z: -12 },
                title: "Wing IV: Ancient China — Hun & Po Dualism"
            },
            native: {
                id: 'native',
                label: "🌌 Wing V: Native North America",
                shortLabel: "Wing V: Native America",
                badgeText: "📍 Wing V: Native America",
                beaconPos: { x: -24, y: 0.05, z: 24 },
                camPos: { x: -24, y: 2.3, z: 24 },
                target: { x: -44, y: 4.5, z: 24 },
                title: "Wing V: Native North America — The Path of Souls"
            },
            synthesis: {
                id: 'synthesis',
                label: "⚖️ Synthesis & Works Cited",
                shortLabel: "Synthesis & Sources",
                badgeText: "📍 Synthesis & Sources",
                beaconPos: { x: 0, y: 0.05, z: 26 },
                camPos: { x: 0, y: 2.5, z: 26 },
                target: { x: 0, y: 5.5, z: 44 },
                title: "Comparative Matrix & Works Cited Gallery"
            }
        };

        this.init();
    }

    init() {
        // 1. Scene Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x06080d);
        this.scene.fog = new THREE.FogExp2(0x06080d, 0.012);

        // 2. Camera Setup (Fixed Eye Level, Pure POV Orientation)
        this.camera = new THREE.PerspectiveCamera(
            58,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            300
        );
        this.camera.position.set(0, this.cameraHeight, 12);
        this.camera.rotation.order = 'YXZ'; // Yaw then Pitch (prevents roll)

        // Set initial orientation looking toward rotunda center
        this.lookAtTarget(0, 2.2, 0);

        // 3. Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.05;
        this.container.appendChild(this.renderer.domElement);

        // 4. Build Museum Architecture & Exhibition Galleries
        this.createLighting();
        this.createArchitecture();
        this.createCentralMonument();
        this.createExhibitionWings();
        this.createSynthesisGallery();

        // 5. Setup True First-Person Mouse Drag / Touch Look Listeners
        this.setupFirstPersonControls();
        this.setupEventListeners();

        // 6. Start Animation Loop
        this.clock = new THREE.Clock();
        this.animate();

        // Update initial status
        this.updateHUDLocation("Grand Rotunda: Curatorial Entrance & Thesis");
    }

    /* ==========================================================================
       TRUE FIRST-PERSON POV CONTROLS (PITCH & YAW)
       Camera stays anchored at eye-level at the waypoint; dragging turns your head
       ========================================================================== */
    setupFirstPersonControls() {
        // Mouse Down
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.mouseDownPos = { x: e.clientX, y: e.clientY };
            this.prevMousePos = { x: e.clientX, y: e.clientY };
        });

        // Window Mouse Move (Smooth rotation without leaving canvas)
        window.addEventListener('mousemove', (e) => {
            // Update Raycaster coordinates for hovering
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            if (this.isDragging && !this.isTraveling) {
                const deltaX = e.clientX - this.prevMousePos.x;
                const deltaY = e.clientY - this.prevMousePos.y;
                this.prevMousePos = { x: e.clientX, y: e.clientY };

                const sensitivity = 0.0032;
                this.yaw -= deltaX * sensitivity;
                this.pitch -= deltaY * sensitivity;

                // Clamp pitch so you don't flip backwards
                const maxPitch = Math.PI * 0.44; // ~79 degrees
                this.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.pitch));

                this.updateCameraRotation();
            } else if (!this.isDragging) {
                this.checkRaycastHover();
            }
        });

        // Mouse Up
        window.addEventListener('mouseup', (e) => {
            if (this.isDragging) {
                this.isDragging = false;
            }
        });

        // Touch Controls for Tablets & Mobile
        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.mouseDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches.length === 1 && !this.isTraveling) {
                const deltaX = e.touches[0].clientX - this.prevMousePos.x;
                const deltaY = e.touches[0].clientY - this.prevMousePos.y;
                this.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

                const sensitivity = 0.0038;
                this.yaw -= deltaX * sensitivity;
                this.pitch -= deltaY * sensitivity;

                const maxPitch = Math.PI * 0.44;
                this.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.pitch));

                this.updateCameraRotation();
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // Mouse Wheel for Subtle Localized Zoom (FOV Adjustment)
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (!this.isTraveling) {
                this.camera.fov += e.deltaY * 0.035;
                this.camera.fov = Math.max(42, Math.min(65, this.camera.fov));
                this.camera.updateProjectionMatrix();
            }
        }, { passive: false });
    }

    updateCameraRotation() {
        this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
    }

    lookAtTarget(tx, ty, tz) {
        const dx = tx - this.camera.position.x;
        const dy = ty - this.camera.position.y;
        const dz = tz - this.camera.position.z;
        this.yaw = Math.atan2(-dx, -dz);
        this.pitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
        this.updateCameraRotation();
    }

    /* ==========================================================================
       NAVIGATION ENGINE
       Navigation is handled purely through the top navigation bar & bottom dock task bars.
       ========================================================================== */

    /* ==========================================================================
       PROCEDURAL TEXTURE GENERATORS
       ========================================================================== */
    createFloorTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f131c';
        ctx.fillRect(0, 0, 1024, 1024);

        const tileSize = 256;
        for (let x = 0; x < 1024; x += tileSize) {
            for (let y = 0; y < 1024; y += tileSize) {
                const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
                ctx.fillStyle = isAlt ? '#141a26' : '#0d1118';
                ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

                ctx.strokeStyle = isAlt ? 'rgba(212, 175, 55, 0.04)' : 'rgba(255, 255, 255, 0.03)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + Math.random() * tileSize, y);
                ctx.bezierCurveTo(
                    x + Math.random() * tileSize, y + tileSize * 0.5,
                    x + Math.random() * tileSize, y + tileSize * 0.8,
                    x + Math.random() * tileSize, y + tileSize
                );
                ctx.stroke();

                ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
                ctx.fillRect(x, y, 4, 4);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(16, 16);
        return texture;
    }

    createWallTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#171c28';
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 512, 256);
        ctx.strokeRect(0, 256, 512, 256);

        ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.fillRect(0, 500, 512, 12);

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 2);
        return texture;
    }

    createPlaqueTexture(wingNum, cultureName, title, textSnippet) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#111520';
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 984, 984);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, 952, 952);

        ctx.fillStyle = '#d4af37';
        ctx.fillRect(20, 20, 24, 24);
        ctx.fillRect(980, 20, 24, 24);
        ctx.fillRect(20, 980, 24, 24);
        ctx.fillRect(980, 980, 24, 24);

        ctx.font = 'bold 36px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText(`EXHIBITION WING ${wingNum}`, 512, 95);

        ctx.font = 'bold 52px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(cultureName.toUpperCase(), 512, 165);

        ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#e6c875';
        ctx.fillText(title, 512, 225);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(250, 255);
        ctx.lineTo(774, 255);
        ctx.stroke();

        ctx.font = '28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#e0e4ec';
        ctx.textAlign = 'left';

        const wrapText = (text, x, y, maxWidth, lineHeight) => {
            const words = text.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
            return y;
        };

        wrapText(textSnippet, 70, 315, 884, 42);

        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText("✦ CLICK EXHIBIT OR PRESS [E] TO INSPECT FULL SCHOLARLY ESSAY ✦", 512, 940);

        return new THREE.CanvasTexture(canvas);
    }

    /* ==========================================================================
       MUSEUM LIGHTING SYSTEM
       ========================================================================== */
    createLighting() {
        const ambientLight = new THREE.AmbientLight(0xfff7e6, 0.45);
        this.scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0x223355, 0x111622, 0.35);
        this.scene.add(hemiLight);

        const centerLight = new THREE.PointLight(0xffecd1, 1.2, 45);
        centerLight.position.set(0, 14, 0);
        centerLight.castShadow = true;
        centerLight.shadow.mapSize.width = 1024;
        centerLight.shadow.mapSize.height = 1024;
        centerLight.shadow.bias = -0.001;
        this.scene.add(centerLight);

        const chandelierGeo = new THREE.CylinderGeometry(4, 2, 0.5, 16);
        const chandelierMat = new THREE.MeshBasicMaterial({ color: 0xffe29a });
        const chandelier = new THREE.Mesh(chandelierGeo, chandelierMat);
        chandelier.position.set(0, 14.2, 0);
        this.scene.add(chandelier);
    }

    addExhibitSpotlight(x, y, z, targetX, targetY, targetZ, color = 0xfff4db) {
        const spot = new THREE.SpotLight(color, 2.5);
        spot.position.set(x, y, z);
        spot.angle = Math.PI / 6;
        spot.penumbra = 0.45;
        spot.decay = 1.6;
        spot.distance = 45;
        spot.castShadow = true;
        spot.shadow.mapSize.width = 1024;
        spot.shadow.mapSize.height = 1024;

        const targetObj = new THREE.Object3D();
        targetObj.position.set(targetX, targetY, targetZ);
        this.scene.add(targetObj);
        spot.target = targetObj;

        this.scene.add(spot);
        return spot;
    }

    /* ==========================================================================
       MUSEUM ARCHITECTURE
       ========================================================================== */
    createArchitecture() {
        const floorTex = this.createFloorTexture();
        const wallTex = this.createWallTexture();

        const floorGeo = new THREE.PlaneGeometry(90, 90);
        const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.25, metalness: 0.15 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        const ceilingGeo = new THREE.PlaneGeometry(90, 90);
        const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x111520, roughness: 0.8 });
        const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
        ceiling.position.y = 15;
        ceiling.rotation.x = Math.PI / 2;
        this.scene.add(ceiling);

        const skylightGeo = new THREE.CircleGeometry(10, 32);
        const skylightMat = new THREE.MeshBasicMaterial({ color: 0x1d283e, transparent: true, opacity: 0.85 });
        const skylight = new THREE.Mesh(skylightGeo, skylightMat);
        skylight.position.set(0, 14.9, 0);
        skylight.rotation.x = Math.PI / 2;
        this.scene.add(skylight);

        const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.7, metalness: 0.1 });

        const northWall = new THREE.Mesh(new THREE.BoxGeometry(90, 15, 1.5), wallMat);
        northWall.position.set(0, 7.5, -45);
        northWall.receiveShadow = true;
        this.scene.add(northWall);

        const southWall = new THREE.Mesh(new THREE.BoxGeometry(90, 15, 1.5), wallMat);
        southWall.position.set(0, 7.5, 45);
        southWall.receiveShadow = true;
        this.scene.add(southWall);

        const eastWall = new THREE.Mesh(new THREE.BoxGeometry(1.5, 15, 90), wallMat);
        eastWall.position.set(45, 7.5, 0);
        eastWall.receiveShadow = true;
        this.scene.add(eastWall);

        const westWall = new THREE.Mesh(new THREE.BoxGeometry(1.5, 15, 90), wallMat);
        westWall.position.set(-45, 7.5, 0);
        westWall.receiveShadow = true;
        this.scene.add(westWall);

        const columnCoords = [
            [-12, -12], [12, -12],
            [-12, 12], [12, 12],
            [-28, -28], [28, -28],
            [-28, 28], [28, 28]
        ];

        columnCoords.forEach(([cx, cz]) => {
            this.createColumn(cx, cz);
        });
    }

    createColumn(x, z) {
        const colGroup = new THREE.Group();
        colGroup.position.set(x, 0, z);

        const colMat = new THREE.MeshStandardMaterial({ color: 0x222a3a, roughness: 0.35, metalness: 0.15 });

        const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 2.4), colMat);
        base.position.y = 0.4;
        base.castShadow = true;
        base.receiveShadow = true;
        colGroup.add(base);

        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 13.5, 16), colMat);
        shaft.position.y = 7.55;
        shaft.castShadow = true;
        shaft.receiveShadow = true;
        colGroup.add(shaft);

        const capital = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 2.4), colMat);
        capital.position.y = 14.6;
        colGroup.add(capital);

        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.08, 8, 24), goldMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 1.0;
        colGroup.add(ring);

        this.scene.add(colGroup);
    }

    /* ==========================================================================
       CENTRAL ROTUNDA: CURATORIAL THESIS MONUMENT
       ========================================================================== */
    createCentralMonument() {
        const monumentGroup = new THREE.Group();
        monumentGroup.position.set(0, 0, 0);

        const step1 = new THREE.Mesh(
            new THREE.CylinderGeometry(5.5, 6.0, 0.35, 32),
            new THREE.MeshStandardMaterial({ color: 0x1b2234, roughness: 0.2, metalness: 0.1 })
        );
        step1.position.y = 0.175;
        step1.receiveShadow = true;
        monumentGroup.add(step1);

        const step2 = new THREE.Mesh(
            new THREE.CylinderGeometry(4.2, 4.5, 0.35, 32),
            new THREE.MeshStandardMaterial({ color: 0x222a3f, roughness: 0.2, metalness: 0.1 })
        );
        step2.position.y = 0.525;
        step2.receiveShadow = true;
        monumentGroup.add(step2);

        const pylon = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 3.2, 2.8),
            new THREE.MeshStandardMaterial({ color: 0x141824, roughness: 0.4, metalness: 0.2 })
        );
        pylon.position.y = 2.2;
        pylon.castShadow = true;
        pylon.receiveShadow = true;
        monumentGroup.add(pylon);

        const cap = new THREE.Mesh(
            new THREE.BoxGeometry(3.1, 0.2, 3.1),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 })
        );
        cap.position.y = 3.9;
        monumentGroup.add(cap);

        const thesisCanvas = document.createElement('canvas');
        thesisCanvas.width = 1024;
        thesisCanvas.height = 1024;
        const ctx = thesisCanvas.getContext('2d');

        ctx.fillStyle = '#0f1420';
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 12;
        ctx.strokeRect(20, 20, 984, 984);

        ctx.font = 'bold 44px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText("CLT 2375: MYTHOLOGY & WORLD CULTURES", 512, 110);

        ctx.font = 'bold 56px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText("THE THRESHOLD OF ETERNITY", 512, 190);

        ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#e6c875';
        ctx.fillText("Curatorial Thesis Statement", 512, 255);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(250, 280);
        ctx.lineTo(774, 280);
        ctx.stroke();

        ctx.font = '27px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#e2e6f0';
        ctx.textAlign = 'left';

        const thesisText = (
            "Across human civilizations, visions of the afterlife function as cultural blueprints reflecting each society's " +
            "socioeconomic structures, moral imperatives, and physical environments. While Ancient Egypt envisioned the afterlife as an " +
            "eternal, bureaucratic restoration of agricultural harmony (ma'at), Ancient Greece conceptualized Hades as a somber, shadowy " +
            "realm where insubstantial shades mourned lost vitality, elevating earthly civic renown (kleos). In contrast, Norse myth reflected " +
            "an unyielding martial fatalism by dividing the dead between Valhalla for warriors slain for Ragnarök and the gloomy realm of Hel. " +
            "In Han China, the dual-soul cosmology (hun and po) mirrored imperial administrative order and filial duty (xiao). Finally, " +
            "Indigenous North American cosmologies (Mississippian and Lakota) framed postmortem transition as a continuous relational " +
            "journey along the Milky Way (Wanagi Tacanku), reuniting the deceased with ancestral kin across the living web of cosmos."
        );

        let y = 350;
        const words = thesisText.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            if (ctx.measureText(testLine).width > 870 && n > 0) {
                ctx.fillText(line, 80, y);
                line = words[n] + ' ';
                y += 42;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 80, y);

        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText("✦ CLICK THIS MONUMENT OR ANY EXHIBIT TO READ IN DETAIL ✦", 512, 940);

        const thesisTex = new THREE.CanvasTexture(thesisCanvas);
        const plaqueGeo = new THREE.PlaneGeometry(2.6, 2.6);
        const plaqueMat = new THREE.MeshStandardMaterial({ map: thesisTex, roughness: 0.2, metalness: 0.1 });

        const plaqueFront = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaqueFront.position.set(0, 2.2, 1.42);
        plaqueFront.userData = { id: 'entrance', name: 'Curatorial Thesis Monument' };
        monumentGroup.add(plaqueFront);
        this.interactiveObjects.push(plaqueFront);

        const plaqueBack = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaqueBack.position.set(0, 2.2, -1.42);
        plaqueBack.rotation.y = Math.PI;
        plaqueBack.userData = { id: 'entrance', name: 'Curatorial Thesis Monument' };
        monumentGroup.add(plaqueBack);
        this.interactiveObjects.push(plaqueBack);

        this.addExhibitSpotlight(0, 12, 6, 0, 2, 0);
        this.scene.add(monumentGroup);
    }

    /* ==========================================================================
       CREATE 5 EXHIBITION WINGS IN 3D SPACE
       ========================================================================== */
    createExhibitionWings() {
        const exhibitData = [
            {
                id: 'egypt',
                wingNum: 'I',
                culture: 'Ancient Egypt',
                title: "The Duat, the Balance of Ma'at, and the Field of Reeds",
                wallPos: { x: 0, y: 5.5, z: -44.2 },
                wallRot: 0,
                stelaPos: { x: 7, y: 1.8, z: -35 },
                stelaRot: 0,
                spotPos: { x: 0, y: 12, z: -30 },
                spotTarget: { x: 0, y: 5, z: -44 },
                aspectRatio: 1600 / 823,
                width: 14,
                snippet: "In Ancient Egyptian religion, death was an ontological transition requiring ritual preparation and moral accountability. The soul navigated the subterranean Duat to face Osiris and 42 divine judges. Anubis weighed the heart against the feather of Ma'at; if unrighteous, it was devoured by Ammit. Justified souls entered the perpetually fertile Field of Reeds (Sekhet-Aaru). This eschatology mirrored the cyclical renewal of the Nile and Egypt's literate royal bureaucracy."
            },
            {
                id: 'greece',
                wingNum: 'II',
                culture: 'Ancient Greece',
                title: "The Shadowy Underworld, the Homeric Psyche, and Mortal Kleos",
                wallPos: { x: 44.2, y: 5.5, z: -12 },
                wallRot: -Math.PI / 2,
                stelaPos: { x: 35, y: 1.8, z: -4 },
                stelaRot: -Math.PI / 2,
                spotPos: { x: 30, y: 12, z: -12 },
                spotTarget: { x: 44, y: 5, z: -12 },
                aspectRatio: 1600 / 925,
                width: 12,
                snippet: "In Archaic Greek myth, Hades was a damp, sunless, and emotionally sterile mirror of mortal existence. In Homer's Odyssey, souls drift as insubstantial shades (eidola) devoid of strength (menos) until drinking sacrificial blood. Achilles famously declares he would rather live as a landless serf on earth than rule over all the exhausted dead. Because the underworld offered no moral paradise, mortal civic renown (kleos) and proper burial (taphe) were the only path to overcome oblivion."
            },
            {
                id: 'norse',
                wingNum: 'III',
                culture: 'Norse Mythology',
                title: "The Hall of the Slain, Helheim, and the Loom of Ragnarök",
                wallPos: { x: 44.2, y: 5.5, z: 24 },
                wallRot: -Math.PI / 2,
                stelaPos: { x: 35, y: 1.8, z: 16 },
                stelaRot: -Math.PI / 2,
                spotPos: { x: 30, y: 12, z: 24 },
                spotTarget: { x: 44, y: 5, z: 24 },
                aspectRatio: 1600 / 2133,
                width: 7.5,
                snippet: "Old Norse myth bifurcated postmortem destiny along martial valor: warriors slain in combat were gathered by valkyries to Valhalla (Odin) or Fólkvangr (Freyja) to feast on Sæhrímnir and battle on Idavoll. Those dying of disease or age descended to Helheim, a cold realm of decay ruled by the monstrous giantess Hel. Valhalla was not a place of peaceful rest; Odin recruited the einherjar specifically to fight in his doomed ranks at Ragnarök, elevating defiance against inevitable annihilation as the supreme virtue."
            },
            {
                id: 'china',
                wingNum: 'IV',
                culture: 'Ancient China',
                title: "The Dual Soul, the Yellow Springs, and the Celestial Bureaucracy",
                wallPos: { x: -44.2, y: 5.5, z: -12 },
                wallRot: Math.PI / 2,
                stelaPos: { x: -35, y: 1.8, z: -4 },
                stelaRot: Math.PI / 2,
                spotPos: { x: -30, y: 12, z: -12 },
                spotTarget: { x: -44, y: 5, z: -12 },
                aspectRatio: 903 / 2250,
                width: 5.5,
                snippet: "Ancient Chinese afterlife beliefs rested on dual-soul ontology mirroring Yin and Yang: the spiritual hun soul (Yang) ascended toward heaven or Mount Kunlun, home of the Queen Mother of the West; the corporeal po soul (Yin) remained in the tomb and descended into the Yellow Springs. If descendants provided filial offerings (mingqi), the po rested as a protective ancestor; if neglected, it became a vengeful hungry ghost (gui). The Han afterlife was projected as an imperial spiritual bureaucracy."
            },
            {
                id: 'native',
                wingNum: 'V',
                culture: 'Native North America',
                title: "The Path of Souls, Kinship, and the Celestial River",
                wallPos: { x: -44.2, y: 5.5, z: 24 },
                wallRot: Math.PI / 2,
                stelaPos: { x: -35, y: 1.8, z: 16 },
                stelaRot: Math.PI / 2,
                spotPos: { x: -30, y: 12, z: 24 },
                spotTarget: { x: -44, y: 5, z: 24 },
                aspectRatio: 410 / 400,
                width: 8,
                snippet: "In Indigenous North American cosmologies (Mississippian and Lakota), death was an ontological transition within an interconnected, living universe rather than a punitive moral court. The soul shadow (wanagi) journeyed along the Milky Way (Wanagi Tacanku / Path of Souls) to be examined by a guardian elder for cultural and kinship maturity, before reuniting with ancestors. Mississippian marine shell gorgets acted as cosmic portals, celebrating the sacred web of life expressed in Mitákuye Oyás'in."
            }
        ];

        exhibitData.forEach(item => {
            this.buildWingExhibit(item);
        });
    }

    buildWingExhibit(data) {
        const wingGroup = new THREE.Group();

        const b64Data = (typeof ARTIFACT_TEXTURE_DATA !== 'undefined') ? ARTIFACT_TEXTURE_DATA[data.id] : null;
        let artifactTexture;
        if (b64Data) {
            const img = new Image();
            img.src = b64Data;
            artifactTexture = new THREE.Texture(img);
            img.onload = () => {
                artifactTexture.needsUpdate = true;
            };
        } else {
            artifactTexture = new THREE.TextureLoader().load(`assets/images/${data.id}_opt.jpg`);
        }

        const height = data.width / data.aspectRatio;

        const frameMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 });
        const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(data.width + 0.8, height + 0.8, 0.35), frameMat);
        frameMesh.position.set(data.wallPos.x, data.wallPos.y, data.wallPos.z);
        frameMesh.rotation.y = data.wallRot;
        frameMesh.castShadow = true;
        wingGroup.add(frameMesh);

        const artMat = new THREE.MeshStandardMaterial({ map: artifactTexture, roughness: 0.4, metalness: 0.05 });
        const artMesh = new THREE.Mesh(new THREE.PlaneGeometry(data.width, height), artMat);
        artMesh.position.set(data.wallPos.x, data.wallPos.y, data.wallPos.z);
        artMesh.rotation.y = data.wallRot;
        artMesh.translateZ(0.2);
        artMesh.userData = { id: data.id, name: data.culture + " Artifact" };
        wingGroup.add(artMesh);
        this.interactiveObjects.push(artMesh);

        const plaqueTexture = this.createPlaqueTexture(data.wingNum, data.culture, data.title, data.snippet);

        const stelaGroup = new THREE.Group();
        stelaGroup.position.set(data.stelaPos.x, 0, data.stelaPos.z);
        stelaGroup.rotation.y = data.stelaRot;

        const standBase = new THREE.Mesh(
            new THREE.CylinderGeometry(1.4, 1.6, 0.4, 24),
            new THREE.MeshStandardMaterial({ color: 0x141824, roughness: 0.5, metalness: 0.2 })
        );
        standBase.position.y = 0.2;
        stelaGroup.add(standBase);

        const standPole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.18, 1.6, 16),
            new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3 })
        );
        standPole.position.y = 1.0;
        stelaGroup.add(standPole);

        const lectern = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 2.4, 0.12),
            new THREE.MeshStandardMaterial({ map: plaqueTexture, roughness: 0.3, metalness: 0.1 })
        );
        lectern.position.set(0, 1.8, 0);
        lectern.rotation.x = -Math.PI / 8;
        lectern.userData = { id: data.id, name: data.culture + " Curatorial Stela" };
        stelaGroup.add(lectern);
        this.interactiveObjects.push(lectern);

        wingGroup.add(stelaGroup);

        this.addExhibitSpotlight(
            data.spotPos.x,
            data.spotPos.y,
            data.spotPos.z,
            data.spotTarget.x,
            data.spotTarget.y,
            data.spotTarget.z
        );

        this.scene.add(wingGroup);
    }

    /* ==========================================================================
       SYNTHESIS & WORKS CITED GALLERY (SOUTH WALL)
       ========================================================================== */
    createSynthesisGallery() {
        const synthGroup = new THREE.Group();
        synthGroup.position.set(0, 0, 36);

        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0f1422';
        ctx.fillRect(0, 0, 2048, 1024);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 14;
        ctx.strokeRect(20, 20, 2008, 984);

        ctx.font = 'bold 54px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText("COMPARATIVE CURATORIAL SYNTHESIS & WORKS CITED", 1024, 110);

        ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Synthesizing Eschatological Architectures Across Civilizations", 1024, 175);

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(400, 210);
        ctx.lineTo(1648, 210);
        ctx.stroke();

        const columns = [
            { culture: "Egypt", realm: "Duat / Field of Reeds", soul: "Ka / Ba / Ib", mirror: "Nile Inundation & Scribal Courts", threat: "Ammit Devourment" },
            { culture: "Greece", realm: "Subterranean Hades", soul: "Insubstantial Psyche", mirror: "Polis Humanism & Mortal Kleos", threat: "Loss of Vitality & Memory" },
            { culture: "Norse", realm: "Valhalla / Helheim", soul: "Einherjar / Corpse", mirror: "Viking Raiding & Ragnarök Doom", threat: "Cold Straw Death in Hel" },
            { culture: "China", realm: "Kunlun / Yellow Springs", soul: "Dual Hun & Po", mirror: "Han Bureaucracy & Filial Xiao", threat: "Wandering Hungry Ghost" },
            { culture: "Native", realm: "Milky Way Path of Souls", soul: "Niya & Wanagi", mirror: "Living Kinship (Mitákuye Oyás'in)", threat: "Severance from Ancestors" }
        ];

        const startX = 120;
        const colWidth = 360;

        columns.forEach((col, idx) => {
            const cx = startX + idx * colWidth;

            ctx.fillStyle = '#171e2e';
            ctx.fillRect(cx, 260, colWidth - 25, 620);
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
            ctx.lineWidth = 2;
            ctx.strokeRect(cx, 260, colWidth - 25, 620);

            ctx.font = 'bold 36px "Cinzel", Georgia, serif';
            ctx.fillStyle = '#d4af37';
            ctx.textAlign = 'center';
            ctx.fillText(col.culture, cx + (colWidth - 25) / 2, 320);

            ctx.font = '24px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';

            const tx = cx + 25;
            ctx.fillText("Realm:", tx, 385);
            ctx.fillStyle = '#e6c875';
            ctx.fillText(col.realm, tx, 420);

            ctx.fillStyle = '#ffffff';
            ctx.fillText("Soul Ontology:", tx, 485);
            ctx.fillStyle = '#e6c875';
            ctx.fillText(col.soul, tx, 520);

            ctx.fillStyle = '#ffffff';
            ctx.fillText("Societal Mirror:", tx, 585);
            ctx.fillStyle = '#e6c875';
            ctx.fillText(col.mirror, tx, 620);

            ctx.fillStyle = '#ffffff';
            ctx.fillText("Primary Threat:", tx, 685);
            ctx.fillStyle = '#ff7b72';
            ctx.fillText(col.threat, tx, 720);
        });

        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d4af37';
        ctx.textAlign = 'center';
        ctx.fillText("✦ CLICK THIS BOARD TO OPEN THE FULL WORKS CITED & SYNTHESIS ESSAY ✦", 1024, 950);

        const synthTex = new THREE.CanvasTexture(canvas);
        const board = new THREE.Mesh(
            new THREE.BoxGeometry(26, 12, 0.5),
            new THREE.MeshStandardMaterial({ map: synthTex, roughness: 0.3, metalness: 0.1 })
        );
        board.position.set(0, 6.5, 8);
        board.rotation.y = Math.PI;
        board.userData = { id: 'synthesis', name: 'Comparative Synthesis & Works Cited Board' };
        synthGroup.add(board);
        this.interactiveObjects.push(board);

        this.addExhibitSpotlight(0, 12, 22, 0, 6.5, 44);
        this.scene.add(synthGroup);
    }

    /* ==========================================================================
       EVENT LISTENERS & GOOGLE EARTH RAYCASTER INTERACTION
       ========================================================================== */
    setupEventListeners() {
        window.addEventListener('resize', () => {
            if (!this.container || !this.camera || !this.renderer) return;
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        });

        // Click Handler (distinguishes between dragging and clicking)
        this.container.addEventListener('click', (e) => {
            if (this.isTraveling) return;

            // If mouse moved more than 6px, it was a drag look, not a click
            const distMoved = Math.hypot(e.clientX - this.mouseDownPos.x, e.clientY - this.mouseDownPos.y);
            if (distMoved > 6) return;

            this.raycaster.setFromCamera(this.mouse, this.camera);

            // Check Exhibit click (Open Curatorial Reading Lightbox)
            const exhibitHits = this.raycaster.intersectObjects(this.interactiveObjects);
            if (exhibitHits.length > 0) {
                const hit = exhibitHits[0].object;
                const targetId = hit.userData.id;
                this.openCuratorialReading(targetId);
            }
        });

        // Teleport buttons in Top Nav & Bottom Dock
        document.querySelectorAll('[data-teleport]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const loc = btn.getAttribute('data-teleport');
                this.teleportTo(loc);
            });
        });

        // Guided Tour button
        const tourBtn = document.getElementById('start-tour-btn');
        if (tourBtn) {
            tourBtn.addEventListener('click', () => {
                this.toggleCuratorialTour();
            });
        }

        // Key E to inspect
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyE') {
                if (this.currentLocation !== 'entrance' && this.currentLocation !== 'synthesis') {
                    this.openCuratorialReading(this.currentLocation);
                } else if (this.currentLocation === 'entrance') {
                    this.openCuratorialReading('entrance');
                } else if (this.currentLocation === 'synthesis') {
                    this.openCuratorialReading('synthesis');
                }
            }
        });

        // Automatically pause tour timer when inspecting any site (modal open), and resume on close
        const modalObserver = new MutationObserver(() => {
            const isInspecting = document.body.classList.contains('modal-active');
            if (isInspecting) {
                this.pauseTourForInspection();
            } else {
                this.resumeTourFromInspection();
            }
        });
        modalObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    checkRaycastHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const exIntersects = this.raycaster.intersectObjects(this.interactiveObjects);
        if (exIntersects.length > 0) {
            const hit = exIntersects[0].object;
            this.container.style.cursor = 'pointer';
            this.showPromptTooltip(`✦ Click to Read & Inspect: ${hit.userData.name}`);
            return;
        }

        this.container.style.cursor = 'default';
        this.hidePromptTooltip();
    }

    showPromptTooltip(msg) {
        let tip = document.getElementById('museum-3d-tooltip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'museum-3d-tooltip';
            this.container.appendChild(tip);
        }
        tip.textContent = msg;
        tip.classList.add('visible');
    }

    hidePromptTooltip() {
        const tip = document.getElementById('museum-3d-tooltip');
        if (tip) tip.classList.remove('visible');
    }

    /* ==========================================================================
       GOOGLE EARTH-STYLE CINEMATIC TRAVEL ANIMATION
       Camera moves directly between waypoints with smooth first-person flight arc
       ========================================================================== */
    teleportTo(locationKey) {
        const wp = this.waypoints[locationKey];
        if (!wp) return;

        // If manually traveling to a different location while tour is active, stop the tour
        if (this.isTourRunning && this.tourWaypoints[this.tourIndex] !== locationKey) {
            this.stopTourTimer();
        }

        this.currentLocation = locationKey;
        this.isTraveling = true;
        this.updateHUDLocation(wp.title);

        document.querySelectorAll('[data-teleport]').forEach(btn => {
            if (btn.getAttribute('data-teleport') === locationKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Calculate destination orientation towards target
        const dx = wp.target.x - wp.camPos.x;
        const dy = wp.target.y - wp.camPos.y;
        const dz = wp.target.z - wp.camPos.z;
        const targetYaw = Math.atan2(-dx, -dz);
        const targetPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));

        // Shortest angular distance interpolation for yaw
        let diffYaw = (targetYaw - this.yaw) % (Math.PI * 2);
        if (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
        if (diffYaw < -Math.PI) diffYaw += Math.PI * 2;
        const endYaw = this.yaw + diffYaw;

        if (typeof TWEEN !== 'undefined') {
            const sx = this.camera.position.x;
            const sy = this.camera.position.y;
            const sz = this.camera.position.z;
            const ex = wp.camPos.x;
            const ey = wp.camPos.y;
            const ez = wp.camPos.z;
            const dist = Math.hypot(ex - sx, ez - sz);
            const peakArc = dist > 12 ? Math.min(2.2, dist * 0.05) : 0;

            const flightProgress = { t: 0 };
            const startRot = { yaw: this.yaw, pitch: this.pitch };

            // Camera Position Smooth Flight with Parabolic Arc
            new TWEEN.Tween(flightProgress)
                .to({ t: 1 }, 1350)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(() => {
                    const t = flightProgress.t;
                    const px = sx + (ex - sx) * t;
                    const pz = sz + (ez - sz) * t;
                    const py = sy + (ey - sy) * t + Math.sin(t * Math.PI) * peakArc;
                    this.camera.position.set(px, py, pz);
                })
                .onComplete(() => {
                    this.camera.position.set(ex, ey, ez);
                    this.isTraveling = false;
                })
                .start();

            // Camera First-Person Look Rotation
            new TWEEN.Tween(startRot)
                .to({ yaw: endYaw, pitch: targetPitch }, 1350)
                .easing(TWEEN.Easing.Cubic.InOut)
                .onUpdate(() => {
                    this.yaw = startRot.yaw;
                    this.pitch = startRot.pitch;
                    this.updateCameraRotation();
                })
                .onComplete(() => {
                    this.yaw = endYaw % (Math.PI * 2);
                    this.pitch = targetPitch;
                    this.updateCameraRotation();
                })
                .start();
        } else {
            this.camera.position.set(wp.camPos.x, wp.camPos.y, wp.camPos.z);
            this.yaw = targetYaw;
            this.pitch = targetPitch;
            this.updateCameraRotation();
            this.isTraveling = false;
        }
    }

    /* ==========================================================================
       AUTOMATED GUIDED TOUR SYSTEM WITH LIVE COUNTDOWN TIMER
       ========================================================================== */
    toggleCuratorialTour() {
        this.isTourRunning = !this.isTourRunning;

        if (this.isTourRunning) {
            this.tourIndex = 0;
            this.runNextTourWaypoint();
        } else {
            this.stopTourTimer();
        }
    }

    runNextTourWaypoint() {
        if (!this.isTourRunning) return;

        const nextLoc = this.tourWaypoints[this.tourIndex];
        this.teleportTo(nextLoc);

        // Start countdown timer for this station
        this.startTourCountdown();
    }

    startTourCountdown() {
        if (this.tourTimerInterval) {
            clearInterval(this.tourTimerInterval);
        }
        this.tourSecondsLeft = this.tourDuration;
        this.isTourPaused = document.body.classList.contains('modal-active');
        this.updateTourUI();

        this.tourTimerInterval = setInterval(() => {
            if (!this.isTourRunning) {
                this.stopTourTimer();
                return;
            }

            // Pause countdown while user is inspecting an exhibit or reading plaque
            if (this.isTourPaused) {
                return;
            }

            this.tourSecondsLeft--;
            this.updateTourUI();

            if (this.tourSecondsLeft <= 0) {
                clearInterval(this.tourTimerInterval);
                this.tourTimerInterval = null;
                this.tourIndex = (this.tourIndex + 1) % this.tourWaypoints.length;
                this.runNextTourWaypoint();
            }
        }, 1000);
    }

    pauseTourForInspection() {
        if (!this.isTourRunning) return;
        this.isTourPaused = true;
        this.updateTourUI();
    }

    resumeTourFromInspection() {
        if (!this.isTourRunning) return;
        if (this.isTourPaused) {
            this.isTourPaused = false;
            this.updateTourUI();
        }
    }

    stopTourTimer() {
        if (this.tourTimerInterval) {
            clearInterval(this.tourTimerInterval);
            this.tourTimerInterval = null;
        }
        if (this.tourTimeout) {
            clearTimeout(this.tourTimeout);
            this.tourTimeout = null;
        }
        this.isTourRunning = false;
        this.isTourPaused = false;
        this.tourSecondsLeft = this.tourDuration;
        this.updateTourUI();
    }

    updateTourUI() {
        const btn = document.getElementById('start-tour-btn');
        const timerPill = document.getElementById('hud-tour-timer-pill');
        const timerText = document.getElementById('hud-tour-timer-text');
        const progressFill = document.getElementById('hud-tour-progress-fill');

        if (this.isTourRunning) {
            const nextIdx = (this.tourIndex + 1) % this.tourWaypoints.length;
            const nextKey = this.tourWaypoints[nextIdx];
            const nextWp = this.waypoints[nextKey];
            const nextLabel = nextWp ? nextWp.shortLabel : "Next Wing";

            if (this.isTourPaused) {
                if (btn) {
                    btn.classList.add('active-tour');
                    btn.classList.add('tour-paused');
                    btn.innerHTML = `<span class="icon">⏸</span> Tour Paused <span class="tour-badge-time">(${this.tourSecondsLeft}s)</span>`;
                    btn.setAttribute('title', `Tour paused while inspecting. Resumes when modal closes.`);
                }
                if (timerPill) {
                    timerPill.classList.add('visible');
                    timerPill.classList.add('tour-pill-paused');
                }
                if (timerText) {
                    timerText.innerHTML = `⏸ <strong>Tour Paused (Inspecting Site)</strong> • <strong>${this.tourSecondsLeft}s</strong> remaining`;
                }
            } else {
                if (btn) {
                    btn.classList.add('active-tour');
                    btn.classList.remove('tour-paused');
                    btn.innerHTML = `<span class="icon">⏹</span> Stop Tour <span class="tour-badge-time">(${this.tourSecondsLeft}s)</span>`;
                    btn.setAttribute('title', `Click to stop guided tour. Next wing in ${this.tourSecondsLeft}s.`);
                }
                if (timerPill) {
                    timerPill.classList.add('visible');
                    timerPill.classList.remove('tour-pill-paused');
                }
                if (timerText) {
                    timerText.innerHTML = `Next: <strong>${nextLabel}</strong> in <strong>${this.tourSecondsLeft}s</strong>`;
                }
            }

            if (progressFill) {
                const pct = Math.max(0, Math.min(100, ((this.tourDuration - this.tourSecondsLeft) / this.tourDuration) * 100));
                progressFill.style.width = `${pct}%`;
            }
        } else {
            if (btn) {
                btn.classList.remove('active-tour');
                btn.classList.remove('tour-paused');
                btn.innerHTML = `<span class="icon">🎬</span> Start Guided Tour`;
                btn.setAttribute('title', 'Start automated cinematic tour through all wings');
            }
            if (timerPill) {
                timerPill.classList.remove('visible');
                timerPill.classList.remove('tour-pill-paused');
            }
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        }
    }

    updateHUDLocation(title) {
        const label = document.getElementById('hud-current-wing');
        if (label) label.textContent = title;
    }

    openCuratorialReading(id) {
        // Pause guided tour while user is inspecting the site
        this.pauseTourForInspection();

        if (id === 'entrance') {
            const thesisModal = document.getElementById('thesis-modal');
            if (thesisModal) {
                thesisModal.classList.add('open');
                document.body.classList.add('modal-active');
            }
            return;
        }

        if (id === 'synthesis') {
            const synthModal = document.getElementById('synthesis-modal');
            if (synthModal) {
                synthModal.classList.add('open');
                document.body.classList.add('modal-active');
            }
            return;
        }

        if (typeof openModalById === 'function') {
            openModalById(id);
        }
    }

    /* ==========================================================================
       ANIMATION LOOP
       ========================================================================== */
    animate() {
        requestAnimationFrame(() => this.animate());

        if (typeof TWEEN !== 'undefined') {
            TWEEN.update();
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.museumInstance = new Museum3D();
});
