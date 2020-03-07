import { HemisphereLight } from "three";
import { Context } from "typings/context";

const setup = (_ctx: Context) => {
  const light = new HemisphereLight(0xe8eaf6, 0x1a237e);
  light.position.set(300, 500, 300);

  if (!_ctx.scene) {
    throw new Error("scene needed");
  }

  const ctx = _ctx;
  _ctx.scene.add(light);
  ctx.hemiLight = light;
};

export default setup;
