import { Scene, Fog } from "three";
import { Context } from "../typings/context";

const setup = (_ctx: Context) => {
  const ctx = _ctx;

  const scene = new Scene();
  scene.fog = new Fog(0xa0a0a0, 200, 800);

  ctx.scene = scene;
};

export default setup;
