/*!
 *
 * Drago.js
 *
 * @author: samsmo
 *
 *
 */
import { autobind } from 'core-decorators';
import { eToVec } from './helpers/mouse';

import Dragger from './classes/Dragger';
import Vector from './classes/Vector';

let origin;
let destination;
let timer;
let startTime;
let startOffset;
let inertia = new Vector(0, 0);

export default class Drago {
  constructor(el, container, options) {
    setTimeout(() => {
      this.target = new Dragger(el, container, options);
      this.container = container;

      this.bindEvents();
      this.update();
    }, 0);
  }

  bindEvents() {
    this.target.el.addEventListener('mousedown', this.toggleDrag);
    this.target.el.addEventListener('mouseup', this.toggleDrag);
    this.container.addEventListener('mousemove', this.handleMove);
  }

  @autobind
  handleMove(e) {
    if(this.isMoving) {
      const mouseVec = eToVec(e);

      if(!startOffset) {
        const { top, left } = this.target.el.getBoundingClientRect();
        const attrs = new Vector(left, top);
        startOffset = mouseVec.copy();
        startOffset.sub(attrs);
      }

      mouseVec.sub(startOffset);
      mouseVec.sub(this.target.location);

      this.target.teleport(mouseVec);
    }
  }

  @autobind
  toggleDrag(e) {
    e.preventDefault();
    const mouseVec = eToVec(e);

    if (!this.isMoving) {
      origin = mouseVec;
      startTime = 0;
    } else {
      destination = mouseVec;
      startOffset = null;
      this.calcFinalVelocity();
    }

    this.isMoving = !this.isMoving;
  }

  calcFinalVelocity() {
    const delta = (timer - startTime) / 100;
    destination.sub(origin);
    destination.div(delta);
    inertia = destination.copy();
    this.target.applyForce(inertia);
  }

  @autobind
  update(timestamp) {
    this.target.update();
    this.target.draw();

    if (startTime === 0 && this.isMoving) { startTime = timestamp; }
    timer = timestamp;

    this._animation_id = window.requestAnimationFrame(this.update);
  }

  kill() {
    this.target.el.removeEventListener('mousedown', this.toggleDrag);
    this.target.el.removeEventListener('mouseup', this.toggleDrag);
    this.container.removeEventListener('mousemove', this.handleMove);

    window.cancelAnimationFrame(this._animation_id);
  }
}
