import { Mesh, SphereBufferGeometry, MeshPhongMaterial } from "three";

const EarthGeometry = new SphereBufferGeometry(1, 6, 6);
const EarthMaterial = new MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const EarthMesh = new Mesh(EarthGeometry, EarthMaterial);
EarthMesh.position.x = 10;

const Earth = () => {
  return <primitive object={EarthMesh}></primitive>;
};

export default Earth;
export { EarthMesh };
