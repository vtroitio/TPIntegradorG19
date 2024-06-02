import 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js';

import * as THREE from 'three';

import { models } from '../data/models.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Inicio {
  constructor(canvas) {
    this.inicio = document.getElementById('inicio');
    canvas.width = this.inicio.getBoundingClientRect().width;
    canvas.height = this.inicio.getBoundingClientRect().height;
    this.render(canvas);
  }
  render(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.inicio.getBoundingClientRect().width /
        this.inicio.getBoundingClientRect().height,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setClearColor('#fff');
    renderer.setSize(
      this.inicio.getBoundingClientRect().width,
      this.inicio.getBoundingClientRect().height
    );
    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', () => {
      renderer.setSize(
        this.inicio.getBoundingClientRect().width,
        this.inicio.getBoundingClientRect().height
      );
      camera.aspect =
        this.inicio.getBoundingClientRect().width /
        this.inicio.getBoundingClientRect().height;

      camera.updateProjectionMatrix();
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshLambertMaterial({ color: 0x118191 });
    const material2 = new THREE.MeshLambertMaterial({ color: 0x31595e });

    let meshX = -20;
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(
        geometry,
        Math.floor(Math.random() * 2) ? material1 : material2
      );
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      scene.add(mesh);
      meshX += 1;
    }

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    function animate() {
      renderer.render(scene, camera);
    }

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / canvas.width) * 2 - 1;
      mouse.y = -(event.clientY / canvas.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      for (let i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.scale, 0.5, {
          x: 0.5,
          ease: Expo.easeOut,
        });
        this.tl.to(
          intersects[i].object.rotation,
          0.5,
          { y: Math.PI * 0.5, ease: Expo.easeOut },
          '=-1.5'
        );
      }
    }

    window.addEventListener('mousemove', onMouseMove);
  }
}

class Product {
  constructor(canvas, model) {
    this.render(canvas, model);
  }
  render(canvas, model) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      canvas.width / canvas.height,
      0.1,
      10000
    );

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvas.width, canvas.height, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);

    const loader = new GLTFLoader();
    loader.load(model.path, (gltf) => {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      gltf.scene.position.x += gltf.scene.position.x - center.x;
      gltf.scene.position.y += gltf.scene.position.y - center.y;
      gltf.scene.position.z += gltf.scene.position.z - center.z;

      scene.add(gltf.scene);
    });

    camera.position.z = model.distance;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set(0, 1, 0);
    controls.update();

    function animate() {
      camera.updateProjectionMatrix();

      controls.update();

      renderer.render(scene, camera);
    }
  }
}

const canvases = document.querySelectorAll('.product-canvas');

new Inicio(document.getElementById('inicio-canvas'));
canvases.forEach((canvas, index) => new Product(canvas, models[index]));
