import { Canvas } from "react-three-fiber";
import Axes from "../components/Axes";
import Plane from "../components/Plane";
import HemisphereLight from "../components/HemisphereLight";
import Shadow from "../components/Shadow";

const FakeShadow = () => {
  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 100, position: [0, 10, 20] }}>
      <Axes />
      <Plane />
      <HemisphereLight />
      <group name="movingEntities">
        {Array.from({ length: 15 }).map((_, i) => {
          return <Shadow index={i} key={i} />;
        })}
      </group>
    </Canvas>
  );
};

export default FakeShadow;
