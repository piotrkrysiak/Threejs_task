import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const animate = () => {
  requestAnimationFrame(animate);
  render.render(scene, camera);
};

render.setAnimationLoop(animate);
