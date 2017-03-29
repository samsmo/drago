/*!
 *
 * Flxr.js
 *
 * @author: samsmo
 *
 *
 */
(function ( factory ) {

    if ( typeof exports === "object" && typeof module !== "undefined" ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.Flxr = factory();
    }

})(function () {

    var Controller = require( "properjs-controller" );
    const loc = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const accel = { x: -0.001 };
    const vMax = { x: 80, y: 80 };
    const vMin = { y: -80, y: -80 };
    const drag = 0.95;
    let isMoving = false;
    let draggedTime = 0;
    let startTime = 0;
    let distance = 0;
    let startPos = 0;
    let min = 1;
    let max = 20;
    let element;
    let container;
    let startOffset = 0;

    function bindEvents() {
      console.log('called');
      element.addEventListener('mousedown', startDrag);
      container.addEventListener('mouseup', stopDrag);
      container.addEventListener('mouseout', killDrag);
      container.addEventListener('mousemove', handleDrag);
    }

    function startDrag(e) {
      e.preventDefault();
      isMoving = true;
      distance = 0;
      draggedTime = 0;
      startTime = 0;
      velocity.x = 0;
      startPos = null;
    }

    function stopDrag(e) {
      isMoving = false;
      if (!startPos) { return; }
      const endPos = e.clientX;
      const time = draggedTime - startTime;
      distance = endPos - startPos;
      velocity.x = distance / (time / 15);
    }

    function killDrag() {
      isMoving = false;
    }

    function handleDrag(e) {
      if (isMoving) {
        const tar = e.currentTarget;
        const mouseX = e.clientX;
        if (!startPos) {
          startOffset = mouseX - element.getBoundingClientRect().left;
          startPos = mouseX;
        }

        loc.x += ((mouseX - startOffset) - loc.x);
      }
    }

    function clamp(min, max, number) {
      return Math.max(min, Math.min(number, max));
    }

    function loop(timestamp) {
      if (velocity.x !== 0 && !isMoving) {
        velocity.x = clamp(vMin.x, vMax.x, (velocity.x + accel.x) * drag);
        loc.x += velocity.x;

        const width = element.getBoundingClientRect().width;
        const paddedRight = container.getBoundingClientRect().width - width;
        const paddedLeft = container.getBoundingClientRect().left;

        if (loc.x >= paddedRight) {
          velocity.x = 0;
          loc.x = paddedRight;
        } else if( loc.x <= paddedLeft ) {
          velocity.x = 0;
          loc.x = paddedLeft;
        } else if ( velocity.x < 0.25 && velocity.x > -0.25) {
          velocity.x = 0;
        }
      }
      element.style.transform = `translate(${loc.x}px, ${loc.y}px)`;

      if (isMoving) {
        if (!startTime) { startTime = timestamp; }
        draggedTime = timestamp;
      }
      window.requestAnimationFrame(loop);
    }

    /**
     *
     * @constructor Flxr
     * @augments Controller
     * @requires Controller
     * @memberof! <global>
     *
     */
    var Flxr = function ( options ) {
        console.log( "Flxr", options );

        container = options.container;
        element = options.content;
        bindEvents();
        window.requestAnimationFrame(loop);
    };


    Flxr.prototype = new Controller();


    // Custom prototype methods go here


    return Flxr;

});
