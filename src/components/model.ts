import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Context } from "typings/context";
import { Geometry, AnimationMixer, Object3D, Mesh, LoopOnce } from "three";
import model from "../model/character.fbx";

const load = (loader: FBXLoader) =>
  new Promise<Geometry & Object3D>((resolve, reject) =>
    loader.load(
      model,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj => resolve(obj as any)
      // error => reject(error)
    )
  );

const setup = async (_ctx: Context) => {
  const mixers: AnimationMixer[] = [];

  const loader = new FBXLoader();

  let obj: (Geometry & Object3D) | null = null;

  try {
    obj = await load(loader);

    const mixer = new AnimationMixer(obj);
    mixers.push(mixer);

    const action = mixer.clipAction(obj.animations && obj.animations[0]);
    action.setLoop(LoopOnce, 1);
    action.enabled = true;
    action.clampWhenFinished = true;
    action.play();

    obj.traverse(_child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child: Object3D & Mesh = _child as any;
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  if (!_ctx.scene) {
    throw new Error("scenen needed!");
  }

  const ctx = _ctx;

  if (obj) {
    _ctx.scene.add(obj);
    ctx.character = obj;
  }

  ctx.characterMixers = mixers;
};

export default setup;
