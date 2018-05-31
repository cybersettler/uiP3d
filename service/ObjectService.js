import {ObjectLoader, JSONLoader} from '/node_modules/three/src/Three.js';
import Assets from './Assets.js';

function addMesh(item) {
    let objectLoader = this.objectLoader;
    let assets = this.assets;
    let meshMap = this.meshMap;

    item.geometry = this.assets.map.geometries[item.geometryName];
    item.material = this.assets.map.materials[item.materialName];

    // TODO: is not possible to use jsonLoader directly
    /*
    if(item.modelURL){
        return new Promise( function( resolve ){
            jsonLoader.load(item.modelURL, function(geometry, materials) {
                let mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials) );
                mesh.name = data.name;
                resolve( mesh );
            });
        });
    }
    */

    let result = new Promise(function(fulfill) {
        let data = {
            object: item,
            geometries: assets.geometries,
            materials: assets.materials,
            textures: assets.textures,
            images: assets.images
        };
        objectLoader.parse(data, fulfill);
    });
    return result.then(function(mesh){
        meshMap[mesh.name] = mesh;
    });
}



const ObjectService = {
    loadObjects: function(sceneData) {
        let config =  {
            assets: new Assets(sceneData),
            objectLoader: new ObjectLoader(),
            jsonLoader: new JSONLoader(),
            meshMap: {}
        };
        return Promise.all(sceneData.bodies.map(addMesh, config))
            .then(function() {
                return config.meshMap;
            });
    }
};

export default ObjectService;