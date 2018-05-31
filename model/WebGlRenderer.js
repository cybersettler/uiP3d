import {WebGLRenderer} from '/node_modules/three/src/Three.js';

class WebGlRenderer {

  constructor(config) {
    let context = this;
    this.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame;
    this.cancelAnimationFrame = window.cancelAnimationFrame;
    // let webglParams = config.webgl || {antialias: false};

    let width = config.width || window.innerWidth;
    let height = config.height || window.innerHeight;

    this.scene = config.scene;
    this.camera = config.camera;
    this.onBeforeRender = config.onBeforeRender || function() {};

    // let clearColor = config.clearColor || 0x000000;
    // let view = oConfig.view;

    this.parentElement = config.parentElement;

    let renderer = new WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(config.pixelRatio);
//  renderer.setClearColor( clearColor );
    this.renderer = renderer;
  }

  start() {
    let instance = this;
    let renderer = this.renderer;
    this.parentElement.appendChild(renderer.domElement);
    let onBeforeRender = this.onBeforeRender;
    animate();
    function animate() {
      instance.requestId = requestAnimationFrame(animate);
      onBeforeRender();
      renderer.render(scene, camera);
    }
  };

  stop() {
    this.cancelAnimationFrame(this.requestId);
  };

  updateResolution(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}


export default WebGlRenderer;
