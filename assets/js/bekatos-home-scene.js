/**
 * Bekatos Software House - Hero 3D Ecosystem Showcase
 * Dual 3D Showcase: Bekatos Ticket (Slide 1) & Bekatos b-Kılavuz (Slide 2)
 * Synchronized with 10-Second Auto-Rotating Slider
 * Uses global window.THREE (assets/js/three.min.js) for full offline and file:// support
 */

(function () {
  function init() {
    const THREE = window.THREE;
    if (!THREE) {
      console.warn("Three.js not found for Hero Scene");
      return;
    }

    const stage = document.getElementById("bekatosHeroStage");
    if (!stage) return;

    // Avoid duplicate canvas
    if (stage.querySelector("canvas")) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    // Helper for round rectangles on 2D canvas
    const roundRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Screen generator for Slide 1 (Bekatos Ticket)
    const makeTicketScreen = (kind) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 780;
      const ctx = canvas.getContext("2d");
      const isPhone = kind === "phone";

      if (isPhone) {
        // Modern Smartphone Screen (Ticket Mobile)
        ctx.fillStyle = "#0c1520";
        ctx.fillRect(0, 0, 1200, 780);

        // Status Bar
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, 1200, 70);
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 28px -apple-system, sans-serif";
        ctx.fillText("09:41", 50, 48);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "24px -apple-system, sans-serif";
        ctx.fillText("5G · Bekatos Mobile", 880, 48);

        // Header
        ctx.fillStyle = "#20a48e";
        ctx.font = "bold 44px -apple-system, sans-serif";
        ctx.fillText("Bekatos Ticket", 50, 150);
        ctx.fillStyle = "#64748b";
        ctx.font = "26px -apple-system, sans-serif";
        ctx.fillText("Canlı Destek Portalı", 50, 190);

        // Alert Card
        ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
        roundRect(ctx, 40, 225, 1120, 210, 28);
        ctx.fill();
        ctx.strokeStyle = "rgba(244, 63, 94, 0.6)";
        ctx.lineWidth = 4;
        roundRect(ctx, 40, 225, 1120, 210, 28);
        ctx.stroke();

        ctx.fillStyle = "#f43f5e";
        ctx.beginPath();
        ctx.arc(85, 280, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 34px -apple-system, sans-serif";
        ctx.fillText("Yeni Öncelikli Bilet #TK-4821", 125, 290);
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "28px -apple-system, sans-serif";
        ctx.fillText("Mobil Ödeme API Bildirimi · Gerçek Zamanlı SSE", 125, 345);
        ctx.fillStyle = "#f43f5e";
        ctx.font = "bold 26px -apple-system, sans-serif";
        ctx.fillText("Yanıt Bekliyor · SLA: 12 dk", 125, 395);

        // Stats 2 Columns
        ctx.fillStyle = "#16222f";
        roundRect(ctx, 40, 465, 540, 260, 24);
        ctx.fill();
        ctx.fillStyle = "#64748b";
        ctx.font = "24px -apple-system, sans-serif";
        ctx.fillText("Çözülen Biletler", 70, 520);
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 64px -apple-system, sans-serif";
        ctx.fillText("98.8%", 70, 605);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "22px -apple-system, sans-serif";
        ctx.fillText("SLA Başarısı", 70, 665);

        ctx.fillStyle = "#16222f";
        roundRect(ctx, 620, 465, 540, 260, 24);
        ctx.fill();
        ctx.fillStyle = "#64748b";
        ctx.font = "24px -apple-system, sans-serif";
        ctx.fillText("Ort. Yanıt", 650, 520);
        ctx.fillStyle = "#22d3ee";
        ctx.font = "bold 64px -apple-system, sans-serif";
        ctx.fillText("3.4 dk", 650, 605);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "22px -apple-system, sans-serif";
        ctx.fillText("AI Öncelikli", 650, 665);
      } else {
        // Modern High-Tech SaaS Laptop Screen
        ctx.fillStyle = "#09121d";
        ctx.fillRect(0, 0, 1200, 780);

        // Header Bar
        ctx.fillStyle = "#0f1b29";
        ctx.fillRect(0, 0, 1200, 80);

        // Bekatos Logo
        ctx.fillStyle = "#20a48e";
        roundRect(ctx, 35, 20, 42, 40, 8);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px -apple-system, sans-serif";
        ctx.fillText("B", 47, 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px -apple-system, sans-serif";
        ctx.fillText("bekatos", 90, 48);

        // Tabs
        const navTabs = [
          ["Bekatos Ticket", true],
          ["b-Kılavuz", false],
          ["ERP Core", false],
          ["API Analytics", false],
        ];
        navTabs.forEach(([tab, active], idx) => {
          const tx = 240 + idx * 165;
          if (active) {
            ctx.fillStyle = "rgba(32, 164, 142, 0.22)";
            roundRect(ctx, tx - 12, 18, 148, 44, 22);
            ctx.fill();
            ctx.strokeStyle = "#20a48e";
            ctx.lineWidth = 1.5;
            roundRect(ctx, tx - 12, 18, 148, 44, 22);
            ctx.stroke();
            ctx.fillStyle = "#20a48e";
          } else {
            ctx.fillStyle = "#64748b";
          }
          ctx.font = "bold 18px -apple-system, sans-serif";
          ctx.fillText(tab, tx, 46);
        });

        // Live Server Pill in Header
        ctx.fillStyle = "rgba(16, 185, 129, 0.18)";
        roundRect(ctx, 920, 18, 240, 44, 22);
        ctx.fill();
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(945, 40, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "bold 16px -apple-system, sans-serif";
        ctx.fillText("ticket.bekatos.com", 965, 46);

        // Left Mini Sidebar
        ctx.fillStyle = "#0c1724";
        ctx.fillRect(0, 80, 72, 700);
        const iconsColors = ["#20a48e", "#38bdf8", "#818cf8", "#f43f5e", "#94a3b8"];
        iconsColors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(36, 130 + i * 65, 11, 0, Math.PI * 2);
          ctx.fill();
        });

        // Dashboard Header
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 32px -apple-system, sans-serif";
        ctx.fillText("Bekatos Destek & Bilet Ekosistemi", 110, 135);
        ctx.fillStyle = "#64748b";
        ctx.font = "18px -apple-system, sans-serif";
        ctx.fillText("Gerçek Zamanlı SSE & WebSockets Akışı Aktif", 110, 168);

        // 4 Telemetry Metrics Cards
        const metrics = [
          ["Aktif Bilet", "148", "+12 yeni", "#20a48e"],
          ["SLA Başarısı", "%99.4", "Gerçek Zamanlı", "#38bdf8"],
          ["Ort. Çözüm", "3.8 dk", "AI Destekli", "#10b981"],
          ["Bağlı Kullanıcı", "1,850", "SSE Aktif", "#fbbf24"],
        ];

        metrics.forEach(([label, value, sub, color], i) => {
          const mx = 110 + i * 265;
          ctx.fillStyle = "#111f2e";
          roundRect(ctx, mx, 195, 245, 120, 16);
          ctx.fill();
          ctx.fillStyle = color;
          ctx.fillRect(mx, 195, 5, 120);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "500 16px -apple-system, sans-serif";
          ctx.fillText(label, mx + 20, 230);

          ctx.fillStyle = "#f8fafc";
          ctx.font = "bold 34px -apple-system, sans-serif";
          ctx.fillText(value, mx + 20, 275);

          ctx.fillStyle = color;
          ctx.font = "600 14px -apple-system, sans-serif";
          ctx.fillText(sub, mx + 20, 302);
        });

        // Chart Area
        ctx.fillStyle = "#111f2e";
        roundRect(ctx, 110, 340, 580, 395, 18);
        ctx.fill();

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 20px -apple-system, sans-serif";
        ctx.fillText("Gerçek Zamanlı Trafik & Çözüm İstatistiği", 135, 380);

        ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
        ctx.lineWidth = 1;
        for (let y = 430; y <= 660; y += 46) {
          ctx.beginPath();
          ctx.moveTo(135, y);
          ctx.lineTo(660, y);
          ctx.stroke();
        }

        const pts = [
          [140, 610],
          [220, 550],
          [300, 580],
          [380, 480],
          [460, 510],
          [540, 440],
          [650, 460],
        ];
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.strokeStyle = "#20a48e";
        ctx.lineWidth = 4;
        ctx.stroke();

        pts.forEach(([x, y]) => {
          ctx.fillStyle = "#00f2fe";
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#09121d";
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        // Live Feed Area
        ctx.fillStyle = "#111f2e";
        roundRect(ctx, 715, 340, 450, 395, 18);
        ctx.fill();

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 20px -apple-system, sans-serif";
        ctx.fillText("Son Bilet Akışı (Canlı SSE)", 740, 380);

        const ticketFeed = [
          ["#TK-4821", "Mobil Ödeme Entegrasyonu", "Açık", "#f43f5e"],
          ["#TK-4820", "PostgreSQL 14 & Cloud", "Çözüldü", "#10b981"],
          ["#TK-4819", "AI Destekli Çözüm Önerisi", "İşlemde", "#38bdf8"],
          ["#TK-4818", "b-Kılavuz Mobil API", "Çözüldü", "#10b981"],
        ];

        ticketFeed.forEach(([id, title, status, color], i) => {
          const fy = 415 + i * 74;
          ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
          roundRect(ctx, 735, fy, 410, 60, 10);
          ctx.fill();

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(755, fy + 30, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#e2e8f0";
          ctx.font = "bold 16px -apple-system, sans-serif";
          ctx.fillText(id + " - " + title, 775, fy + 26);

          ctx.fillStyle = "#64748b";
          ctx.font = "14px -apple-system, sans-serif";
          ctx.fillText("Durum: " + status, 775, fy + 48);
        });
      }

      const texture = new THREE.CanvasTexture(canvas);
      if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Screen generator for Slide 2 (Bekatos b-Kılavuz Phone UI)
    const makeEvaPhoneScreen = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 780;
      const ctx = canvas.getContext("2d");

      // Deep dark UI background
      ctx.fillStyle = "#09141f";
      ctx.fillRect(0, 0, 1200, 780);

      // Status Bar
      ctx.fillStyle = "#112233";
      ctx.fillRect(0, 0, 1200, 70);
      ctx.fillStyle = "#34d399";
      ctx.font = "bold 28px -apple-system, sans-serif";
      ctx.fillText("09:41", 50, 48);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.fillText("QR Tarandı · b-Kılavuz", 780, 48);

      // Header
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 44px -apple-system, sans-serif";
      ctx.fillText("b-Kılavuz Mobil", 50, 150);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.fillText("Bekatos Akıllı Cihaz Asistanı · Model: BK-Smart", 50, 190);

      // Video Preview Card (Left Side)
      ctx.fillStyle = "#132537";
      roundRect(ctx, 40, 225, 540, 260, 24);
      ctx.fill();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
      ctx.lineWidth = 3;
      roundRect(ctx, 40, 225, 540, 260, 24);
      ctx.stroke();

      // Play button circle
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(310, 325, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(303, 310);
      ctx.lineTo(324, 325);
      ctx.lineTo(303, 340);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("4K Kurulum & Kullanım Videosu", 310, 405);
      ctx.fillStyle = "#34d399";
      ctx.font = "22px -apple-system, sans-serif";
      ctx.fillText("Süre: 04:15 · Çoklu Dil Desteği", 310, 445);
      ctx.textAlign = "left";

      // Garanti & Servis Card (Right Side)
      ctx.fillStyle = "#132537";
      roundRect(ctx, 620, 225, 540, 260, 24);
      ctx.fill();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 3;
      roundRect(ctx, 620, 225, 540, 260, 24);
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 32px -apple-system, sans-serif";
      ctx.fillText("🛡️ Dijital Garanti Aktif", 655, 290);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "26px -apple-system, sans-serif";
      ctx.fillText("Kalan Süre: 712 Gün (2 Yıl Kapsam)", 655, 342);

      ctx.fillStyle = "#10b981";
      roundRect(ctx, 655, 385, 470, 68, 16);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px -apple-system, sans-serif";
      ctx.fillText("Tek Tıkla Servis & Randevu Al", 705, 428);

      // Bottom Interactive Guide Chapters (2 columns)
      ctx.fillStyle = "#0e1c2b";
      roundRect(ctx, 40, 515, 540, 220, 20);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px -apple-system, sans-serif";
      ctx.fillText("📖 Adım Adım Kılavuz", 70, 565);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.fillText("1. İlk Çalıştırma & Güvenlik", 70, 618);
      ctx.fillText("2. Enerji Tasarrufu & Eko Modu", 70, 668);

      ctx.fillStyle = "#0e1c2b";
      roundRect(ctx, 620, 515, 540, 220, 20);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px -apple-system, sans-serif";
      ctx.fillText("⚡ Akıllı Hızlı Çözümler", 650, 565);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "24px -apple-system, sans-serif";
      ctx.fillText("• Filtre ve Parça Temizliği", 650, 618);
      ctx.fillText("• Orijinal Yedek Parça Siparişi", 650, 668);

      const texture = new THREE.CanvasTexture(canvas);
      if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Procedural Fallback Canvas for EVA Panel (Front & Back)
    const makeEvaPanelCanvas = (side) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1240;
      canvas.height = 1754;
      const ctx = canvas.getContext("2d");

      if (side === "front") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 1240, 1754);

        // Red Bekatos Banner
        ctx.fillStyle = "#ee3b2b";
        roundRect(ctx, 140, 90, 960, 270, 24);
        ctx.fill();

        ctx.fillStyle = "#1e2e4f";
        ctx.beginPath();
        ctx.moveTo(620, 120);
        ctx.lineTo(690, 180);
        ctx.lineTo(620, 240);
        ctx.lineTo(550, 180);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "italic bold 44px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("b", 620, 195);

        ctx.fillStyle = "#1e2e4f";
        ctx.font = "900 64px -apple-system, sans-serif";
        ctx.fillText("BEKATOS", 620, 290);
        ctx.fillStyle = "#ffffff";
        ctx.font = "600 32px -apple-system, sans-serif";
        ctx.fillText("ev aletleri", 620, 330);

        // Instruction Text
        ctx.fillStyle = "#1a365d";
        ctx.font = "bold 44px -apple-system, sans-serif";
        ctx.fillText("Kullanım Kılavuzu için", 620, 480);
        ctx.fillText("telefonunuzun kamerasını", 620, 540);
        ctx.fillText("QR Kod'a okutunuz", 620, 600);

        // QR Code Border
        ctx.strokeStyle = "#1a365d";
        ctx.lineWidth = 14;
        roundRect(ctx, 270, 680, 700, 700, 36);
        ctx.stroke();

        ctx.fillStyle = "#111827";
        const drawQRCorner = (cx, cy) => {
          ctx.fillRect(cx, cy, 140, 140);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(cx + 25, cy + 25, 90, 90);
          ctx.fillStyle = "#111827";
          ctx.fillRect(cx + 45, cy + 45, 50, 50);
        };
        drawQRCorner(320, 730);
        drawQRCorner(780, 730);
        drawQRCorner(320, 1190);

        for (let r = 0; r < 14; r++) {
          for (let c = 0; c < 14; c++) {
            if ((r < 4 && c < 4) || (r < 4 && c > 9) || (r > 9 && c < 4)) continue;
            if ((r * 7 + c * 13) % 3 === 0) {
              ctx.fillRect(320 + c * 42, 730 + r * 42, 38, 38);
            }
          }
        }

        ctx.fillStyle = "#1b2d42";
        roundRect(ctx, 140, 1470, 960, 150, 20);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 36px -apple-system, sans-serif";
        ctx.fillText("Bekatos b-Kılavuz Ekosistemi", 620, 1535);
        ctx.fillStyle = "#38bdf8";
        ctx.font = "26px -apple-system, sans-serif";
        ctx.fillText("www.bekatos.com · Folkart Kuleleri İzmir", 620, 1580);
      } else {
        // Back: Garanti Belgesi
        ctx.fillStyle = "#fdfefe";
        ctx.fillRect(0, 0, 1240, 1754);

        ctx.fillStyle = "#ee3b2b";
        ctx.font = "bold 56px -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Garanti Belgesi", 120, 180);

        ctx.fillStyle = "#1b2d42";
        ctx.font = "bold 44px -apple-system, sans-serif";
        ctx.fillText("BEKATOS EV ALETLERİ", 550, 180);

        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(120, 220);
        ctx.lineTo(1120, 220);
        ctx.stroke();

        ctx.fillStyle = "#334155";
        ctx.font = "bold 32px -apple-system, sans-serif";
        ctx.fillText("GARANTİ ŞARTLARI & DİJİTAL SERVİS ONAYI", 120, 300);

        const lines = [
          "1. Garanti süresi malın teslim tarihinden itibaren 2 yıldır.",
          "2. Malın bütün parçaları dahil olmak üzere tamamı garanti kapsamındadır.",
          "3. Bekatos b-Kılavuz QR sistemi üzerinden anında teknik servis kaydı oluşturulabilir.",
          "4. Kullanıcı kılavuzunda yer alan videolu anlatımlar resmi servis yönergesidir.",
          "5. %100 Sıfır kağıt prensibiyle doğaya ve çevreye tam uyumluluk sağlanmıştır.",
        ];
        lines.forEach((l, i) => {
          ctx.font = "24px -apple-system, sans-serif";
          ctx.fillStyle = "#475569";
          ctx.fillText(l, 120, 390 + i * 75);
        });
      }

      const tex = new THREE.CanvasTexture(canvas);
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x14202d, 2.4));
    const keyLight = new THREE.DirectionalLight(0x20a48e, 3.8);
    keyLight.position.set(-4, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    fillLight.position.set(5, -2, 5);
    scene.add(fillLight);

    // Shared Badge Creator
    const createBadgeTexture = (text, iconColor, bgHex) => {
      const bCanvas = document.createElement("canvas");
      bCanvas.width = 460;
      bCanvas.height = 110;
      const bCtx = bCanvas.getContext("2d");

      bCtx.fillStyle = bgHex || "rgba(15, 27, 41, 0.94)";
      roundRect(bCtx, 4, 4, 452, 102, 51);
      bCtx.fill();

      bCtx.strokeStyle = iconColor || "#20a48e";
      bCtx.lineWidth = 4;
      roundRect(bCtx, 4, 4, 452, 102, 51);
      bCtx.stroke();

      bCtx.fillStyle = iconColor || "#20a48e";
      bCtx.beginPath();
      bCtx.arc(52, 55, 14, 0, Math.PI * 2);
      bCtx.fill();

      bCtx.fillStyle = "#ffffff";
      bCtx.font = "bold 30px -apple-system, sans-serif";
      bCtx.fillText(text, 84, 65);

      const tex = new THREE.CanvasTexture(bCanvas);
      if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.75,
    });
    const edgeMetal = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.3,
      metalness: 0.85,
    });

    // ==========================================
    // GROUP 1: SLIDE 1 (BEKATOS TICKET SUITE)
    // ==========================================
    const ticketGroup = new THREE.Group();
    scene.add(ticketGroup);

    // 3D Laptop
    const laptop = new THREE.Group();
    const ticketScreenMat = new THREE.MeshStandardMaterial({
      map: makeTicketScreen("desktop"),
      roughness: 0.45,
      metalness: 0.05,
    });

    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(3.18, 2.18, 0.1), darkMetal);
    screenFrame.position.set(-0.1, 0.24, 0);
    laptop.add(screenFrame);

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.02, 2.02), ticketScreenMat);
    screen.position.set(-0.1, 0.24, 0.054);
    laptop.add(screen);

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.28, 0.12, 1.88), edgeMetal);
    base.position.set(-0.1, -0.9, 0.52);
    laptop.add(base);

    const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.014, 0.52), darkMetal);
    trackpad.position.set(-0.1, -0.825, 0.85);
    laptop.add(trackpad);

    const keyMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.3 });
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 12; c++) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.016, 0.12), keyMat);
        key.position.set(-1.42 + c * 0.24, -0.82, 0.08 + r * 0.2);
        laptop.add(key);
      }
    }

    laptop.rotation.x = -0.12;
    laptop.rotation.y = 0.22;
    ticketGroup.add(laptop);

    // 3D Phone (Ticket Mobile)
    const ticketPhone = new THREE.Group();
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.86, 0.1), darkMetal);
    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 1.72),
      new THREE.MeshStandardMaterial({ map: makeTicketScreen("phone"), roughness: 0.45 })
    );
    phoneScreen.position.z = 0.054;
    ticketPhone.add(phoneBody, phoneScreen);
    ticketPhone.position.set(1.55, -0.25, 0.62);
    ticketPhone.rotation.set(-0.08, -0.2, -0.04);
    ticketGroup.add(ticketPhone);

    // 4 Floating Holographic Badges for Ticket
    const ticketBadges = [
      { text: "ticket.bekatos.com", color: "#20a48e", pos: [-1.45, 1.35, 0.3] },
      { text: "PostgreSQL 14", color: "#38bdf8", pos: [1.85, 1.25, 0.2] },
      { text: "Real-Time SSE", color: "#f43f5e", pos: [2.35, -0.85, 0.4] },
      { text: "AI Resolution", color: "#a855f7", pos: [-2.05, -0.45, 0.2] },
    ];

    const ticketBadgeMeshes = [];
    ticketBadges.forEach((b, i) => {
      const geo = new THREE.PlaneGeometry(1.4, 0.34);
      const mat = new THREE.MeshStandardMaterial({
        map: createBadgeTexture(b.text, b.color),
        transparent: true,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.pos[0], b.pos[1], b.pos[2]);
      mesh.userData = {
        baseX: b.pos[0],
        baseY: b.pos[1],
        baseZ: b.pos[2],
        offset: i * 1.5,
      };
      ticketGroup.add(mesh);
      ticketBadgeMeshes.push(mesh);
    });

    // ==========================================
    // GROUP 2: SLIDE 2 (BEKATOS b-KILAVUZ)
    // ==========================================
    const evaGroup = new THREE.Group();
    evaGroup.position.x = 4.5;
    evaGroup.position.z = -3.5;
    evaGroup.scale.setScalar(0.6);
    evaGroup.visible = false;
    scene.add(evaGroup);

    // 3D b-Kılavuz Panel Mesh
    const evaPanel = new THREE.Group();
    const panelHeight = 2.6;
    const panelWidth = panelHeight * (2480 / 3508);
    const thickness = 0.055;
    const faceGeo = new THREE.PlaneGeometry(panelWidth, panelHeight);

    // Load actual panel textures (Base64 data URI supported for offline & file://)
    const texLoader = new THREE.TextureLoader();
    const frontSource = window.BEKATOS_PANEL_FRONT || "BekatosEvaPanel.png";
    const backSource = window.BEKATOS_PANEL_BACK || "bekatosevaArka.png";

    const frontTex = texLoader.load(
      frontSource,
      (tex) => {
        if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
        frontMat.needsUpdate = true;
      },
      undefined,
      () => {
        frontMat.map = makeEvaPanelCanvas("front");
        frontMat.needsUpdate = true;
      }
    );
    if (THREE.SRGBColorSpace) frontTex.colorSpace = THREE.SRGBColorSpace;

    const backTex = texLoader.load(
      backSource,
      (tex) => {
        if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
        backMat.needsUpdate = true;
      },
      undefined,
      () => {
        backMat.map = makeEvaPanelCanvas("back");
        backMat.needsUpdate = true;
      }
    );
    if (THREE.SRGBColorSpace) backTex.colorSpace = THREE.SRGBColorSpace;

    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.55,
      metalness: 0.05,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.65,
      metalness: 0.05,
    });

    const frontMesh = new THREE.Mesh(faceGeo, frontMat);
    const backMesh = new THREE.Mesh(faceGeo, backMat);
    const edgeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(panelWidth, panelHeight, thickness),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 })
    );

    frontMesh.position.z = thickness / 2 + 0.003;
    backMesh.position.z = -thickness / 2 - 0.003;
    backMesh.rotation.y = Math.PI;
    edgeMesh.renderOrder = -1;
    evaPanel.add(edgeMesh, frontMesh, backMesh);

    // Non-colliding position on the left
    evaPanel.position.set(-0.45, 0.05, 0.0);
    evaPanel.rotation.set(-0.03, 0.16, 0.01);
    evaGroup.add(evaPanel);

    // 3D Phone for b-Kılavuz (Showing Scanned Guide UI)
    const evaPhone = new THREE.Group();
    const evaPhoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.86, 0.1), darkMetal);
    const evaPhoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 1.72),
      new THREE.MeshStandardMaterial({ map: makeEvaPhoneScreen(), roughness: 0.45 })
    );
    evaPhoneScreen.position.z = 0.054;
    evaPhone.add(evaPhoneBody, evaPhoneScreen);
    // Non-colliding position on the right
    evaPhone.position.set(1.72, -0.12, 0.45);
    evaPhone.rotation.set(-0.06, -0.20, 0.02);
    evaGroup.add(evaPhone);

    // 4 Floating Holographic Badges for b-Kılavuz (Framing corners with generous breathing room)
    const evaBadges = [
      { text: "b-Kılavuz Ekosistemi", color: "#20a48e", pos: [-2.22, 1.55, 0.35] },
      { text: "%100 Sıfır Kağıt", color: "#10b981", pos: [2.22, 1.48, 0.35] },
      { text: "Dijital Garanti & Servis", color: "#38bdf8", pos: [-2.22, -1.35, 0.35] },
      { text: "4K Video Anlatım", color: "#f43f5e", pos: [2.22, -1.25, 0.35] },
    ];

    const evaBadgeMeshes = [];
    evaBadges.forEach((b, i) => {
      const geo = new THREE.PlaneGeometry(1.24, 0.30);
      const mat = new THREE.MeshStandardMaterial({
        map: createBadgeTexture(b.text, b.color),
        transparent: true,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.pos[0], b.pos[1], b.pos[2]);
      mesh.userData = {
        baseX: b.pos[0],
        baseY: b.pos[1],
        baseZ: b.pos[2],
        offset: i * 1.5,
      };
      evaGroup.add(mesh);
      evaBadgeMeshes.push(mesh);
    });

    // Orbital Nodes (Shared background)
    const nodes = new THREE.Group();
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x20a48e,
      emissive: 0x087164,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });
    const positions = [
      [-1.6, 1.1, -0.5],
      [0.2, 1.6, -0.3],
      [1.9, 1.2, -0.6],
      [2.3, -0.2, -0.3],
      [-2.1, -0.5, -0.4],
    ];
    positions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 1), nodeMat);
      node.position.set(x, y, z);
      node.userData = { baseY: y };
      nodes.add(node);
    });
    scene.add(nodes);

    // Interaction & Transition State
    let currentSlideIndex = 0; // 0 = Ticket, 1 = EVA
    let slideProgress = 0; // 0 (Ticket) to 1 (EVA)
    let targetSlideProgress = 0;
    let transitionTimer = null;

    const applySlideProgress = (p) => {
      slideProgress = Math.min(Math.max(p, 0), 1);

      // Group 1 (Ticket)
      ticketGroup.position.x = -slideProgress * 7.5;
      ticketGroup.position.z = -slideProgress * 5.0;
      ticketGroup.position.y = -slideProgress * 0.4;
      ticketGroup.scale.setScalar(1 - slideProgress * 0.45);
      ticketGroup.visible = slideProgress < 0.95;

      // Group 2 (EVA)
      const evaInv = 1 - slideProgress;
      evaGroup.position.x = evaInv * 7.5;
      evaGroup.position.z = evaInv * -5.0;
      evaGroup.position.y = evaInv * 0.4;
      evaGroup.scale.setScalar(1 - evaInv * 0.45);
      evaGroup.visible = slideProgress > 0.05;
    };

    const startTransitionTo = (target) => {
      targetSlideProgress = target;
      if (transitionTimer) clearInterval(transitionTimer);
      const startVal = slideProgress;
      const startTime = Date.now();
      const duration = 500;

      transitionTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(Math.max(elapsed / duration, 0), 1);
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        applySlideProgress(startVal + (target - startVal) * ease);
        if (p >= 1) {
          clearInterval(transitionTimer);
          transitionTimer = null;
        }
      }, 16);
    };

    window.setHeroSlide = function (index, immediate) {
      currentSlideIndex = index;
      if (immediate) {
        if (transitionTimer) clearInterval(transitionTimer);
        applySlideProgress(index);
        renderer.render(scene, camera);
      } else {
        startTransitionTo(index);
      }
    };

    const pointer = new THREE.Vector2();
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const resize = () => {
      let width = stage.clientWidth;
      let height = stage.clientHeight;
      if (!width || !height) {
        const bounds = stage.getBoundingClientRect();
        width = bounds.width || stage.offsetWidth || 560;
        height = bounds.height || stage.offsetHeight || 440;
      }
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.set(width < 560 ? 0.05 : 0.1, 0.1, width < 560 ? 8.6 : 7.2);
      camera.lookAt(0, 0.1, 0);
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (e) => {
      const bounds = stage.getBoundingClientRect();
      pointer.x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const animate = (time) => {
      if (!reduceMotion) frame = window.requestAnimationFrame(animate);
      const t = (time || 0) * 0.00045;

      // Interactive tilt reacting to cursor
      const rotY = pointer.x * 0.08 + Math.sin(t) * 0.035;
      const rotX = -pointer.y * 0.04 + Math.sin(t * 0.7) * 0.02;

      if (ticketGroup.visible) {
        ticketGroup.rotation.y += (rotY - ticketGroup.rotation.y) * 0.04;
        ticketGroup.rotation.x += (rotX - ticketGroup.rotation.x) * 0.04;
        ticketPhone.position.y = -0.25 + Math.sin(t * 1.5) * 0.05;

        ticketBadgeMeshes.forEach((b) => {
          b.position.y = b.userData.baseY + Math.sin(t * 1.4 + b.userData.offset) * 0.04;
          b.rotation.y = Math.sin(t * 0.8 + b.userData.offset) * 0.08;
        });
      }

      if (evaGroup.visible) {
        evaGroup.rotation.y += (rotY - evaGroup.rotation.y) * 0.04;
        evaGroup.rotation.x += (rotX - evaGroup.rotation.x) * 0.04;
        evaPhone.position.y = -0.15 + Math.sin(t * 1.5) * 0.05;

        evaBadgeMeshes.forEach((b) => {
          b.position.y = b.userData.baseY + Math.sin(t * 1.4 + b.userData.offset) * 0.04;
          b.rotation.y = Math.sin(t * 0.8 + b.userData.offset) * 0.08;
        });
      }

      // Shared nodes
      nodes.children.forEach((node, i) => {
        node.position.y = node.userData.baseY + Math.sin(t * 1.3 + i) * 0.04;
        node.rotation.y += 0.006;
      });

      renderer.render(scene, camera);
    };

    stage.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);

    resize();
    setTimeout(resize, 150);
    setTimeout(resize, 500);
    animate(0);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
      } else {
        frame = window.requestAnimationFrame(animate);
      }
    });

    // ==========================================
    // SLIDER CONTROLLER (10-SECOND AUTO-ROTATE)
    // ==========================================
    const heroSection = document.querySelector(".bekatos-hero");
    const slides = document.querySelectorAll(".bekatos-hero__slide");
    const tabs = document.querySelectorAll(".bekatos-hero__nav-tab");
    const prevBtn = document.getElementById("heroPrevBtn");
    const nextBtn = document.getElementById("heroNextBtn");
    const labelEl = document.getElementById("heroVisualLabel");
    const captionIndexEl = document.getElementById("heroCaptionIndex");
    const captionTitleEl = document.getElementById("heroCaptionTitle");

    let current = 0;
    const total = 2;
    let timerId = null;
    let isPaused = false;

    const visualMeta = [
      {
        label: '<span class="bekatos-hero__live-dot"></span> Canlı SaaS & Destek Ekosistemi',
        index: "01 / 02",
        title: "BEKATOS TICKET SUITE · SAAS & REAL-TIME SSE",
      },
      {
        label: '<span class="bekatos-hero__live-dot live-dot--eva"></span> Akıllı b-Kılavuz & Dijital QR Ekosistemi',
        index: "02 / 02",
        title: "BEKATOS b-KILAVUZ · SMART QR & DIGITAL ECOSYSTEM",
      },
    ];

    function restartProgressBar(tabEl) {
      if (!tabEl) return;
      const bar = tabEl.querySelector(".nav-tab-progress-bar");
      if (bar) {
        bar.style.animation = "none";
        // Force reflow
        void bar.offsetWidth;
        bar.style.animation = "bekatosSlideProgress 10s linear forwards";
      }
    }

    function goTo(index) {
      current = ((index % total) + total) % total;

      // Update slide contents
      slides.forEach((s, idx) => {
        if (idx === current) {
          s.classList.add("is-active");
        } else {
          s.classList.remove("is-active");
        }
      });

      // Update navigation tabs
      tabs.forEach((tab, idx) => {
        if (idx === current) {
          tab.classList.add("is-active");
          restartProgressBar(tab);
        } else {
          tab.classList.remove("is-active");
          const b = tab.querySelector(".nav-tab-progress-bar");
          if (b) b.style.animation = "none";
        }
      });

      // Update visual labels & captions
      if (labelEl && visualMeta[current]) labelEl.innerHTML = visualMeta[current].label;
      if (captionIndexEl && visualMeta[current]) captionIndexEl.textContent = visualMeta[current].index;
      if (captionTitleEl && visualMeta[current]) captionTitleEl.textContent = visualMeta[current].title;

      // Trigger 3D Transition
      if (window.setHeroSlide) {
        window.setHeroSlide(current);
      }

      resetAutoTimer();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoTimer() {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        if (!isPaused) {
          next();
        }
      }, 10000);
    }

    function resetAutoTimer() {
      startAutoTimer();
    }

    // Expose controller globally
    window.heroSlider = {
      goToSlide: goTo,
      next: next,
      prev: prev,
      getCurrent: () => current,
    };

    // Attach click listeners to tabs
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = parseInt(tab.getAttribute("data-slide-target"), 10);
        if (!isNaN(target)) goTo(target);
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    // Pause on hover
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => {
        isPaused = true;
      });
      heroSection.addEventListener("mouseleave", () => {
        isPaused = false;
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // Start 10s auto timer & initial progress
    goTo(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
