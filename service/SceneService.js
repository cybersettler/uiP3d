import {Clock} from '/node_modules/three/src/Three.js';
// import Shader from '../model/SkyShader.js';
import ObjectService from './ObjectService.js';
import DefaultSceneService from './DefaultSceneService.js';

/**
function initSky(scene, shaderConfig) {
  let shader = new Shader(shaderConfig);
  let sky = shader.getSky();
  let sunSphere = shader.getSunSphere();

  scene.add(sky);
  scene.add(sunSphere);

  return shader;
}

function hasShader(perspective) {
  return perspective.sceneData &&
      perspective.sceneData.environment &&
      perspective.sceneData.environment.sky &&
      perspective.sceneData.environment.sky.shader;
} **/

function generateComponentMap(components) {
  let result = {};
  components.forEach(function(item) {
    result[item.name] = item;
  });
  return result;
}

function generateScene(sceneData, oComponents, oBodies) {

  let site = {
    obstacles: [],
    bodies: oBodies,
    components: oComponents,
    userDefaultPosition: sceneData.userDefaultPosition,
  };

  site.scene = DefaultSceneService.generateDefaultScene();
  let grid = DefaultSceneService.generateGrid();
  let ground = DefaultSceneService.generateDefaultFloor();
  site.scene.add(grid);
  site.scene.add(ground);
  site.obstacles.push(ground);
  sceneData.content.forEach(addContent, site);
  return site;
}

function addContent(item) {
  let config = {
    site: this,
    component: this.components[item.component],
  };
  item.instances.forEach(addInstance, config);
}

function addInstance(item) {
  let body = this.site.bodies[this.component.body].clone();
  if (item.uuid) {
    body.uuid = item.uuid;
  }
  body.position.set(item.position[0], item.position[1], item.position[2]);
  body.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);
  this.site.scene.add(body);
  if (this.component.componentType === 'buildingBlock') {
    this.site.obstacles.push(body);
  }
}

const SceneService = {
  initScene: function(perspective) {
    perspective.clock = new Clock(false);
    perspective.delta = 0;
    return ObjectService.loadObjects(perspective.sceneData).
        then(function(bodies) {
          let componentMap = generateComponentMap(
              perspective.sceneData.components);
          perspective.site = generateScene(perspective.sceneData,
              componentMap, bodies);
          return perspective;
        });
  },
};

export default SceneService;