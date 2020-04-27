import { Canvas } from "react-three-fiber";
import GridHelper from "../components/GridHelper";
import DirectLight from "../components/WelcomeDirectLight";
import HemiLight from "../components/WelcomeHemiLight";
import Model from "../components/WelcomeCharacter";
import Controls from "../components/OrbitControls";
import Axes from "../components/Axes";

const Playground = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 1,
        far: 2000,
        position: [100, 75, 300],
      }}
    >
      <GridHelper />
      <DirectLight />
      <HemiLight />
      <Model />
      <Controls />
      <Axes />
    </Canvas>
  );
};

export default Playground;
