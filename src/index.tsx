import THREE, { BasicShadowMap } from "three";
import React, { useCallback, useState } from "react";

import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import "./styles.css";
import { App } from "./App";
import { RoomContext } from "./context/RoomContext";

const Root = () => {
  const [pickedCard, setPickedCard] = useState<number | null>(null);

  const handlePlay = useCallback(() => {
    setPickedCard((value) => {
      return value === null || value < 0 ? Math.floor(Math.random() * 12) : -1;
    });
  }, []);

  return (
    <RoomContext.Provider value={{ pickedCard }}>
      <Canvas
        shadows
        camera={{
          position: [2, 10, 2],
          fov: 55,
        }}
      >
        <OrbitControls enabled={true} target={[-3, 3.25, -3]} />

        <App />

        {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper> */}
      </Canvas>

      <div className="uiContainer">
        <button className="playButton" onClick={handlePlay}>
          Play
        </button>
      </div>
    </RoomContext.Provider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
