# uiP3d

> Three dimension graphic interface weldkit component

## Installation

```bash
cd myproject
npm install ui-p3d
```

## API

### Events

* __initialized__: Fired after the scene has been initialized. It returns
the scene data with added instances uuid.
* __render__: Listener that renders the scene. Takes update data object as
argument.

### data-scene

Scene configuration data.

### data-subject

Subject refers to the point of view configuration, it
may include not only camera information but also
avatar data.

### data-display

Supported configuration parameters:

* __width__: In pixels
* __height__: In pixels
* __pixelRatio__: Canvas pixel ratio
* __perspective__(enum): Perspective type, default value `firstPerson`
