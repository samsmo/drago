import Vector from './Vector';

const acceleration = new Vector(0, 0);
const velocity = new Vector(0, 0);
let location = new Vector(0, 0);
const drag = 0.95;
const mass = 5;

export default class Dragger {
  constructor(el, container, options) {
    this.el = el;
    this.bounds = container.getBoundingClientRect();

    this.dims = el.getBoundingClientRect();
  }

  applyForce(force) {
    const f = force.copy();
    f.div(mass);

    acceleration.add(f);
  }

  update() {
    velocity.add(acceleration);
    velocity.mult(drag);
    location.add(velocity);
    acceleration.mult(0);

    this.checkBounds();
  }

  get location() {
    return location;
  }

  teleport(vec) {
    location.add(vec);
  }

  checkBounds() {
    if((location.x >= (this.bounds.width - this.dims.width) || location.x <= 0)
       || (location.y <= 0 || location.y >= (this.bounds.height - this.dims.height))) {
      const spring = velocity.copy();
      spring.mult(-10.25);
      this.applyForce(spring);
    }
  }

  draw() {
    this.el.style.transform = `translate(${location.x}px, ${location.y}px)`;
  }
}
