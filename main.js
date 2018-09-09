import {FragmentElement} from '/node_modules/weldkit/index.js';
import Perspective from './src/main/model/Perspective.js';

class UiP3dElement extends FragmentElement {
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
        console.log("Template imported", template.id);
        element.perspective = new Perspective(element, scope);
        element.perspective.initialize();
      });
  }

  disconnectedCallback() {
    this.perspective.finalize();
  }
}

customElements.define('ui-p3d', UiP3dElement);

export default UiP3dElement;
