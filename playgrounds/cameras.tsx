import { Canvas } from "react-three-fiber";
import Helper from "../components/Axes";
import Controls from "../components/OrbitControls";
import Plane from "../components/Plane";
import DefaultCamera from "../components/DefaultCamera";
import { Suspense } from "react";
import DirectLight from "../components/DirectLight";
import Cube from "../components/Cube";
import Sphere from "../components/Sphere";

const Cameras = () => (
  <Canvas>
    <DefaultCamera />
    <DirectLight />
    <Suspense fallback={<mesh />}>
      <Plane />
      <Cube />
      <Sphere />
    </Suspense>
    <Helper />
  </Canvas>
);

export default Cameras;
