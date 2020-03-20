import { Canvas } from "react-three-fiber";
import GridHelper from "../components/GridHelper";

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
      <ambientLight></ambientLight>
      <GridHelper />
    </Canvas>
  );
};

export default Playground;
