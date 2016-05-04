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
      if(this.simulator.highGraphics) {
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.scene.add(new THREE.AxisHelper(50));

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
    this.camera.position.set(48, 40, 20);
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
      new THREE.PlaneBufferGeometry(0.35, 0.30),
      new THREE.MeshPhongMaterial({color: 0x383838, transparent: false, side: THREE.DoubleSide})
    );

		ground.position.set(15, 10, -1);

		ground.scale.set(100, 100, 100);
		ground.castShadow = false;
		ground.receiveShadow = true;

		this.scene.add(ground);
    // this.scene.fog = new THREE.Fog(0xE3E3E3, 15, 10);
  }

  initLights() {
    let light = new THREE.AmbientLight(0xA6A6A6); // soft white light
    this.scene.add(light);

    let target = new THREE.Object3D();
    target.position.set(15, 10, 0);
    this.scene.add(target);

    let spotLight = new THREE.SpotLight(0xffffff, 0.4);
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

  getScreenPosition(obj) {
    let vector = new THREE.Vector3();

    let widthHalf = 0.5*this.renderer.context.canvas.width;
    let heightHalf = 0.5*this.renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(this.camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return {
      x: vector.x,
      y: vector.y
    };

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
