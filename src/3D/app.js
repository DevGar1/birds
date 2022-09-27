import { getModel } from "./models";
import { createCamera, createContols, createLight, createRenderer, createScene, Loop, setSize } from "./system";
import { GUI } from "dat.gui";
import { Vector3 } from "three";

let _camera, _renderer, _scene, _container, _updatables, _loop;
export class App {
  constructor(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    _container = container;
    _camera = createCamera(width, height);
    _scene = createScene();
    createContols(_camera, container);
    const ligth = createLight();
    _scene.add(ligth);
    _renderer = createRenderer(container, _camera);
    _updatables = [];
    _loop = new Loop(_renderer, _scene, _camera, _updatables);
    this.listeners();
    this.init();
  }

  async init() {
    const birds = await Promise.all([getModel("Flamingo"), getModel("Parrot"), getModel("Stork")]);
    const distance = 155;
    birds[0].position.x = distance;
    birds[2].position.x = -distance;
    birds[0].position.z = -95;
    birds[2].position.z = -95;
    _scene.add(...birds);
    _updatables.push(...birds);
  }

  initDevelop() {
    const gui = new GUI();
    const cameraFolder = gui.addFolder("camera");
    cameraFolder.add(_camera.position, "z", -180, 300.1);
    cameraFolder.add(_camera.position, "y", -180, 180.1).onChange(() => _camera.lookAt(new Vector3(0, 0, 0)));
    cameraFolder.open();
  }

  listeners() {
    window.addEventListener("resize", () => {
      const width = _container.clientWidth;
      const height = _container.clientHeight;
      setSize(_renderer, _camera, width, height);
    });
  }

  startAnimation() {
    _loop.start();
  }
}
