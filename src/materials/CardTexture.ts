import { CanvasTexture, Texture } from 'three';
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
    const canvasWidth = width * 256;
    const canvasHeight = height * 256;
    const { canvas, context } = getCanvasElement(canvasWidth, canvasHeight);

    super(canvas);

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    if (suit) {
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.font = `Bold ${width * 64}px Arial`;
      context.fillStyle = suit.color;
      context.fillText(symbol as string, width * 16, width * 16);

      const image = textures[suit.id]?.source?.data;

      if (image) {
        const scale = 64 / image.width;

        const imageWidth = image.width * scale;
        const imageHeight = image.height * scale;

        const dx = (canvasWidth - imageWidth) / 2;
        const dy = (canvasHeight - imageHeight) / 2;

        context.drawImage(image, dx, dy, imageWidth, imageHeight);
      }
    }
  }
}
