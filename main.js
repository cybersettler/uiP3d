import {FragmentElement} from '/node_modules/weldkit/index.js';
import Perspective from './src/main/model/Perspective.js';
import CameraService from './src/main/service/CameraService.js';
import {Vector3, Quaternion} from '/node_modules/three/build/three.module.js';

class P3dElement extends FragmentElement {
  /**
   * Get observed dynamic attributes.
   * If attributes are not specified here
   * the attributeChangedCallback wont be triggered
   * @return {string[]}
   */
  static get observedAttributes() {
    return ['data-scene', 'data-subject', 'data-display'];
  }

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Connected callback
   */
  connectedCallback() {
    console.log('uiFpp element attached');
    let element = this;
    let scope = this.scope;
    this.scope.appendShadowViewFromTemplate(scope.getModuleDir() + 'view.html')
      .then((template) => {
          console.log('Template imported', template.id);
          element.perspective = new Perspective(element, scope);
          element.perspective.initialize(sceneData)
          .then(function() {
            element.addEventListener('rotate', (event) => {
              CameraService.rotate(event.detail, element.perspective);
            });
            var event = new CustomEvent('initialized', sceneData);
            element.dipatch(event);
          });
        });
  }

  render(event) {
    let perspective = this.perspective;
    if (perspective && !perspective.started) {
      perspective.start();
    }
    if (perspective && perspective.renderer) {
      let data = event.detail;
      if (data && data.objects) {
        data.objects.forEach((item) => {
          perspective.yawObject.position.set(position[0], position[1] + 1.6,
              position[2]);
          let o;
          if (perspective.site.object && item.uuid) {
            o = perspective.site.object[item.uuid];
          }
          if (o && o.name === 'subjectCamera') {
            o.position.set(item.position[0],
              item.position[1] + 1.6,
              item.position[2]);
          } else if (o) {
            let rotation = item.rotation;
            let updated = new Vector3(
                item.position[0], item.position[1], item.position[2]);
            let dif =  updated.sub(o.position);
            o.translateX(dif.x);
            o.translateY(dif.y);
            o.translateZ(dif.z);
            let q = new Quaternion(
                rotation[0], rotation[1], rotation[2], rotation[3]);
            o.setRotationFromQuaternion(q);
          }
        });
      }
      this.perspective.renderer.render();
    }
  }

  disconnectedCallback() {
    this.perspective.finalize();
  }
}

customElements.define('ui-p3d', P3dElement);

export default P3dElement;
