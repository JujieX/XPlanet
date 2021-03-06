import * as THREE from "three";
import {Rabbit, Fish, Hero} from "./hero";


class PlayerCamera extends THREE.Object3D {
    // Third Person Camera
    constructor({
        distance,
        far,
        fov
    }, height) {
        const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, far);
        super();

        camera.translateZ(distance);
        this.add(camera);
        this.translateY(height);
        this.rotateX(-Math.PI / 4);

        this.getPerspectiveCamera = () => camera;
        this.rotateVertically = (radX) => {
            const min = Math.min(Math.PI / 2, this.rotation.x + radX);
            this.rotation.x = Math.max(-Math.PI / 2, min);
        };
    }
}

class PlayerSubject extends THREE.Mesh {
    constructor({
        modelName,
        height,
        initialY,
        playerName,
        ...cameraProps
    }) {
        super();
        // Add rabbit as the player
        switch (modelName) {
            case 'Rabbit':
                this.model = new Rabbit();
                break;
            case 'Hero':
                this.model = new Hero();
                break;
            case 'Fish':
                this.model = new Fish();
                break;
            default:
                this.model = new Hero();
                break;
        }
        this.add(this.model);

        // Add camera
        const camera = new PlayerCamera(cameraProps, height);
        this.add(camera);
        this
            .position
            .setY(initialY);

        this.getPerspectiveCamera = camera.getPerspectiveCamera;
        this.rotateCamera = camera.rotateVertically;
    }
}

export default class PlayerControls extends THREE.Object3D {
    constructor({
        directionVelocity,
        gravity,
        jumpVelocity,
        maxGravity,
        mouseSpeed,
        ...meshProps
    }) {
        let contact = false;
        const mesh = new PlayerSubject(meshProps),
            direction = new THREE.Vector3(),
            velocity = new THREE.Vector3(),
            raycaster = new THREE.Raycaster(),
            move = {
                left: false,
                front: false,
                right: false,
                back: false,
                jump: false
            };

        super();

        this.add(mesh);

        this.getPerspectiveCamera = mesh.getPerspectiveCamera;
        this.getMesh = () => mesh;
        this.animate = (delta, noiseSphere) => {
            // Run Rabbit
            this.getMesh().model.run(delta);
            // Jump Rabbit
            if(move.jump === true){
            this.getMesh().model.jump() ;
            }
            // Set Velocity
            direction.set(Number(move.left) - Number(move.right), 0, Number(move.back) - Number(move.front));
            direction.normalize();
            velocity.x = direction.x * directionVelocity * delta;
            velocity.z = direction.z * directionVelocity * delta;
            if (contact) {
                velocity.y = Number(move.jump) * jumpVelocity - gravity * delta;
            } else {
                velocity.y = Math.max(-maxGravity * delta, velocity.y - gravity * delta);
                
            }
            // Apply Rotation
            this.rotateX(velocity.z * Math.PI / 128);
            this.rotateZ(velocity.x * Math.PI / 128);
            // Intersection Altitude
            mesh.getWorldPosition(raycaster.ray.origin);
            raycaster
                .ray
                .origin
                .setLength(mesh.position.y * 2);
            raycaster
                .ray
                .direction
                .copy(raycaster.ray.origin)
                .negate()
                .normalize();
            const intersections = raycaster.intersectObject(noiseSphere, false);
            if (intersections.length > 0) {
                const length = intersections[0]
                    .point
                    .length();
                // Apply Contact
                mesh.translateY(velocity.y);
                if (mesh.position.y <= length) {
                    mesh
                        .position
                        .setY(length);
                    contact = true;
                } else {
                    contact = false;
                }
            }
        };

        // Events
        const onMouseMove = (event) => {
                const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0,
                    movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                mesh.rotateCamera(-movementY * mouseSpeed);
                this.rotateY(-movementX * mouseSpeed);
            },
            onKeyDown = ({keyCode}) => {
                switch (keyCode) {
                    case 32: // space
                        move.jump = true;
                        break;
                    case 37: // left
                    case 65: // a
                        move.left = true;
                        break;
                    case 38: // up
                    case 87: // w
                        move.front = true;
                        break;
                    case 39: // right
                    case 68: // d
                        move.right = true;
                        break;
                    case 40: // down
                    case 83: // s
                        move.back = true;
                        break;
                    // case 88: // x
                    //     playerSwich;
                    //     break;    
                    default:
                        break;
                }
            },
            onKeyUp = ({keyCode}) => {
                switch (keyCode) {
                    case 32: // space
                        move.jump = false;
                        break;
                    case 37: // left
                    case 65: // a
                        move.left = false;
                        break;
                    case 38: // up
                    case 87: // w
                        move.front = false;
                        break;
                    case 39: // right
                    case 68: // d
                        move.right = false;
                        break;
                    case 40: // down
                    case 83: // s
                        move.back = false;
                        break;
                    default:
                        break;
                }
            };
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        document.addEventListener('mousemove', onMouseMove, false);
        this.dispose = () => {
            document.removeEventListener('keydown', onKeyDown, false);
            document.removeEventListener('keyup', onKeyUp, false);
            document.removeEventListener('mousemove', onMouseMove, false);
        };
    }
}

