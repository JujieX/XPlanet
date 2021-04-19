import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import * as OBJLoader from 'three-objloader';
// OBJLoader(THREE);
// import * as MTLLoader from 'three-mtlloader';
// MTLLoader(THREE);


const path = 'models/',
    PI_2 = Math.PI * 2,
    loadModel = name => new Promise(resolve => {
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath(path);
        mtlLoader.load(`${name}.mtl`, (materials) => {
            const objLoader = new OBJLoader();
            materials.preload();
            objLoader.setPath(path);
            objLoader.setMaterials(materials);
            objLoader.load(`${name}.obj`, resolve);
        });
    }),
    models = {};

export default class Model extends THREE.Object3D {
    constructor(name, position, y = 0, angle = Math.random() * PI_2) {
        const spherical = new THREE.Spherical();

        if (!(name in models)) {
            models[name] = loadModel(name);
        }

        super();

        spherical.setFromVector3(position);
        this.rotateY(spherical.theta);
        this.rotateX(spherical.phi);

        models[name].then(object => {
            const mesh = object
                .clone()
                .rotateY(angle);
            mesh
                .position
                .setY(spherical.radius + y);
            this.add(mesh);
        });
    }
}


// WEBPACK FOOTER //
// ./src/scene/models.js