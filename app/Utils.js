export function enableCanvasResize(renderer, camera) {
  let cb = (event) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", cb, false);
}
