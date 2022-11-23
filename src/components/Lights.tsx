import { GroupProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export type LightsProps = GroupProps & {
  speed?: number;
  limit?: number;
};

export function Lights({ speed = 0, limit = 10, ...rest }: LightsProps) {
  const angleProjection = useRef<number>(0);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      // Project movement to circle and get movement direction from sin of rotation angle
      angleProjection.current = (angleProjection.current + speed) % (limit * 2);

      const direction = Math.sign(
        Math.sin((Math.PI * angleProjection.current) / limit)
      );

      lightRef.current.position.x += speed * direction;
    }
  });

  return (
    <group {...rest}>
      <pointLight
        ref={lightRef}
        castShadow
        position={[0, 15, 0]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
      />

      <ambientLight intensity={0.2} />
    </group>
  );
}
