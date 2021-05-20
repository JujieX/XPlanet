import * as THREE from "three";

export const Mat = {
	blackMat : new THREE.MeshPhongMaterial({
		color: 0x100707,
		flatShading: true
	}),

	brownMat : new THREE.MeshPhongMaterial({
		color: 0xb44b39,
		shininess:0,
		flatShading: true
	}),

	greenMat : new THREE.MeshPhongMaterial({
		color: 0x7abf8e,
		shininess:0,
		flatShading: true
	}),

	pinkMat : new THREE.MeshPhongMaterial({
		color: 0xdc5f45,//0xb43b29,//0xff5b49,
		shininess:0,
		flatShading: true
	}),

	lightBrownMat : new THREE.MeshPhongMaterial({
		color: 0xe07a57,
		flatShading: true
	}),

	whiteMat : new THREE.MeshPhongMaterial({
		color: 0xa49789,
		flatShading: true
	}),

	skinMat : new THREE.MeshPhongMaterial({
		color: 0xff9ea5,
		flatShading: true
	}),

	blueMat : new THREE.MeshPhongMaterial({
		color: 0x5b9696,
		flatShading: true
	  })
};




