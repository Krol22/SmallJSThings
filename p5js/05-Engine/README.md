scene = kt.Engine.Scenes.createScene(sceneName) - adding scene;
scene.addEntities(array: Array / array of entities of scene /);

entity = new kt.Engine.Entity().addComponent(new Component())

system is an update function.

kt.Engine.Systems.push(System);

### Graphics System

let graphics = kt.Engine.Graphics;

graphics.init(canvasSelector, width, height) // init canvas
draw(entity with Position Component)
clear() // clear function


### TODO
* splash screen,
* game over screen,
* player destroyed effect,
* some basic UI,
* launch on cordova,
* fix bugs: player collision with line (only 1 segment of playerBlock is checked);
