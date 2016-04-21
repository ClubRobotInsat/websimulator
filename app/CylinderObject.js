import THREE from "three";
import WorldObject from "./WorldObject";

export default class CylinderObject extends WorldObject {
	constructor(id, radius, height, color) {
		super(id, new THREE.CylinderGeometry(radius, radius, height, 32), color);
	}
}
