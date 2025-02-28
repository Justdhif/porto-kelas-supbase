import { createCanvas, loadImage } from "canvas";

export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await loadImage(imageSrc);
  const canvas = createCanvas(pixelCrop.width, pixelCrop.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/png");
}
