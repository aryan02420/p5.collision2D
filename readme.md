# p5.collision2D

rewrite of [p5.collide2D](https://github.com/bmoren/p5.collide2D)
this project is a work in progress, the api is always changing

-----

### Supported Primitives

 - :green_circle:   point
 - :red_circle:     line
 - :green_circle:   box
 - :red_circle:     circle
 - :red_circle:     ellipse
 - :red_circle:     arc
 - :red_circle:     polygon
 - :red_circle:     triangle
 - :red_circle:     capsule


### Suported Collision Types

|               | point         | line          | box           | circle        | ellipse       | arc           | polygon       | triangle      | capsule       |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| point         |:green_circle: |:red_circle:   |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| line          |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| box           |:green_circle: |:red_circle:   |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| circle        |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| ellipse       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| arc           |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| polygon       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| triangle      |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| capsule       |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |

____

### Reference

##### Instanciate the library

```
let c2d = new Collision2D()
```
##### Creating Primitives

###### Point

```
let point1 = c2d.collisionPoint('POINT', x: number, y: number)
let point2 = c2d.collisionPoint('POINT', position: p5.Vector)

// properties
collisionPoint.pos: p5.Vector
collisionPoint.x: number
collisionPoint.y: number
```

###### Box

```
let box1 = c2d.collisionBox('BOX', x1: float, y1: float, x2: float, y2: float)
let box2 = c2d.collisionBox('BOX', position1: p5.Vector, position2: p5.Vector)

// properties
collisionBox.center: p5.Vector
collisionBox.size: p5.Vector
collisionBox.width: number
collisionBox.height: number
collisionBox.cx: number
collisionBox.cy: number
```

##### Checking Collisions

```
c2d.colliding(obj1: any, obj2: any, [margin: float]): boolean
```

##### Drawing Hitboxes

```
c2d.drawCollisionOverlays()
```