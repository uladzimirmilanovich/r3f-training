import React, { useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Group, Texture } from "three";

export enum CardTemplateSuits {
  Clubs = 0,
  Hearts = 1,
  Spades = 2,
  Diamonds = 3,
}

export const CardTemplateSymbols = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export type CardProps = {
  suit: CardTemplateSuits;
  symbol: string;
};

export function CardTemplate(props: CardProps) {
  return (
    <group position={[0, 1, 0]}>
      <mesh>
        <boxGeometry args={[1.25, 2, 0.001]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </group>
  );
}
