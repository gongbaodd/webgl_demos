import {
  WebGLRenderTarget,
  Color,
  BoxBufferGeometry,
  MeshPhongMaterial,
  Scene,
  PerspectiveCamera,
} from "three";
import { useFrame, render } from "react-three-fiber";
import React, { useMemo, useRef } from "react";

const useCube = () => useMemo(() => new BoxBufferGeometry(1, 1, 1), []);

const Targets = () => {
  const cube = useCube();

  return (
    <scene name="targetScene" background={new Color("red")}>
      <directionalLight
        color={new Color(0xffffff)}
        intensity={1}
        position={[-1, 2, 4]}
      />
      <mesh
        geometry={cube}
        material={new MeshPhongMaterial({ color: 0x44aa88 })}
        position-x={0}
      />
      <mesh
        geometry={cube}
        material={new MeshPhongMaterial({ color: 0x8844aa })}
        position-x={-2}
      />
      <mesh
        geometry={cube}
        material={new MeshPhongMaterial({ color: 0xaa8844 })}
        position-x={2}
      />
    </scene>
  );
};

const target = new WebGLRenderTarget(512, 512);
const camera = new PerspectiveCamera();
const scene = new Scene();
scene.add(camera);
render(<Targets />, scene);

const Renderer = () => {
  const cube = useCube();

  useFrame(({ gl }) => {
    // gl.setRenderTarget(target);
  });

  return (
    <group>
      <mesh
        geometry={cube}
        material={new MeshPhongMaterial({ map: target.texture })}
      />
    </group>
  );
};

export default Renderer;
