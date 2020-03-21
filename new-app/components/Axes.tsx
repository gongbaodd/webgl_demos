import { AxesHelper } from "three";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const axe = new AxesHelper(20);

const Axes = () => {
  useFrame(({ scene }) => {
    (window as any).scene = scene;
    window.THREE = THREE;
  });

  return <primitive object={axe}></primitive>;
};

export default Axes;
