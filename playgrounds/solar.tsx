import { Canvas } from "react-three-fiber";
import DatGui, { DatBoolean } from "react-dat-gui";
import { useState } from "react";

import Sun from "../components/sun";
import Earth from "../components/earth";
import Moon from "../components/Moon";
import SolarSystem from "../components/SolarSystem";
import Axes from "../components/Axes";

const _data = {
  moon: false,
  earth: false,
  sun: false,
};

const Solar = () => {
  const [data, setData] = useState(_data);

  return (
    <>
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
          <Sun debug={data.sun} />
          <Earth debug={data.earth}>
            <Moon debug={data.moon} />
          </Earth>
        </SolarSystem>
        <Axes />
      </Canvas>
      <DatGui data={data} onUpdate={(d) => setData(d)}>
        <DatBoolean path="moon" label="Debug Moon" />
        <DatBoolean path="earth" label="Debug Earth" />
        <DatBoolean path="sun" label="Debug Sun" />
      </DatGui>
    </>
  );
};

export default Solar;
