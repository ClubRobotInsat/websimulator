import THREE from "three";
import WorldObject from "./WorldObject";
import * as ModelLoader from "./ModelLoader";


export default class ModelObject extends WorldObject {
	constructor(id, model, color) {
		ModelLoader.load(`../models/${model}.dae`).then((geometry) => {
			super(id, geometry, color)
		});
	}
}