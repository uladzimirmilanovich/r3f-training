import React, { useContext, useEffect } from 'react';
import { Card } from './Card';
import { RoomContext } from '../context/RoomContext';
import { animated, useSpring } from '@react-spring/three';
import { Center, useTexture } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import {
  cardsAnimationConfig as animation,
  cardsConfig as config,
} from '../config';
import { MeshStandardMaterial } from 'three';

export function Deck() {
  const { pickedCard } = useContext(RoomContext);

  const [{ rotationZ, position }, api] = useSpring(() => ({
    from: animation.idle,
  }));

  const backTexture = useTexture(config.backgroundUrl);
  const suitsTextures = useTexture(config.suits.map((item) => item.visualUrl));

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
