import { useRef } from "react";
import { DirectionalLight } from "three";

const DirectLight = () => {
  const light = useRef<DirectionalLight>();

  return (
    <>
      <directionalLight
        position={[0, 10, 0]}
        args={[0xffffff, 1]}
        target-position={[-5, 0, 0]}
        name="DirectionLight"
        ref={light}
      />
      {/* {light.current && (
        <directionalLightHelper
          name="DirectionLightHelper"
          light={light.current}
        />
      )} */}
    </>
  );
};

export default DirectLight;
