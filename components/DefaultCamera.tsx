import { useThree, useFrame } from "react-three-fiber";
import { useRef, useLayoutEffect, FC } from "react";
import { PerspectiveCamera } from "three";

interface Props {
  aspect?: number;
}

const DefaultCamera: FC<Props> = ({ aspect }) => {
  const { setDefaultCamera, size } = useThree();
  const camera = useRef<PerspectiveCamera>();

  useLayoutEffect(() => {
    if (camera.current) {
      setDefaultCamera(camera.current);
    }
  }, []);

  useFrame(() => {
    camera.current && camera.current.updateMatrixWorld();
  });

  return (
    <perspectiveCamera
      fov={60}
      aspect={aspect || size.width / size.height}
      near={0.1}
      far={500}
      position={[40, 10, 30]}
      onUpdate={(self) => {
        self.lookAt(0, 5, 0);
        self.updateProjectionMatrix();
      }}
      name="camera"
      ref={camera}
    ></perspectiveCamera>
  );
};

export default DefaultCamera;
