import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useState, useMemo, FC } from "react";
import { AnimationMixer, LoopOnce, Group, AnimationClip } from "three";
import { useFrame, useThree } from "react-three-fiber";

interface AnimationGroup extends Group {
  animations: AnimationClip[];
}

const useFbxLoader = (
  url: string,
  setObj: (obj: Group | AnimationGroup) => void
) => {
  return useMemo(() => {
    const loader = new FBXLoader();
    loader.load(url, (obj) => setObj(obj));
  }, []);
};

const useAnimation = (obj: Group | AnimationGroup) => {
  const animates = useMemo(() => {
    const ans: AnimationMixer[] = [];

    if (isAnimationGroup(obj)) {
      const an = new AnimationMixer(obj);
      ans.push(an);
    }

    return ans;
  }, [obj]);

  const actions = useMemo(
    () =>
      animates.map((an) => {
        if (isAnimationGroup(obj)) {
          const action = an.clipAction(obj.animations[0]);
          action.setLoop(LoopOnce, 1);
          action.enabled = true;
          action.clampWhenFinished = true;
          action.play();
          return action;
        }
      }),
    [animates]
  );

  const { invalidate, scene, camera } = useThree();

  useFrame(({ gl }, delta) =>
    animates.forEach((mix, index) => {
      mix.update(delta);

      if (actions[index]?.isRunning() === false) {
        invalidate();
      }
    })
  );
};

const isAnimationGroup = (
  obj: AnimationGroup | Group
): obj is AnimationGroup => {
  return "animations" in obj;
};

const Model = () => {
  const [obj, setObj] = useState<Group | AnimationGroup>(new Group());
  useFbxLoader("/character.fbx", setObj);
  useAnimation(obj);
  return <primitive object={obj} name="character"></primitive>;
};

export default Model;
