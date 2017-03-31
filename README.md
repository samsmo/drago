# drago
Simple, free, draggable solution with throw-a-bility

## Options
These are the default options `drago` comes configured with (you can override these).
```
const defaultOpts = {
  accel: { x: -0.001, y: -0.001 }, // acceleration
  vMax: { x: 80, y: 80 }, // maximum velocity values (for positive throws)
  vMin: { x: -80, y: -80 }, // minimum velocity values (for negative throws)
  drag: { x: 0.95, y: 0.85 }, // mess with these to get smoother / rougher throws
  axis: { x: true, y: true }, // Toggle these to lock draggability to one axis
  restrict: { x: 'opposite', y: 'contain' }, // type of container restriction
};
```
Types of restrict:
`opposite` // Currently lets you throw so that only 25% is viewable at the min , max.
`contain` // Keep the draggable item inside container
`none` // Let it be free. Probably not useful

### How to initialize.

```
  const $container = document.querySelector('.js-drag-container');
  const $content   = $container.querySelector('.js-drag-content');
  const instance   = new Drago($content, $container, {
    axis: { x: false, y: true }
    drag: { x: 0.95, y: 0.5 },
    // ...etc
  } )
```

### Et tu, brute?
To stop the RAF / Draggability of drago:

```
  instance.kill();
```
