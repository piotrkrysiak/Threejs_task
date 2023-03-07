import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleResize, zoomCamera } from "./helpers";

const render = new THREE.WebGLRenderer({ antialias: true });

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let rotationCount = 0;
let clicked = false;

const onClick = (event) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  const merged = [];
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.parent) {
      merged.push(intersects[i].object.parent);
    }
  }

  if (merged.length > 0) {
    if (rotationCount === 0 && !clicked) {
      console.log("clicked");
      clicked = true;
      rotate(merged[0]);
      merged[0].children[0].material.color.set("red");
    }
  }
};

const rotate = (obj) => {
  obj.rotation.x += 0.1;
  const degrees = (obj.rotation.x * 180) / Math.PI;

  if (degrees >= 360) {
    console.log("one rotation completed");
    rotationCount++;
    obj.rotation.x = 0;
  }

  if (rotationCount >= 1) {
    clicked = false;
    rotationCount = 0;
    return;
  }
  requestAnimationFrame(() => rotate(obj));
};

window.addEventListener("click", onClick, false);

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

zoomCamera(camera, 5, 1000);

window.addEventListener("resize", () => {
  handleResize(render, camera);
});
