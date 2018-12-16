import CameraService from '../service/CameraService.js';
import SceneService from '../service/SceneService.js';
import WebGlRenderer from './WebGlRenderer.js';

class Perspective {

  constructor(view, scope) {
    this.view = view;
    this.scope = scope;
    this.display = {};
    this.started = false;
  }

  initialize() {
    return this.fetchData().
        then(initView).
        then(SceneService.initScene).
        then(CameraService.initCamera).
        then(initRenderer);
  };

  start() {
    this.renderer.start();
    this.started = true;
  }

  finalize() {
    this.renderer.stop();
  };

  fetchData() {
    let promises = [];
    let perspective = this;

    if (this.view.hasAttribute('data-scene')) {
      promises.push(
          this.scope.getScene().then(function(result) {
            perspective.sceneData = result;
          }),
      );
    }

    if (this.view.hasAttribute('data-subject')) {
      promises.push(
          this.scope.getSubject().then(function(result) {
            perspective.subjectData = result;
          }),
      );
    }

    if (this.view.hasAttribute('data-display')) {
      promises.push(
          this.scope.getContext().then(function(result) {
            perspective.display = result;
          }),
      );
    }

    return Promise.all(promises).then(function() {
      return perspective;
    });
  };

}

function initView(perspective) {
  perspective.display.parentElement = perspective.view.shadowRoot
    .querySelector('#scene');
  perspective.display.pixelRatio = perspective.display.pixelRatio ||
      window.devicePixelRatio;
  perspective.display.width = perspective.display.width ||
      perspective.view.dataset.width
      || window.innerWidth;
  perspective.display.height = perspective.display.height ||
      perspective.view.dataset.height
      || window.innerHeight;
  return perspective;
}

function initRenderer(perspective) {
  perspective.renderer = new WebGlRenderer({
    scene: perspective.site.scene,
    camera: perspective.camera,
    width: perspective.display.width,
    height: perspective.display.height,
    parentElement: perspective.display.parentElement,
    pixelRatio: perspective.display.pixelRatio,
  });
  window.addEventListener('resize', function() {
    perspective.renderer.updateResolution(window.innerWidth,
        window.innerHeight);
  }, false);
  return perspective.sceneData;
}

export default Perspective;
