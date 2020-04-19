import { Canvas, useFrame, useThree } from "react-three-fiber";
import Helper from "../components/Axes";
import Controls from "../components/OrbitControls";
import Plane from "../components/Plane";
import DefaultCamera from "../components/DefaultCamera";
import { Suspense, FC } from "react";
import DirectLight from "../components/DirectLight";
import Cube from "../components/Cube";
import Sphere from "../components/Sphere";
import { useRef, useLayoutEffect } from "react";
import { PerspectiveCamera, Scene } from "three";

const MainScene: FC = () => {
  const scene = useRef<Scene>();

  const { camera } = useThree();

  useFrame(({ gl }) => {
    gl.autoClear = true;
    return scene.current && gl.render(scene.current, camera);
  }, 1);

  return (
    <scene ref={scene} name="main">
      <DirectLight />
      <Plane />
      <Cube />
      <Sphere />
    </scene>
  );
};

const SideScene = () => {
  const scene = useRef<Scene>();
  const { camera } = useThree();

  useFrame(({ gl }) => {
    gl.autoClear = false;
    gl.clearDepth();
    scene.current && gl.render(scene.current, camera);
  }, 0);

  return (
    <scene ref={scene} name="side">
      <DirectLight />
      <Plane />
      <Cube />
      <Sphere />
    </scene>
  );
};

const Cameras = () => {
  return (
    <>
      <DefaultCamera />
      <MainScene />
      <SideScene />
      <Helper />
    </>
  );
};

export default () => (
  <Canvas>
    <Cameras />
  </Canvas>
);
