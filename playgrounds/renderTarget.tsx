import { Canvas } from "react-three-fiber";
import Axes from "../components/Axes";
import Target from "../components/RenderTarget";

const RenderTarget = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: 2,
        near: 0.1,
        far: 5,
        position: [0, 0, 2],
      }}
      invalidateFrameloop
    >
      <hemisphereLight />
      <Axes />
      <Target />
    </Canvas>
  );
};

export default RenderTarget;
