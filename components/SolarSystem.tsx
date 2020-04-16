import { FC } from "react";
import useRotation from "../hooks/useRotation";

const SolarSystem: FC = ({ children }) => {
  const mesh = useRotation();

  return (
    <mesh name="SolarSystem" ref={mesh}>
      {children}
    </mesh>
  );
};

export default SolarSystem;
