import { AxesHelper } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const axe = new AxesHelper(20);
  const ctx = _ctx;

  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  ctx.scene.add(axe);
  ctx.axe = axe;
};

export default setup;
