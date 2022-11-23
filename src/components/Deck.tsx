import React, { useContext, useEffect } from 'react';
import { Card } from './Card';
import { RoomContext } from '../context/RoomContext';
import { animated, useSpring } from '@react-spring/three';
import { Center, useTexture } from '@react-three/drei';

import backTextureUrl from '../assets/cards/tile000.png';
import frontTextureUrl from '../assets/cards/tile001.png';
import { Vector3 } from '@react-three/fiber';
import {
  cardsAnimationConfig as animation,
  cardsConfig as config,
} from '../config';
import { MeshStandardMaterial } from 'three';

export function Deck() {
  const { pickedCard } = useContext(RoomContext);
  const [{ rotationZ, position }, api] = useSpring(
    () => ({
      from: animation.idle,
    }),
    [pickedCard],
  );

  const backTexture = useTexture(backTextureUrl);
  const frontTexture = useTexture(frontTextureUrl);

  useEffect(() => {
    if (pickedCard != null) {
      api.start({
        to: pickedCard >= 0 ? animation.reveal : animation.hide,
      });
    }
  }, [pickedCard]);

  return (
    <group rotation={[0, Math.PI / 2, 0]} position={[0, 0.01, 0]}>
      <Center top>
        <mesh
          receiveShadow
          castShadow
          material={[
            new MeshStandardMaterial({ color: 'white' }),
            new MeshStandardMaterial({ color: 'white' }),
            new MeshStandardMaterial({ map: backTexture }),
            new MeshStandardMaterial({ color: 'white' }),
            new MeshStandardMaterial({ color: 'white' }),
            new MeshStandardMaterial({ color: 'white' }),
          ]}>
          <boxGeometry
            args={[1, config.thickness * (config.total - 1), 1.45]}
          />
        </mesh>
      </Center>

      <animated.group
        rotation-x={rotationZ}
        position={position as unknown as Vector3}>
        <Card
          label={pickedCard && pickedCard >= 0 ? String(pickedCard) : ''}
          backTexture={backTexture}
          frontTexture={frontTexture}
        />
      </animated.group>
    </group>
  );
}
