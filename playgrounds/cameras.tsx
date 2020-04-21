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

const SceneItems = () => {
  return (
    <>
      <DirectLight />
      <Plane />
      <Cube />
      <Sphere />
      <Helper />
    </>
  );
};

const MainScene: FC = () => {
  const scene = useRef<Scene>();

  const {
    camera,
    size: { left, top, width, height },
  } = useThree();

  useFrame(({ gl }) => {
    gl.autoClear = true;
    gl.setScissorTest(true);
    gl.setScissor(left, top, width / 2, height);
    gl.setViewport(left, top, width / 2, height);

    (camera as PerspectiveCamera).aspect = width / 2 / height;
    camera.updateProjectionMatrix();

    return scene.current && gl.render(scene.current, camera);
  }, 10);

  return (
    <scene ref={scene} name="main">
      <SceneItems />
    </scene>
  );
};

const SideScene = () => {
  const scene = useRef<Scene>();
  const camera = useRef<PerspectiveCamera>();
  const {
    size: { top, width, height },
  } = useThree();

  useFrame(({ gl }) => {
    gl.autoClear = false;
    gl.setScissor(width / 2, top, width / 2, height);
    gl.setViewport(width / 2, top, width / 2, height);

    scene.current && camera.current && gl.render(scene.current, camera.current);
  }, 1);

  return (
    <scene ref={scene} name="side">
      <perspectiveCamera
        fov={60}
        aspect={width / 2 / height}
        near={0.1}
        far={500}
        position={[0, 100, 0]}
        onUpdate={(self) => {
          self.lookAt(0, 5, 0);
          self.updateProjectionMatrix();
        }}
        name="camera2"
        ref={camera}
      ></perspectiveCamera>
      <SceneItems />
    </scene>
  );
};

const Cameras = () => {
  const {
    size: { width, height },
  } = useThree();
  return (
    <>
      <DefaultCamera aspect={width / 2 / height} />
      <MainScene />
      <SideScene />
    </>
  );
};

export default () => (
  <Canvas>
    <Cameras />
  </Canvas>
);
