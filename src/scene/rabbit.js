import * as THREE from "three";
import { Back,Power2, Power4, TweenMax } from 'gsap';


const Mat = {
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
	})
};


export default class Rabbit extends THREE.Group {
	constructor(){
		super();
		// this.mesh = new THREE.Group();
		this.status = "running";
		this.runningCycle = 0;
		this.body = new THREE.Group();
		this.add(this.body);

		let speed = 6;

		let torsoGeom = new THREE.BoxGeometry(7, 7, 10, 1);

		this.torso = new THREE.Mesh(torsoGeom, Mat.brownMat);
		this.torso.position.z = 0;
		this.torso.position.y = 7;
		this.torso.castShadow = true;
		this.body.add(this.torso);

		let pantsGeom = new THREE.BoxGeometry(9, 9, 5, 1);
		this.pants = new THREE.Mesh(pantsGeom, Mat.whiteMat);
		this.pants.position.z = -3;
		this.pants.position.y = 0;
		this.pants.castShadow = true;
		this.torso.add(this.pants);

		let tailGeom = new THREE.BoxGeometry(3, 3, 3, 1);
		tailGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,-2));
		this.tail = new THREE.Mesh(tailGeom, Mat.lightBrownMat);
		this.tail.position.z = -4;
		this.tail.position.y = 5;
		this.tail.castShadow = true;
		this.torso.add(this.tail);

		this.torso.rotation.x = -Math.PI/8;

		let headGeom = new THREE.BoxGeometry(10, 10, 13, 1);

		headGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,7.5));
		this.head = new THREE.Mesh(headGeom, Mat.brownMat);
		this.head.position.z = 2;
		this.head.position.y = 11;
		this.head.castShadow = true;
		this.body.add(this.head);

		let cheekGeom = new THREE.BoxGeometry(1, 4, 4, 1);
		this.cheekR = new THREE.Mesh(cheekGeom, Mat.pinkMat);
		this.cheekR.position.x = -5;
		this.cheekR.position.z = 7;
		this.cheekR.position.y = -2.5;
		this.cheekR.castShadow = true;
		this.head.add(this.cheekR);

		this.cheekL = this.cheekR.clone();
		this.cheekL.position.x = - this.cheekR.position.x;
		this.head.add(this.cheekL);


		let noseGeom = new THREE.BoxGeometry(6, 6, 3, 1);
		this.nose = new THREE.Mesh(noseGeom, Mat.LightBrownMat);
		this.nose.position.z = 13.5;
		this.nose.position.y = 2.6;
		this.nose.castShadow = true;
		this.head.add(this.nose);

		let mouthGeom = new THREE.BoxGeometry(4, 2, 4, 1);
		mouthGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,3));
		mouthGeom.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/12));
		this.mouth = new THREE.Mesh(mouthGeom, Mat.brownMat);
		this.mouth.position.z = 8;
		this.mouth.position.y = -4;
		this.mouth.castShadow = true;
		this.head.add(this.mouth);


		let pawFGeom = new THREE.BoxGeometry(3,3,3, 1);
		this.pawFR = new THREE.Mesh(pawFGeom, Mat.lightBrownMat);
		this.pawFR.position.x = -2;
		this.pawFR.position.z = 6;
		this.pawFR.position.y = 1.5;
		this.pawFR.castShadow = true;
		this.body.add(this.pawFR);

		this.pawFL = this.pawFR.clone();
		this.pawFL.position.x = - this.pawFR.position.x;
		this.pawFL.castShadow = true;
		this.body.add(this.pawFL);

		let pawBGeom = new THREE.BoxGeometry(3,3,6, 1);
		this.pawBL = new THREE.Mesh(pawBGeom, Mat.lightBrownMat);
		this.pawBL.position.y = 1.5;
		this.pawBL.position.z = 0;
		this.pawBL.position.x = 5;
		this.pawBL.castShadow = true;
		this.body.add(this.pawBL);

		this.pawBR = this.pawBL.clone();
		this.pawBR.position.x = - this.pawBL.position.x;
		this.pawBR.castShadow = true;
		this.body.add(this.pawBR);

		let earGeom = new THREE.BoxGeometry(7, 18, 2, 1);
		// earGeom.vertices[6].x+=2;
		// earGeom.vertices[6].z+=.5;

		// earGeom.vertices[7].x+=2;
		// earGeom.vertices[7].z-=.5;

		// earGeom.vertices[2].x-=2;
		// earGeom.vertices[2].z-=.5;

		// earGeom.vertices[3].x-=2;
		// earGeom.vertices[3].z+=.5;
		earGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,9,0));

		this.earL = new THREE.Mesh(earGeom, Mat.brownMat);
		this.earL.position.x = 2;
		this.earL.position.z = 2.5;
		this.earL.position.y = 5;
		this.earL.rotation.z = -Math.PI/12;
		this.earL.castShadow = true;
		this.head.add(this.earL);

		this.earR = this.earL.clone();
		this.earR.position.x = -this.earL.position.x;
		this.earR.rotation.z = -this.earL.rotation.z;
		this.earR.castShadow = true;
		this.head.add(this.earR);

		let eyeGeom = new THREE.BoxGeometry(2,4,4);

		this.eyeL = new THREE.Mesh(eyeGeom, Mat.whiteMat);
		this.eyeL.position.x = 5;
		this.eyeL.position.z = 5.5;
		this.eyeL.position.y = 2.9;
		this.eyeL.castShadow = true;
		this.head.add(this.eyeL);

		let irisGeom = new THREE.BoxGeometry(.6,2,2);

		this.iris = new THREE.Mesh(irisGeom, Mat.blackMat);
		this.iris.position.x = 1.2;
		this.iris.position.y = 1;
		this.iris.position.z = 1;
		this.eyeL.add(this.iris);

		this.eyeR = this.eyeL.clone();
		this.eyeR.children[0].position.x = -this.iris.position.x;


		this.eyeR.position.x = -this.eyeL.position.x;
		this.head.add(this.eyeR);

		this.body.traverse(function(object) {
			if (object instanceof THREE.Mesh) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});

		this.run = (delta)=>{
			this.status = "running";

			this.runningCycle += delta * speed * .7;
			this.runningCycle = this.runningCycle % (Math.PI*2);
			let t = this.runningCycle;



			const amp = 4;
			const disp = .2;

			// BODY

			this.body.position.y = 6+ Math.sin(t - Math.PI/2)*amp;
			this.body.rotation.x = .2 + Math.sin(t - Math.PI/2)*amp*.1;

			this.torso.rotation.x =  Math.sin(t - Math.PI/2)*amp*.1;
			this.torso.position.y =  7 + Math.sin(t - Math.PI/2)*amp*.5;

			// MOUTH
			this.mouth.rotation.x = Math.PI/16 + Math.cos(t)*amp*.05;

			// HEAD
			this.head.position.z = 2 + Math.sin(t - Math.PI/2)*amp*.5;
			this.head.position.y = 8 + Math.cos(t - Math.PI/2)*amp*.7;
			this.head.rotation.x = -.2 + Math.sin(t + Math.PI)*amp*.1;

			// EARS
			this.earL.rotation.x = Math.cos(-Math.PI/2 + t)*(amp*.2);
			this.earR.rotation.x = Math.cos(-Math.PI/2 + .2 + t)*(amp*.3);

			// EYES
			this.eyeR.scale.y = this.eyeL.scale.y = .7 +  Math.abs(Math.cos(-Math.PI/4 + t*.5))*.6;

			// TAIL
			this.tail.rotation.x = Math.cos(Math.PI/2 + t)*amp*.3;

			// FRONT RIGHT PAW
			this.pawFR.position.y = 1.5 + Math.sin(t)*amp;
			this.pawFR.rotation.x = Math.cos(t ) * Math.PI/4;


			this.pawFR.position.z = 6 - Math.cos(t)*amp*2;

			// FRONT LEFT PAW

			this.pawFL.position.y = 1.5 + Math.sin(disp + t)*amp;
			this.pawFL.rotation.x = Math.cos( t ) * Math.PI/4;


			this.pawFL.position.z = 6 - Math.cos(disp+t)*amp*2;

			// BACK RIGHT PAW
			this.pawBR.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
			this.pawBR.rotation.x = Math.cos(t + Math.PI*1.5) * Math.PI/3;


			this.pawBR.position.z = - Math.cos(Math.PI + t)*amp;

			// BACK LEFT PAW
			this.pawBL.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
			this.pawBL.rotation.x = Math.cos(t + Math.PI *1.5) * Math.PI/3;


			this.pawBL.position.z = - Math.cos(Math.PI + t)*amp;
		}

		this.jump = () => {
			if (this.status === "jumping") return;
			this.status = "jumping";
			let totalSpeed = 10 / speed;
			let jumpHeight = 30;

			this.earL.rotation.x = Math.cos(-Math.PI)
			this.earR.rotation.x = Math.cos(-Math.PI)
			this.body.position.setY(this.body.position.y + jumpHeight);

			
		  }
	}
}



