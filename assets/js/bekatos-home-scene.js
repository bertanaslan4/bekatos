import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const stage = document.getElementById("bekatosHeroStage");

if (stage) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0xf4f7f8, 0);
  stage.appendChild(renderer.domElement);

  const makeScreen = (kind) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 680;
    const ctx = canvas.getContext("2d");
    const phone = kind === "phone";
    ctx.fillStyle = phone ? "#f7faf9" : "#f6f8f8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (phone) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 1000, 112);
      ctx.fillStyle = "#147c71";
      ctx.fillRect(48, 47, 60, 14);
      ctx.fillRect(48, 72, 112, 9);
      ctx.fillStyle = "#dbe7e4";
      ctx.beginPath();
      ctx.arc(922, 61, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#173447";
      ctx.font = "600 40px Arial";
      ctx.fillText("Genel Bakış", 48, 174);
      ctx.fillStyle = "#fff";
      ctx.fillRect(42, 208, 916, 185);
      ctx.fillStyle = "#678078";
      ctx.font = "24px Arial";
      ctx.fillText("Bugünkü işler", 72, 255);
      ctx.fillStyle = "#147c71";
      ctx.font = "700 60px Arial";
      ctx.fillText("12", 72, 332);
      ctx.fillStyle = "#d5e1df";
      ctx.fillRect(42, 420, 440, 210);
      ctx.fillRect(518, 420, 440, 210);
      ctx.fillStyle = "#e9a655";
      ctx.beginPath();
      ctx.arc(152, 510, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillRect(218, 480, 190, 14);
      ctx.fillRect(218, 516, 142, 10);
      ctx.fillStyle = "#147c71";
      ctx.fillRect(570, 505, 292, 13);
      ctx.fillRect(570, 545, 226, 10);
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 1000, 86);
      ctx.fillStyle = "#147c71";
      ctx.fillRect(33, 31, 30, 24);
      ctx.fillStyle = "#173447";
      ctx.font = "700 23px Arial";
      ctx.fillText("bekatos", 76, 51);
      ctx.fillStyle = "#e7eeed";
      ctx.fillRect(230, 37, 320, 13);
      ctx.fillStyle = "#edf3f2";
      ctx.fillRect(28, 112, 185, 540);
      ctx.fillStyle = "#a8bab7";
      for (let i = 0; i < 7; i += 1) {
        ctx.fillRect(50, 154 + i * 56, 118 - (i % 3) * 22, 12);
      }
      ctx.fillStyle = "#173447";
      ctx.font = "600 29px Arial";
      ctx.fillText("Operasyon Paneli", 250, 157);
      ctx.fillStyle = "#71817f";
      ctx.font = "16px Arial";
      ctx.fillText("İşletmenizin tüm akışı tek yerde", 250, 188);

      const stats = [
        ["Aktif Sipariş", "1.284", "#147c71"],
        ["Tamamlanan", "936", "#e5a148"],
        ["Ekip Üyesi", "24", "#5278a3"],
      ];
      stats.forEach(([label, value, color], index) => {
        const x = 250 + index * 224;
        ctx.fillStyle = "#fff";
        ctx.fillRect(x, 220, 204, 126);
        ctx.fillStyle = color;
        ctx.fillRect(x, 220, 4, 126);
        ctx.fillStyle = "#71817f";
        ctx.font = "15px Arial";
        ctx.fillText(label, x + 18, 253);
        ctx.fillStyle = "#173447";
        ctx.font = "700 34px Arial";
        ctx.fillText(value, x + 18, 305);
      });

      ctx.fillStyle = "#fff";
      ctx.fillRect(250, 370, 654, 245);
      ctx.fillStyle = "#173447";
      ctx.font = "600 19px Arial";
      ctx.fillText("Haftalık performans", 274, 405);
      ctx.strokeStyle = "#e6eeec";
      ctx.lineWidth = 1;
      for (let y = 446; y < 590; y += 36) {
        ctx.beginPath();
        ctx.moveTo(276, y);
        ctx.lineTo(878, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(282, 550);
      ctx.bezierCurveTo(378, 515, 420, 565, 500, 493);
      ctx.bezierCurveTo(600, 425, 630, 520, 718, 465);
      ctx.bezierCurveTo(785, 430, 814, 478, 872, 434);
      ctx.strokeStyle = "#147c71";
      ctx.lineWidth = 5;
      ctx.stroke();
      [[282, 550], [500, 493], [718, 465], [872, 434]].forEach(([x, y]) => {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#147c71";
        ctx.lineWidth = 4;
        ctx.stroke();
      });
      ctx.fillStyle = "#fff";
      ctx.fillRect(925, 220, 48, 126);
      ctx.fillStyle = "#147c71";
      ctx.beginPath();
      ctx.arc(949, 267, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e5a148";
      ctx.beginPath();
      ctx.arc(949, 310, 15, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  };

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa9a8, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.1);
  keyLight.position.set(-3, 5, 7);
  scene.add(keyLight);

  const devices = new THREE.Group();
  scene.add(devices);

  const laptop = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color: 0x263a45, roughness: 0.3, metalness: 0.58 });
  const edge = new THREE.MeshStandardMaterial({ color: 0xcbd5d4, roughness: 0.34, metalness: 0.68 });
  const display = new THREE.MeshStandardMaterial({ map: makeScreen("desktop"), roughness: 0.58, metalness: 0.02 });
  const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(3.02, 2.12, 0.12), dark);
  screenFrame.position.set(-0.1, 0.23, 0);
  laptop.add(screenFrame);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.82, 1.92), display);
  screen.position.set(-0.1, 0.24, 0.064);
  laptop.add(screen);
  const base = new THREE.Mesh(new THREE.BoxGeometry(3.18, 0.13, 1.82), edge);
  base.position.set(-0.1, -0.91, 0.51);
  laptop.add(base);
  const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.012, 0.48), dark);
  trackpad.position.set(-0.1, -0.835, 0.82);
  laptop.add(trackpad);
  const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x62737a, roughness: 0.55, metalness: 0.25 });
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.018, 0.12), keyMaterial);
      key.position.set(-1.36 + col * 0.23, -0.827, 0.1 + row * 0.19);
      laptop.add(key);
    }
  }
  laptop.rotation.x = -0.12;
  laptop.rotation.y = 0.2;
  devices.add(laptop);

  const phone = new THREE.Group();
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.8, 0.12), dark);
  const phoneScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 1.63),
    new THREE.MeshStandardMaterial({ map: makeScreen("phone"), roughness: 0.55 })
  );
  phoneScreen.position.z = 0.067;
  phone.add(phoneBody, phoneScreen);
  phone.position.set(1.45, -0.27, 0.55);
  phone.rotation.set(-0.08, -0.17, -0.045);
  devices.add(phone);

  const nodes = new THREE.Group();
  const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0x20a48e, emissive: 0x087164, emissiveIntensity: 0.35, roughness: 0.28 });
  const positions = [[-1.35, 1.05, -0.4], [0.15, 1.55, -0.2], [1.8, 1.12, -0.5], [2.1, -0.2, -0.25], [-1.9, -0.45, -0.35]];
  positions.forEach(([x, y, z], index) => {
    const node = new THREE.Mesh(new THREE.IcosahedronGeometry(index === 1 ? 0.095 : 0.065, 1), nodeMaterial);
    node.position.set(x, y, z);
    node.userData.homeY = y;
    nodes.add(node);
  });
  scene.add(nodes);

  const pointer = new THREE.Vector2();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  const resize = () => {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(width < 560 ? 0.1 : 0.15, 0.1, width < 560 ? 8.5 : 7.3);
    camera.lookAt(0, 0.1, 0);
    camera.updateProjectionMatrix();
  };
  const onPointerMove = (event) => {
    const bounds = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };
  const animate = (time) => {
    if (!reduceMotion) frame = window.requestAnimationFrame(animate);
    const t = time * 0.00045;
    devices.rotation.y += (pointer.x * 0.07 + Math.sin(t) * 0.035 - devices.rotation.y) * 0.025;
    devices.rotation.x += (-pointer.y * 0.035 + Math.sin(t * 0.7) * 0.018 - devices.rotation.x) * 0.025;
    phone.position.y = -0.27 + Math.sin(t * 1.5) * 0.055;
    nodes.children.forEach((node, i) => {
      node.position.y = node.userData.homeY + Math.sin(t * 1.3 + i) * 0.035;
      node.rotation.y += 0.004;
    });
    renderer.render(scene, camera);
  };

  stage.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", resize);
  resize();
  animate(0);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(frame);
    } else {
      frame = window.requestAnimationFrame(animate);
    }
  });
}
