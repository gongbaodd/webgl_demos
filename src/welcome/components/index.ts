/* eslint-disable no-console */
import camera from "./camera";
import controls from "./controls";
import directLight from "./direct_light";
import hemiLight from "./hemi_light";
import grid from "./grid";
import model from "./model";
import scene from "./scene";
import renderer from "./renderer";
import { Context } from "../typings/context";

const setupRunner = async () => {
  const setups = [
    camera,
    scene,
    directLight,
    hemiLight,
    grid,
    model,
    renderer,
    controls,
  ];
  const ctx: Context = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const step of setups) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve(step(ctx)).catch(err => {
      console.error(err);
      const funcIndex = setups.indexOf(step);
      console.log(`error in ${setups[funcIndex].name}`);
    });
  }

  return ctx;
};

export default setupRunner;
