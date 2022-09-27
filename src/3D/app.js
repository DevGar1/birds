import {
  createCamera,
  createContols,
  createCube,
  createLight,
  createRenderer,
  createScene,
  Loop,
  setSize,
} from "./system";

let _camera, _renderer, _scene, _container, _updatables, _loop;
export class App {
  constructor(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    _container = container;
    _camera = createCamera(width, height);
    _scene = createScene();
    createContols(_camera, container);
    const cube = createCube();
    const ligth = createLight();
    _scene.add(ligth, cube);
    _renderer = createRenderer(container, _camera);
    _updatables = [cube];
    _loop = new Loop(_renderer, _scene, _camera, _updatables);
    this.listeners();
  }

  listeners() {
    window.addEventListener("resize", () => {
      const width = _container.clientWidth;
      const height = _container.clientHeight;
      setSize(_renderer, _camera, width, height);
    });
  }

  startAnimation() {
    _loop.start()
  }
}
