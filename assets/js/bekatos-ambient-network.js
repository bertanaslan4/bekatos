/**
 * Bekatos Software House - Ambient 3D Interactive Tech Network
 * Uses global window.THREE (assets/js/three.min.js) for full offline and file:// support
 */

(function () {
  function init() {
    const THREE = window.THREE;
    if (!THREE) return;

    const container = document.getElementById("bekatosAmbientNetwork");
    if (!container) return;

    if (container.querySelector("canvas")) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    const nodeCount = 45;
    const maxDistance = 5.2;
    const nodes = [];

    const nodeGeometry = new THREE.SphereGeometry(0.09, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x20a48e,
      transparent: true,
      opacity: 0.85,
    });

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const pos = {
        x: (Math.random() - 0.5) * 28,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 8,
      };
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012,
          z: (Math.random() - 0.5) * 0.006,
        },
        basePos: { ...pos },
      };
      nodeGroup.add(mesh);
      nodes.push(mesh);
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x147c71,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const maxLines = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = null;

    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      let width = container.clientWidth;
      let height = container.clientHeight;
      if (!width || !height) {
        width = container.offsetWidth || window.innerWidth;
        height = container.offsetHeight || 600;
      }
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      if (!reduceMotion) frameId = requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      nodeGroup.rotation.y = mouse.x * 0.15;
      nodeGroup.rotation.x = -mouse.y * 0.1;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.position.x += node.userData.velocity.x;
        node.position.y += node.userData.velocity.y;
        node.position.z += node.userData.velocity.z;

        if (Math.abs(node.position.x) > 15) node.userData.velocity.x *= -1;
        if (Math.abs(node.position.y) > 9) node.userData.velocity.y *= -1;
        if (Math.abs(node.position.z) > 5) node.userData.velocity.z *= -1;
      }

      let lineIdx = 0;
      const posArr = lineGeometry.attributes.position.array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].position.x - nodes[j].position.x;
          const dy = nodes[i].position.y - nodes[j].position.y;
          const dz = nodes[i].position.z - nodes[j].position.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            posArr[lineIdx++] = nodes[i].position.x;
            posArr[lineIdx++] = nodes[i].position.y;
            posArr[lineIdx++] = nodes[i].position.z;
            posArr[lineIdx++] = nodes[j].position.x;
            posArr[lineIdx++] = nodes[j].position.y;
            posArr[lineIdx++] = nodes[j].position.z;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);
    
    resize();
    setTimeout(resize, 200);
    animate();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (frameId) cancelAnimationFrame(frameId);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
