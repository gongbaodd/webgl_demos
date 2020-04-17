import { SphereBufferGeometry, MeshToonMaterial } from "three";

const radius = 3;

const Sphere = () => {
  return (
    <mesh
      geometry={new SphereBufferGeometry(radius, 32, 16)}
      material={new MeshToonMaterial({ color: "#ca8" })}
      position={[-radius - 1, radius + 2, 0]}
      name="sphere"
    />
  );
};

export default Sphere;
