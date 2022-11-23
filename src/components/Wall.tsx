import React from "react";
import { Texture } from "three";
import { GroupProps } from "@react-three/fiber";

export type WallProps = GroupProps & {
  size?: number;
  texture: Texture;
};

export function Wall({ size = 1, texture, ...rest }: WallProps) {
  return (
    <group {...rest}>
      <mesh scale={size} receiveShadow>
        <planeGeometry attach="geometry" args={[1, 1, 10, 10]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
