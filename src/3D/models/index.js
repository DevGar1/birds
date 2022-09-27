import { AnimationMixer } from "three";
import { loader } from "./utils";

const settingModel = (data) => {
  const { scene } = data;
  const animations = data.animations[0];
  const mixer = new AnimationMixer(scene);
  const action = mixer.clipAction(animations);
  action.play();
  scene.tick = (delta) => mixer.update(delta*2);

  return scene;
};

const getModel = async (url) => {
  const data = await loader.loadAsync(`${url}.glb`);

  return settingModel(data);
};

export { getModel };
