import { Canvas } from "react-three-fiber";
import { Cannon, useCannon } from "../hooks/useCannon";
import React, { FC } from "react";
import { Plane, Box, Vec3 } from "cannon";

type Position = [number, number, number];

const PlaneMesh: FC<{ position: Position }> = ({ position }) => {
  const ref = useCannon({ mass: 0 }, (body) => {
    body.addShape(new Plane());
    body.position.set(...position);
  });

  return (
    <mesh name="plane" receiveShadow ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#272727" />
    </mesh>
  );
};

const BoxMesh: FC<{ position: Position }> = ({ position }) => {
  const ref = useCannon({ mass: 100000 }, (body) => {
    body.addShape(new Box(new Vec3(1, 1, 1)));
    body.position.set(...position);
  });

  return (
    <mesh name="box" castShadow receiveShadow ref={ref}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

const PlayGround = () => {
  return (
    <Canvas shadowMap camera={{ position: [0, 0, 15] }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[30, 30, 50]} />
      <Cannon>
        <PlaneMesh position={[0, 0, -10]} />
        <BoxMesh position={[1, 0, 1]} />
        <BoxMesh position={[2, 1, 5]} />
      </Cannon>
    </Canvas>
  );
};

export default PlayGround;
