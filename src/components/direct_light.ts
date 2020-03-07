import { DirectionalLight } from "three";
import { Context } from "typings/context";

const setup = (_ctx: Context) => {
  const ctx = _ctx;
  const light = new DirectionalLight(0xffffff);

  light.position.set(-500, 500, 500);
  light.castShadow = true;
  light.shadow.camera.top = 180;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -120;
  light.shadow.camera.right = 120;

  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  ctx.scene.add(light);
  ctx.directLight = light;
};

export default setup;
