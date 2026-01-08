import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(3 /* changes the length of the axis */);
// scene.add(axesHelper);

camera.position.set(-2, 3, 6);

camera.rotation.set(0, THREE.MathUtils.degToRad(-18), 0);

orbit.target.set(0.1, 1, -0.1);
orbit.update();

scene.traverse((node) => {
    if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
});

// scene.background = new THREE.Color (0xff0000);

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

/** GEOMETRIES */
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 32);

/** variáveis */

// platform3
let microwave = 0;

// doors
let doorsIsMoving = false;
let doorsClosed = false;

// button to close door
let button1Click = true;
let btnIsMoving;

// alavanca
let rotAlavanca = 0;
let movingForward = true;
let isMoving;

// teleporting status
let isTeleporting = false;
let teleportComplete = false;
let teleportStage = 0;


// teleport machine group


let button2Click = false;

// platform
const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0xE3E3E3
});
const platform1 = new THREE.Mesh(cylinderGeo, platformMaterial);
scene.add(platform1);
platform1.position.set(0.106, 0.09, -0.105);
platform1.scale.set(1.600, 0.150, 1.600);

const platform2 = new THREE.Mesh(cylinderGeo, platformMaterial);
platform1.attach(platform2);
platform2.position.set(0.028, 0.795, -0.005);
platform2.scale.set(0.8125, 2.3, 0.8125);

platform1.receiveShadow = true;
platform2.receiveShadow = true;

//capsule
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x616161
});

function createWall() {
    const mesh = new THREE.Mesh(boxGeo, wallMaterial);
    return mesh;
}

const capsule = new THREE.Group();
platform2.attach(capsule);

const wall1 = createWall()
capsule.attach(wall1);
wall1.position.set(0.140, 0.481, 0.319);
wall1.rotation.set(0.00, THREE.MathUtils.degToRad(68.8), 0);
wall1.scale.set(0.220, 0.200, 1.100);

const wall2 = createWall()
capsule.attach(wall2);
wall2.position.set(-0.289, 1.332, -0.113);
wall2.rotation.set(0, 0, 0);
wall2.scale.set(0.220, 2.000, 0.600);

const wall3 = createWall()
capsule.attach(wall3);
wall3.position.set(-0.091, 1.332, -0.562);
wall3.rotation.set(0, THREE.MathUtils.degToRad(-45), 0);
wall3.scale.set(0.220, 2.000, 0.600);

const wall4 = createWall()
capsule.attach(wall4);
wall4.position.set(0.341, 1.332, -0.744);
wall4.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
wall4.scale.set(0.220, 2.000, 0.600);

const wall5 = createWall()
capsule.attach(wall5);
wall5.position.set(0.769, 1.332, -0.564);
wall5.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
wall5.scale.set(0.220, 2.000, 0.600);

const wall6 = createWall()
capsule.attach(wall6);
wall6.position.set(0.960, 1.332, -0.129);
wall6.rotation.set(0, 0, 0);
wall6.scale.set(0.220, 2.000, 0.600);

const wall7 = createWall()
capsule.attach(wall7);
wall7.position.set(0.778, 1.332, 0.314);
wall7.rotation.set(0, THREE.MathUtils.degToRad(-45), 0);
wall7.scale.set(0.220, 2.000, 0.600);

const wall8 = createWall()
capsule.attach(wall8);
wall8.position.set(-0.236, 1.348, 0.178);
wall8.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
wall8.scale.set(0.220, 1.600, 0.250);

const wall9 = createWall()
capsule.attach(wall9);
wall9.position.set(0.556, 1.403, 0.481);
wall9.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
wall9.scale.set(0.220, 1.600, 0.250);

const wall10 = createWall()
capsule.attach(wall10);
wall10.position.set(0.171, 2.250, 0.324);
wall10.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
wall10.scale.set(0.220, 0.200, 1.100);

// doors
const door1 = new THREE.Mesh(boxGeo, wallMaterial);
capsule.attach(door1);
door1.position.set(-0.20, 1.348, 0.20);
door1.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
door1.scale.set(0.100, 1.600, 0.3);

const door2 = new THREE.Mesh(boxGeo, wallMaterial);
capsule.attach(door2);
door2.position.set(0.537, 1.348, 0.459);
door2.rotation.set(0, THREE.MathUtils.degToRad(68.80), 0);
door2.scale.set(0.100, 1.600, 0.30);

const platform3 = new THREE.Mesh(cylinderGeo, platformMaterial);
capsule.attach(platform3);
platform3.position.set(0.348, 0.525, -0.184);
platform3.scale.set(0.400, 0.100, 0.400);


/**
 * the cast shadow only works on meshes
 * this function verifies if is a mesh 
 * or not and applies the sahdow
 */

capsule.traverse(function (node) {
    if(node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
});

// ceiling

const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xE3E3E3
});
const ceiling1 = new THREE.Mesh(cylinderGeo, ceilingMaterial);
capsule.attach(ceiling1);
ceiling1.position.set(0.359, 2.442, -0.125);
ceiling1.scale.set(0.800, 0.200, 0.800);
ceiling1.castShadow = true;
ceiling1.receiveShadow = true;

const ceiling2 = new THREE.Mesh(cylinderGeo, platformMaterial);
capsule.attach(ceiling2);
ceiling2.position.set(0.359, 2.614, -0.125);
ceiling2.scale.set(0.700, 0.200, 0.700);
ceiling2.castShadow = true;
ceiling2.receiveShadow = true;

// controller

const controllerMaterial = new THREE.MeshStandardMaterial({
    color: 0xC20000
});
const controller1 = new THREE.Mesh(boxGeo, controllerMaterial);
scene.attach(controller1);
controller1.position.set(-0.639, 0.629, 0.072);
controller1.scale.set(0.400, 0.500, 0.300);
controller1.castShadow = true;
controller1.receiveShadow = true;

const controller2 = new THREE.Mesh(boxGeo, controllerMaterial);
scene.attach(controller2);
controller2.position.set(-0.639, 0.871, 0.102);
controller2.rotation.set(THREE.MathUtils.degToRad(-55), 0, 0);
controller2.scale.set(0.500, 0.400, 0.200);
controller2.castShadow = true;
controller2.receiveShadow = true;

// alavanca

const alavancaMaterial = new THREE.MeshStandardMaterial({
    color: 0xBA6D00
});
const alavanca1 = new THREE.Mesh(boxGeo, alavancaMaterial);
scene.attach(alavanca1);
alavanca1.position.set(-0.609, 0.965, 0.188);
alavanca1.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca1.scale.set(0.050, 0.050, 0.240);
alavanca1.castShadow = true;
alavanca1.receiveShadow = true;

const alavanca2 = new THREE.Mesh(boxGeo, alavancaMaterial);
scene.attach(alavanca2);
alavanca2.position.set(-0.511, 0.965, 0.188);
alavanca2.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca2.scale.set(0.050, 0.050, 0.240);
alavanca2.castShadow = true;
alavanca2.receiveShadow = true;

const alavanca3 = new THREE.Mesh(boxGeo, alavancaMaterial);
scene.attach(alavanca3);
alavanca3.position.set(-0.561, 0.955, 0.175);
alavanca3.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);
alavanca3.scale.set(0.050, 0.020, 0.240);
alavanca3.castShadow = true;
alavanca3.receiveShadow = true;

const pecaMaterial = new THREE.MeshStandardMaterial({
    color: 0xBA6D00
});
const peca1 = new THREE.Mesh(cylinderGeo, pecaMaterial);
scene.attach(peca1);
peca1.position.set(-0.609, 0.972, 0.197);
peca1.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
peca1.scale.set(0.070, 0.050, 0.070);
peca1.castShadow = true;
peca1.receiveShadow = true;

const peca2 = new THREE.Mesh(cylinderGeo, pecaMaterial);
scene.attach(peca2);
peca2.position.set(-0.511, 0.972, 0.197);
peca2.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
peca2.scale.set(0.070, 0.050, 0.070);
peca2.castShadow = true;
peca2.receiveShadow = true;

const mainMechanics = new THREE.Group();
scene.add(mainMechanics);
mainMechanics.position.set(-0.559, 0.973, 0.203);

const roldana = new THREE.Mesh(cylinderGeo, pecaMaterial);
mainMechanics.add(roldana);
roldana.position.set(0, 0, 0);
roldana.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(90));
roldana.scale.set(0.020, 0.180, 0.020);
roldana.castShadow = true;
roldana.receiveShadow = true;

const mainAlavanca = new THREE.Mesh(boxGeo, alavancaMaterial);
mainMechanics.add(mainAlavanca);
mainAlavanca.rotation.set(THREE.MathUtils.degToRad(70), 0, 0);
// mainAlavanca.position.set(-0.559, 1.055, 0.164);
mainAlavanca.position.set(0, 0.08, -0.03);
mainAlavanca.scale.set(0.050, 0.050, 0.200);

mainMechanics.traverse(function(node) {
    if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
});

// cobaia

const cobaia = new THREE.Group();
platform3.attach(cobaia)
cobaia.position.set(0.4, -3.3, -2.3);
cobaia.receiveShadow = true;

const cobaiaMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FF00
});
const body = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(body);
body.scale.set(0.200, 0.200, 0.150);
body.position.set(-0.094, 0.619, 0.866);

const head = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(head);
head.scale.set(0.200, 0.200, 0.180);
head.position.set(-0.094, 0.821, 0.866);
head.rotation.set(0, THREE.MathUtils.degToRad(-24.20), 0);

const arm1 = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(arm1);
arm1.scale.set(0.050, 0.150, 0.050);
arm1.position.set(-0.222, 0.616, 0.866);
arm1.rotation.set(0, 0, THREE.MathUtils.degToRad(-10));

const arm2 = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(arm2);
arm2.scale.set(0.050, 0.150, 0.050);
arm2.position.set(0.038, 0.616, 0.866);
arm2.rotation.set(0, 0, THREE.MathUtils.degToRad(10));

const leg1 = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(leg1);
leg1.scale.set(0.050, 0.200, 0.050);
leg1.position.set(-0.159, 0.470, 0.866);

const leg2 = new THREE.Mesh(boxGeo, cobaiaMaterial);
cobaia.attach(leg2);
leg2.scale.set(0.050, 0.200, 0.050);
leg2.position.set(-0.033, 0.470, 0.866);

const cobaiaEyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000
});

const eye1 = new THREE.Mesh(boxGeo, cobaiaEyeMaterial);
cobaia.attach(eye1);
eye1.scale.set(0.025, 0.025, 0.025);
eye1.position.set(-0.093, 0.823, 0.963);
eye1.rotation.set(0, THREE.MathUtils.degToRad(-24.20), 0);

const eye2 = new THREE.Mesh(boxGeo, cobaiaEyeMaterial);
cobaia.attach(eye2);
eye2.scale.set(0.025, 0.025, 0.025);
eye2.position.set(-0.168, 0.823, 0.930);
eye2.rotation.set(0, THREE.MathUtils.degToRad(-24.20), 0);

cobaia.traverse(function(node) {
    if (node.isMesh) {
        node.castShadow = true;
    }
});

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// button
const button1Group = new THREE.Group();
scene.add(button1Group);

const button1Wrapper = new THREE.Mesh(cylinderGeo, pecaMaterial);
button1Group.attach(button1Wrapper);
button1Wrapper.position.set(-0.777, 1.004, 0.098);
button1Wrapper.scale.set(0.030, 0.010, 0.030);
button1Wrapper.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button1 = new THREE.Mesh(cylinderGeo, pecaMaterial);
button1Group.attach(button1);
button1.position.set(-0.777, 1.011, 0.102);
button1.scale.set(0.020, 0.020, 0.020);
button1.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button2Group = new THREE.Group();
scene.add(button2Group);

const button2Wrapper = new THREE.Mesh(cylinderGeo, pecaMaterial);
button2Group.attach(button2Wrapper);
button2Wrapper.position.set(-0.698, 1.001, 0.098);
button2Wrapper.scale.set(0.030, 0.010, 0.030);
button2Wrapper.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

const button2 = new THREE.Mesh(cylinderGeo, pecaMaterial);
button2Group.attach(button2);
button2.position.set(-0.697, 1.008, 0.102);
button2.scale.set(0.020, 0.020, 0.020);
button2.rotation.set(THREE.MathUtils.degToRad(35), 0, 0);

button1Group.traverse(function(node) {
    if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
});

button2Group.traverse(function(node) {
    if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
    }
});

const idkwhatisthis = new THREE.Mesh(cylinderGeo, pecaMaterial);
idkwhatisthis.position.set(0.061, 2.446, 0.597);
idkwhatisthis.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(25));
idkwhatisthis.scale.set(0.120, 0.050, 0.120);
ceiling2.attach(idkwhatisthis);

const idkwhatisthis2 = new THREE.Mesh(cylinderGeo, pecaMaterial);
idkwhatisthis2.position.set(0.057, 2.446, 0.603);
idkwhatisthis2.rotation.set(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(25));
idkwhatisthis2.scale.set(0.100, 0.100, 0.100);
idkwhatisthis.attach(idkwhatisthis2);

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

function teletransportEnd(results) {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        return results[0];
    } else {
        return results[1];
    }
}

const popUp = document.querySelector('.pop-up');
const xMark = document.querySelector('.x-mark');
const imgWarning = document.querySelector('img');

xMark.addEventListener('click', () => {
    popUp.style.display = "none";
});

function displayResult() {
    const finalResult = teletransportEnd(results);

    document.querySelector('.pop-up h3').innerText = finalResult.title;
    document.querySelector('.pop-up p').innerText = finalResult.message;
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
 * with x and y position
 * contain the x, y position of the mouse click
 * */

const mousePosition = new THREE.Vector2();

document.addEventListener('click', e => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    rayCaster.setFromCamera(mousePosition, camera);

    const intersects = rayCaster.intersectObjects(scene.children, true);
    console.log(intersects);
    
    if(intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === mainAlavanca) {
            if (doorsClosed && !isTeleporting) {
                isMoving = true;
            } else {
                displayWarning();
            }
        }

        if (clickedObject === button1) {
            btnIsMoving = true;
        }
    }
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
    if (canMutate) {
            body.scale.set(0.1, 0.4, 0.3);
            head.position.y = 0.4;
            arm1.rotation.z = Math.PI;
            leg2.scale.set(0.05, 0.05, 0.05); 
            cobaiaMaterial.color.set(0xff0000); 
        } else {
            body.scale.set(0.200, 0.200, 0.150);
            head.position.set(-0.094, 0.821, 0.866);
            arm1.rotation.set(0, 0, THREE.MathUtils.degToRad(-10));
            leg2.scale.set(0.050, 0.200, 0.050);
            cobaiaMaterial.color.set(0x00FF00);
        }
}

let speed = 0;

function animate() {

    if (isTeleporting) {
        pointLight.intensity = Math.random() * 500;
        speed += 1.3;
        capsule.position.x = Math.sin(speed) * 0.002 /** range of motion */;
    } else {
        pointLight.intensity = 50;
        capsule.position.x = 0;
    }

    if (isMoving) {
        if(movingForward) {
            rotAlavanca += 0.1;
            if (rotAlavanca >= 2) {
                movingForward = false; 
                isMoving = false;
                cobaia.visible = false;
                isTeleporting = true;
                
                setTimeout(() => {
                    isTeleporting = false;
                    teleportComplete = true;

                    if (teleportStage === 0) {
                        teleportStage = 1;
                    } else {
                        cobaia.visible = true;
                        displayResult();
                        teleportStage = 0; // reset stage once finished
                    }

                    isMoving = true;
                    doorsIsMoving = true;
                }, 3000);
            }
        } else {
            rotAlavanca -= 0.1;
            if (rotAlavanca <= -0.1) {
                movingForward = true;
                isMoving = false;
            }
            
        }
        mainMechanics.rotation.x = rotAlavanca;
    }

    // door closing and opening

    if (doorsIsMoving) {
        if (doorsClosed) {
            door1.position.x -= 0.005;
            door1.position.z -= 0.0015;
            door2.position.x += 0.005;
            door2.position.z += 0.0015;
            if (door1.position.x <= -0.20) {
                doorsClosed = false;
                doorsIsMoving = false;
            }
        } else {
            door1.position.x += 0.005;
            door1.position.z += 0.0015;
            door2.position.x -= 0.005;
            door2.position.z -= 0.0015;
            if (door1.position.x >= 0.025) {
                doorsClosed = true;
                doorsIsMoving = false;
            }
        }
    }

    if (btnIsMoving) {
        if (button1Click) {
            button1.position.y -= 0.001;
            button1.position.z -= 0.00025;
            if (button1.position.y <= 1.005) {
                button1Click = false;
                btnIsMoving = false;
                doorsIsMoving = true;
            }
        } else {
            button1.position.y += 0.001;
            button1.position.z += 0.00025;
            if (button1.position.y >= 1.011) {
                button1Click = true;
                btnIsMoving = false;
                doorsIsMoving = true;
            }
        }
    }

    // if (button2Click) {
    //     button2.position.y -= 0.001;
    //     button2.position.z -= 0.00025;
    //     if (button2.position.y <= 0.991) button2Click = false;
    // } else {
    //     button2.position.y += 0.001;
    //     button2.position.z += 0.00025;
    //     if (button2.position.y >= 1.011) button2Click = true;
    // }

    microwave += 0.02;

    platform3.rotation.y = microwave;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
