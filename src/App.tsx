import React from "react";
import { Room } from "./components/Room";
import floorTexture from "./assets/floor.jpg";
import wallTexture from "./assets/wall.jpg";

export function App() {
  return <Room wallTextureUrl={wallTexture} floorTextureUrl={floorTexture} />;
}
