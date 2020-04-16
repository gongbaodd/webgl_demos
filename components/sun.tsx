import { SphereBufferGeometry, MeshPhongMaterial } from "three";
import { FC } from "react";
import useRotation from "../hooks/useRotation";
import withAxesHelper from "../hoc/withAxesHelper";

const sunGeometry = new SphereBufferGeometry(1, 6, 6);
const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 });

const Sun: FC = ({ children }) => {
  const mesh = useRotation();
  return (
    <mesh
      geometry={sunGeometry}
      material={sunMaterial}
      scale={[5, 5, 5]}
      name="Sun"
      ref={mesh}
    >
      {children}
    </mesh>
  );
};

export default withAxesHelper(Sun);
