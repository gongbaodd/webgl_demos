import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  DoubleSide,
  PlaneGeometry,
  MeshToonMaterial,
} from "three";
import { useLoader } from "react-three-fiber";
import { useMemo } from "react";
import { Color } from "three";

const planeSize = 40;

const Plane = () => {
  const texture = useMemo(() => {
    const t = new TextureLoader().load("./checker.png");
    t.wrapS = RepeatWrapping;
    t.wrapT = RepeatWrapping;
    t.magFilter = NearestFilter;
    t.repeat.set(planeSize / 2, planeSize / 2);
    return t;
  }, []);

  return (
    <mesh
      name="plane"
      rotation-x={Math.PI * -0.5}
      geometry={new PlaneGeometry(planeSize, planeSize)}
      material={
        new MeshToonMaterial({
          map: texture,
          side: DoubleSide,
          color: new Color(1.5, 1.5, 1.5),
        })
      }
    />
  );
};

export default Plane;
