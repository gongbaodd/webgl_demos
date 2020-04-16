import { SphereBufferGeometry, MeshPhongMaterial } from "three";
import { FC } from "react";
import useRotation from "../hooks/useRotation";
import withAxes from "../hoc/withAxesHelper";

const moonGeometry = new SphereBufferGeometry(1, 6, 6);
const moonMaterial = new MeshPhongMaterial({
  emissive: 0x222222,
  color: 0x888888,
});

const Moon: FC = ({ children }) => {
  const mesh = useRotation();
  return (
    <mesh
      geometry={moonGeometry}
      material={moonMaterial}
      scale={[0.5, 0.5, 0.5]}
      name="Moon"
      ref={mesh}
      position-x={2}
    >
      {children}
    </mesh>
  );
};

export default withAxes(Moon);
