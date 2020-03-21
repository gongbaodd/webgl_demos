import { GridHelper, Material } from "three";

const grid = new GridHelper(2000, 20, 0x000000, 0x0000000);
(grid.material as Material).opacity = 0.2;
(grid.material as Material).transparent = true;

const Grid = () => {
  return <primitive object={grid}></primitive>;
};

export default Grid;
