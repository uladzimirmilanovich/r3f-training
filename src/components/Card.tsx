import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import {
  Group,
  MeshBasicMaterial,
  RepeatWrapping,
  Texture,
  Vector2,
} from 'three';
import { cardsConfig as config } from '../config';
import { TCardSymbol, TCardSuit, TCard } from '../types/Card';
import { CardTexture } from '../materials/CardTexture';
import { MergeTexturesMaterial } from '../materials/MergeTexturesMaterial';

export type CardProps = GroupProps & {
  label?: string;
  suit?: TCardSuit;
  symbol?: TCardSymbol;
  data?: TCard;
  textures: { suits?: Texture[]; back?: Texture };
};

export function Card({ data, label, textures, ...rest }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const material = useMemo(() => {
    if (!data?.suit) {
      return new MeshBasicMaterial({ color: 'white' });
    }

    const texture1 = new CardTexture(
      config.size.width,
      config.size.height,
      data?.suit,
      data?.symbol,
      textures.suits,
    );

    return new MeshBasicMaterial({ map: texture1 });
  }, [data?.key]);

  // TODO: Use shader to apply 1 texture to 2 sides of single plane
  return (
    <group
      {...rest}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[config.size.width, config.size.height, 2]} />
        <meshStandardMaterial map={textures.back} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={material} castShadow>
        <planeGeometry args={[config.size.width, config.size.height, 2]} />
      </mesh>

      {hovered && label && (
        <Html as="div" position={[0, 0.01, 0]} className="cardContainer" center>
          <span className="cardLabel">{label}</span>
        </Html>
      )}
    </group>
  );
}
