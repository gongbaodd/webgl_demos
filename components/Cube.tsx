import { BoxBufferGeometry, MeshPhongMaterial } from "three";

const cubeSize = 4;

const Cube = () => (
  <mesh
    geometry={new BoxBufferGeometry(cubeSize, cubeSize, cubeSize)}
    material={new MeshPhongMaterial({ color: "#8ac" })}
    position={[cubeSize + 1, cubeSize / 2, 0]}
    name="cube"
  />
);

export default Cube;
