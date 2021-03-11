function Collision2D(p) {

  this.sketch = p || window
  this.objects = []
  let THIS = this

  this.collisionPoint = class {
    type = 'POINT'
    constructor(...args) {
      if (args.length === 1 && args[0] instanceof p5.Vector) {
        this.position = args[0]
      } else if (args.length === 2) {
        this.position = THIS.sketch.createVector(args[0], args[1])
      } else {
        throw 'unknown signature in constructor collisonPoint'
      }
      THIS.objects.push(this)
    }
    get pos() {
      return this.position
    }
    set pos(vec) {
      if (vec instanceof p5.Vector) {
        this.position = vec
        return
      }
      throw 'collosionPoint.pos accepts only p5.Vector'
    }
    draw = function() {
      THIS.sketch.circle(this.position.x, this.position.y, 2)
      THIS.sketch.circle(this.position.x, this.position.y, 5)
    }
  }
  this.collisionBox = class {
    type = 'BOX'
    constructor(...args) {
      if (args.length === 2 && args[0] instanceof p5.Vector && args[1] instanceof p5.Vector) {
        this.from = args[0]
        this.to = args[1]
      } else if (args.length === 4) {
        this.from = THIS.sketch.createVector(args[0], args[1])
        this.to = THIS.sketch.createVector(args[2], args[3])
      } else {
        throw 'unknown signature in constructor collisonBox'
      }
      THIS.objects.push(this)
    }
    get center() {
      return p5.Vector.add(this.from, this.to).mult(0.5)
    }
    get width() {
      return THIS.sketch.abs(this.from.x - this.to.x)
    }
    get height() {
      return THIS.sketch.abs(this.from.y - this.to.y)
    }
    set center(vec) {
      if (vec instanceof p5.Vector) {
        let currentpos = this.center
        let displacement = vec.sub(currentpos)
        this.from.add(displacement)
        this.to.add(displacement)
        return
      }
      throw ' collosionPoint.pos accepts only p5.Vector'
    }
    set width(w) {

    }
    draw = function() {
      THIS.sketch.rectMode(CORNERS);
      THIS.sketch.rect(this.from.x, this.from.y, this.to.x, this.to.y)
    }
  }

  this.collisionPrimitive = function (type, ...args) {
    switch (type.toString().toUpperCase()) {
      case 'POINT':
        return new THIS.collisionPoint(...args)
      case 'BOX':
        return new THIS.collisionBox(...args)
      default:
        throw 'unknown primitive type'
    }
  }

  this.collidingPointPoint = function(point1, point2, margin) {
    margin ||= 2
    return (point1.position.dist(point2.position) <= margin)
  }
  
  this.collidingPointBox = function(point1, point2, margin) {
    return false
  }

  this.colliding = function(obj1, obj2, margin) {
    let typeOfCollision = obj1.type + obj2.type
    switch (typeOfCollision) {
      case 'POINTPOINT':
        return THIS.collidingPointPoint(obj1, obj2, margin)
      case 'POINTLINE':
        return THIS.collidingPointLine(obj1, obj2, margin)
      case 'POINTBOX':
        return THIS.collidingPointBox(obj1, obj2, margin)
      default:
        throw 'unknown collision type'
  
    }
  }

  this.drawCollisionOverlays = function(){
    THIS.sketch.push()
    THIS.sketch.blendMode(DIFFERENCE)
    THIS.sketch.noFill()
    THIS.sketch.stroke(255)
    for (const obj of THIS.objects) {
      obj.draw()
    }
    THIS.sketch.pop()
  }
}