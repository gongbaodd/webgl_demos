import { WebGLRenderer } from "three";
import { Context } from "typings/context";

const setup = (_ctx: Context) => {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  {
    const ctx = _ctx;
    ctx.renderer = renderer;
  }
};

export default setup;
