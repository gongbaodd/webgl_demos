import { PerspectiveCamera } from "three";
import { Context } from "../typings/context";

const setup = (_ctx: Context) => {
  const context = _ctx;
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  camera.position.set(100, 75, 300);
  context.camera = camera;

  return () => null;
};

export default setup;
