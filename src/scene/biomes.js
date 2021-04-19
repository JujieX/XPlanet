import Model from './models';
import * as THREE from "three";

const 
    polarLatitude = Math.sin(3 * Math.PI / 8),
    temperateLatitude = Math.sin(2 * Math.PI / 8),
    tropicalLatitude = Math.sin(1 * Math.PI / 8),
    sameIndex = (a, i) => a === null || a === i
        ? i
        : false;

export const grassTexture = new THREE
            .TextureLoader()
            .load('textures/grass.jpg'),
        rockTexture = new THREE
            .TextureLoader()
            .load('textures/rock.jpg'),
        sandTexture = new THREE
            .TextureLoader()
            .load('textures/sand.jpg'),
        snowTexture = new THREE
            .TextureLoader()
            .load('textures/snow.jpg'),
        waterTexture = new THREE
            .TextureLoader()
            .load('textures/water.jpg'),
        
        materials = [
        // Ocean
        new THREE.MeshPhongMaterial({color: 0x37474F}),
        // Polar
        new THREE.MeshPhongMaterial({map: rockTexture, color: 0x757575}),
        new THREE.MeshPhongMaterial({map: rockTexture, color: 0xA3A3A3}),
        new THREE.MeshPhongMaterial({map: rockTexture, color: 0xD1D1D1}),
        new THREE.MeshPhongMaterial({map: snowTexture, color: 0xFFFFFF}),
        // Temperate
        new THREE.MeshPhongMaterial({map: rockTexture, color: 0xA39D8A}),
        new THREE.MeshPhongMaterial({map: rockTexture, color: 0xAFB19A}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0xBAC4AA}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0xC6D8BA}),
        // Tropical
        new THREE.MeshPhongMaterial({map: sandTexture, color: 0xD1C49E}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0xBBBE90}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0xA4B882}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0x8EB274}),
        // Equatorial
        new THREE.MeshPhongMaterial({map: sandTexture, color: 0xFFECB3}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0xC6CC87}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0x8EAB5B}),
        new THREE.MeshPhongMaterial({map: grassTexture, color: 0x558B2F})
    ],
        oceanMaterial = new THREE.MeshStandardMaterial({map: waterTexture, color: 0xBBDEFB}),

    applyBiomes = (geometry) => {
        grassTexture
            .repeat
            .set(geometry.parameters.widthSegments, geometry.parameters.heightSegments);
        rockTexture
            .repeat
            .set(geometry.parameters.widthSegments, geometry.parameters.heightSegments);
        sandTexture
            .repeat
            .set(geometry.parameters.widthSegments, geometry.parameters.heightSegments);
        snowTexture
            .repeat
            .set(geometry.parameters.widthSegments, geometry.parameters.heightSegments);
        waterTexture
            .repeat
            .set(geometry.parameters.widthSegments, geometry.parameters.heightSegments);


        let normal = new THREE.Vector3();
        let position = geometry.attributes.position;
        let vertex = new THREE.Vector3();

        for ( let i = 0; i < position.count; i +=3 ) {
            let a = vertex.fromBufferAttribute( position, i );
            let b = vertex.fromBufferAttribute( position, i + 1 );
            let c = vertex.fromBufferAttribute( position, i + 2 );
            let faceVertices = [a, b, c];

            let faceElevation = Math.max(a.length(), b.length(), c.length());
            let faceNormal = normal.fromBufferAttribute( geometry.attributes.normal, i );

            const  setMaterialIndex = (base) => {
                let materialIndex = base + parseInt(faceElevation * 4, 10);
                return Math.min(materialIndex, base + 3);
            };
            let latitude = Math.abs(faceNormal.y);

            if (latitude > polarLatitude) {
                geometry.addGroup(i,3,setMaterialIndex(1));
            } else if (latitude > temperateLatitude) {
                geometry.addGroup(i,3,setMaterialIndex(5));
            } else if (latitude > tropicalLatitude) {
                geometry.addGroup(i,3,setMaterialIndex(9));
            } else {
                geometry.addGroup(i,3,setMaterialIndex(13));
            }
        }



        // for (const face of geometry.faces) {
        //     const a = geometry.vertices[face.a],
        //         b = geometry.vertices[face.b],
        //         c = geometry.vertices[face.c],
        //         vertices = [a, b, c];
        //
        //     face.elevation = Math.max(a.elevation, b.elevation, c.elevation);//elevation
        //     if (face.elevation > 0) {
        //         const latitude = Math.abs(face.normal.y),
        //             setMaterialIndex = (base) => {
        //                 const materialIndex = base + parseInt(face.elevation * 4, 10);
        //                 face.materialIndex = Math.min(materialIndex, base + 3);
        //             };
        //         if (latitude > polarLatitude) {
        //             setMaterialIndex(1);
        //         } else if (latitude > temperateLatitude) {
        //             setMaterialIndex(5);
        //         } else if (latitude > tropicalLatitude) {
        //             setMaterialIndex(9);
        //         } else {
        //             setMaterialIndex(13);
        //         }
        //     }//按照在地球温带的位置给材料
        //
        //     for (const vertice of vertices) {
        //         if (!vertice.hasOwnProperty('materialIndexes')) {
        //             vertice.materialIndexes = [];
        //         }
        //         vertice
        //             .materialIndexes
        //             .push(face.materialIndex);//判断一下，没有再赋值
        //     }
        // }
        // return geometry
        //     .vertices
        //     .map((vertice) => {//map!
        //         const materialIndex = vertice.elevation > 0 && vertice
        //             .materialIndexes
        //             .reduce(sameIndex, null);//reduce!
        //
        //         switch (materialIndex) {
        //             case null:
        //             case false:
        //             case 0:
        //                 return false;
        //             case 1:
        //             case 5:
        //             case 9:
        //             case 13:
        //                 return new Model('PUSHILIN_stone', vertice, -0.1);
        //             case 2:
        //                 return new Model('SpruceTree', vertice, -0.2);
        //             case 6:
        //                 return new Model('OakTree', vertice, -0.3);
        //             case 10:
        //                 return new Model('BloodwoodTree', vertice, -0.2);
        //             case 14:
        //                 return new Model('DatePalmTree', vertice, -0.3);
        //             case 8:
        //             case 16:
        //                 return new Model('SM_Cabana_02', vertice, -0.8);
        //             default:
        //                 return new Model('PUSHILIN_grass', vertice, -0.1);
        //         }
        //     })
        //     .filter(Boolean);
    },
    animateBiomes = (delta) => {
        waterTexture.offset.x += delta / 12; //水面移动效果
    };

grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
rockTexture.wrapS = rockTexture.wrapT = THREE.RepeatWrapping;
sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
snowTexture.wrapS = snowTexture.wrapT = THREE.RepeatWrapping;
waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
oceanMaterial.side = THREE.DoubleSide;

export default materials;


