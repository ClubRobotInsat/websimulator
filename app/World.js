import THREE from "three";
import WorldObject from "./WorldObject";
import CylinderObject from "./CylinderObject";
import CuboidObject from "./CuboidObject";

import * as ModelLoader from "./ModelLoader";

import * as View from "./View";

const defaultMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

export default class World {
  constructor(graphics) {
    this.graphics = graphics;
    this.objects = {};
    this.points = [];
    this.currentPoint = null;
    this.selected = null;
    this.initRaycast();
  }

  addPoint(pos) {
    let geometry = new THREE.CircleGeometry(0.3, 6);
    let material = new THREE.MeshBasicMaterial({color: 0x5798AD});
    let circle = new THREE.Mesh(geometry, material);
    circle.position.set(pos.x, pos.y, 0.01);
    this.points.push(circle);
    this.graphics.scene.add(circle);
  }

  addObject(obj) {
    if(this.objects.hasOwnProperty(obj.objectId)) {
      return;
    }
    this.objects[obj.objectId] = obj;
    this.graphics.scene.add(obj);
  }

  removeObject(obj) {
    this.objects[obj.objectId] = undefined;
    this.graphics.scene.remove(obj);
  }

  updateInfo(obj) {
    let position = new THREE.Vector3();
    position.setFromMatrixPosition(obj.matrix);
    document.getElementById("selected-id").innerText = obj.objectId;
    document.getElementById("selected-position").innerText = position.x.toFixed(2) + "," + position.y.toFixed(2) + "," + position.z.toFixed(2);
  }


  initRaycast() {
    let invisiblePlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshBasicMaterial({transparent: true, opacity: 0}));
    this.graphics.scene.add(invisiblePlane);
    this.raycaster = new THREE.Raycaster();
    this.graphics.renderer.domElement.addEventListener("mousemove", (event) => {
      let mousePosition = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      this.raycaster.setFromCamera(mousePosition, this.graphics.camera);
      let objs = this.raycaster.intersectObjects([invisiblePlane]);
      if(objs.length > 0)
        document.getElementById("coords").innerText = "(x=" +  objs[0].point.x.toFixed(2) + ", y=" + objs[0].point.y.toFixed(2) + ")";
      else
        document.getElementById("coords").innerHTML = '<span style="color: red">Error</span>';

      let points = this.raycaster.intersectObjects(this.points);
      let infos = document.getElementById("point-infos");
      if(points.length > 0) {
        let point = points[0].object;
        document.getElementById("point-position").innerText = "(x=" +  point.position.x.toFixed(2) + ", y=" + point.position.y.toFixed(2) + ")";
        let pos = this.graphics.getScreenPosition(point);
        infos.style.left = pos.x + 50 + "px";
        infos.style.top = pos.y - 50 + "px";
        infos.style.display = "block";
      } else {
        infos.style.display = "none";
      }
    });

    this.graphics.renderer.domElement.addEventListener("click", (event) => {
      let mousePosition = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      if(event.ctrlKey) {
        this.raycaster.setFromCamera(mousePosition, this.graphics.camera);
        let objs = this.raycaster.intersectObjects([invisiblePlane]);
        if(objs.length > 0) {
          this.addPoint(objs[0].point);
        }
      } else {
        this.raycaster.setFromCamera(mousePosition, this.graphics.camera);
        let objs = this.raycaster.intersectObjects(Object.keys(this.objects).map(id => this.objects[id]));

        if(this.selected != null) this.selected.setSelected(false);

        if(objs.length > 0) {
          if(objs[0].object instanceof WorldObject) {
            this.selected = objs[0].object;
            this.selected.setSelected(true);
            this.updateInfo(this.selected);
            View.showInfos();
          }
        } else {
          this.selected = null;
          View.hideInfos();
        }
      }
    });
  }


  getOrDefault(message, key, def) {
    if(message.hasOwnProperty(key)) return message[key];
    return def;
  }


  handleMessage(type, id, message) {
    if(type == "newmodel") {
      let model = this.getOrDefault(message, "modelName", "");
      let matrix = this.getOrDefault(message, "matrix", defaultMatrix);
      let color = parseInt(this.getOrDefault(message, "color", "0x00FF00"));

      ModelLoader.load(`../models/${model}.dae`).then((geometry) => {
        let obj = new WorldObject(id, geometry, color);
        obj.matrix.set.apply(obj.matrix, matrix);

        this.addObject(obj);
      });

    } else if(type == "move") {

      if(this.objects.hasOwnProperty(id)) {
        let obj = this.objects[id];

        let matrix = this.getOrDefault(message, "matrix", defaultMatrix);
        obj.matrix.set.apply(obj.matrix, matrix);

        if(this.selected == obj) {
          this.updateInfo(obj);
        }
      }

    } else if(type == "remove") {
      if(this.objects.hasOwnProperty(id)) {
        this.removeObject(id);
      }
    } else if(type == "newcuboid") {
      let matrix = this.getOrDefault(message, "matrix", defaultMatrix);
      let color = parseInt(this.getOrDefault(message, "color", 0x00FF00));

      let obj = new CuboidObject(id, 1, 1, 1, color);
      obj.matrix.set.apply(obj.matrix, matrix);

      this.addObject(obj);
    } else if(type == "newcylinder") {
      let matrix = this.getOrDefault(message, "matrix", defaultMatrix);

      let radius = parseFloat(this.getOrDefault(message, "radius", 0.0));
      let height = parseFloat(this.getOrDefault(message, "height", 0.0));
      let color = parseInt(this.getOrDefault(message, "color", 0x00FF00));

      let obj = new CylinderObject(id, radius, height, color);
      obj.matrix.set.apply(obj.matrix, matrix);
      this.addObject(obj);

    } else {
      console.error("The type", type, "is not valid.");
    }
  }
}
