import * as THREE from 'three';

export const COLORS = {
    WALL: 0x616161,
    PLATFORM: 0xE3E3E3,
    COBAIA: 0x00FF00,
    PAINEL: 0xC20000
};

export const GEOMETRIES = {
    BOX: new THREE.BoxGeometry(1, 1, 1),
    CYLINDER: new THREE.CylinderGeometry(1, 1, 1, 128, 128),
    PLANE: new THREE.PlaneGeometry(1000, 1000, 10, 10)
};

export const SETTINGS = {
    LEVER_SPEED: 0.1,
    TELEPORT_SHAKE: 0.002,
    DOOR_SPEED_X: 0.005,
    DOOR_SPEED_Z: 0.0015,
    MICROWAVE_SPEED: 0.02
};

export const CAPSULE_WALLS = [
    { pos: [0.140, 0.481, 0.319], rot: [0, 68.8, 0], scale: [0.220, 0.200, 1.100] },
    { pos: [-0.289, 1.332, -0.113], rot: [0, 0, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [-0.091, 1.332, -0.562], rot: [0, -45, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [0.341, 1.332, -0.744], rot: [0, 90, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [0.769, 1.332, -0.564], rot: [0, 45, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [0.960, 1.332, -0.129], rot: [0, 0, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [0.778, 1.332, 0.314], rot: [0, -45, 0], scale: [0.220, 2.000, 0.600] },
    { pos: [-0.236, 1.348, 0.178], rot: [0, 68.80, 0], scale: [0.220, 1.600, 0.250] },
    { pos: [0.556, 1.403, 0.481], rot: [0, 68.80, 0], scale: [0.220, 1.600, 0.250] },
    { pos: [0.171, 2.250, 0.324], rot: [0, 68.80, 0], scale: [0.220, 0.200, 1.100] }
];

export const COBAIA_PARTS = [
    { name: 'body',  pos: [0, 0.25, 0] /*[-0.094, 0.619, 0.866]*/, scale: [0.2, 0.2, 0.15], rot: [0, 0, 0] },
    { name: 'head',  pos: [0, 0.45, 0]/*[-0.094, 0.821, 0.866]*/, scale: [0.2, 0.2, 0.18], rot: [0, -24.2, 0] },
    { name: 'arm1',  pos: [-0.13, 0.25, 0]/*[-0.222, 0.616, 0.866]*/, scale: [0.05, 0.15, 0.05], rot: [0, 0, -10] },
    { name: 'arm2',  pos: [0.13, 0.25, 0] /*[0.038, 0.616, 0.866]*/,  scale: [0.05, 0.15, 0.05], rot: [0, 0, 10] },
    { name: 'leg1',  pos: [-0.05, 0.1, 0] /*[-0.159, 0.470, 0.866]*/, scale: [0.05, 0.2, 0.05],  rot: [0, 0, 0] },
    { name: 'leg2',  pos: [0.05, 0.1, 0]/*[-0.033, 0.470, 0.866]*/, scale: [0.05, 0.2, 0.05],  rot: [0, 0, 0] },
    { name: 'eye1',  pos: [0, 0.45, 0.1]/*[-0.093, 0.823, 0.963]*/, scale: [0.025, 0.025, 0.025],  rot: [0, -24.20, 0] },
    { name: 'eye2',  pos: [-0.075, 0.45, 0.067] /*[-0.168, 0.823, 0.930]*/, scale: [0.025, 0.025, 0.025],  rot: [0, -24.20, 0] }
];

export const TELEPORT_RESULTS = [
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
