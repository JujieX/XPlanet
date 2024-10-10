# X-Planet
Flies have compound eyes, dogs are colorblind, and an eagle’s vision is comparable to a high-powered telescope... On this blue planet, have you ever wondered how other species perceive the world differently?

In X-Planet, players can control various dynamic characters and freely explore the planet from a first-person perspective.

# Demo
### [Planet Entry](https://jujiex.github.io/XPlanet/)

# Exploration Guide

Character Switch: Number keys 1, 2, 3...

Move Forward/Backward: WASD/Arrow Keys

Jump: Spacebar

Look Around: Mouse


# Features

### Scene
Built the 3D scene using React and Three.js, modularized scene elements (lights, planet, hero, etc.), and utilized refs and virtual DOM rendering to construct the Scene component.

### First-Person Controls
Implemented first-person controls (playerControls) using raycasting to simulate gravity. The Pointer Lock API locks the pointer upon entering the game interface, while keyboard and mouse events simulate character movement, jumping, and view changes on the planet's surface, with the camera inheriting the position and orientation of the parent node.

### Terrain
Created buffer geometry and generated random terrain using Perlin noise (referred to as ImprovedNoise in Three.js), applying multiple materials to the same geometry via array materials.

Designed tree models and distributed them randomly across the planet.

### Character Animation
Implemented models and effects for various characters, such as humans, rabbits, and fish, and added animation effects using Tween.js.

### Compatibility Detection
Performed WebGL compatibility checks during the page's initial state, displaying a pop-up message if compatibility issues are detected.


