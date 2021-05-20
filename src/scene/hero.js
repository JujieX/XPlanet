import * as THREE from "three";
import { Mat } from "./materials"

export class Rabbit extends THREE.Group {
	constructor(){
		super();

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
		this.body.scale.set(0.2,0.2,0.2);
		// this.body.rotateY(Math.PI);

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
			this.status = "jumping";
			let jumpHeight = 30;

			this.earL.rotation.x = Math.cos(-Math.PI)
			this.earR.rotation.x = Math.cos(-Math.PI)
			this.body.position.setY(this.body.position.y + jumpHeight);

			
		  }
	}
}

export class Fish extends THREE.Group {
	constructor(){
		super();
		this.runningCycle = 0;
		this.body = new THREE.Group();
		this.add(this.body);

		let fishFastColor = {r:255, g:0, b:224}; // pastel blue
		let fishSlowColor = {r:0, g:207, b:255}; // purple
		let speed = 5;
	
	// Body 
	let bodyGeom = new THREE.BoxGeometry(120, 120, 120);
	let bodyMat = new THREE.MeshLambertMaterial({
	   color: 0x80f5fe ,
	 });
	 this.bodyFish = new THREE.Mesh(bodyGeom, bodyMat);
	 this.body.add(this.bodyFish);
	 
	 // Tail
	let tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
	let tailMat = new THREE.MeshLambertMaterial({
	   color: 0xff00dc,
	 });
	 
	 this.tailFish = new THREE.Mesh(tailGeom, tailMat);
	 this.tailFish.scale.set(.8,1,.1);
	 this.tailFish.position.x = -60; 
	 this.tailFish.rotation.z = -Math.PI/2;
	 this.body.add(this.tailFish)
	 
	 // Lips
	 let lipsGeom = new THREE.BoxGeometry(25, 10, 120);
	 let lipsMat = new THREE.MeshLambertMaterial({
	   color: 0x80f5fe
	 });
	 this.lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
	 this.lipsFish.position.x = 65;
	 this.lipsFish.position.y = -47;
	 this.lipsFish.rotation.z = Math.PI/2;
	 this.body.add(this.lipsFish);
	 
	 // Fins
	 this.topFish = new THREE.Mesh(tailGeom, tailMat);
	 this.topFish.scale.set(.8,1,.1);
	 this.topFish.position.x = -20; 
	 this.topFish.position.y = 60; 
	 this.topFish.rotation.z = -Math.PI/2;
	 
	 this.sideRightFish = new THREE.Mesh(tailGeom, tailMat);
	 this.sideRightFish.scale.set(.8,1,.1);
	 this.sideRightFish.rotation.x = Math.PI/2;
	 this.sideRightFish.rotation.z = -Math.PI/2;
	 this.sideRightFish.position.x = 0; 
	 this.sideRightFish.position.y = -50; 
	 this.sideRightFish.position.z = -60; 
	 
	 this.sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
	 this.sideLeftFish.scale.set(.8,1,.1);
	 this.sideLeftFish.rotation.x = Math.PI/2;
	 this.sideLeftFish.rotation.z = -Math.PI/2;
	 this.sideLeftFish.position.x = 0; 
	 this.sideLeftFish.position.y = -50; 
	 this.sideLeftFish.position.z = 60; 

	 this.body.add(this.topFish,this.sideLeftFish,this.sideRightFish);
	 
	 // Eyes
	 let eyeGeom = new THREE.BoxGeometry(40, 40,5);
	 let eyeMat = new THREE.MeshLambertMaterial({
	   color: 0xffffff
	 });
	 
	 this.rightEye = new THREE.Mesh(eyeGeom,eyeMat );
	 this.rightEye.position.z = -60;
	 this.rightEye.position.x = 25;
	 this.rightEye.position.y = -10;
	 
	 let irisGeom = new THREE.BoxGeometry(10, 10,3);
	 let irisMat = new THREE.MeshLambertMaterial({
	   color: 0x330000
	 });
	 
	 this.rightIris = new THREE.Mesh(irisGeom,irisMat );
	 this.rightIris.position.z = -65;
	 this.rightIris.position.x = 35;
	 this.rightIris.position.y = -10;
	 
	 this.leftEye = new THREE.Mesh(eyeGeom,eyeMat );
	 this.leftEye.position.z = 60;
	 this.leftEye.position.x = 25;
	 this.leftEye.position.y = -10;
	 
	 this.leftIris = new THREE.Mesh(irisGeom,irisMat );
	 this.leftIris.position.z = 65;
	 this.leftIris.position.x = 35;
	 this.leftIris.position.y = -10;

	 this.body.add(this.rightEye,this.leftEye,this.leftIris,this.rightIris)
	   
	 let toothGeom = new THREE.BoxGeometry(20, 4, 20);
	 let toothMat = new THREE.MeshLambertMaterial({
	   color: 0xffffff
	 });
	 
	 // Teeth
	 this.tooth1 = new THREE.Mesh(toothGeom,toothMat);
	 this.tooth1.position.x = 65;
	 this.tooth1.position.y = -35;
	 this.tooth1.position.z = -50;
	 this.tooth1.rotation.z = Math.PI/2;
	 this.tooth1.rotation.x = -Math.PI/2;
	 
	 this.tooth2 = new THREE.Mesh(toothGeom,toothMat);
	 this.tooth2.position.x = 65;
	 this.tooth2.position.y = -30;
	 this.tooth2.position.z = -25;
	 this.tooth2.rotation.z = Math.PI/2;
	 this.tooth2.rotation.x = -Math.PI/12;
	 
	 this.tooth3 = new THREE.Mesh(toothGeom,toothMat);
	 this.tooth3.position.x = 65;
	 this.tooth3.position.y = -25;
	 this.tooth3.position.z = 0;
	 this.tooth3.rotation.z = Math.PI/2;
	 
	 this.tooth4 = new THREE.Mesh(toothGeom,toothMat);
	 this.tooth4.position.x = 65;
	 this.tooth4.position.y = -30;
	 this.tooth4.position.z = 25;
	 this.tooth4.rotation.z = Math.PI/2;
	 this.tooth4.rotation.x = Math.PI/12;
	 
	 this.tooth5 = new THREE.Mesh(toothGeom,toothMat);
	 this.tooth5.position.x = 65;
	 this.tooth5.position.y = -35;
	 this.tooth5.position.z = 50;
	 this.tooth5.rotation.z = Math.PI/2;
	 this.tooth5.rotation.x = Math.PI/8;
	 
	 this.body.add(this.tooth1,this.tooth2,this.tooth3,this.tooth4,this.tooth5);

	 this.body.rotation.y = -Math.PI/4;
	 this.body.rotation.y = -Math.PI/4;
	 this.body.scale.set(0.05,0.05,0.05);
	 this.body.rotateY(Math.PI*0.6);

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

		this.body.position.y = 10+ Math.sin(t - Math.PI/2);//

		this.tailFish.rotation.y = Math.cos(t)*.5;
		this.topFish.rotation.x = Math.sin(t/5)*.5;
		this.sideRightFish.rotation.x = Math.PI/2 + Math.sin(t/5)*.2;
		this.sideLeftFish.rotation.x = Math.PI/2 + Math.sin(t/5)*.2;

		const rvalue = (fishSlowColor.r + (fishFastColor.r - fishSlowColor.r)*t/5)/255;
		const gvalue = (fishSlowColor.g + (fishFastColor.g - fishSlowColor.g)*t/5)/255;
		const bvalue = (fishSlowColor.b + (fishFastColor.b - fishSlowColor.b)*t/5)/255;
		this.bodyFish.material.color.setRGB(rvalue,gvalue,bvalue);
		this.lipsFish.material.color.setRGB(rvalue,gvalue,bvalue);

	 }

	 this.jump = () => {
		this.status = "jumping";
		let jumpHeight = 30;

		this.body.position.setY(this.body.position.y + jumpHeight);
	}
	 }
}

export class Hero extends THREE.Group {
	constructor(){
		super();

		this.status = "running";
		this.runningCycle = 0;
		this.body = new THREE.Group();
		this.add(this.body);

		let speed = 4;

		let torsoGeom = new THREE.BoxGeometry(8, 8, 8, 1);

		this.torso = new THREE.Mesh(torsoGeom, Mat.blueMat);
		this.torso.position.y = 8;
		this.torso.castShadow = true;
		this.body.add(this.torso);

		let handGeom = new THREE.BoxGeometry(3,3,3,1);
		this.handR = new THREE.Mesh(handGeom, Mat.brownMat);
		this.handR.position.z=7;
		this.handR.position.y=8;
		this.body.add(this.handR);

		this.handL = this.handR.clone();
		this.handL.position.z = - this.handR.position.z;
		this.body.add(this.handL);

		let headGeom = new THREE.BoxGeometry(16,16,16, 1);
		this.head = new THREE.Mesh(headGeom, Mat.blueMat);
		this.head.position.y = 21;
		this.head.castShadow = true;
		this.body.add(this.head);

		let legGeom = new THREE.BoxGeometry(8,3,5, 1);

		this.legR = new THREE.Mesh(legGeom, Mat.brownMat);
		this.legR.position.x = 0;
		this.legR.position.z = 7;
		this.legR.position.y = 0;
		this.legR.castShadow = true;
		this.body.add(this.legR);

		this.legL = this.legR.clone();
		this.legL.position.z = - this.legR.position.z;
		this.legL.castShadow = true;
		this.body.add(this.legL);
		this.body.scale.set(0.25,0.25,0.25);
		this.body.rotateY(Math.PI*0.8);


		this.run = (delta)=>{
			this.status = "running";

			this.runningCycle += delta * speed * .7;
			this.runningCycle = this.runningCycle % (Math.PI*2);
			let t = this.runningCycle;

			const amp = 4;

			this.legR.position.x =  Math.cos(t) * amp;
			this.legR.position.y = Math.max (0, - Math.sin(t) * amp);  
			
			this.legL.position.x =  Math.cos(t + Math.PI) * amp;
			this.legL.position.y = Math.max (0, - Math.sin(t + Math.PI) * amp);

			this.body.position.y = 3+ 0.5 * Math.sin(t - Math.PI/2)*amp;//
			
			this.torso.position.y = 8 - Math.cos(  t * 2 ) * amp * .2;
			this.torso.rotation.y = -Math.cos( t + Math.PI ) * amp * .05;
			
			this.head.position.y = 21 - Math.cos(  t * 2 ) * amp * .3;
			this.head.rotation.x = Math.cos( t ) * amp * .02;
			this.head.rotation.y =  Math.cos( t ) * amp * .01;
		  
			this.handR.position.x = -Math.cos( t ) * amp;
			this.handR.rotation.z = -Math.cos( t ) * Math.PI/8;
			this.handL.position.x = -Math.cos( t + Math.PI) * amp;
			this.handL.rotation.z = -Math.cos( t + Math.PI) * Math.PI/8;
		}

		this.jump = () => {
			this.status = "jumping";
			let jumpHeight = 30;

			this.legL.rotation.x = Math.cos(-Math.PI)
			this.legR.rotation.x = Math.cos(-Math.PI)
			this.body.position.setY(this.body.position.y + jumpHeight);

			
		  }
	}
}