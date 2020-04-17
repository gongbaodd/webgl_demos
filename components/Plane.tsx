import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  DoubleSide,
  PlaneGeometry,
  MeshToonMaterial,
} from "three";
import { useLoader } from "react-three-fiber";

const planeSize = 40;

const Plane = () => {
  const texture = useLoader(TextureLoader, "./checker.png");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.repeat.set(planeSize / 2, planeSize / 2);

  return (
    <mesh
      name="plane"
      rotation-x={Math.PI * -0.5}
      geometry={new PlaneGeometry(planeSize, planeSize)}
      material={
        new MeshToonMaterial({
          map: texture,
          side: DoubleSide,
        })
      }
    />
  );
};

export default Plane;
