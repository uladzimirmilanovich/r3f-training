import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { RoomContext } from "../context/RoomContext";
import { animated, AnimationProps, useSpring } from "@react-spring/three";
import { Center, Html, useTexture } from "@react-three/drei";

import backTextureUrl from "../assets/cards/tile000.png";
import frontTextureUrl from "../assets/cards/tile001.png";
import { Vector3 } from "@react-three/fiber";
import { CardTemplate, CardTemplateSuits } from "./CardTemplate";

const cards = [
  {
    id: "1",
    backTextureUrl,
    frontTextureUrl: import("../assets/cards/tile001.png"),
  },
  {
    id: "2",
    backTextureUrl,
    frontTextureUrl: import("../assets/cards/tile003.png"),
  },
  {
    id: "3",
    backTextureUrl,
    frontTextureUrl: import("../assets/cards/tile003.png"),
  },
  {
    id: "4",
    backTextureUrl,
    frontTextureUrl: import("../assets/cards/tile033.png"),
  },
  {
    id: "5",
    backTextureUrl,
    frontTextureUrl: import("../assets/cards/tile045.png"),
  },
];

const revealAnimation = {
  to: [
    {
      position: [0, 1, 0],
    },
    {
      rotationZ: -Math.PI,
    },
    {
      position: [1.5, 0, 0],
    },
  ],
};

const hideAnimation = {
  duration: 500,
  to: [
    {
      position: [1.5, 1, 0],
    },
    {
      rotationZ: 0,
    },
    {
      position: [0, cards.length * 0.01, 0],
    },
  ],
};

export function Deck() {
  const { pickedCard } = useContext(RoomContext);
  const [{ rotationZ, position }, api] = useSpring(
    () => ({
      config: { duration: 500 },
      from: {
        rotationZ: 0,
        position: [0, cards.length * 0.01, 0],
      },
    }),
    [pickedCard]
  );

  const backTexture = useTexture(backTextureUrl);
  const frontTexture = useTexture(frontTextureUrl);

  useEffect(() => {
    if (pickedCard != null) {
      console.log(pickedCard);
      api.start(pickedCard >= 0 ? revealAnimation : hideAnimation);
    }
  }, [pickedCard]);

  return (
    <group rotation={[0, Math.PI / 2, 0]} position={[0, 0.01, 0]}>
      <Card
        position={[0, 0.01, 0]}
        backTexture={backTexture}
        frontTexture={frontTexture}
      />

      {/* <CardTemplate suit={CardTemplateSuits.Clubs} symbol="A" /> */}

      <animated.group
        rotation-x={rotationZ}
        position={position as unknown as Vector3}
      >
        <Card
          label={pickedCard && pickedCard >= 0 ? String(pickedCard) : ""}
          backTexture={backTexture}
          frontTexture={frontTexture}
        />
      </animated.group>
    </group>
  );
}
