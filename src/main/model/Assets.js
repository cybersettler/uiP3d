import {Math as ThreeMath} from '/node_modules/three/build/three.module.js';
import DefaultDirections from './DefaultDirections.js';

class Assets {
    constructor(sceneData) {
      this.baseUrl = sceneData.baseURL;
      this.images = [];
      this.textures= [];
      this.materials = [];
      this.geometries = [];

      this.map = {
        textures: {},
        materials: {},
        geometries: {}
      };

      sceneData.textures.forEach(addTexture, this);
      sceneData.materials.forEach(addMaterial, this);
      sceneData.geometries.forEach(addGeometry, this);
    }
}

function addTexture(item) {
    item.uuid = ThreeMath.generateUUID();
    if (item.imageURL) {
        let image = {
            uuid: ThreeMath.generateUUID(),
            url: this.baseUrl + item.imageURL
        };
        this.images.push(image);
        item.image = image.uuid;
    }

    this.textures.push(item);
    this.map.textures[item.name] = item.uuid;
}

function addMaterial(item) {
    item.uuid = ThreeMath.generateUUID();
    if (item.texture) {
        item.map = this.map.textures[item.texture];
    }
    this.map.materials[item.name] = item.uuid;
    this.materials.push(item);
}

function addGeometry(item) {
    if (item.type === "BoxGeometry") {
        translateGeometryDimensions(item);
    }
    item.uuid = ThreeMath.generateUUID();
    this.map.geometries[item.name ] = item.uuid;
    this.geometries.push(item);
}

function translateGeometryDimensions(geometry) {
    if(DefaultDirections.UP.y === 0 && DefaultDirections.NORTH.z === 0){
        let height = geometry.depth;
        let depth = geometry.height;
        geometry.height = height;
        geometry.depth = depth;
    }
}

export default Assets;