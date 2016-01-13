import THREE from "three";
import Detector from "../vendor/Detector";
import ColladaLoader from "../vendor/ColladaLoader";
import WindowResize from "../vendor/WindowResize";
import FullScreen from "../vendor/FullScreen";
import OrbitControls from "../vendor/OrbitControls";
import Stats from "../vendor/Stats";

export default class SimulatorGraphics {
  constructor(simulator, element) {
    this.container = element;

    // init ColladaLoader
    this.loader = new ColladaLoader();
    this.loader.options.convertUpAxis = true;

    //init Renderer
    if(Detector.webgl) {
      this.renderer = new THREE.WebGLRenderer({antialias: true});
    } else {
      this.renderer = new THREE.CanvasRenderer();
    }

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth/this.container.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 3, 8);
    this.camera.lookAt(this.scene.position);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = new Stats();
    this.stats.domElement.classList.add("stats");

    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.stats.domElement);

    WindowResize(this.renderer, this.camera);
    FullScreen.bindKey({charCode: "m".charCodeAt(0)});

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    this.stats.update();
  }
}
