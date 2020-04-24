import { Canvas } from "react-three-fiber";
import Axes from "../components/Axes";
import Target from "../components/RenderTarget";

const RenderTarget = () => {
  return (
    <Canvas>
      <Axes />
      <Target />
    </Canvas>
  );
};

export default RenderTarget;
