// Import stylesheets
import './style.css';

// Write Javascript code!
let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(230,230,230)';

// Util
const pointAtDir = (source, dir, length) => ({
  x: source.x + dir.x * length,
  y: source.y + dir.y * length,
});

const line = (ctx, source, dir, length) => {
  ctx.moveTo(source.x, source.y);
  const point = pointAtDir(source, dir, length);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
};

const radToVec2 = (rad) => ({ x: Math.cos(rad), y: -Math.sin(rad) });

const circle = (ctx, source, radius) => {
  ctx.beginPath();
  ctx.arc(source.x, source.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};

const hit = (ctx, source) => {
  ctx.beginPath();
  ctx.arc(source.x, source.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgb(255,0,0)';
  ctx.fill();
  ctx.closePath();
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

// Globals
const _minTreshold = 0.1;
const _maxTreshold = 600;
const _hitTreshold = 1;
const maxSteps = 100;
const _cameraRays = 30;
const showOnlyHits = true;

// Target circle
const circlePos = { x: 600, y: 300 };

ctx.beginPath();
ctx.arc(circlePos.x, circlePos.y, 50, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();

// Camera
const camPos = { x: 100, y: 300 };
const camDir = 0;
const camViewAngle = Math.PI / 11;
line(ctx, camPos, radToVec2(camDir + camViewAngle / 2), 800);
line(ctx, camPos, radToVec2(camDir - camViewAngle / 2), 800);

// Rays
const rayTracer = (startPos, direction) => {
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
  rayTracer(camPos, camDir + (camViewAngle / 2 - (camViewAngle / _cameraRays) * i));
