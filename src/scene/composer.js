import * as THREE from "three";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';

export class ComposerRabbit extends EffectComposer{
	constructor(renderer, scene, camera){
		super(renderer);
		this.addPass( new RenderPass( scene, camera ) );
		const pixelPass = new ShaderPass( PixelShader );
		pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
		pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
		pixelPass.uniforms[ "pixelSize" ].value = 12;
		this.addPass( pixelPass );
	}
}

export class ComposerSnake extends EffectComposer{
	constructor(renderer, scene, camera){
		super(renderer);
		const ssaoPass = new SSAOPass( scene, camera, window.innerWidth, window.innerHeight);
		ssaoPass.kernelRadius = 100;
		this.addPass( ssaoPass );
		ssaoPass.output = SSAOPass.OUTPUT.SSAO;
		ssaoPass.minDistance = 0;
	}
}

export class ComposerFish extends EffectComposer{
	constructor(renderer, scene, camera){
		super(renderer);
		const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 0.3, 0.1, 0 );
		const afterimagePass = new AfterimagePass();
		afterimagePass.value = 0.5;
		this.addPass( new RenderPass( scene, camera ) );
		this.addPass( bloomPass );
		this.addPass( afterimagePass );
	}
}