import { SphereBufferGeometry, MeshPhongMaterial } from "three";
import useRotation from "../hooks/useRotation";
import { FC } from "react";
import withAxes from "../hoc/withAxesHelper";

const EarthGeometry = new SphereBufferGeometry(1, 6, 6);
const EarthMaterial = new MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});

const Earth: FC = ({ children }) => {
  const mesh = useRotation();
  return (
    <mesh
      geometry={EarthGeometry}
      material={EarthMaterial}
      position-x={10}
      name="Earth"
      ref={mesh}
    >
      {children}
    </mesh>
  );
};

export default withAxes(Earth);
