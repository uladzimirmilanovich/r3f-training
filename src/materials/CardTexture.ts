import { CanvasTexture, Texture } from 'three';
import { cardsConfig } from '../config';
import { TCardSuit, TCardSymbol } from '../types/Card';
import { getCanvasElement } from '../utils/canvas';

export class CardTexture extends CanvasTexture {
  constructor(
    width: number,
    height: number,
    suit?: TCardSuit,
    symbol?: TCardSymbol,
    textures: Texture[] = [],
  ) {
    const canvasWidth = width * cardsConfig.textureSize.baseResolution;
    const canvasHeight = height * cardsConfig.textureSize.baseResolution;
    const { canvas, context } = getCanvasElement(canvasWidth, canvasHeight);

    super(canvas);

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    if (suit) {
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.font = `Bold ${width * cardsConfig.textureSize.symbol}px Arial`;
      context.fillStyle = suit.color;
      context.fillText(
        symbol as string,
        width * cardsConfig.textureSize.offset,
        width * cardsConfig.textureSize.offset,
      );

      const image = textures[suit.id]?.source?.data;

      if (image) {
        const scale = cardsConfig.textureSize.symbol / image.width;

        const imageWidth = image.width * scale;
        const imageHeight = image.height * scale;

        const dx = (canvasWidth - imageWidth) / 2;
        const dy = (canvasHeight - imageHeight) / 2;

        context.drawImage(image, dx, dy, imageWidth, imageHeight);
      }
    }
  }
}
