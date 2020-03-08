/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Context } from "../typings/ctx";
import camera from "./camera";
import renderer from "./renderer";
import scene from "./scene";
import axe from "./axes";
import plane from "./plane";
import ambLight from "./ambLight";
import spotLight from "./spotLight";

const setup = async () => {
  const coms = [scene, camera, renderer, axe, plane, ambLight, spotLight];
  const ctx: Context = {};

  for (const com of coms) {
    await Promise.resolve(com(ctx));
  }

  return ctx;
};

export default setup;
