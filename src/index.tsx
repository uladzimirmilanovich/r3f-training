import THREE, { BasicShadowMap } from 'three';
import React, { useCallback, useState } from 'react';

import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import './styles.css';
import { App } from './App';
import { RoomContext } from './context/RoomContext';
import { cameraConfig } from './config';
import { getRandomOutcome } from './utils/outcome';
import { isEmpty } from './utils/helper';
import { TCard } from './types/Card';

const Root = () => {
  const [pickedCard, setPickedCard] = useState<TCard>(null);

  const handlePlay = useCallback(() => {
    setPickedCard((value) => {
      // TODO: Move this part to 'backend mock`
      return value === null || !value.isShown
        ? getRandomOutcome()
        : { ...value, key: '', isShown: false };
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
          enablePan={false}
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
