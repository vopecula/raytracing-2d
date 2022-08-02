// Import stylesheets
import './style.css';
import { line, radToVec2, distance, circle, pointAtDir, hit } from './lib';

// Write Javascript code!
let canvas: HTMLCanvasElement = document.getElementById(
  'canvas'
) as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(230,230,230)';

// Globals
const _minTreshold = 0.1;
const _maxTreshold = 600;
const _hitTreshold = 1;
const maxSteps = 100;
const _cameraRays = 30;
const showOnlyHits = true;

// Target circle
const circlePos: Vector = { x: 600, y: 300 };

ctx.beginPath();
ctx.arc(circlePos.x, circlePos.y, 50, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();

// Camera
const camPos: Vector = { x: 100, y: 300 };
const camDir: Radian = 0;
const camViewAngle: Radian = Math.PI / 11;
line(ctx, camPos, radToVec2(camDir + camViewAngle / 2), 800);
line(ctx, camPos, radToVec2(camDir - camViewAngle / 2), 800);

// Rays
const rayTracer = (startPos: Vector, direction: Radian) => {
  let lastDistance = _maxTreshold;
  let position = { ...startPos };
  let smallestDistancePoint = null;
  let isHit = false;
  for (let i = 0; i < maxSteps; i++) {
    const dist = distance(circlePos, position) - 50;
    const p = pointAtDir(position, radToVec2(direction), dist);
    if (dist <= _maxTreshold && dist > 0) {
      if (!showOnlyHits) {
        line(ctx, position, radToVec2(direction), dist);
        circle(ctx, position, dist);
        circle(ctx, p, 4);
      }
      position = p;
      if (lastDistance > dist) {
        lastDistance = dist;
        smallestDistancePoint = p;
      }
      if (dist < _hitTreshold) isHit = true;
    }
  }
  if (isHit) hit(ctx, smallestDistancePoint);
};

for (let i = 0; i < _cameraRays; i++)
  rayTracer(
    camPos,
    camDir + (camViewAngle / 2 - (camViewAngle / _cameraRays) * i)
  );
