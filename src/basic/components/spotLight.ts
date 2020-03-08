import { SpotLight } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const light = new SpotLight();
  light.position.set(-40, 60, -10);
  light.castShadow = true;

  const ctx = _ctx;
  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  ctx.scene.add(light);
  ctx.spotLight = light;
};

export default setup;
