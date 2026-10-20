/**
 * Bekatos EVA Intro - 3D QR Panel Flip Dialog
 * Uses global window.THREE (assets/js/three.min.js) for full offline and file:// support
 */

(function () {
  function init() {
    const THREE = window.THREE;
    if (!THREE) return;

    const intro = document.getElementById("evaIntro");
    const dialog = intro?.querySelector(".eva-intro__dialog");
    const stage = document.getElementById("evaIntroStage");
    const openButton = document.getElementById("openEvaIntro");
    const closeButton = document.getElementById("evaIntroClose");
    const mainContent = document.querySelector(".main-content");

    if (!intro || !dialog || !stage) return;
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

    const loader = new THREE.TextureLoader();
    const frontTexture = loader.load(window.BEKATOS_PANEL_FRONT || "BekatosEvaPanel.png");
    const backTexture = loader.load(window.BEKATOS_PANEL_BACK || "bekatosevaArka.png");
    [frontTexture, backTexture].forEach((texture) => {
      if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    });

    const panel = new THREE.Group();
    const panelHeight = 3.75;
    const panelWidth = panelHeight * (2480 / 3508);
    const thickness = 0.055;
    const face = new THREE.PlaneGeometry(panelWidth, panelHeight);
    const front = new THREE.Mesh(
      face,
      new THREE.MeshStandardMaterial({ map: frontTexture, roughness: 0.68 })
    );
    const back = new THREE.Mesh(
      face,
      new THREE.MeshStandardMaterial({ map: backTexture, roughness: 0.72 })
    );
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(panelWidth, panelHeight, thickness),
      new THREE.MeshStandardMaterial({ color: 0xf3efe5, roughness: 0.88 })
    );
    front.position.z = thickness / 2 + 0.002;
    back.position.z = -thickness / 2 - 0.002;
    back.rotation.y = Math.PI;
    edge.renderOrder = -1;
    panel.add(edge, front, back);
    scene.add(panel);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(2.8, 4, 5);
    scene.add(keyLight, new THREE.AmbientLight(0xdcecff, 1.7));

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let isOpen = false;

    const resize = () => {
      let width = stage.clientWidth;
      let height = stage.clientHeight;
      if (!width || !height) {
        width = stage.offsetWidth || 400;
        height = stage.offsetHeight || 300;
      }
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.set(width < 520 ? 0.08 : 0.12, 0.02, width < 520 ? 5.55 : 5.05);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const animate = (time) => {
      if (!isOpen) return;
      if (!reduceMotion) frame = window.requestAnimationFrame(animate);
      const idle = (time || 0) * 0.00042;
      panel.rotation.set(-0.045 + Math.sin(idle * 0.7) * 0.025, -0.42 + Math.sin(idle) * 0.24, 0.025);
      panel.position.y = Math.sin(idle * 1.5) * 0.045;
      renderer.render(scene, camera);
    };

    const openIntro = () => {
      isOpen = true;
      intro.classList.add("is-open");
      intro.setAttribute("aria-hidden", "false");
      intro.removeAttribute("inert");
      document.body.classList.add("eva-intro-active");
      if (mainContent) mainContent.inert = true;
      resize();
      if (reduceMotion) animate(0);
      else frame = window.requestAnimationFrame(animate);
      closeButton?.focus();
    };

    const closeIntro = () => {
      isOpen = false;
      window.cancelAnimationFrame(frame);
      intro.classList.remove("is-open");
      intro.setAttribute("aria-hidden", "true");
      intro.setAttribute("inert", "");
      document.body.classList.remove("eva-intro-active");
      if (mainContent) mainContent.inert = false;
    };

    const openButtons = document.querySelectorAll("#openEvaIntro, #openEvaIntroSlide2, .js-open-eva-intro");
    openButtons.forEach((btn) => btn.addEventListener("click", openIntro));
    closeButton?.addEventListener("click", closeIntro);

    window.addEventListener("resize", resize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
