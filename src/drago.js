/*!
 *
 * Flxr.js
 *
 * @author: samsmo
 *
 *
 */
import { autobind } from 'core-decorators';

const defaultOpts = {
  accel: { x: -0.001, y: -0.01 },
  vMax: { x: 80, y: 80 },
  vMin: { x: -80, y: -80 },
  drag: { x: 0.95, y: 0.85 },
  axis: { x: true, y: true },
  bounds: { x: true, y: true },
  restrict: { x: 'opposite', y: 'contain' },
};

const defaults = {
  _isMoving: false,
  _draggedTime: 0,
  _startTime: 0,
  _startPos: null,
  _startOffset: 0
};

const opts = Object.assign({}, defaultOpts);

// Updateable vectors only.
const vectors = {
  loc: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
}

function clamp(min, max, number) {
  return Math.max(min, Math.min(number, max));
}

export default class Drago {
  constructor(el, container, options) {
    this._velocity = vectors.velocity;
    this._loc = vectors.loc;

    this._opts = Object.assign(opts, options);
    this._el = el;
    this._container = container;

    this._setDefaults();
    this._bindEvents();
    this._init();
  }

  _init() {
    setTimeout(() => {
      this._el_rect = this._el.getBoundingClientRect();
      this._container_rect = this._container.getBoundingClientRect();
    }, 0);
    this._loop();
  }

  _setDefaults() {
    Object.assign(this, defaults);
  }

  _bindEvents() {
   this._el.addEventListener('mousedown', this._startDrag);
   this._el.addEventListener('mouseup', this._stopDrag);
   this._el.addEventListener('touchstart', this._startDrag);
   this._el.addEventListener('touchend', this._stopDrag);
   this._container.addEventListener('mouseout', this._killDrag);
   this._container.addEventListener('mousemove', this._handleDrag);
   this._container.addEventListener('touchmove', this._handleDrag);
 }

 @autobind
 _startDrag(e) {
   e.preventDefault();
   this._setDefaults();
   this._isMoving = true;
 }

 @autobind
 _handleDrag(e) {
   if (this._isMoving) {
     const clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
     const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;
     if (!this._startPos) {
       const rect = this._el.getBoundingClientRect();
       const x = clientX - rect.left;
       const y = clientY - rect.top;
       this._startOffset = {x, y};
       this._startPos = { x: clientX, y: clientY };
     }

     if (this._opts.axis.x) this._loc.x += ((clientX - this._startOffset.x) - this._loc.x);
     if (this._opts.axis.y) this._loc.y += ((clientY - this._startOffset.y) - this._loc.y);
   }
 }

 @autobind
 _stopDrag(e) {
   if (!this._startPos) { return; }
   const clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
   const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;

   const time = (this._draggedTime - this._startTime) / 15;
   const xDistance = clientX - this._startPos.x;
   const yDistance = clientY - this._startPos.y;

   this._velocity.x = xDistance / time;
   this._velocity.y = yDistance / time;

   this._killDrag();
 }

 @autobind
 _killDrag() {
   this._isMoving = false;
 }

@autobind
bound(coord, boundMax, boundMin) {
  let value = coord;
  if(coord >= boundMax) {
   value = boundMax;
  } else if (coord <= boundMin) {
   value = boundMin;
  }

  return value;
 }

 @autobind
 checkBounds() {
   const width = this._el_rect.width;
   const height = this._el_rect.height;
   let test;

   if (this._opts.axis.x && this._opts.bounds.x) {
     if (this._opts.restrict === 'contain') {
       const rightBound = this._container_rect.width - width;
       const leftBound = this._container_rect.left;

       test = this.bound(this._loc.x, rightBound, leftBound);
     } else if (this._opts.restrict.x === 'opposite') {
       const left = this._container_rect.left - (width * .75);
       const right = this._container_rect.width - (width * .25);

       test = this.bound(this._loc.x, right, left);
     }

     if ( test !== this._loc.x ) {
       this._velocity.x = 0;
       this._loc.x = test;
     }
   }

   if (this._opts.axis.y && this._opts.bounds.y) {
     if (this._opts.restrict === 'contain') {
       const top = this._container_rect.top;
       const bottom = this._container_rect.height - height;

       test = this.bound(this._loc.y, bottom, top);
     } else if (this._opts.restrict === 'opposite') {
       const top = this._container_rect.top - (height * .75);
       const bottom = this._container_rect.height - (height * .25);

       test = this.bound(this._loc.y, bottom, top);
     }

     if ( test !== this._loc.y ) {
       this._velocity.y = 0;
       this._loc.y = test;
     }
   }
 }

 @autobind
 _loop(timestamp) {
   if ((this._velocity.x !== 0 || this._velocity.y !== 0) && !this._isMoving) {
     this._velocity.x = clamp(this._opts.vMin.x, this._opts.vMax.x, (this._velocity.x + this._opts.accel.x) * this._opts.drag.x);
     this._velocity.y = clamp(this._opts.vMin.y, this._opts.vMax.y, (this._velocity.y + this._opts.accel.y) * this._opts.drag.y);
     if (this._opts.axis.x) this._loc.x += this._velocity.x;
     if (this._opts.axis.y) this._loc.y += this._velocity.y;
     if (this._velocity.y < 0.1 && this._velocity.y > -0.1) this._velocity.y = 0;
     if (this._velocity.x < 0.1 && this._velocity.x > -0.1) this._velocity.x = 0;
     this.checkBounds();
   }

   this._el.style.transform = `translate(${this._loc.x}px, ${this._loc.y}px)`;

   if (this._isMoving) {
     if (!this._startTime) { this._startTime = timestamp; }
     this._draggedTime = timestamp;
   }

   this._animation_id = window.requestAnimationFrame(this._loop);
 }

 kill() {
   this._el.removeEventListener('mousedown', this._startDrag);
   this._el.removeEventListener('mouseup', this._stopDrag);
   this._el.removeEventListener('touchstart', this._startDrag);
   this._el.removeEventListener('touchend', this._stopDrag);
   this._container.removeEventListener('mouseout', this._killDrag);
   this._container.removeEventListener('mousemove', this._handleDrag);
   this._container.removeEventListener('touchmove', this._handleDrag);

   window.cancelAnimationFrame(this._animation_id);
 }
}
