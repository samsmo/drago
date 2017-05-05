# drago
Simple, free, draggable solution with throw-a-bility

### How to initialize.

```
  const $container = document.querySelector('.js-drag-container');
  const $content   = $container.querySelector('.js-drag-content');
  const instance   = new Drago($content, $container);
```

### Et tu, brute?
To stop the RAF / Draggability of drago:

```
  instance.kill();
```

#### Dev notes
- Options were removed in favor of simplicity. But very basic options will be added back once the overall refactor is complete (DOM mouse events are quite terrible).
