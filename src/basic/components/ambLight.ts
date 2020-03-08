import { AmbientLight } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const ctx = _ctx;

  const light = new AmbientLight(0x0c0c0c);

  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  ctx.scene.add(light);
  ctx.ambLight = light;
};

export default setup;
