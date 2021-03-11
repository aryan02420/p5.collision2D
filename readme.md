# p5.collision2D

rewrite of [p5.collide2D](https://github.com/bmoren/p5.collide2D)

-----

### Supported Primitives

 - :green_circle:   point
 - :red_circle:     line
 - :green_circle:  box
 - :red_circle:     circle
 - :red_circle:     ellipse
 - :red_circle:     arc
 - :red_circle:     polygon
 - :red_circle:     triangle
 - :red_circle:     capsule


### Suported Collision Types

|               | point         | line          | box           | circle        | ellipse       | arc           | polygon       | triangle      | capsule       |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| point         |:green_circle: |:red_circle:   |:green_circle:|:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| line          |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| box           |:green_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| circle        |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| ellipse       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| arc           |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| polygon       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| triangle      |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| capsule       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |

____

### Reference

##### Instanciate the library

```ts
let c2d = new Collision2D()
```
##### Creating Primitives

###### Point

```ts
let point1 = new c2d.collisionPoint(x: float, y: float)
let point2 = new c2d.collisionPoint(position: p5.Vector)

// properties
collisionPoint.pos: p5.Vector
```

###### Box

```ts
let box1 = new c2d.collisionBox(x1: float, y1: float, x2: float, y2: float)
let box2 = new c2d.collisionBox(position1: p5.Vector, position2: p5.Vector)

// properties
collisionBox.center: p5.Vector
collisionBox.width: number
collisionBox.height: number
collisionBox.size: p5.Vector
```

###### Shorthand

```ts
let obj = new c2d.collisionPrimitive(type: string, [...args])
// where type is one of 
// POINT, BOX
// args will be passed to the correct constructor
```

##### Checking Collisions

###### Point-Point

```ts
c2d.collidingPointPoint(p1: collisionPoint, p2: collisionPoint, margin: float) -> boolean
```

###### Shorthand

```ts
c2d.colliding(o1: any, o2: any, margin: float) -> boolean
// will find the type of collision
// and call the appropriate method
```

##### Drawing Hitboxes

```ts
c2d.drawCollisionOverlays()
```