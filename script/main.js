import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3 /* changes the length of the axis */);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

function animate(time) {

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
