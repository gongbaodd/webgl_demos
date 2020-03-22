import { DirectionalLight } from "three";

const light = new DirectionalLight(0xffffff);

light.position.set(-500, 500, 500);
light.castShadow = true;
light.shadow.camera.top = 180;
light.shadow.camera.bottom = -100;
light.shadow.camera.left = -120;
light.shadow.camera.right = 120;

const Light = () => {
  return <primitive object={light}></primitive>;
};

export default Light;
