import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  TextureLoader,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  Color,
  MathUtils,
  Mesh,
} from "three";
import { useMemo, FC, useRef } from "react";
import { useFrame } from "react-three-fiber";

const useBallElements = (index: number) =>
  [
    useMemo(() => new SphereBufferGeometry(1, 32, 16), []),
    useMemo(
      () =>
        new MeshPhongMaterial({
          color: new Color().setHSL(index / 15, 1, 0.75),
        }),
      []
    ),
  ] as const;

const useShadowElements = () => {
  const texture = useMemo(() => {
    const t = new TextureLoader().load("/roundshadow.png");
    return t;
  }, []);

  return [
    useMemo(() => new PlaneBufferGeometry(1, 1), []),
    useMemo(
      () =>
        new MeshBasicMaterial({
          transparent: true,
          depthWrite: false,
          map: texture,
        }),
      []
    ),
  ] as const;
};

interface Prop {
  index?: number;
}

let time = 0;

const Shadow: FC<Prop> = ({ index }) => {
  const [ball, ballMat] = useBallElements(index ?? 0);
  const [shadowGeo, shadowMaterial] = useShadowElements();
  const shadowMesh = useRef<Mesh>();
  const ballMesh = useRef<Mesh>();
  const groupMesh = useRef<Mesh>();

  useFrame((_, _d) => {
    time = (time + _d * 0.1) % 360;
    const { current: sMesh } = shadowMesh;
    const { current: bMesh } = ballMesh;
    const { current: group } = groupMesh;
    const i = index ?? 0;
    if (sMesh && bMesh && group) {
      const speed = time * 0.2;
      const angle = speed + (i / 15) * Math.PI * 2 * (i % 1 ? 1 : -1);
      const radius = Math.sin(speed - i) * 10;
      group.position.set(Math.cos(angle) * radius, 1, Math.sin(angle) * radius);

      const y = Math.abs(Math.sin(time * 2 + i));
      bMesh.position.y = y + MathUtils.lerp(0, 2, y);
      (sMesh.material as MeshBasicMaterial).opacity = MathUtils.lerp(
        1,
        0.25,
        y
      );
    }
  });

  return (
    <group name={"ballGroup" + index ?? ""} ref={groupMesh}>
      <mesh
        name={"shadow" + index ?? ""}
        geometry={shadowGeo}
        material={shadowMaterial}
        position-y={0.001}
        rotation-x={Math.PI * -0.5}
        scale={[4, 4, 4]}
        ref={shadowMesh}
      />
      <mesh
        name={"ball" + index ?? ""}
        geometry={ball}
        material={ballMat}
        position={[0, 3, 0]}
        ref={ballMesh}
      />
    </group>
  );
};

export default Shadow;
