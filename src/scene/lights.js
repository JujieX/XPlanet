import * as THREE from "three";
import * as chroma from "chroma-js";

const   moonColor = 0xE8EAF6,
        sunColor = 0xFFF8E1,
        dayColor = 0x90CAF9,
        nightColor = 0x000000,
        morningColor = 0xB2EBF2,
        eveningColor = 0xFFCCBC;

export default class Lights extends THREE.Object3D {
    constructor(fog, target, {distance, rotationSpeed, size}) {
        const moonLight = new THREE.DirectionalLight(moonColor, 0.33),
             sunLight = new THREE.DirectionalLight(sunColor, 0.67),
            morningLight = new THREE.HemisphereLight(morningColor, nightColor, 0.33),
            eveningLight = new THREE.HemisphereLight(eveningColor, nightColor, 0.33),

            geometry = new THREE.SphereGeometry(size, 8, 6),
            moonMaterial = new THREE.MeshBasicMaterial({color: moonColor, fog: false}),
            sunMaterial = new THREE.MeshBasicMaterial({color: sunColor, fog: false}),
            moon = new THREE.Mesh(geometry, moonMaterial),
            sun = new THREE.Mesh(geometry, sunMaterial),

            daytimeAngle = Math.PI / 3,
            daytimeX = Math.cos(daytimeAngle) * distance,
            daytimeY = Math.sin(daytimeAngle) * distance,

            targetPosition = new THREE.Vector3(),
            daytimePosition = new THREE.Vector3();

        moon
            .position
            .set(-distance, 0, 0);
        moonLight
            .position
            .set(-distance, 0, 0);
        sun
            .position
            .set(distance, 0, 0);
        sunLight
            .position
            .set(distance, 0, 0);

        morningLight
            .position
            .set(daytimeX, 0, -daytimeY);
        eveningLight
            .position
            .set(daytimeX, 0, daytimeY);

        super();

        this.add(moon);
        this.add(moonLight);
        this.add(sun);
        this.add(sunLight);
        this.add(morningLight);
        this.add(eveningLight);

        this.animate = (delta) => {
            this.rotateY(delta * rotationSpeed);
            sun.getWorldPosition(daytimePosition);
            target.getWorldPosition(targetPosition);
            const daytime = daytimePosition.angleTo(targetPosition) / Math.PI,
                daytimeColor = chroma
                    .mix(dayColor, nightColor, daytime)
                    .hex();
            fog
                .color
                .set(daytimeColor);
            fog.far = targetPosition.length();
        }
    }
}

