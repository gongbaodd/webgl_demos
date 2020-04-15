import { Canvas, useFrame } from "react-three-fiber";
import Sun from "../components/sun";
import Earth from "../components/earth";
import { useState } from "react";

const Solar = () => {
  const [time, setTime] = useState(0);

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
      <Sun time={time}>
        <Earth />
      </Sun>
    </Canvas>
  );
};

export default Solar;
