import THREE, { BasicShadowMap } from 'three';
import React, { useCallback, useState } from 'react';

import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import './styles.css';
import { App } from './App';
import { RoomContext } from './context/RoomContext';
import { cameraConfig } from './config';

const Root = () => {
  const [pickedCard, setPickedCard] = useState<number | null>(null);

  const handlePlay = useCallback(() => {
    if (pickedCard) {
    }
    setPickedCard((value) => {
      return value === null || value < 0 ? Math.floor(Math.random() * 12) : -1;
    });
  }, [pickedCard]);

  return (
    <RoomContext.Provider value={{ pickedCard }}>
      <Canvas
        shadows
        camera={{
          position: cameraConfig.position,
          fov: cameraConfig.fov,
        }}>
        <OrbitControls
          enabled={true}
          target={cameraConfig.target}
          rotateSpeed={cameraConfig.speed}
          minPolarAngle={cameraConfig.angle.polar.min}
          maxPolarAngle={cameraConfig.angle.polar.max}
          minAzimuthAngle={cameraConfig.angle.azimuth.min}
          maxAzimuthAngle={cameraConfig.angle.azimuth.max}
          minDistance={cameraConfig.distance.min}
          maxDistance={cameraConfig.distance.max}
        />

        <App />
      </Canvas>

      <div className="uiContainer">
        <button className="playButton" onClick={handlePlay}>
          Play
        </button>
      </div>
    </RoomContext.Provider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
