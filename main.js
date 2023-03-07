import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);

const app = document.getElementById("app");
app && app.appendChild(render.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const orbitControls = new OrbitControls(camera, render.domElement);
orbitControls.update();

const loader = new GLTFLoader();
loader.load(
  "assets/Object.glb",
  (glb) => {
    console.log(glb);
    scene.add(glb.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log("An error happened", error);
  }
);

const colorLight = new THREE.Color("#F2F2F2");

const light = new THREE.DirectionalLight(colorLight, 3);
light.position.set(2, 2, 5);

const pointLight = new THREE.PointLight(colorLight, 2);
pointLight.position.set(-4, 2, 5);

scene.add(light, pointLight);

const animate = () => {
  requestAnimationFrame(animate);
  render.render(scene, camera);
};

render.setAnimationLoop(animate);
