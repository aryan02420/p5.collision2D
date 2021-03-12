function Collision2D(p) {

  this.sketch = p || window
  this.objects = []
  let THIS = this

  this.collisionPrimitive = function (type, ...args) {
    switch (type.toString().toUpperCase()) {
      case 'POINT':
        return new THIS._collisionPoint(THIS, ...args)
      case 'BOX':
        return new THIS._collisionBox(THIS, ...args)
      default:
        throw 'unknown primitive type'
    }
  }

  this.colliding = function(obj1, obj2, margin) {
    let typeOfCollision = obj1.type + obj2.type
    switch (typeOfCollision) {
      case 'POINTPOINT':
        return THIS._collidingPointPoint(obj1, obj2, margin)
      case 'POINTBOX':
        return THIS._collidingPointBox(obj1, obj2, margin)
      case 'BOXPOINT':
        return THIS._collidingPointBox(obj2, obj1, margin)
      case 'BOXBOX':
        return THIS._collidingBoxBox(obj2, obj1, margin)
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

Collision2D.prototype._collisionPoint = class {

  type = 'POINT'

  constructor(parent, ...args) {
    this.parent = parent
    if (args.length === 1 && args[0] instanceof p5.Vector) {
      this._position = args[0]
    } else if (args.length === 2) {
      this._position = this.parent.sketch.createVector(args[0], args[1])
    } else {
      throw 'unknown signature in constructor collisonPoint'
    }
    this.parent.objects.push(this)
  }

  get pos() {
    return this._position
  }  
  get x() {
    return this._position.x
  }  
  get y() {
    return this._position.y
  }

  set pos(vec) {
    if (vec instanceof p5.Vector) {
      this._position = vec
      return
    }
    throw 'collisionPoint.pos accepts only p5.Vector'
  }  
  set x(x) {
    this._position.x = x
  }  
  set y(y) {
    this._position.y = y
  }

  draw = function() {
    this.parent.sketch.circle(this.pos.x, this.pos.y, 2)
    this.parent.sketch.circle(this.pos.x, this.pos.y, 5)
  }
}

Collision2D.prototype._collisionBox = class {

  type = 'BOX'

  constructor(parent, ...args) {
    this.parent = parent
    if (args.length === 2 && args[0] instanceof p5.Vector && args[1] instanceof p5.Vector) {
      this._center = args[0]
      this._size = args[1]
    } else if (args.length === 4) {
      this._center = this.parent.sketch.createVector(args[0], args[1])
      this._size = this.parent.sketch.createVector(args[2], args[3])
    } else {
      throw 'unknown signature in constructor collisonBox'
    }
    this.parent.objects.push(this)
  }

  get center() {
    return this._center
  }
  get size() {
    return this._size
  }
  get cx() {
    return this._center.x
  }
  get cy() {
    return this._size
  }
  get width() {
    return this._center.y
  }
  get height() {
    return this._center.y
  }
  get _xmin() {
    return this._center.x - this._size.x/2
  }
  get _xmax() {
    return this._center.x + this._size.x/2
  }
  get _ymin() {
    return this._center.y - this._size.y/2
  }
  get _ymax() {
    return this._center.y + this._size.y/2
  }

  set center(vec) {
    if (vec instanceof p5.Vector) {
      this._center = vec
      return
    }
    throw 'collisionBox.center accepts only p5.Vector'
  }
  set size(vec) {
    if (vec instanceof p5.Vector) {
      this._size = vec
      return
    }
    throw 'collisionBox.size accepts only p5.Vector'
  }
  set cx(x) {
    this._center.x = x
  }
  set cy(y) {
    this._center.y = y
  }
  set width(w) {
    this._size.x = w
  }
  set height(h) {
    this._size.y = h
  }

  draw = function() {
    this.parent.sketch.rectMode(CENTER);
    this.parent.sketch.rect(this.center.x, this.center.y, this.size.x, this.size.y)
  }

}


Collision2D.prototype._collidingPointPoint = function(point1, point2, margin) {
  margin = margin || 2
  return (point1.pos.dist(point2.pos) <= margin)
}

Collision2D.prototype._collidingPointBox = function(point, box) {
  return (
    point.pos.x >= box._xmin &&
    point.pos.x <= box._xmax &&
    point.pos.y >= box._ymin &&
    point.pos.y <= box._ymax
  )
}

Collision2D.prototype._collidingBoxBox = function(box1, box2) {
  return (
    box1._xmax >= box2._xmin &&
    box1._xmin <= box2._xmax &&
    box1._ymax >= box2._ymin &&
    box1._ymin <= box2._ymax
  )
}