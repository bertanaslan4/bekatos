/**
 * Bekatos Ticket - 3D Interactive Ticket Showcase Scene
 * Uses global window.THREE (assets/js/three.min.js) for full offline and file:// support
 */

(function () {
  function init() {
    const THREE = window.THREE;
    if (!THREE) {
      console.warn("Three.js not found for Ticket Scene");
      return;
    }

    const stage = document.getElementById("bekatosTicketStage");
    if (!stage) return;

    if (stage.querySelector("canvas")) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.3, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(0x20a48e, 3.5);
    primaryLight.position.set(4, 5, 6);
    scene.add(primaryLight);

    const accentLight = new THREE.DirectionalLight(0x00f2fe, 2.5);
    accentLight.position.set(-4, -2, 5);
    scene.add(accentLight);

    const pointLight = new THREE.PointLight(0x147c71, 4, 15);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Main group for mouse parallax
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);

    function roundRect(ctx, x, y, width, height, radius) {
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
    }

    function createTicketCanvasTexture(ticket) {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 560;
      const ctx = canvas.getContext("2d");

      // Card Background
      const grad = ctx.createLinearGradient(0, 0, 1024, 560);
      grad.addColorStop(0, "rgba(13, 27, 42, 0.95)");
      grad.addColorStop(1, "rgba(20, 42, 64, 0.92)");
      ctx.fillStyle = grad;
      roundRect(ctx, 0, 0, 1024, 560, 36);
      ctx.fill();

      // Border stroke
      ctx.strokeStyle = ticket.borderColor || "rgba(32, 164, 142, 0.6)";
      ctx.lineWidth = 6;
      roundRect(ctx, 3, 3, 1018, 554, 34);
      ctx.stroke();

      // Top Bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      roundRect(ctx, 6, 6, 1012, 110, 30);
      ctx.fill();

      // ID
      ctx.fillStyle = "#20a48e";
      ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.id, 46, 72);

      // Status Badge
      const badgeX = 720;
      const badgeY = 36;
      const badgeW = 250;
      const badgeH = 54;
      ctx.fillStyle = ticket.statusBg || "rgba(32, 164, 142, 0.25)";
      roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 27);
      ctx.fill();
      ctx.strokeStyle = ticket.statusColor || "#20a48e";
      ctx.lineWidth = 3;
      roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 27);
      ctx.stroke();

      ctx.fillStyle = ticket.statusColor || "#20a48e";
      ctx.beginPath();
      ctx.arc(badgeX + 28, badgeY + 27, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.statusText, badgeX + 50, badgeY + 36);

      // Title
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.title, 46, 195);

      // Desc
      ctx.fillStyle = "#94a3b8";
      ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.desc, 46, 250);

      // Divider
      ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(46, 290);
      ctx.lineTo(978, 290);
      ctx.stroke();

      // Footer
      ctx.fillStyle = "#64748b";
      ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("DEPARTMAN", 46, 340);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.dept, 46, 385);

      ctx.fillStyle = "#64748b";
      ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("ÖNCELİK & SLA", 360, 340);
      ctx.fillStyle = ticket.priorityColor || "#38bdf8";
      ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.priority, 360, 385);

      ctx.fillStyle = "#64748b";
      ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("CANLI DURUM", 680, 340);
      ctx.fillStyle = "#22d3ee";
      ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(ticket.telemetry, 680, 385);

      ctx.fillStyle = "rgba(32, 164, 142, 0.15)";
      roundRect(ctx, 46, 440, 932, 70, 18);
      ctx.fill();
      ctx.strokeStyle = "rgba(32, 164, 142, 0.35)";
      ctx.lineWidth = 1.5;
      roundRect(ctx, 46, 440, 932, 70, 18);
      ctx.stroke();

      ctx.fillStyle = "#20a48e";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("⚡ " + ticket.highlight, 72, 484);

      const texture = new THREE.CanvasTexture(canvas);
      if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    const ticketsData = [
      {
        id: "#TK-4821 · ticket.bekatos.com",
        title: "Mobil Ödeme Entegrasyonu & API Webhook",
        desc: "İstemci tarafı ödeme bildirimleri ve anlık SSE güncellemeleri kontrolü.",
        dept: "Sistem & Altyapı",
        priority: "Kritik · SLA: 15 dk",
        priorityColor: "#f43f5e",
        telemetry: "SSE Canlı İletim",
        statusText: "Açık / İşlemde",
        statusColor: "#f43f5e",
        statusBg: "rgba(244, 63, 94, 0.22)",
        borderColor: "rgba(244, 63, 94, 0.55)",
        highlight: "Gerçek Zamanlı WebSockets & SSE ile anlık güncelleniyor",
        pos: { x: -0.6, y: 0.55, z: 0.5 },
        rot: { x: 0.08, y: 0.16, z: -0.02 },
      },
      {
        id: "#TK-4820 · PostgreSQL 14",
        title: "Veritabanı Senkronizasyonu & Güvenlik",
        desc: "ACID uyumlu kayıt saklama ve otomatik veri yedekleme testi tamamlandı.",
        dept: "Veritabanı & Cloud",
        priority: "Yüksek · %100 Uptime",
        priorityColor: "#10b981",
        telemetry: "Sağlıklı (OK)",
        statusText: "Çözüldü ✓",
        statusColor: "#10b981",
        statusBg: "rgba(16, 185, 129, 0.22)",
        borderColor: "rgba(16, 185, 129, 0.55)",
        highlight: "Müşteri CSAT Puanı: 5.0 / 5.0 · Çözüm Süresi: 3.4 dk",
        pos: { x: 0.5, y: -0.4, z: 0.2 },
        rot: { x: -0.05, y: -0.14, z: 0.02 },
      },
      {
        id: "#TK-4819 · AI Destek",
        title: "Yapay Zeka Destekli Otomatik Çözüm Motoru",
        desc: "Gelen biletleri sınıflandırıp anında çözüm önerisi sunan NLP algoritması.",
        dept: "Bekatos AI Core",
        priority: "Otomatik Yanıt",
        priorityColor: "#38bdf8",
        telemetry: "Aktif Öğrenme",
        statusText: "AI Çözümü Hazır",
        statusColor: "#38bdf8",
        statusBg: "rgba(56, 189, 248, 0.22)",
        borderColor: "rgba(56, 189, 248, 0.55)",
        highlight: "Temsilci onayına sunuldu · 24/7 Kesintisiz Destek",
        pos: { x: -0.15, y: -1.25, z: -0.2 },
        rot: { x: 0.1, y: 0.05, z: -0.01 },
      },
    ];

    const cardMeshes = [];
    const cardGeometry = new THREE.PlaneGeometry(3.6, 1.98);

    ticketsData.forEach((data, index) => {
      const texture = createTicketCanvasTexture(data);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.3,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const card = new THREE.Mesh(cardGeometry, material);
      card.position.set(data.pos.x, data.pos.y, data.pos.z);
      card.rotation.set(data.rot.x, data.rot.y, data.rot.z);
      card.userData = {
        baseX: data.pos.x,
        baseY: data.pos.y,
        baseZ: data.pos.z,
        baseRotX: data.rot.x,
        baseRotY: data.rot.y,
        baseRotZ: data.rot.z,
        index: index,
        floatSpeed: 1 + index * 0.35,
        floatOffset: index * 1.8,
      };

      const backGeo = new THREE.BoxGeometry(3.64, 2.02, 0.04);
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x0a1622,
        roughness: 0.5,
        metalness: 0.8,
      });
      const backMesh = new THREE.Mesh(backGeo, backMat);
      backMesh.position.z = -0.025;
      card.add(backMesh);

      showcaseGroup.add(card);
      cardMeshes.push(card);
    });

    // Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(1.9, 0.9, -0.6);

    const coreGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x20a48e,
      emissive: 0x147c71,
      emissiveIntensity: 0.9,
      wireframe: true,
      roughness: 0.2,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    const innerCoreGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    const ringGeo = new THREE.TorusGeometry(0.85, 0.015, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring1, ring2);

    showcaseGroup.add(coreGroup);

    // Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleSpeeds[i] = 0.008 + Math.random() * 0.015;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x20a48e,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrameId = null;

    const onPointerMove = (e) => {
      const rect = stage.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resize = () => {
      let width = stage.clientWidth;
      let height = stage.clientHeight;
      if (!width || !height) {
        const bounds = stage.getBoundingClientRect();
        width = bounds.width || stage.offsetWidth || 560;
        height = bounds.height || stage.offsetHeight || 500;
      }

      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      if (width < 640) {
        camera.position.set(0, 0.1, 9.2);
        showcaseGroup.scale.set(0.72, 0.72, 0.72);
      } else if (width < 992) {
        camera.position.set(0, 0.2, 8.2);
        showcaseGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        camera.position.set(0, 0.3, 7.2);
        showcaseGroup.scale.set(1, 1, 1);
      }

      camera.updateProjectionMatrix();
    };

    const animate = (time) => {
      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }

      const t = (time || 0) * 0.001;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      showcaseGroup.rotation.y = mouse.x * 0.22 + Math.sin(t * 0.5) * 0.03;
      showcaseGroup.rotation.x = -mouse.y * 0.16 + Math.cos(t * 0.4) * 0.02;

      cardMeshes.forEach((card) => {
        const u = card.userData;
        card.position.y = u.baseY + Math.sin(t * u.floatSpeed + u.floatOffset) * 0.08;
        card.position.x = u.baseX + Math.cos(t * (u.floatSpeed * 0.7) + u.floatOffset) * 0.03;
        card.rotation.z = u.baseRotZ + Math.sin(t * 0.8 + u.floatOffset) * 0.015;
      });

      coreGroup.rotation.y += 0.015;
      coreGroup.rotation.x += 0.008;
      ring1.rotation.z += 0.02;
      ring2.rotation.x -= 0.018;

      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += particleSpeeds[i];
        if (pos[i * 3 + 1] > 3) {
          pos[i * 3 + 1] = -3;
          pos[i * 3] = (Math.random() - 0.5) * 8;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    });

    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);

    resize();
    setTimeout(resize, 150);
    setTimeout(resize, 500);
    animate(0);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
