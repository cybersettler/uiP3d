import {Euler, Vector3, Object3D, Raycaster, PerspectiveCamera} from '/node_modules/three/build/three.module.js';

const PI_2 = Math.PI / 2;

const CameraService = {
  initCamera: function(perspective) {
    let service = this;
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
    perspective.yawObject.name = 'subjectCamera';
    perspective.sceneData.subject.uuid = perspective.yawObject.uuid;
    perspective.site.object[perspective.yawObject.uuid] = perspective.yawObject;
    perspective.yawObject.position.set(position[0], position[1] + 1.6,
        position[2]);
    perspective.yawObject.add(perspective.pitchObject);
    perspective.focus = new Raycaster(
        perspective.yawObject.position.clone(),
        new Vector3(0, -1, 0), 0, perspective.focusDistance);
    perspective.cursor;

    let aspect = perspective.display.width / perspective.display.height;

    let camera = new PerspectiveCamera(75, aspect, 0.01, 2000000);
    camera.rotation.set( 0, 0, 0 );

    perspective.pitchObject.add(camera);
    perspective.site.scene.add(perspective.yawObject);
    perspective.camera = camera;
    return perspective;
  },
  rotate: function(data, perspective) {
    let yawObject = perspective.yawObject;
    let pitchObject = perspective.pitchObject;

    let actualY = yawObject.rotation.y;
    yawObject.rotation.y = actualY - data.y;

    let actualX = pitchObject.rotation.x;
    pitchObject.rotation.x = actualX - data.x;

    pitchObject.rotation.x =
        Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
  },
};

export default CameraService;
