import { GroupProps } from "@react-three/fiber";
import React from "react";
import { Texture } from "three";

export type FloorProps = GroupProps & {
  size?: number;
  texture: Texture;
};

export function Floor({ size = 1, texture, ...rest }: FloorProps) {
  return (
    <group {...rest}>
      <mesh scale={size} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[1, 1, 10, 10]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
