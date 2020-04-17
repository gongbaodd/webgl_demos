import { useThree } from "react-three-fiber";
import { useRef, useLayoutEffect } from "react";
import { PerspectiveCamera } from "three";

const DefaultCamera = () => {
  const { setDefaultCamera } = useThree();
  const camera = useRef<PerspectiveCamera>();

  useLayoutEffect(() => {
    if (camera.current) {
      setDefaultCamera(camera.current);
    }
  }, []);

  return (
    <perspectiveCamera
      fov={60}
      aspect={2}
      near={0.1}
      far={500}
      position={[40, 10, 30]}
      onUpdate={(self) => self.lookAt(0, 5, 0)}
      name="camera"
      ref={camera}
    ></perspectiveCamera>
  );
};

export default DefaultCamera;
