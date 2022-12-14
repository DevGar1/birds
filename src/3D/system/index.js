import {
  AmbientLight,
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Loop from "./Loop";

const geometry = new BoxGeometry(3, 3, 3);
const material = new MeshStandardMaterial({ color: "red" });

const createCamera = (width, height) => {
  const camera = new PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.z = 235;
  camera.position.y = 32;

  return camera;
};

const createScene = () => {
  return new Scene();
};

const createSphere = () => {
  const geometry = new SphereGeometry(1.5, 100, 100);
  const mesh = new Mesh(geometry, material);
  mesh.position.z = 1.5;

  return mesh;
};

const createCube = (position = new Vector3(0, 0, 0)) => {
  const { x, y, z } = position;
  const mesh = new Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.position.z = 2.5;
  mesh.tick = (delta) => {
    mesh.rotateX(delta * MathUtils.degToRad(30));
    mesh.rotateY(delta * MathUtils.degToRad(30));
    mesh.rotateZ(delta * MathUtils.degToRad(30));
  };

  return mesh;
};

const setSize = (renderer, camera, width, height) => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  camera.updateMatrixWorld();
};

const createRenderer = (container, camera) => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const renderer = new WebGLRenderer();
  setSize(renderer, camera, width, height);
  container.append(renderer.domElement);

  return renderer;
};

const createLight = () => {
  return new AmbientLight();
};

const createContols = (camera, element) => {
  const controls = new OrbitControls(camera, element);
  controls.update();

  return controls;
};

const createGround = () => {
  const geometry = new PlaneGeometry(50, 50);
  const material = new MeshStandardMaterial({ color: "green" });
  const mesh = new Mesh(geometry, material);

  return mesh;
};

export {
  createScene,
  createCamera,
  createCube,
  createRenderer,
  setSize,
  createLight,
  Loop,
  createContols,
  createGround,
  createSphere,
};
