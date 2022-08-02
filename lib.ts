// Utility
export const pointAtDir = (
  source: Vector,
  dir: Vector,
  length: number
): Vector => ({
  x: source.x + dir.x * length,
  y: source.y + dir.y * length,
});

export const line = (
  ctx: CanvasRenderingContext2D,
  source: Vector,
  dir: Vector,
  length: number
) => {
  ctx.moveTo(source.x, source.y);
  const point = pointAtDir(source, dir, length);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
};

export const radToVec2 = (rad: Radian) => ({
  x: Math.cos(rad),
  y: -Math.sin(rad),
});

export const circle = (
  ctx: CanvasRenderingContext2D,
  source: Vector,
  radius: number
) => {
  ctx.beginPath();
  ctx.arc(source.x, source.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};

export const hit = (ctx: CanvasRenderingContext2D, source: Vector) => {
  ctx.beginPath();
  ctx.arc(source.x, source.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgb(255,0,0)';
  ctx.fill();
  ctx.closePath();
};

export const distance = (a: Vector, b: Vector) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
