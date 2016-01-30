import THREE from "three";
import WorldObject from "./WorldObject";
import Vue from "vue";

import * as ModelLoader from "./ModelLoader";
import * as View from "./View";

export default class World {
  constructor(graphics) {
    this.graphics = graphics;
    this.objects = {};
    this.selected = {};
    this.initRaycast();
  }

  addObject(obj) {
    this.objects[obj.objectId] = obj;
    this.graphics.scene.add(obj);
  }

  removeObject(obj) {
    this.objects[obj.objectId] = undefined;
    this.graphics.scene.remove(obj);
  }

  initRaycast() {
    this.raycaster = new THREE.Raycaster();
    this.graphics.renderer.domElement.addEventListener("click", (event) => {
      let mousePosition = new THREE.Vector2(
         (event.clientX / window.innerWidth) * 2 - 1,
         -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(mousePosition, this.graphics.camera);
      let objs = this.raycaster.intersectObjects(Object.keys(this.objects).map(id => this.objects[id]));
      if(objs.length > 0) {
        if(objs[0].object instanceof WorldObject) {
          this.selected = objs[0].object;
          this.selected.setSelected(true);
          View.showInfos();
        }
      } else {
        if(this.selected) this.selected.setSelected(false);
        this.selected = null;
        View.hideInfos();
      }
    });

    this.infosVue = new Vue({
      el: "#infos",
      data: {
        selected: this.selected
      }
    });
  }

  handleMessage(type, id, message) {
    if(type == "new") {
      let model = message["modelName"];
      let position = message["position"];
      let rotation = message["rotation"];

      ModelLoader.load(`../models/${model}.dae`).then((geometry) => {
        let obj = new WorldObject(id, geometry, 0x00FF00);

        obj.position.x = position.x;
        obj.position.y = position.y;
        obj.rotation.y = rotation;

        this.addObject(obj);
      });
    } else if(type == "move") {

      let position = message["position"];
      let rotation = message["rotation"];
      if(this.objects.hasOwnProperty(id)) {
        this.objects[id].position.x = position.x;
        this.objects[id].position.y = position.y;
        this.objects[id].rotation.y = rotation;
      }

    } else if(type == "remove") {
      if(this.objects.hasOwnProperty(id)) {
        this.removeObject(id);
      }
    } else {
      console.error("FUCK OFF");
    }
  }
}
