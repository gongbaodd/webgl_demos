import { HemisphereLight } from "three";

const light = new HemisphereLight(0xe8eaf6, 0x1a237e);
light.position.set(300, 500, 300);

const Light = () => {
  return <primitive object={light}></primitive>;
};

export default Light;
