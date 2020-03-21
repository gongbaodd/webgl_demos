import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useEffect, useState } from "react";
import {
  Geometry,
  AnimationMixer,
  Object3D,
  Mesh,
  LoopOnce,
  Clock,
} from "three";
import { useFrame } from "react-three-fiber";

const mixers: AnimationMixer[] = [];

const clock = new Clock();

const load = (loader: FBXLoader) =>
  new Promise<Geometry & Object3D>(resolve =>
    loader.load("/character.fbx", _obj => {
      const obj: any = _obj;
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

      resolve(obj);
    })
  );

const Model = () => {
  const [obj, setObj] = useState<any>(null);

  useEffect(() => {
    const loader = new FBXLoader();
    load(loader).then(obj => setObj(obj));
  }, []);

  useFrame(() => {
    mixers.forEach(mix => {
      mix.update(clock.getDelta());
    });
  });

  if (!obj) {
    return null;
  }

  return <primitive object={obj}></primitive>;
};

export default Model;
