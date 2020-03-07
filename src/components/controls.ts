import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Context } from "typings/context";

const setup = (_ctx: Context) => {
  const ctx = _ctx;

  if (!ctx.camera) {
    throw new Error("camera needed");
  }

  if (!ctx.renderer) {
    throw new Error("renderer needed");
  }

  const controls = new OrbitControls(ctx.camera, ctx.renderer.domElement);
  controls.target.set(0, 100, 0);
  controls.update();

  ctx.controls = controls;
};

export default setup;
