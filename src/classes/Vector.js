export default class Vector {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
