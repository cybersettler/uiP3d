import {Euler, Vector3, Object3D, Raycaster, PerspectiveCamera} from '/node_modules/three/src/Three.js';

const CameraService = {
  initCamera: function(perspective) {
    perspective.subjectData = perspective.subjectData || {};
    let defaultPosition = perspective.sceneData.subject &&
    perspective.sceneData.subject.defaultPosition ?
        perspective.sceneData.subject.defaultPosition : [0, 0, 0];
    let position = perspective.subjectData.position || defaultPosition;
    perspective.sceneData.subject.defaultPosition; // [ 0, 100, 2000 ]; // perspective.subjectData.position;
    // this.movingDirection = new THREE.Vector3();
    perspective.rotation = new Euler(0, 0, 0, 'YXZ'); // perspective.subjectData.rotation;
    perspective.position = new Vector3(position[0], position[1],
        position[2]);
    // this.activeBlock;
    perspective.focusDistance = 5;
    perspective.pitchObject = new Object3D();
    perspective.yawObject = new Object3D();
    perspective.yawObject.position.set(position[0], position[1] + 1.6,
        position[2]);
    perspective.yawObject.add(perspective.pitchObject);
    perspective.focus = new Raycaster(
        perspective.yawObject.position.clone(),
        new Vector3(0, -1, 0), 0, perspective.focusDistance);
    perspective.cursor;

    let aspect = perspective.display.width / perspective.display.height;

    let camera = new PerspectiveCamera(75, aspect, 0.01, 2000000);
    perspective.pitchObject.add(camera);
    perspective.site.scene.add(perspective.yawObject);
    perspective.camera = camera;
    return perspective;
  },
};

export default CameraService;