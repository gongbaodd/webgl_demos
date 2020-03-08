import { PerspectiveCamera } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const ctx = _ctx;

  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(ctx.scene.position);

  ctx.camera = camera;
};

export default setup;
