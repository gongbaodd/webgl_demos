import { Object3D } from "three";
import { FC } from "react";
import useRotation from "../hooks/useRotation";

const SolarSystem: FC = ({ children }) => {
  const mesh = useRotation();
  const object = new Object3D();

  return (
    <primitive object={object} name="SolarSystem" ref={mesh}>
      {children}
    </primitive>
  );
};

export default SolarSystem;
