import THREE from "three";
import WorldObject from "./WorldObject";

import * as ModelLoader from "./ModelLoader";
import * as View from "./View";

export default class World {
    constructor(graphics) {
        this.graphics = graphics;
        this.objects = {};
        this.selected = null;
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

    updateInfo(obj) {
        View.getById("selected-position").innerText = obj.position.x + "," + obj.position.y + "," + obj.position.z;
        View.getById("selected-rotation").innerText = obj.rotation.x + "," + obj.rotation.y + "," + obj.rotation.z;
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
                    this.updateInfo(this.selected);
                    View.showInfos();
                }
            } else {
                if(this.selected != null) this.selected.setSelected(false);
                this.selected = null;
                View.hideInfos();
            }
        });
    }

    handleMessage(type, id, message) {
        if(type == "new") {
            let model = message["modelName"];
            let position = message["position"];
            let rotation = message["rotation"];
            let color = 0x00FF00;
            if(message.hasOwnProperty("color")) {
                color = parseInt(message["color"]);
            }     
            
            ModelLoader.load(`../models/${model}.dae`).then((geometry) => {
                let obj = new WorldObject(id, geometry, color);

                obj.position.x = position.x;
                obj.position.y = position.y;
                obj.position.z = position.z;
                obj.rotation.y = rotation;
                this.addObject(obj);
            });
        } else if(type == "move") {

            let position = message["position"];
            let rotation = message["rotation"];
            if(this.objects.hasOwnProperty(id)) {
                let obj = this.objects[id];
                obj.position.x = position.x;
                obj.position.y = position.y;
                obj.position.z = position.z;
                obj.rotation.y = rotation;

                if(this.selected = obj) {
                    this.updateInfo(obj);
                }
            }

        } else if(type == "remove") {
            if(this.objects.hasOwnProperty(id)) {
                this.removeObject(id);
            }
        } else if(type == "newcuboid") {
            let position = message["position"];
            let rotation = message["rotation"];
            let scale = message["scale"];
            let color = 0x00FF00;
            if(message.hasOwnProperty("color")) {
                color = parseInt(message["color"]);
            }     
            let geometry = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
            
            let obj = new WorldObject(id, geometry, color);
            
            obj.position.x = position.x;
            obj.position.y = position.y;
            obj.position.z = position.z;
            obj.rotation.y = rotation;  
            this.addObject(obj);
        } else {
            console.error("FUCK OFF");
        }
    }
}
