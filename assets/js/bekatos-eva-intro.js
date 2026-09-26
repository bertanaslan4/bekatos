import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const intro = document.getElementById("evaIntro");
const stage = document.getElementById("evaIntroStage");
const progressBar = document.getElementById("evaIntroProgress");

if (intro && stage) {
  document.body.classList.add("eva-intro-active");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const frontTexture = textureLoader.load("BekatosEvaPanel.png");
  const backTexture = textureLoader.load("bekatosevaArka.png");
  const textures = [frontTexture, backTexture];

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  });

  const panel = new THREE.Group();
  const panelRatio = 2480 / 3508;
  const panelHeight = 3.75;
  const panelWidth = panelHeight * panelRatio;
  const thickness = 0.055;
  const frontMaterial = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.68,
    metalness: 0.02,
  });
  const backMaterial = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughness: 0.72,
    metalness: 0.02,
  });
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3efe5,
    roughness: 0.88,
  });
  const faceGeometry = new THREE.PlaneGeometry(panelWidth, panelHeight);
  const front = new THREE.Mesh(faceGeometry, frontMaterial);
  const back = new THREE.Mesh(faceGeometry, backMaterial);
  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(panelWidth, panelHeight, thickness),
    edgeMaterial
  );

  front.position.z = thickness / 2 + 0.002;
  back.position.z = -thickness / 2 - 0.002;
  back.rotation.y = Math.PI;
  edge.renderOrder = -1;
  panel.add(edge, front, back);
  scene.add(panel);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(2.8, 4, 5);
  scene.add(keyLight);
  scene.add(new THREE.AmbientLight(0xdcecff, 1.7));

  let targetProgress = 0;
  let progress = 0;
  let completed = false;
  let lastTouchY = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const ease = (value) => value * value * (3 - 2 * value);

  const resize = () => {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const updateProgress = (delta) => {
    if (completed) {
      return;
    }

    targetProgress = clamp(targetProgress + delta, 0, 1);
    if (progressBar) {
      progressBar.style.width = `${Math.round(targetProgress * 100)}%`;
    }
  };

  const completeIntro = () => {
    if (completed) {
      return;
    }

    completed = true;
    intro.classList.add("is-complete");
    document.body.classList.remove("eva-intro-active");

    window.setTimeout(() => {
      const enterUrl = intro.getAttribute("data-enter-url");
      if (enterUrl) {
        window.location.href = enterUrl;
      }
    }, 560);
  };

  const onWheel = (event) => {
    if (completed) {
      return;
    }

    event.preventDefault();
    updateProgress(event.deltaY / 1450);
  };

  const onTouchStart = (event) => {
    lastTouchY = event.touches[0].clientY;
  };

  const onTouchMove = (event) => {
    if (completed) {
      return;
    }

    const currentY = event.touches[0].clientY;
    updateProgress((lastTouchY - currentY) / 780);
    lastTouchY = currentY;
    event.preventDefault();
  };

  const animate = () => {
    progress += (targetProgress - progress) * 0.085;
    const easedProgress = ease(progress);
    const idle = performance.now() * 0.00045;
    const drift = Math.sin(idle) * 0.055;
    const sideStart = window.innerWidth < 992 ? 0.22 : 1.12;

    camera.position.set(
      THREE.MathUtils.lerp(0.08, 0, easedProgress),
      THREE.MathUtils.lerp(0.05, 0, easedProgress),
      THREE.MathUtils.lerp(5.45, 0.72, easedProgress)
    );
    camera.lookAt(0, 0, 0);

    panel.position.x = THREE.MathUtils.lerp(sideStart, 0, easedProgress);
    panel.position.y = THREE.MathUtils.lerp(-0.03, 0, easedProgress);
    panel.rotation.x = THREE.MathUtils.lerp(-0.06, 0, easedProgress);
    panel.rotation.y =
      THREE.MathUtils.lerp(-0.55, 0, easedProgress) +
      (1 - easedProgress) * (idle * 0.42 + drift);
    panel.rotation.z = THREE.MathUtils.lerp(0.035, 0, easedProgress);

    renderer.render(scene, camera);

    if (targetProgress > 0.985 && progress > 0.965) {
      completeIntro();
    } else {
      requestAnimationFrame(animate);
    }
  };

  window.addEventListener("resize", resize);
  intro.addEventListener("wheel", onWheel, { passive: false });
  intro.addEventListener("touchstart", onTouchStart, { passive: true });
  intro.addEventListener("touchmove", onTouchMove, { passive: false });

  resize();
  animate();
}
