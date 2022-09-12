import './style.css'

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.4/';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.137.4/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.137.4/examples/jsm/loaders/GLTFLoader.js';

/*Thank you to https://youtu.be/91Q6RvKvd7o and https://youtu.be/Q7AOvWpIVHU*/

const width = window.innerWidth/2;
const height = window.innerHeight/2

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0xFFFFFF, 0);
camera.position.setX(1.5);
camera.position.setY(0.7);
camera.position.setZ(2.5);


const pointLight = new THREE.PointLight(0xFFFFC0);
pointLight.position.set(1.2, 1.6, 0.2);
const pointLight1 = new THREE.PointLight(0xFFFFC0);
pointLight1.position.set(1.2, 1.6, 0.2);
const pointLight2 = new THREE.PointLight(0xFFFFC0);
pointLight2.position.set(-1, 0, -2);

scene.add(pointLight, pointLight1, pointLight2);


const loader = new GLTFLoader();

loader.load('fuji-light.glb', function(gltf){
  gltf.scene.name = "current";
  gltf.scene.position.y-=2;
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
});

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);

  controls.update();
  scene.rotation.y -= 0.005;

  renderer.render(scene, camera);
}

animate();