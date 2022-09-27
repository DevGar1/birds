import { LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const manager = new LoadingManager();
export const loader = new GLTFLoader(manager).setPath("/models/");
