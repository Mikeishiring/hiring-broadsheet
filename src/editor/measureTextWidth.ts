let measureCanvas: CanvasRenderingContext2D | null = null

export function measureTextWidth(text: string, font: string): number {
  if (!measureCanvas) {
    const canvas = document.createElement('canvas')
    measureCanvas = canvas.getContext('2d')!
  }

  measureCanvas.font = font
  return measureCanvas.measureText(text).width
}
