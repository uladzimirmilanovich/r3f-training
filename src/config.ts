import { Vector3 } from 'three';
import clubsVisualUrl from './assets/cards/suits/clubs.svg';
import diamondsVisualUrl from './assets/cards/suits/diamonds.svg';
import heartsVisualUrl from './assets/cards/suits/hearts.svg';
import spadesVisualUrl from './assets/cards/suits/spades.svg';
import backgroundTextureUrl from './assets/cards/background.png';
import floorTexture from './assets/floor.jpg';
import wallTexture from './assets/wall.jpg';

export const cameraConfig = {
  position: new Vector3(2, 10, 2),
  target: new Vector3(-3, 3.25, -3),
  distance: {
    min: 5,
    max: 10,
  },
  speed: 0.25,
  angle: {
    azimuth: {
      min: Math.PI / 6,
      max: Math.PI / 3,
    },
    polar: {
      min: Math.PI / 6,
      max: Math.PI / 3,
    },
  },
  fov: 55,
};

export const cardsConfig = {
  total: 56,
  size: { width: 1, height: 1.45, thickness: 0.005 },
  backgroundUrl: backgroundTextureUrl,
  suits: [
    {
      id: 0,
      label: 'clubs',
      visualUrl: clubsVisualUrl,
      color: '#000000',
    },
    {
      id: 1,
      label: 'diamonds',
      visualUrl: diamondsVisualUrl,
      color: '#ff0000',
    },
    {
      id: 2,
      label: 'hearts',
      visualUrl: heartsVisualUrl,
      color: '#ff0000',
    },
    {
      id: 3,
      label: 'spades',
      visualUrl: spadesVisualUrl,
      color: '#000000',
    },
  ],
  symbols: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ],
};

export const cardsAnimationConfig = {
  idle: {
    rotationZ: 0,
    position: [0, cardsConfig.size.thickness * cardsConfig.total, 0],
  },
  reveal: [
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
  hide: [
    {
      position: [1.5, 1, 0],
    },
    {
      rotationZ: 0,
    },
    {
      position: [0, cardsConfig.size.thickness * cardsConfig.total, 0],
    },
  ],
};

export const stageConfig = {
  floorTextureUrl: floorTexture,
  wallTextureUrl: wallTexture,
};
