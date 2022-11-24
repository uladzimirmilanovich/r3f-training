export const getCanvasElement = (
  width: number = 4,
  height: number = 4,
  resolution: number = 1,
) => {
  const canvas = document.createElement('canvas');

  canvas.width = width * resolution;
  canvas.height = height * resolution;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const context = canvas.getContext('2d')!;
  context.setTransform(resolution, 0, 0, resolution, 0, 0);

  return { canvas, context };
};
