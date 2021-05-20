import React, { Component } from 'react';
import { Scene } from './Scene';
import FrontPage from './FrontPage';
import './App.css';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pointerLock : 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document
                ? false 
                : null,
            webgl: false,
            player: {
                modelName: "Hero",
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
        
        this.pointerLockChange = () => {
            this.setState({
                pointerLock : document.pointerLockElement === this.appRef.current || document.mozPointerLockElement === this.appRef.current || document.webkitPointerLockElement === this.appRef.current
            });
        };

        this.requestPointerLock = () => {
            if(this.state.pointerLock === false){
                this.appRef.requestPointerLock = this.appRef.requestPointerLock || this.appRef.mozRequestPointerLock || this.appRef.webkitRequestPointerLock
            }
            this
            .appRef
            .requestPointerLock()
        };

        this.exitPointerLock = () =>{
            if(this.state.pointerLock === true){
                document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
                document.exitPointerLock();
            }
        };

        this.onKeyDown = (event) => {
            switch (event.keyCode) {
                case 27:
                    this.exitPointerLock();
                    break;
                // switch player model
                case 50:
                    this.setState((state, props) => ({
                        player: {
                            ...state.player,
                            modelName: "Rabbit"
                        }
                    }));
                    break;
                case 49:
                    this.setState((state, props) => ({
                        player: {
                            ...state.player,
                            modelName: "Hero"
                        }
                    }));
                    break;
                case 51:
                    this.setState((state, props) => ({
                        player: {
                            ...state.player,
                            modelName: "Fish"
                        }
                    }));
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount(){
        if(this.state.pointerLock !== null){
            document.addEventListener('keydown',this.onKeyDown, false);
            document.addEventListener('pointerlockchange', this.pointerLockChange, false);
            document.addEventListener('mozpointerlockchange', this.pointerLockChange, false);
            document.addEventListener('webkitpointerlockchange', this.pointerLockChange, false);
            document.addEventListener('pointerlockerror', console.log, false);
            document.addEventListener('mozpointerlockerror', console.log, false);
            document.addEventListener('webkitpointerlockerror', console.log, false);
        }
        if (window.WebGLRenderingContext){
            const canvas = document.createElement('canvas'),
                  webgl  = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            this.setState({webgl: Boolean(webgl)}) 
        }
    }

    componentWillUnmount(){
        if(this.state.pointerLock !== null){
            document.removeEventListener('keydown', this.onKeyDown, false);
            document.removeEventListener('pointerlockchange', this.pointerLockChange, false);
            document.removeEventListener('mozpointerlockchange', this.pointerLockChange, false);
            document.removeEventListener('webkitpointerlockchange', this.pointerLockChange, false);
            document.removeEventListener('pointerlockerror', console.log, false);
            document.removeEventListener('mozpointerlockerror', console.log, false);
            document.removeEventListener('webkitpointerlockerror', console.log, false);
        }
        this.exitPointerLock();
    }

    render(){
        const alerts = [];
        const instructions = this.state.webgl
              ? 
              <div className = "App">
                  <FrontPage/>
                  <button id = "btn" onClick = {this.requestPointerLock}>Explore</button>
              </div>
               : null;

        const content = this.state.webgl 
         && this.state.pointerLock 
             ?<Scene player={this.state.player}/>
             :<div className="App-interface">
             {instructions}
         </div>;

        if(this.state.pointerLock === null){
            alerts.push('Your browser may not support Pointer Lock API.');
        }
        if (this.state.webgl === false){
            alerts.push('Your browser or device may not support WebGL.')
        }
        return <div ref={ref => (this.appRef = ref)} className = "App">{content}</div>;
            
    }
}

