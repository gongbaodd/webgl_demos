import { GridHelper, Material, Fog } from "three";
import { useFrame } from "react-three-fiber";

const grid = new GridHelper(2000, 20, 0x000000, 0x0000000);
(grid.material as Material).opacity = 0.2;
(grid.material as Material).transparent = true;

const Grid = () => {
  useFrame(({ scene }) => {
    if (!scene.fog) {
      const fog = new Fog(0xa0a0a0, 200, 800);
      scene.fog = fog;
    }
  });

  return <primitive object={grid}></primitive>;
};

export default Grid;
