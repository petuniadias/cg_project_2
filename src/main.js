import * as THREE from 'three';
import { COBAIA_PARTS, CAPSULE_WALLS, COLORS, GEOMETRIES, SETTINGS } from './constants.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { randomResult, setupShadows, get } from './utils.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    66.84,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const camera1 = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera1.position.set(0.319, 1.952, -0.302);
camera1.rotation.set(THREE.MathUtils.degToRad(80),THREE.MathUtils.degToRad(-170), 0);

let activeCamera = camera;
const cam01 = document.querySelector('#cam01');
const cam02 = document.querySelector('#cam02');
cam01.classList.add('active');

window.addEventListener("keydown", e => {
    if (e.key === "2") {
        activeCamera = camera1;
        orbit.enabled = false;
        cam02.classList.add('active');
        cam01.classList.remove('active');
    } else if(e.key === "1") {
        activeCamera = camera;
        orbit.enabled = true;
        cam01.classList.add('active');
        cam02.classList.remove('active');
    }
})

const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(3 /* changes the length of the axis */);
// scene.add(axesHelper);

camera.position.set(-2, 3, 6);

camera.rotation.set(0, THREE.MathUtils.degToRad(-18), 0);

orbit.target.set(0.1, 1, -0.1);
orbit.update();

// scene.background = new THREE.Color (0xff0000);

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

let speed = 0;
const state = {
    microwave: 0,
    doors: { isMoving: false, closed: false },
    lever: { rotation: 0, movingForward: true, isMoving: false },
    teleport: { isTeleporting: false, complete: false, stage: 0 },
    btn1: { clicking: true, isMoving: false}
}

const platformMaterial = new THREE.MeshStandardMaterial({ color: COLORS.PLATFORM });

const platform1 = new THREE.Mesh(GEOMETRIES.CYLINDER, platformMaterial);
scene.add(platform1);
platform1.position.set(0.106, 0.09, -0.105);
platform1.scale.set(1.600, 0.150, 1.600);

const platform2 = new THREE.Mesh(GEOMETRIES.CYLINDER, platformMaterial);
platform1.attach(platform2);
platform2.position.set(0.028, 0.795, -0.005);
platform2.scale.set(0.8125, 2.3, 0.8125);

platform1.receiveShadow = true;
platform2.receiveShadow = true;

//capsule
const wallMaterial = new THREE.MeshStandardMaterial({ color: COLORS.WALL });

function createWall() {
    return new THREE.Mesh(GEOMETRIES.BOX, wallMaterial);
}

const capsule = new THREE.Group();
platform2.attach(capsule);

CAPSULE_WALLS.forEach(data => {
    const wall = createWall();
    wall.position.set(...data.pos);
    wall.scale.set(...data.scale);
    wall.rotation.set(
        THREE.MathUtils.degToRad(data.rot[0]),
        THREE.MathUtils.degToRad(data.rot[1]),
        THREE.MathUtils.degToRad(data.rot[2])
    );
    capsule.attach(wall);
});

// doors
const door1 = new THREE.Mesh(GEOMETRIES.BOX, wallMaterial);
capsule.attach(door1);
door1.position.set(-0.20, 1.348, 0.20);
door1.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
door1.scale.set(0.100, 1.600, 0.3);

const door2 = new THREE.Mesh(GEOMETRIES.BOX, wallMaterial);
capsule.attach(door2);
door2.position.set(0.537, 1.348, 0.459);
door2.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
door2.scale.set(0.100, 1.600, 0.30);

const cylinder = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);

const platform3 = new THREE.Mesh(GEOMETRIES.CYLINDER, platformMaterial);
capsule.attach(platform3);
platform3.position.set(0.348, 0.525, -0.184);
platform3.scale.set(0.400, 0.100, 0.400);


/**
 * the cast shadow only works on meshes
 * this function verifies if is a mesh 
 * or not and applies the sahdow
 */

setupShadows(capsule);

// ceiling
const ceiling = new THREE.Group();
capsule.attach(ceiling);
const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xE3E3E3
});
const ceiling1 = new THREE.Mesh(GEOMETRIES.CYLINDER, ceilingMaterial);
ceiling.attach(ceiling1);
ceiling1.position.set(0.359, 2.442, -0.125);
ceiling1.scale.set(0.800, 0.200, 0.800);
ceiling1.castShadow = true;
ceiling1.receiveShadow = true;

const ceiling2 = new THREE.Mesh(GEOMETRIES.CYLINDER, platformMaterial);
ceiling.attach(ceiling2);
ceiling2.position.set(0.359, 2.614, -0.125);
ceiling2.scale.set(0.700, 0.200, 0.700);
ceiling2.castShadow = true;
ceiling2.receiveShadow = true;

// controller
const controller = new THREE.Group();
platform2.attach(controller);

const controllerMaterial = new THREE.MeshStandardMaterial({
    color: 0xC20000
});

const controller1 = new THREE.Mesh(GEOMETRIES.BOX, controllerMaterial);
controller.attach(controller1);
controller1.position.set(-0.639, 0.629, 0.072);
controller1.scale.set(0.400, 0.500, 0.300);
controller1.castShadow = true;
controller1.receiveShadow = true;

const controller2 = new THREE.Mesh(GEOMETRIES.BOX, controllerMaterial);
controller.attach(controller2);
controller2.position.set(-0.639, 0.871, 0.102);
controller2.rotation.set(THREE.MathUtils.degToRad(-55), 0, 0);
controller2.scale.set(0.500, 0.400, 0.200);
controller2.castShadow = true;
controller2.receiveShadow = true;

// alavanca
const alavanca = new THREE.Group();
controller1.attach(alavanca);

const alavancaMaterial = new THREE.MeshStandardMaterial({
    color: 0xBA6D00
});
const alavanca1 = new THREE.Mesh(GEOMETRIES.BOX, alavancaMaterial);
alavanca.attach(alavanca1);
alavanca1.position.set(-0.609, 0.965, 0.188);
alavanca1.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca1.scale.set(0.050, 0.050, 0.240);
alavanca1.castShadow = true;
alavanca1.receiveShadow = true;

const alavanca2 = new THREE.Mesh(GEOMETRIES.BOX, alavancaMaterial);
alavanca.attach(alavanca2);
alavanca2.position.set(-0.511, 0.965, 0.188);
alavanca2.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca2.scale.set(0.050, 0.050, 0.240);
alavanca2.castShadow = true;
alavanca2.receiveShadow = true;

const alavanca3 = new THREE.Mesh(GEOMETRIES.BOX, alavancaMaterial);
alavanca.attach(alavanca3);
alavanca3.position.set(-0.561, 0.955, 0.175);
alavanca3.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca3.scale.set(0.050, 0.020, 0.240);
alavanca3.castShadow = true;
alavanca3.receiveShadow = true;

const pecaMaterial = new THREE.MeshStandardMaterial({
    color: 0xBA6D00
});
const peca1 = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
alavanca.attach(peca1);
peca1.position.set(-0.609, 0.972, 0.197);
peca1.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
peca1.scale.set(0.070, 0.050, 0.070);
peca1.castShadow = true;
peca1.receiveShadow = true;

const peca2 = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
alavanca.attach(peca2);
peca2.position.set(-0.511, 0.972, 0.197);
peca2.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
peca2.scale.set(0.070, 0.050, 0.070);
peca2.castShadow = true;
peca2.receiveShadow = true;

const mainMechanics = new THREE.Group();
alavanca.add(mainMechanics);
mainMechanics.position.set(-0.559, 0.973, 0.203);

const roldana = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
mainMechanics.add(roldana);
roldana.position.set(0, 0, 0);
roldana.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
roldana.scale.set(0.020, 0.180, 0.020);
roldana.castShadow = true;
roldana.receiveShadow = true;

const mainAlavanca = new THREE.Mesh(GEOMETRIES.BOX, alavancaMaterial);
mainMechanics.add(mainAlavanca);
mainAlavanca.rotation.set(THREE.MathUtils.degToRad(70), 0, 0);
// mainAlavanca.position.set(-0.559, 1.055, 0.164);
mainAlavanca.position.set(0, 0.08, -0.03);
mainAlavanca.scale.set(0.050, 0.050, 0.200);

setupShadows(mainMechanics);

// const cobaia2 = new THREE.Group();
const cobaia = new THREE.Group();
const cobaiaMaterial = new THREE.MeshStandardMaterial({ color: COLORS.COBAIA });
let cobaiaMeshes = {};
// cobaia2.add(cobaia);
COBAIA_PARTS.forEach(part => {
    const mesh = new THREE.Mesh(GEOMETRIES.BOX, cobaiaMaterial);
    mesh.position.set(...part.pos);
    mesh.scale.set(...part.scale);
    mesh.rotation.set(0, THREE.MathUtils.degToRad(part.rot[1]), THREE.MathUtils.degToRad(part.rot[2]));
    cobaia.add(mesh);
    cobaiaMeshes[part.name] = mesh;
});

const cobaiaEyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000
});

setupShadows(cobaia);

platform3.attach(cobaia)
cobaia.position.set(0, 0, 0);

const helper = new THREE.AxesHelper(0.5);
cobaia.add(helper);

// button
const button1Group = new THREE.Group();
scene.add(button1Group);

const button1Wrapper = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
button1Group.attach(button1Wrapper);
button1Wrapper.position.set(-0.777, 1.004, 0.098);
button1Wrapper.scale.set(0.030, 0.010, 0.030);
button1Wrapper.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button1 = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
button1Group.attach(button1);
button1.position.set(-0.777, 1.011, 0.102);
button1.scale.set(0.020, 0.020, 0.020);
button1.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button2Group = new THREE.Group();
scene.add(button2Group);

const button2Wrapper = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
button2Group.attach(button2Wrapper);
button2Wrapper.position.set(-0.698, 1.001, 0.098);
button2Wrapper.scale.set(0.030, 0.010, 0.030);
button2Wrapper.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button2 = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
button2Group.attach(button2);
button2.position.set(-0.697, 1.008, 0.102);
button2.scale.set(0.020, 0.020, 0.020);
button2.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

setupShadows(button1Group);
setupShadows(button2Group);

const light = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
light.position.set(0.061, 2.446, 0.597);
light.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(25));
light.scale.set(0.120, 0.050, 0.120);
ceiling1.attach(light);

const light2 = new THREE.Mesh(GEOMETRIES.CYLINDER, pecaMaterial);
light2.position.set(0.057, 2.446, 0.603);
light2.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(25));
light2.scale.set(0.100, 0.100, 0.100);
light.attach(light2);

// light

const pointLight = new THREE.PointLight(0xC800FF, 500 /** intensity */);
pointLight.castShadow = true;
pointLight.distance = 3;
pointLight.decay = 1.2;
pointLight.shadow.bias = -0.005;
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;

scene.add(pointLight);
pointLight.position.set(0.348, 1.519, -0.179);

const spotLight = new THREE.SpotLight(0xFFFFFF, 10 /** intensity */);
scene.add(spotLight);

spotLight.position.set(-3.912, 3.158, 4.126);
spotLight.penumbra = 1;
spotLight.decay = 1.5;
spotLight.angle = 0.5;

spotLight.target = platform1;
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 4096;
spotLight.shadow.mapSize.height = 4096;

// const sLightHelper = new THREE.SpotLightHelper(spotLight, 2 /** size of the light */);
// scene.add(sLightHelper);

// const sLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(sLightShadowHelper);

// const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load('./assets/img/creepylab.jpg');

const results = [
    {
        title: "Teletransportation Success!",
        message: "All atoms are present and correct. Subject is stable.",
        status: "Normal"
    },
    {
        title: "Quantum Shuffle Detected!",
        message: "DNA sequence corrupted. Physical geometry inverted.",
        status: "Critical Error"
    }
];


let popUp;

function createMessage() {
    popUp = document.createElement('div');
    popUp.classList.add('pop-up');
    document.body.appendChild(popUp);
    popUp.innerHTML += `
        <div class="title">
            <h3>Teleportation completed!</h3>
            <i data-lucide="x" class="x-mark" style="cursor: pointer;"></i>
        </div>
        <div style="display: flex; align-items: center; flex-direction: column;">
            <img src="./assets/img/warning.png" alt="">
            <p>All atoms are present.</p>
        </div>
    `;

    lucide.createIcons();

    const xMark = popUp.querySelector('.x-mark');

    xMark.addEventListener('click', () => {
        popUp.style.display = "none";
    });

}

createMessage();
const imgWarning = popUp.querySelector('img');

function displayResult() {
    const finalResult = randomResult(results);

    popUp.querySelector('h3').innerText = finalResult.title;
    popUp.querySelector('p').innerText = finalResult.message;
    if (finalResult === results[0]) {
        imgWarning.src = "./assets/img/greenBeing.png";
        mutation(false);
    } else {
        imgWarning.src = "./assets/img/warning.png";
        mutation(true);
    }
    popUp.style.display = "block";
}

const rayCaster = new THREE.Raycaster();

/** 
 * 2 dimensional director
 * with x and y positionv
 * contain the x, y position of the mouse click
 */

const mousePosition = new THREE.Vector2();

const interactableObjects = [mainAlavanca, button1];

document.addEventListener('click', e => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    rayCaster.setFromCamera(mousePosition, camera);

    const intersects = rayCaster.intersectObjects(interactableObjects, true);
    // console.log(intersects);
    
    if(intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === mainAlavanca) {
            if (state.doors.closed && !state.teleport.isTeleporting) {
                state.lever.isMoving = true;
            } else {
                displayWarning();
            }
        }

        if (clickedObject === button1) {
            state.btn1.isMoving = true;
        }
    }
});

const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, visible: false});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);


let selectedObject = null;
const dragRaycaster = new THREE.Raycaster();
const offset = new THREE.Vector3();

document.addEventListener('mousedown', e => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

    dragRaycaster.setFromCamera(mousePosition, camera);

    const intersects = dragRaycaster.intersectObjects(cobaia.children);
    
    if (intersects.length > 0) {
        selectedObject = cobaia;
        orbit.enabled = false;
        console.log(selectedObject);

        const intersectsPlane = dragRaycaster.intersectObject(plane);
        offset.copy(intersectsPlane[0].point).sub(selectedObject.position);
    }
});

const LIMITES = {
    xMin: -0.5,
    xMax: 1.2,
    zMin: -0.8,
    zMax: 0.5
};

document.addEventListener('mousemove', e => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

    dragRaycaster.setFromCamera(mousePosition, camera);

    if (selectedObject) {
        const intersects = dragRaycaster.intersectObject(plane);
        selectedObject.position.copy(intersects[0].point.sub(offset));

    }
});

document.addEventListener('mouseup', () => {
    selectedObject = null;
    orbit.enabled = true;
});

function displayWarning() {
    const warning = document.createElement('div');
    warning.classList.add("pop-up");
    warning.innerHTML += `
      <h3>Close the door to start teleportation! (for safety reasons)</h3>
    `;

    warning.style.display = 'block';
    document.body.appendChild(warning);
    setTimeout(() => {
        warning.remove();
    }, 2000);
}

function mutation(canMutate) {
    const { body, head, arm1, leg2 } = cobaiaMeshes;
    if (canMutate) {
            body.scale.set(0.1, 0.4, 0.3);
            head.position.y = 0.49;
            arm1.rotation.z = Math.PI;
            leg2.scale.set(0.05, 0.05, 0.05); 
            cobaiaMaterial.color.set(0xff0000); 
        } else {
            body.scale.set(0.200, 0.200, 0.150);
            head.position.set(0, 0.49, 0);
            arm1.rotation.set(0, 0, THREE.MathUtils.degToRad(-10));
            leg2.scale.set(0.050, 0.200, 0.050);
            cobaiaMaterial.color.set(COLORS.COBAIA);
        }
}

function updateDoors() {
    if (state.doors.isMoving) {
        if (state.doors.closed) {
            door1.position.x -= SETTINGS.DOOR_SPEED_X;
            door1.position.z -= SETTINGS.DOOR_SPEED_Z;
            door2.position.x += SETTINGS.DOOR_SPEED_X;
            door2.position.z += SETTINGS.DOOR_SPEED_Z;
            if (door1.position.x <= -0.20) {
                state.doors.closed = false;
                state.doors.isMoving = false;
            }
        } else {
            door1.position.x += SETTINGS.DOOR_SPEED_X;
            door1.position.z += SETTINGS.DOOR_SPEED_Z;
            door2.position.x -= SETTINGS.DOOR_SPEED_X;
            door2.position.z -= SETTINGS.DOOR_SPEED_Z;
            if (door1.position.x >= 0.025) {
                state.doors.closed = true;
                state.doors.isMoving = false;
            }
        }
    }
}

function updateLever() {
    if (state.lever.isMoving) {
        if(state.lever.movingForward) {
            state.lever.rotation += SETTINGS.LEVER_SPEED;
            if (state.lever.rotation >= 2) {
                state.lever.movingForward = false; 
                state.lever.isMoving = false;
                cobaia.visible = false;
                state.teleport.isTeleporting = true;
                
                setTimeout(() => {
                    state.teleport.isTeleporting = false;
                    state.teleport.complete = true;

                    if (state.teleport.stage === 0) {
                        state.teleport.stage = 1;
                    } else {
                        cobaia.visible = true;
                        displayResult();
                        state.teleport.stage = 0; // reset stage once finished
                    }

                    state.lever.isMoving = true;
                    state.doors.isMoving = true;
                }, 3000);
            }
        } else {
            state.lever.rotation -= 0.1;
            if (state.lever.rotation <= -0.1) {
                state.lever.movingForward = true;
                state.lever.isMoving = false;
            }
            
        }
        mainMechanics.rotation.x = state.lever.rotation;
    }
}

function teleport() {
    if (state.teleport.isTeleporting) {
        pointLight.intensity = Math.random() * 500;
        spotLight.penumbra = Math.random() * 2.3;
        speed += 1.3;
        capsule.position.x = Math.sin(speed) * SETTINGS.TELEPORT_SHAKE /** range of motion */;
    } else {
        pointLight.intensity = 50;
        capsule.position.x = 0;
        spotLight.penumbra = 0;
    }
}

function updateBtn() {
    if (state.btn1.isMoving) {
        if (state.btn1.clicking) {
            button1.position.y -= 0.001;
            button1.position.z -= 0.00025;
            if (button1.position.y <= 1.005) {
                state.btn1.clicking = false;
                state.btn1.isMoving = false;
                state.doors.isMoving = true;
            }
        } else {
            button1.position.y += 0.001;
            button1.position.z += 0.00025;
            if (button1.position.y >= 1.011) {
                state.btn1.clicking = true;
                state.btn1.isMoving = false;
                state.doors.isMoving = true;
            }
        }
    }
}

function animate() {

    updateDoors();
    updateLever();
    teleport();
    updateBtn();

    state.microwave += SETTINGS.MICROWAVE_SPEED;

    platform3.rotation.y = state.microwave;

    renderer.render(scene, activeCamera);
}

renderer.setAnimationLoop(animate);