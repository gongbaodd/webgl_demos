import { World, NaiveBroadphase, Body, IBodyOptions } from "cannon";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  createContext,
  FC,
} from "react";
import { useFrame } from "react-three-fiber";
import { Object3D } from "three";

const context = createContext<World | null>(null);

export const Cannon: FC = ({ children }) => {
  const [world] = useState(() => new World());

  useEffect(() => {
    world.broadphase = new NaiveBroadphase();
    world.solver.iterations = 10;
    world.gravity.set(0, 0, -25);
  }, [world]);

  useFrame(() => world.step(1 / 60));

  return <context.Provider value={world} children={children} />;
};

export const useCannon = (
  options: IBodyOptions,
  callback: (body: Body) => void,
  deps = []
) => {
  const ref = useRef<Object3D>();
  const world = useContext(context);
  const [body] = useState(() => new Body(options));

  useEffect(() => {
    callback(body);
    world?.addBody(body);
    return () => world?.remove(body);
  }, deps);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(
        body.position.x,
        body.position.y,
        body.position.z
      );

      // handles rotation
      ref.current.quaternion.set(
        body.quaternion.x,
        body.quaternion.y,
        body.quaternion.z,
        body.quaternion.w
      );
    }
  });

  return ref;
};
