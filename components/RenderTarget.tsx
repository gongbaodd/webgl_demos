import {
  WebGLRenderTarget,
  Color,
  BoxBufferGeometry,
  MeshPhongMaterial,
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  Mesh,
} from "three";
import { useFrame, render, useThree, createPortal } from "react-three-fiber";
import React, { useMemo, useRef, useCallback } from "react";

const createScene = () => {
  const width = 512;
  const height = 512;

  const renderer = new WebGLRenderTarget(width, height);

  const scene = new Scene();
  scene.background = new Color("red");

  const camera = new PerspectiveCamera(75, 1, 0.1, 5);
  camera.position.z = 2;
  scene.add(camera);

  {
    {
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    {
      const geo = new BoxBufferGeometry(1, 1, 1);
      const mat = new MeshPhongMaterial({ color: 0x44aa88 });
      const cube = new Mesh(geo, mat);
      scene.add(cube);
    }
    {
      const geo = new BoxBufferGeometry(1, 1, 1);
      const mat = new MeshPhongMaterial({ color: 0x8844aa });
      const cube = new Mesh(geo, mat);
      cube.position.x = -2;
      scene.add(cube);
    }
    {
      const geo = new BoxBufferGeometry(1, 1, 1);
      const mat = new MeshPhongMaterial({ color: 0xaa8844 });
      const cube = new Mesh(geo, mat);
      cube.position.x = 2;
      scene.add(cube);
    }
  }

  return { renderer, scene, camera };
};

const Renderer = () => {
  const { renderer, scene, camera } = useMemo(() => {
    return createScene();
  }, []);

  useFrame(({ gl }) => {
    gl.setRenderTarget(renderer);
    gl.render(scene, camera);

    gl.setRenderTarget(null);
  });

  return (
    <mesh>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" map={renderer.texture} />
    </mesh>
  );
};

export default Renderer;
