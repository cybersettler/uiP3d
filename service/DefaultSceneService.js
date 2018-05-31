import {
  Geometry,
  Vector3,
  LineBasicMaterial,
  Line,
  LinePieces,
  PlaneBufferGeometry,
  Mesh,
  Scene,
  Color,
} from '/node_modules/three/src/Three.js';

function generateGrid() {

  let size = 60, step = 0.6;
  let geometry = new Geometry();

  for (let i = -size; i <= size; i += step) {

    geometry.vertices.push(new Vector3(-size, 0, i));
    geometry.vertices.push(new Vector3(size, 0, i));
    geometry.vertices.push(new Vector3(i, 0, -size));
    geometry.vertices.push(new Vector3(i, 0, size));

  }

  let material = new LineBasicMaterial({color: 0x000000, opacity: 0.2});
  let line = new Line(geometry, material);
  line.type = LinePieces;

  return line;
}

function generateDefaultGround() {

  let geometry = new PlaneBufferGeometry(100, 100);
  let body = new Mesh(geometry);
  body.visible = false;
  return body;
}

function generateDefaultScene() {

  let scene = new Scene();
  scene.background = new Color('lightgrey');
  return scene;
}

const DefaultSceneService = {
  generateDefaultScene: generateDefaultScene,
  generateDefaultGround: generateDefaultGround,
  generateGrid: generateGrid,
};

export default DefaultSceneService;