import { Scene } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const scene = new Scene();
  const ctx = _ctx;

  ctx.scene = scene;
};

export default setup;
