import React, { Component } from 'react';

import Lights from './scene/lights';
import Planet from './scene/planet';
import PlayerControls from './scene/player';
import PropTypes from 'prop-types';


import * as THREE from "three";

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

        // // huaihuai light
        // const ambientLight = new THREE.AmbientLight(0x606060);
        // scene.add(ambientLight);
        //
        // const directLight = new THREE.DirectionalLight(0xBCD2EE);
        // directLight.position.set(1,0.75,0.5).normalize();
        // scene.add(directLight);

        // camera
        let camera = player.getPerspectiveCamera();

        // animation
        let timestamp = 0;
        this.animate = (time) => {
            const delta = (time - timestamp) / 1000;
            timestamp = time;
            const target = player.animate(delta, planet);
            lights.animate(delta, scene.fog, target);
            renderer.render(scene, camera);
            this.animationFrame = requestAnimationFrame(this.animate);
        };


        // // original code
        // const scene = new THREE.Scene(),
        //     player = new PlayerControls(this.props.player),
        //     target = player.getMesh(),
        //     // camera = player.getPerspectiveCamera(),
        //     planet = new Planet(this.props.planet),
        //     renderer = new THREE.WebGLRenderer({antialias: true});
        //
        // let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
        // camera.position.set(0, 0, 300);
        //
        // scene.fog = new THREE.Fog();
        // scene.background = scene.fog.color;
        //
        // const lights = new Lights(scene.fog, target, this.props.lights)
        //
        // // scene.add(lights);
        // scene.add(planet);
        // // scene.add(player);
        //
        // /* camera
        //     .position
        //     .set(0, planet.geometry.parameters.radius, 0);
        // camera.lookAt(planet.position); */
        //
        // renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // this.domElement = renderer.domElement;
        //
        // let timestamp = 0;
        // this.animate = (time) => {
        //     const delta = (time - timestamp) / 1000;
        //     timestamp = time;
        //     // const target = player.animate(delta, planet);
        //     // lights.animate(delta, scene.fog, target);
        //     // planet.animate(delta);
        //     renderer.render(scene, camera);
        //     this.animationFrame = requestAnimationFrame(this.animate);
        // };
        //
        // this.onResize = () => {
        //     camera.aspect = window.innerWidth / window.innerHeight;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(window.innerWidth, window.innerHeight);
        // };
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
        directionVelocity: 3,
        distance: 30,
        far: 1024,
        fov: 60,
        gravity: 9.81 / 2,
        height: 1.618,
        initialY: 512,
        jumpVelocity: 1,
        maxGravity: 54 / 2,
        mouseSpeed: 0.002
    }
};