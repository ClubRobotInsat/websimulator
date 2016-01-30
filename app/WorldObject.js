import THREE from "three";

export default class WorldObject extends THREE.Mesh {
  constructor(id, geometry, color) {
    super(geometry, new THREE.MeshPhongMaterial({color : color}));
    this.objectId = id;
    this.color = color;
  }

  setSelected(sel) {
    this.material.color.setHex(sel ? 0xff0000 : this.color);
  }
}
