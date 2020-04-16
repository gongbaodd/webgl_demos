import { Canvas, useFrame, useThree } from "react-three-fiber";
import Sun from "../components/sun";
import Earth from "../components/earth";
import Moon from "../components/Moon";
import SolarSystem from "../components/SolarSystem";
import Axes from "../components/Axes";

const Solar = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 1,
        far: 200,
        position: [0, 50, 0],
        up: [0, 0, 1],
      }}
    >
      <SolarSystem>
        <Sun />
        <Earth>
          <Moon />
        </Earth>
      </SolarSystem>
      <Axes />
    </Canvas>
  );
};

export default Solar;
