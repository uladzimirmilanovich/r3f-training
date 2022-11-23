import React from "react";
import { useTexture, Center } from "@react-three/drei";
import { RepeatWrapping, Texture, Vector2 } from "three";
import { Table } from "./Table";
import { Floor } from "./Floor";
import { Wall } from "./Wall";
import { Lights } from "./Lights";
import { Deck } from "./Deck";

export type RoomProps = {
  floorTextureUrl: string;
  wallTextureUrl: string;
  scale?: number;
};

export function Room({
  wallTextureUrl,
  floorTextureUrl,
  scale = 20,
}: RoomProps) {
  const onLoad = (texture: Texture | Texture[]) => {
    if (texture instanceof Texture) {
      texture.repeat = new Vector2(scale, scale);
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
    }
  };

  const wallTexture = useTexture(wallTextureUrl, onLoad);
  const floorTexture = useTexture(floorTextureUrl, onLoad);

  return (
    <group>
      <Lights speed={0.05} limit={20} />

      <Center top>
        <Floor
          size={scale}
          texture={floorTexture}
          position={[scale / 2, 0, scale / 2]}
        />

        <Wall
          size={scale}
          texture={wallTexture}
          position={[scale / 2, scale / 2, 0]}
        />

        <Wall
          size={scale}
          texture={wallTexture}
          position={[0, scale / 2, scale / 2]}
          rotation={[0, Math.PI / 2, 0]}
        />

        <Table rotation={[0, -Math.PI / 4, 0]} position={[8, 0, 8]}>
          <Deck />
        </Table>
      </Center>
    </group>
  );
}
