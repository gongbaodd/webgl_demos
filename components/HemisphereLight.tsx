import { Color } from "three";

const HemishpereLight = () => {
  return (
    <hemisphereLight
      name="skyLight"
      skyColor={new Color(0xb1e1ff)}
      groundColor={new Color(0xb97a20)}
      intensity={1.2}
    />
  );
};

export default HemishpereLight;
