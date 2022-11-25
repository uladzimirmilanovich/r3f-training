import React, { useContext, useEffect, useMemo } from 'react';
import { Card } from './Card';
import { RoomContext } from '../context/RoomContext';
import { animated, useSpring } from '@react-spring/three';
import { Center, shaderMaterial, useTexture } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import {
  cardsAnimationConfig as animation,
  cardsConfig as config,
} from '../config';
import { MeshStandardMaterial } from 'three';
import { useCardMaterial } from '../materials/CardMaterial';

export function Deck() {
  const { pickedCard } = useContext(RoomContext);

  const [{ rotationZ, position }, api] = useSpring(() => ({
    from: animation.idle,
  }));

  const backTexture = useTexture(config.backgroundUrl);
  const suitsTextures = useTexture(config.suits.map((item) => item.visualUrl));
  const backgroundMaterial = useCardMaterial();

  const materials = useMemo(() => {
    const sideMaterial = new MeshStandardMaterial({ color: 'white' });

    return [
      sideMaterial,
      sideMaterial,
      backgroundMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
    ];
  }, []);

  useEffect(() => {
    if (pickedCard) {
      api.start({
        to: !pickedCard?.isShown ? animation.hide : animation.reveal,
      });
    }
  }, [pickedCard?.isShown]);

  return (
    <group rotation={[0, Math.PI / 2, 0]} position={[0, 0.01, 0]}>
      <Center top>
        <mesh receiveShadow castShadow material={materials}>
          <boxGeometry
            args={[
              config.size.width,
              config.size.thickness * (config.total - 1),
              config.size.height,
            ]}
          />
        </mesh>
      </Center>

      <animated.group
        rotation-x={rotationZ}
        position={position as unknown as Vector3}>
        <Card
          key={pickedCard?.key}
          label={
            pickedCard?.isShown
              ? `${pickedCard?.symbol} of ${pickedCard?.suit?.label}`
              : ''
          }
          textures={{ back: backTexture, suits: suitsTextures }}
          data={pickedCard}
        />
      </animated.group>
    </group>
  );
}
