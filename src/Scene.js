import React, { Component } from 'react';

import Lights from './scene/lights';
import Planet from './scene/planet';
import PlayerControls from './scene/player';
import PropTypes from 'prop-types';
import {ComposerRabbit, ComposerSnake, ComposerFish} from "./scene/composer";

import * as THREE from "three";

export class Scene extends Component {

    constructor(props) {
        super(props);

        // scene
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.domElement = this.renderer.domElement;

        // planet
        this.planet = new Planet(this.props.planet);
        this.scene.add(this.planet);

        // fog and lights
        this.scene.fog = new THREE.Fog();
        this.scene.background = this.scene.fog.color;
    }

    componentDidMount(){
        this.sceneRef
            .appendChild(this.domElement);
        window.addEventListener('resize', this.onResize, false);

        if (!this.animationFrame) {
            this.animationFrame = requestAnimationFrame(this.animate);
        }

        document.addEventListener('keydown',this.onKeyDown, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
        this.sceneRef
            .removeChild(this.domElement);
    }

    render() {
        // Remove old player and lights
        for( let i = this.scene.children.length - 1; i > 0; i--) {
            let child = this.scene.children[i];
            this.scene.remove(child);
        }
        // Add new player
        this.player = new PlayerControls(this.props.player);
        this.scene.add(this.player);

        // Add new lights
        let lights = new Lights(this.scene.fog, this.player.getMesh(), this.props.lights);
        this.scene.add(lights);

        let camera = this.player.getPerspectiveCamera();

        // Post processing filters
        let composer;

        if (this.props.player.modelName === 'Rabbit') {
            composer = new ComposerRabbit(this.renderer, this.scene, camera)
        }

        if (this.props.player.modelName === 'Fish') {
            composer = new ComposerFish(this.renderer, this.scene, camera)
        }

        // animation
        let timestamp = 0;
        this.animate = (time) => {
            const delta = (time - timestamp) / 1000;
            timestamp = time;
            const target = this.player.animate(delta, this.planet);
            lights.animate(delta, this.scene.fog, target);
            this.renderer.render(this.scene, camera);
            this.animationFrame = requestAnimationFrame(this.animate);
            if (composer) {
                composer.render();
            }
        };

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
    }
};