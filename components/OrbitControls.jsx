import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef } from "react";
import { useThree, extend, useFrame } from "react-three-fiber";

extend({ OrbitControls });

function Controls(props) {
  const ctlRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    const { current } = ctlRef;
    if (current) {
      current.update();
    }
  });

  return (
    <orbitControls
      ref={ctlRef}
      args={[camera, gl.domElement]}
      target={[0, 100, 0]}
      {...props}
    />
  );
}

export default Controls;
