import { SphereBufferGeometry, Mesh, MeshPhongMaterial } from "three";
import { useFrame } from "react-three-fiber";
import { FC, useState } from "react";

const sunGeometry = new SphereBufferGeometry(1, 6, 6);
const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 });

interface SunProps {
  time: number;
}

const Sun: FC<SunProps> = ({ time }) => {
  const [y, setY] = useState(time);

  useFrame(() => {
    setY(y + 1);
  });

  return (
    <mesh
      geometry={sunGeometry}
      material={sunMaterial}
      scale={[5, 5, 5]}
      rotation-y={y}
    ></mesh>
  );
};

export default Sun;
