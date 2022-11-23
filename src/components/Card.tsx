import React, { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group, Texture } from 'three';

export type CardProps = GroupProps & {
  label?: string;
  backTexture: Texture;
  frontTexture: Texture;
};

export function Card(props: CardProps) {
  const groupRef = useRef<Group>(null);

  // TODO: Use UV-mapping to apply 1 texture to 2 sides
  return (
    <group {...props} ref={groupRef}>
      <mesh scale={[1, 1.45, 1]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry />
        <meshStandardMaterial color={'white'} map={props.backTexture} />
      </mesh>
      <mesh scale={[1, 1.45, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry />
        <meshStandardMaterial color={'white'} map={props.frontTexture} />
      </mesh>

      {props.label && (
        <Html scale={0.125} position={[0, 0.01, 0]} center>
          <span className="cardLabel">{props.label}</span>
        </Html>
      )}
    </group>
  );
}
