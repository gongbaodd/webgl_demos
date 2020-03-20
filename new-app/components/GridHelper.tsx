import { MeshBasicMaterial } from "three";

const material = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.2,
});

const GridHelper = () => {
  return (
    <gridHelper
      //   material={material}
      args={[2000, 20, 0x000000, 0x000000]}
    ></gridHelper>
  );
};

export default GridHelper;
