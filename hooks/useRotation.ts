import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "react-three-fiber";

const useRotation = () => {
  const mesh = useRef<Mesh>();
  let rotationY = 0;

  useFrame((_ctx, delta) => {
    rotationY += delta;
    rotationY %= 360;
    mesh.current && (mesh.current.rotation.y = rotationY);
  });

  return mesh;
};

export default useRotation;
