# p5.collision2D

![banner](/banner.jpg)

rewrite of [p5.collide2D](https://github.com/bmoren/p5.collide2D) <br/> this project is a work in progress

[demo](https://aryan02420.github.io/p5.collision2D/demo/)

-----

### Supported Primitives

 - :green_circle:   point
 - :yellow_circle:  line
 - :green_circle:   box
 - :green_circle:   circle
 - :red_circle:     ellipse
 - :red_circle:     arc
 - :red_circle:     polygon
 - :red_circle:     triangle
 - :red_circle:     capsule


### Supported Collision Types

|               | point         | line          | box           | circle        | ellipse       | arc           | polygon       | triangle      | capsule       |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| point         |:green_circle: |:green_circle: |:green_circle: |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| line          |:green_circle: |:green_circle: |:green_circle: |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| box           |:green_circle: |:green_circle: |:green_circle: |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
| circle        |:green_circle: |:green_circle: |:green_circle: |:green_circle: |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |:red_circle:   |
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
let point1 = c2d.collisionPrimitive('POINT', x: number, y: number)
let point2 = c2d.collisionPrimitive('POINT', position: p5.Vector)

// properties
collisionPoint.center: p5.Vector
collisionPoint.x: number
collisionPoint.y: number
```

###### Line

```
let line1 = c2d.collisionPrimitive('LINE', x1: number, y1: number, x2: number, y2: number)
let line2 = c2d.collisionPrimitive('LINE', start: p5.Vector, end: p5.Vector)

// properties
collisionLine.start: p5.Vector
collisionLine.end: p5.Vector
collisionLine.x1: number
collisionLine.y1: number
collisionLine.x2: number
collisionLine.y2: number
```

###### Box

```
let box1 = c2d.collisionPrimitive('BOX', cx: number, cy: number, w: number, h: number)
let box2 = c2d.collisionPrimitive('BOX', center: p5.Vector, size: p5.Vector)

// properties
collisionBox.center: p5.Vector
collisionBox.size: p5.Vector
collisionBox.width: number
collisionBox.height: number
collisionBox.cx: number
collisionBox.cy: number
```

###### Circle

```
let circle1 = c2d.collisionPrimitive('CIRCLE', x: number, y: number, r: number)
let circle2 = c2d.collisionPrimitive('CIRCLE', center: p5.Vector, radius: number)

// properties
collisionCircle.center: p5.Vector
collisionCircle.radius: number
collisionCircle.diameter: number
collisionCircle.cx: number
collisionCircle.cy: number
```

##### Checking Collisions

```
c2d.colliding(obj1: any, obj2: any, [margin: float]): boolean
```

##### Drawing Hitboxes

```
c2d.drawCollisionOverlays(): void
```

#### Usage in p5 Instance Mode

```js
let sketch = function(p) {
  let c2d = new Collision2D(p)
  let box1

  p.setup = function() {
    p.createCanvas(200, 200)
    box1 = c2d.collisionPrimitive('BOX', 100,150,100,50)
  }

  p.draw = function() {
    p.background(200)
    c2d.drawCollisionOverlays()
  }
}

let myp5 = new p5(sketch)
```
