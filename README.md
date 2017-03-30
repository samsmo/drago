# drago
Simple, free, draggable solution with throw-a-bility

# TO RUN

`npm i && npm start`

## Options
These are the default options `drago` comes configured with (you can override these).
```
const defaultOpts = {
  accel: { x: -0.001, y: -0.01 },
  vMax: { x: 80, y: 80 },
  vMin: { x: -80, y: -80 },
  drag: { x: 0.95, y: 0.85 },
  axis: { x: true, y: true },
};
```

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
