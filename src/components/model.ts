import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Context } from "typings/context";
import THREE, { Geometry, AnimationMixer, Object3D, Mesh } from "three";

const load = (loader: FBXLoader) =>
  new Promise<Geometry & Object3D>((resolve, reject) =>
    loader.load(
      "model/character.fbx",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj => resolve(obj as any),
      error => reject(error)
    )
  );

const setup = async (_ctx: Context) => {
  const mixers: AnimationMixer[] = [];

  const loader = new FBXLoader();
  const obj = await load(loader).catch(() => {
    return new Geometry() as Geometry & Object3D;
  });

  const mixer = new AnimationMixer(obj);
  mixers.push(mixer);

  const action = mixer.clipAction(obj.animations && obj.animations[0]);
  action.setLoop(THREE.LoopOnce, 1);
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

  if (!_ctx.scene) {
    throw new Error("scenen needed!");
  }

  _ctx.scene.add(obj);

  const ctx = _ctx;
  ctx.character = obj;
  ctx.characterMixers = mixers;
};

export default setup;
