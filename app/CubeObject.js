import THREE from "three";
import WorldObject from "./WorldObject";

export default class CubeObject extends WorldObject {
	constructor(id, sx, sy, sz, color) {
		super(id, new THREE.BoxGeometry(sx, sy, sz), color);
	}
}