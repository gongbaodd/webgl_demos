import { WebGLRenderer } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const ctx = _ctx;
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  ctx.renderer = renderer;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
};

export default setup;
