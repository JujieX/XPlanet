import {animateBiomes, applyBiomes, materials, oceanMaterial} from './biomes';
import * as THREE from "three";

const ImprovedNoise = function (x, y, z) {

	var p = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];

	for (var i = 0; i < 256 ; i ++) {

		p[256 + i] = p[i];

	}

	function fade(t) {

		return t * t * t * (t * (t * 6 - 15) + 10);

	}

	function lerp(t, a, b) {

		return a + t * (b - a);

	}

	function grad(hash, x, y, z) {

		var h = hash & 15;
		var u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
		return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v);

	}

	function getNoise (x, y, z) {

		var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);

		var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;

		x -= floorX;
		y -= floorY;
		z -= floorZ;

		var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;

		var u = fade(x), v = fade(y), w = fade(z);

		var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

		return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
			grad(p[BA], xMinus1, y, z)),
			lerp(u, grad(p[AB], x, yMinus1, z),
				grad(p[BB], xMinus1, yMinus1, z))),
			lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
				grad(p[BA + 1], xMinus1, y, z - 1)),
				lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
					grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));

	}

	return getNoise(x, y, z);
};


export default class Planet extends THREE.Mesh {
    constructor({
        radius,
        widthSegments,
        heightSegments,
        ...noiseProps
    }) {
        // const geometry = new NoiseSphereGeometry(radius, widthSegments, heightSegments, noiseProps),
        //     // biomes = applyBiomes(geometry),
        //     oceanGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        //     // ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
		//
        // super(geometry, materials);
        // // this.add(...biomes, ocean);

		const geometry = new NoiseSphereGeometry(radius, widthSegments, heightSegments, noiseProps);
		const texture = new THREE.MeshPhongMaterial({color: 0x7abf8e,shininess:0});
		super(geometry, texture);
		// this.animate = animateBiomes;
    }
}



//针对每个点 获得noise 找到noise的最大值
class NoiseSphereGeometry extends THREE.SphereGeometry {
    constructor(radius, widthSegments, heightSegments, {seed, noiseWidth, noiseHeight}) {
        super(radius, widthSegments, heightSegments);
        let positions = this.attributes.position;
        let vertex = new THREE.Vector3();
        let newVertex = [];

		const getNoise = (vertice) => ImprovedNoise(
			seed + vertice.x / noiseWidth,
			seed + vertice.y / noiseWidth,
			seed + vertice.z / noiseWidth
		);

		let noiseMax = 0, noiseMin = 0;
		let noise = [];

		for ( let i = 0, l = positions.count; i < l; i ++ ) {
			let vertice = vertex.fromBufferAttribute( positions, i );
			noise.push(getNoise(vertice));
		}
		noiseMax = Math.max(...noise);
		noiseMin = -Math.min(...noise);
		console.log(noiseMax,noiseMin);

		let elevation;
		for ( let i = 0, l = positions.count; i < l; i ++ ) {
			let vertice = vertex.fromBufferAttribute( positions, i );

			let noiseN = getNoise(vertice);

			if(noiseN > 0) {
				elevation = noiseN / noiseMax
			} else if(noiseN < 0) {
				elevation = noiseN / noiseMin
			} else if (noiseN === 0) {
				elevation = 0;
			}
			vertice = vertice.setLength(elevation + radius)
			let scalar = 1+ elevation * noiseHeight / radius;

			newVertex.push(vertice.x*scalar);
			newVertex.push(vertice.y*scalar);
			newVertex.push(vertice.z*scalar);
		}

		// set the new vertices with noise back to this (SphereGeometry)
		this.setAttribute( 'position', new THREE.BufferAttribute(new Float32Array(newVertex), 3));
	}
}

