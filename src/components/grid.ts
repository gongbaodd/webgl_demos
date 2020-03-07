import { GridHelper, Material } from "three";
import { Context } from "typings/context";

const setup = (_ctx: Context) => {
  const ctx = _ctx;
  const grid = new GridHelper(2000, 20, 0x000000, 0x0000000);
  (grid.material as Material).opacity = 0.2;
  (grid.material as Material).transparent = true;

  if (!ctx.scene) {
    throw new Error("scenen needed!");
  }

  ctx.scene.add(grid);
};

export default setup;
