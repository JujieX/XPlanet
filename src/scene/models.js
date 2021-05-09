import * as THREE from "three";
import { Mat } from "./materials"

const randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

export class Tree extends THREE.Mesh{
    constructor(trunc) {
    super();
    this.add(trunc);
}
}

export class Trunc extends THREE.Mesh {
constructor(topRadius, bottomRadius, height, nhSegments, nvSegments) {
  let matTrunc = Mat.whiteMat;
  // Generate geometry
  let geom = new THREE.CylinderGeometry(topRadius, bottomRadius,height, nhSegments, nvSegments);
  geom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, height / 2, 0));
  super(geom, matTrunc);
  this.castShadow = true;

// method for adding fruit to the trunc
this.growFruit = (v) => {
  // fruit parameters
  let size = Math.random()*3;
  let fruitGeometry = new THREE.BoxGeometry(size, size, size, 1);

  let matFruit = randomProperty(Mat);
  let fruit = new THREE.Mesh(fruitGeometry, matFruit);
  // fruit position and direction
  fruit.position.x = v.x;
  fruit.position.y = v.y+3;
  fruit.position.z = v.z;
  fruit.rotation.x = Math.random()*Math.PI;
  fruit.rotation.y = Math.random()*Math.PI;
  // add this fruit to trunc mesh
  this.add(fruit);
}

// method for adding branch to the trunc
this.growBranch =(v) => {
  // branch parameters
  let h = 3 + Math.random()*5;
  let thickness = .2 + Math.random();
  let branchGeometry = new THREE.CylinderGeometry(thickness / 2, thickness, h, 3, 1);
  branchGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, h / 2, 0));
  let branch = new THREE.Mesh(branchGeometry, matTrunc);
  // branch position and direction
  branch.position.x = v.x;
  branch.position.y = v.y;
  branch.position.z = v.z;
  let vec = new THREE.Vector3(v.x, 2, v.z);
  let axis = new THREE.Vector3(0,1,0);
  branch.quaternion.setFromUnitVectors(axis, vec.clone().normalize());
  // add this branch to trunc mesh
  this.add(branch);
}

  // Generate branch and fruit
for (let i=0; i <geom.attributes.position.count; i++){
    let noise = Math.random() ;
    let v = new THREE.Vector3(); 
    v = v.fromBufferAttribute(geom.getAttribute( 'position' ),[i])

    v.x += -noise + Math.random()*noise*2;
    v.y += -noise + Math.random()*noise*2;
    v.z += -noise + Math.random()*noise*2;

    // Fruit
    if (Math.random()>.7){
      this.growFruit(v);
    }

    // Branch
    if (Math.random()>.5 && v.y > 10 && v.y < this.height - 10){
      this.growBranch(v);
    }
  }
}
}
