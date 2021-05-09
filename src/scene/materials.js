import * as THREE from "three";

export const Mat = {
	blackMat : new THREE.MeshPhongMaterial({
		color: 0x100707,
		flatShading:THREE.FlatShading,
	}),

	brownMat : new THREE.MeshPhongMaterial({
		color: 0xb44b39,
		shininess:0,
		flatShading:THREE.FlatShading,
	}),

	greenMat : new THREE.MeshPhongMaterial({
		color: 0x7abf8e,
		shininess:0,
		flatShading:THREE.FlatShading}),

	pinkMat : new THREE.MeshPhongMaterial({
		color: 0xdc5f45,//0xb43b29,//0xff5b49,
		shininess:0,
		flatShading:THREE.FlatShading,
	}),

	lightBrownMat : new THREE.MeshPhongMaterial({
		color: 0xe07a57,
		flatShading:THREE.FlatShading,
	}),

	whiteMat : new THREE.MeshPhongMaterial({
		color: 0xa49789,
		flatShading:THREE.FlatShading,
	}),

	skinMat : new THREE.MeshPhongMaterial({
		color: 0xff9ea5,
		flatShading:THREE.FlatShading
	}),

	blueMat : new THREE.MeshPhongMaterial({
		color: 0x5b9696,
		shading:THREE.FlatShading
	  })
};




