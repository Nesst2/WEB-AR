import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add AR Button
document.body.appendChild(ARButton.createButton(renderer));

// Add Light
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
light.position.set(0.5, 1, 0.25);
scene.add(light);

// Load 3D Model
const loader = new GLTFLoader();
loader.load('model.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, -2); // Place the model 2 meters in front of the user
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

// Add Error Handling
if (!navigator.xr) {
    document.getElementById('error-message').style.display = 'block';
}

// Animation Loop
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

animate();
