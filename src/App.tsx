import React from 'react';
import { Room } from './components/Room';
import { stageConfig } from './config';

export function App() {
  return (
    <Room
      wallTextureUrl={stageConfig.wallTextureUrl}
      floorTextureUrl={stageConfig.floorTextureUrl}
    />
  );
}
