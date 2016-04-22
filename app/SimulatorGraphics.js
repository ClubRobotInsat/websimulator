import THREE from "three";
import Detector from "../vendor/Detector";
import OrbitControls from "../vendor/OrbitControls";
import Stats from "../vendor/Stats";
import OBJLoader from "../vendor/OBJLoader";

import * as Utils from "./Utils";

export default class SimulatorGraphics {
  constructor(simulator) {
    this.simulator = simulator;

    //init Renderer
    if(Detector.webgl) {
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    } else {
      this.renderer = new THREE.CanvasRenderer();
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.scene.add(new THREE.AxisHelper(50));

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
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
    this.initScene();
    this.animate();
  }

  initScene() {
  	let ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100),
      new THREE.MeshPhongMaterial({color: 0x383838})
    );

		ground.position.set(0, 0, -0.2);
		ground.scale.set(100, 100, 100);

		ground.castShadow = false;
		ground.receiveShadow = true;

		this.scene.add(ground);

    let loader = new THREE.OBJLoader();
    loader.load("../models/bb8.obj", (obj) => {
      obj.scale.set(0.05, 0.05, 0.05);
      obj.position.set(-10, 10, -0.2);
      obj.rotation.set(Math.PI / 2, Math.PI, 0);
      obj.castShadow = true;
      this.scene.add(obj);
    });
    // this.scene.fog = new THREE.Fog(0xE3E3E3, 15, 10);
  }

  initLights() {
    let light = new THREE.AmbientLight(0xA6A6A6); // soft white light
    this.scene.add(light);

    var target = new THREE.Object3D();
    target.position.set(15, 10, 0);
    this.scene.add(target);

    var spotLight = new THREE.SpotLight(0xffffff, 0.4);
    spotLight.penumbra = 0.8;
    spotLight.position.set(30, 30, 50);
    spotLight.target = target;

    spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 140;
    spotLight.shadow.camera.fov = 40;


    if(this.simulator.debug) this.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
    this.scene.add(spotLight);

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
