import THREE from "three";
import Detector from "../vendor/Detector";
import OrbitControls from "../vendor/OrbitControls";
import Stats from "../vendor/Stats";

import * as Utils from "./Utils";

export default class SimulatorGraphics {
    constructor(simulator) {
        this.simulator = simulator;

        //init Renderer
        if(Detector.webgl) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();

        this.scene.add(new THREE.AxisHelper(50));

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 3, 8);
	this.camera.up.set( 0, 0, 1 );
        this.camera.lookAt(this.scene.position);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.stats = new Stats();
        this.stats.domElement.classList.add("stats");

        document.body.appendChild(this.renderer.domElement);
        document.body.appendChild(this.stats.domElement);

        Utils.enableCanvasResize(this.renderer, this.camera);

        this.initLights();
        this.animate();
    }

    initLights() {
        let light1	= new THREE.DirectionalLight("white", 0.225);
        light1.position.set(2.6,1,3);
        light1.name	= "Back light";
        this.scene.add(light1);;

        let light2	= new THREE.DirectionalLight("white", 0.375);
        light2.position.set(-2, -1, 0);
        light2.name 	= "Key light";
        this.scene.add(light2);

        let light3	= new THREE.DirectionalLight("white", 0.75);
        light3.position.set(3, 3, 2);
        light3.name	= "Fill light";
        this.scene.add(light3);
	var light = new THREE.AmbientLight(0xA6A6A6); // soft white light
	this.scene.add(light);
    }

    animate() {
        if(this.simulator.socket.connected || this.simulator.debug) {
            requestAnimationFrame(() => this.animate());
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.stats.update();
        }
    }
}
