import THREE from "three";

export default class WorldObject extends THREE.Mesh {
  constructor(id, geometry, color) {
    super(geometry, new THREE.MeshLambertMaterial({color : color}));

    this.matrix.identity();
    this.matrixAutoUpdate = false;

    this.castShadow = true;
    this.receiveShadow = true;

    this.objectId = id;
    this.color = color;
  }

  setSelected(sel) {
    this.material.color.setHex(sel ? 0xff0000 : this.color);
  }
}
