import Vector from '../classes/Vector';

export function eToVec(e) {
  const clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
  const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;

  return new Vector(clientX, clientY);
}
