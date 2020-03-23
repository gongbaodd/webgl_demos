import { Canvas, useFrame } from "react-three-fiber";
import React, { useRef, useState } from "react";
import { Vector3 } from "three";
import Layout from "../components/Layout";

const Box = props => {
  const mesh = useRef<THREE.Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.x = mesh.current.rotation.y;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      ></meshStandardMaterial>
    </mesh>
  );
};

const Three = () => {
  return (
    <Layout>
      <Canvas>
        <ambientLight></ambientLight>
        <pointLight name="light1" position={new Vector3(10, 10, 10) as any} />
        <Box name="box1" position={new Vector3(-1.2, 0, 0) as any} />
      </Canvas>
    </Layout>
  );
};

export default Three;
