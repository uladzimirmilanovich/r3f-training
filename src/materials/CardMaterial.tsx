import React, { forwardRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AnimatedShaderMaterial } from './AnimatedShaderMaterial';
import { shaderConfig } from '../shaders/CardBackgroundShaderConfig';

type CardMaterialType = JSX.IntrinsicElements['shaderMaterial'] & {
  time?: number;
};

export type CardMaterialProps = CardMaterialType & {
  speed?: number;
};

export const useCardMaterial = (speed: number = 1) => {
  const material = useMemo(() => {
    return new AnimatedShaderMaterial(shaderConfig);
  }, []);

  useFrame((state) => {
    if (material) {
      material.time = state.clock.getElapsedTime() * speed;
    }
  });

  return material;
};

export const CardMaterial = forwardRef(
  ({ speed = 1, ...props }: CardMaterialProps, ref) => {
    const material = useCardMaterial();

    return (
      <primitive object={material} ref={ref} attach="material" {...props} />
    );
  },
);
