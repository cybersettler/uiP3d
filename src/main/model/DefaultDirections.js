import {Vector3} from '/node_modules/three/build/three.module.js';

const BASIC = {
  NORTH: new Vector3(1, 0, 0),
  SOUTH: new Vector3(-1, 0, 0),
  EAST: new Vector3(0, 0, 1),
  WEST: new Vector3(0, 0, -1),
};

const DefaultDirections = {
  UP: new Vector3(0, 1, 0),
  DOWN: new Vector3(0, -1, 0),
  NORTH: BASIC.NORTH,
  SOUTH: BASIC.SOUTH,
  EAST: BASIC.EAST,
  WEST: BASIC.WEST,
  TWELVE_OCLOCK: BASIC.NORTH,
  //  ONE_THIRTY: new THREE.Vector3(-0.707,0,0.707),
  //  TWO_OCLOCK: new THREE.Vector3(-0.866,0,0.5),
  THREE_OCLOCK: BASIC.EAST,
  //   FOUR_THIRTY: new THREE.Vector3(-0.707,0,-0.707),
  SIX_OCLOCK: BASIC.SOUTH,
  //  SEVEN_THIRTY: new THREE.Vector3(0.707,0,-0.707),
  NINE_OCLOCK: BASIC.WEST,
  //  TEN_THIRTY: new THREE.Vector3(0.707,0,0.707),
  //  TEN_OCLOCK: new THREE.Vector3(0.866,0,0.5)
};

export default DefaultDirections;