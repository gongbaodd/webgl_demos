import { Canvas, useFrame } from "react-three-fiber";
import React, { useRef, useState, Props } from "react";

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
    <Canvas>
      <ambientLight></ambientLight>
      <pointLight position={[10, 10, 10]}></pointLight>
      <Box position={[-1.2, 0, 0]}></Box>
    </Canvas>
  );
};

export default Three;
