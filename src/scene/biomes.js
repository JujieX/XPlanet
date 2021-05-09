import * as THREE from "three";

const polarLatitude = Math.sin(3 * Math.PI / 8),
      temperateLatitude = Math.sin(2 * Math.PI / 8),
      tropicalLatitude = Math.sin(1 * Math.PI / 8);

const grassTexture = new THREE
      .TextureLoader()
      .load('textures/grass.png',function(texture){
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
  rockTexture = new THREE
      .TextureLoader()
      .load('textures/rock.png',function(texture){
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
  sandTexture = new THREE
      .TextureLoader()
      .load('textures/sand.png',function(texture){
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
  snowTexture = new THREE
      .TextureLoader()
      .load('textures/snow.png',function(texture){
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
  waterTexture = new THREE
      .TextureLoader()
      .load('textures/water.png',function(texture){
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      });

export const materials = [
    // // Ocean
    // new THREE.MeshPhongMaterial({color: 0x37474F}),
    // // Polar
    // new THREE.MeshPhongMaterial({map: rockTexture, color: 0x757575}),
    // new THREE.MeshPhongMaterial({map: rockTexture, color: 0xA3A3A3}),
    // new THREE.MeshPhongMaterial({map: rockTexture, color: 0xD1D1D1}),
    // new THREE.MeshPhongMaterial({map: snowTexture, color: 0xFFFFFF}),
    // // Temperate
    // new THREE.MeshBasicMaterial({map: rockTexture, color: 0xA39D8A}),
    // new THREE.MeshBasicMaterial({map: rockTexture, color: 0xAFB19A}),
    // new THREE.MeshBasicMaterial({map: grassTexture, color: 0xBAC4AA}),
    // new THREE.MeshBasicMaterial({map: grassTexture, color: 0xC6D8BA}),
    // // Tropical
    // new THREE.MeshPhongMaterial({map: sandTexture, color: 0xD1C49E,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0xBBBE90,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0xA4B882,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0x8EB274,flatShading:THREE.FlatShading}),
    // // Equatorial
    // new THREE.MeshPhongMaterial({map: sandTexture, color: 0xFFECB3,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0xC6CC87,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0x8EAB5B,flatShading:THREE.FlatShading}),
    // new THREE.MeshPhongMaterial({map: grassTexture, color: 0x558B2F,flatShading:THREE.FlatShading})

    new THREE.MeshPhongMaterial({color: 0x37474F, flatShading:THREE.FlatShading}),

	new THREE.MeshPhongMaterial({color: 0x757575,shininess:0,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xA3A3A3,shininess:0,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xD1D1D1,shininess:0,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xFFFFFF,flatShading:THREE.FlatShading}),

	new THREE.MeshPhongMaterial({color: 0xA39D8A,flatShading:THREE.FlatShading}),
    new THREE.MeshPhongMaterial({color: 0xAFB19A,flatShading:THREE.FlatShading}),
    new THREE.MeshPhongMaterial({color: 0xBAC4AA, flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xC6D8BA,shininess:0,flatShading:THREE.FlatShading}),

	new THREE.MeshPhongMaterial({color: 0xD1C49E,shininess:0,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xBBBE90,shininess:0,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0xA4B882,flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0x8EB274,flatShading:THREE.FlatShading}),

    new THREE.MeshPhongMaterial({color: 0xFFECB3,flatShading:THREE.FlatShading}),
    new THREE.MeshPhongMaterial({color: 0xC6CC87, flatShading:THREE.FlatShading}),
	new THREE.MeshPhongMaterial({color: 0x8EAB5B,shininess:0,flatShading:THREE.FlatShading}),
    new THREE.MeshPhongMaterial({color: 0x558B2F,shininess:0,flatShading:THREE.FlatShading})
];

export const applyBiomes = (geometry,widthSegments,heightSegments) => {
        grassTexture
            .repeat
            .set(widthSegments, heightSegments);
        rockTexture
            .repeat
            .set(widthSegments, heightSegments);
        sandTexture
            .repeat
            .set(widthSegments, heightSegments);
        snowTexture
            .repeat
            .set(widthSegments, heightSegments);
        waterTexture
            .repeat
            .set(widthSegments, heightSegments);


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

   


