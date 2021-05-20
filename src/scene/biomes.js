import * as THREE from "three";

const polarLatitude = Math.sin(3 * Math.PI / 8),
      temperateLatitude = Math.sin(2 * Math.PI / 8),
      tropicalLatitude = Math.sin(1 * Math.PI / 8);

export const materials = [

    new THREE.MeshPhongMaterial({color: 0x37474F, flatShading:true}),

	new THREE.MeshPhongMaterial({color: 0x757575,shininess:0,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xA3A3A3,shininess:0,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xD1D1D1,shininess:0,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xFFFFFF,flatShading:true}),

	new THREE.MeshPhongMaterial({color: 0xA39D8A,flatShading:true}),
    new THREE.MeshPhongMaterial({color: 0xAFB19A,flatShading:true}),
    new THREE.MeshPhongMaterial({color: 0xBAC4AA, flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xC6D8BA,shininess:0,flatShading:true}),

	new THREE.MeshPhongMaterial({color: 0xD1C49E,shininess:0,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xBBBE90,shininess:0,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0xA4B882,flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0x8EB274,flatShading:true}),

    new THREE.MeshPhongMaterial({color: 0xFFECB3,flatShading:true}),
    new THREE.MeshPhongMaterial({color: 0xC6CC87, flatShading:true}),
	new THREE.MeshPhongMaterial({color: 0x8EAB5B,shininess:0,flatShading:true}),
    new THREE.MeshPhongMaterial({color: 0x558B2F,shininess:0,flatShading:true})
];

export const applyBiomes = (geometry) => {

        let normal = new THREE.Vector3();
        let position = geometry.attributes.position;
        let vertex = new THREE.Vector3();

        for ( let i = 0; i < position.count; i +=3 ) {
            let a = vertex.fromBufferAttribute( position, i );
            let b = vertex.fromBufferAttribute( position, i + 1 );
            let c = vertex.fromBufferAttribute( position, i + 2 );

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
    };


export const animateBiomes = (delta) => {
    oceanMaterial.offset.x += delta / 12; 
    };

export const oceanMaterial = new THREE.MeshPhongMaterial({color: 0xA3BDD4,transparent:true, opacity: 0.8});

oceanMaterial.side = THREE.DoubleSide;

   


