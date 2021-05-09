import React, { Component } from 'react';

import Lights from './scene/lights';
import Planet from './scene/planet';
import PlayerControls from './scene/player';
import PropTypes from 'prop-types';


import * as THREE from "three";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';



import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';


import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

const params = {
    Rabbit: false,
    Snake: false,
    Fish : false
};

export default class Scene extends Component {

    constructor(props) {
        super(props);

        // scene
        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.domElement = renderer.domElement;

        // planet
        let planet = new Planet(this.props.planet);
        scene.add(planet);

        // player
        const player = new PlayerControls(this.props.player);
        scene.add(player);

        // fog and lights
        scene.fog = new THREE.Fog();
        scene.background = scene.fog.color;
        const target = player.getMesh();
        const lights = new Lights(scene.fog, target, this.props.lights);
        scene.add(lights);

        // // alternative light
        // const ambientLight = new THREE.AmbientLight(0x606060);
        // scene.add(ambientLight);
        // const directLight = new THREE.DirectionalLight(0xBCD2EE);
        // directLight.position.set(1,0.75,0.5).normalize();
        // scene.add(directLight);

        // camera
        let camera = player.getPerspectiveCamera();

        //GUI
        let gui = new GUI();
        gui.add( params, 'Rabbit' ).name( 'Rabbit' );
        gui.add( params, 'Snake' ).name( 'Snake' );
        gui.add( params, 'Fish' ).name( 'Fish' );
        
        //postprocessing
        //rabbit -pixel
        const composerR = new EffectComposer( renderer );
        composerR.addPass( new RenderPass( scene, camera ) );

        const pixelPass = new ShaderPass( PixelShader );
        pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
        pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio );
        pixelPass.uniforms[ "pixelSize" ].value = 12;
        composerR.addPass( pixelPass );

        //snake-ssao
        const composerS = new EffectComposer( renderer );

        const ssaoPass = new SSAOPass( scene, camera, window.innerWidth, window.innerHeight);
        ssaoPass.kernelRadius = 100;
        composerS.addPass( ssaoPass );
        ssaoPass.output = SSAOPass.OUTPUT.SSAO;
        ssaoPass.minDistance = 0;

        //fish-bloom/afterimage
        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		bloomPass.threshold = 0;
		bloomPass.strength = 0.3;
		bloomPass.radius = 0.1;

        const afterimagePass = new AfterimagePass();
        afterimagePass.value = 0.5;

		const composerF = new EffectComposer( renderer );
        composerF.addPass( new RenderPass( scene, camera ) );
        composerF.addPass( bloomPass );
        composerF.addPass( afterimagePass);

        // animation
        let timestamp = 0;
        this.animate = (time) => {
            const delta = (time - timestamp) / 1000;
            timestamp = time;
            const target = player.animate(delta, planet);
            lights.animate(delta, scene.fog, target);
            renderer.render(scene, camera);
            this.animationFrame = requestAnimationFrame(this.animate);
            
            if ( params.Rabbit ) {
                composerR.render()
            }
            if ( params.Snake ) {
                composerS.render()
            }
            if ( params.Fish ) {
                composerF.render()
            }
            
        };

    }

    componentDidMount(){
        this.sceneRef
            .appendChild(this.domElement);
        window.addEventListener('resize', this.onResize, false);

        if (!this.animationFrame) {
            this.animationFrame = requestAnimationFrame(this.animate);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
        this.sceneRef
            .removeChild(this.domElement);
    }

    render() {
        return <div ref={ref => (this.sceneRef = ref)} className="Scene"/>;
    }
}

Scene.propTypes = {
    planet: PropTypes.shape({
        radius: PropTypes.number,
        widthSegments: PropTypes.number,
        heightSegments: PropTypes.number,
        seed: PropTypes.number,
        noiseWidth: PropTypes.number,
        noiseHeight: PropTypes.number
    }),
    player: PropTypes.shape({
        directionVelocity: PropTypes.number,
        distance: PropTypes.number,
        far: PropTypes.number,
        fov: PropTypes.number,
        frictionDelay: PropTypes.number,
        gravity: PropTypes.number,
        height: PropTypes.number,
        jumpVelocity: PropTypes.number
    })
};

Scene.defaultProps = {
    lights: {
        distance: 512,
        rotationSpeed: Math.PI / 30,
        size: 16
    },
    planet: {
        radius: 128,
        widthSegments: 48,
        heightSegments: 32,
        seed: Date.now(),
        noiseWidth: 32,
        noiseHeight: 8
    },
    player: {
        directionVelocity: 10,
        distance: 30,
        far: 1024,
        fov: 60,
        gravity: 9.81 ,
        height: 1.618,
        initialY: 256,
        jumpVelocity: 1,
        maxGravity: 54 / 2,
        mouseSpeed: 0.002
    }
};