import { MeshLambertMaterial, Mesh, PlaneGeometry } from "three";
import { Context } from "../typings/ctx";

const setup = (_ctx: Context) => {
  const planeGeo = new PlaneGeometry(60, 20);
  const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc });
  const plane = new Mesh(planeGeo, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  const ctx = _ctx;
  if (!ctx.scene) {
    throw new Error("scene needed");
  }

  ctx.scene.add(plane);
  ctx.plane = plane;
};

export default setup;
