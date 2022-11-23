import React from "react";
import { Center, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { GroupProps } from "@react-three/fiber";

export function Table({
  children,
  ...rest
}: GroupProps & React.PropsWithChildren) {
  const { nodes, materials } = useGLTF("table.gltf");

  return (
    <group {...rest}>
      <Center top>
        <mesh
          castShadow
          scale={0.05}
          rotation-x={-Math.PI}
          material={materials["01_-_Default"]}
          geometry={(nodes["Desk_LP_01_-_Default_0"] as Mesh).geometry}
        />
      </Center>

      <group position-y={4.1}>
        <mesh receiveShadow position-y={-0.026}>
          <boxGeometry attach="geometry" args={[4.5, 0.05, 9.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
        {children}
      </group>
    </group>
  );
}

useGLTF.preload("table.gltf");
