import {WebAppElement} from '/node_modules/weldkit/index.js';

class AppElement extends WebAppElement {

  constructor() {
    super();
    console.log('WebAppElement instantiated');
  }

  connectedCallback() {
    console.log('App element added to the DOM');
    let scope = this.scope;
    scope.onDocumentLoadComplete().then(() => {
      return scope.loadMessageResource(
          'en', 'translation', '/src/test/example/frontend/assets/locales/en/translation.json');
    }).then(() => {
      scope.resolveAppReady();
    }, (err) => {
      throw new Error(err);
    }).then(() => scope.appendViewFromTemplate('frontend/component/web/App/view.html'))
    .then((template) => {
      console.log("Template imported", template.id);
      //    element.perspective = new Perspective(element, element.scope);
      //    element.perspective.initialize();
    });
  }

}

customElements.define('web-app', AppElement);

export default AppElement;
