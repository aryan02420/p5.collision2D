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
      case 'CIRCLE':
        return new THIS._collisionCircle(THIS, ...args)
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
      case 'POINTCIRCLE':
        return THIS._collidingPointCircle(obj1, obj2, margin)
      case 'BOXPOINT':
        return THIS._collidingPointBox(obj2, obj1, margin)
      case 'BOXBOX':
        return THIS._collidingBoxBox(obj1, obj2, margin)
      case 'BOXCIRCLE':
        return THIS._collidingBoxCircle(obj1, obj2, margin)
      case 'CIRCLEPOINT':
        return THIS._collidingPointCircle(obj2, obj1, margin)
      case 'CIRCLEBOX':
        return THIS._collidingBoxCircle(obj2, obj1, margin)
      case 'CIRCLECIRCLE':
        return THIS._collidingCircleCircle(obj1, obj2, margin)
      default:
        throw 'unknown collision type'
  
    }
  }

  this.drawCollisionOverlays = function(){
    THIS.sketch.push()
    THIS.sketch.blendMode(THIS.sketch.DIFFERENCE)
    THIS.sketch.noFill()
    THIS.sketch.stroke(100)
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

  get center() {
    return this._position
  }  
  get x() {
    return this._position.x
  }  
  get y() {
    return this._position.y
  }

  set center(vec) {
    this._position.set(vec)
  }  
  set x(x) {
    this._position.x = x
  }  
  set y(y) {
    this._position.y = y
  }

  draw = function() {
    this.parent.sketch.line(this.x-2, this.y, this.x+2, this.y)
    this.parent.sketch.line(this.x, this.y-2, this.x, this.y+2)
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
    return this._center.y
  }
  get width() {
    return this._size.x
  }
  get height() {
    return this._size.y
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
    this._center.set(vec)
  }
  set size(vec) {
    this._size.set(vec)
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
    this.parent.sketch.rectMode(this.parent.sketch.CENTER);
    this.parent.sketch.rect(this.center.x, this.center.y, this.size.x, this.size.y)
  }

}

Collision2D.prototype._collisionCircle = class {

  type = 'CIRCLE'

  constructor(parent, ...args) {
    this.parent = parent
    if (args.length === 2 && args[0] instanceof p5.Vector) {
      this._center = args[0]
      this._radius = args[1]
    } else if (args.length === 3) {
      this._center = this.parent.sketch.createVector(args[0], args[1])
      this._radius = args[2]
    } else {
      throw 'unknown signature in constructor collisonCircle'
    }
    this.parent.objects.push(this)
  }

  get center() {
    return this._center
  }
  get radius() {
    return this._radius
  }
  get diameter() {
    return this._radius * 2
  }
  get cx() {
    return this._center.x
  }
  get cy() {
    return this._center.y
  }

  set center(vec) {
    this._center.set(vec)
  }
  set radius(r) {
    this._radius = r
  }
  set diameter(d) {
    this._radius = d / 2
  }
  set cx(x) {
    this._center.x = x
  }
  set cy(y) {
    this._center.y = y
  }

  draw = function() {
    this.parent.sketch.ellipseMode(this.parent.sketch.RADIUS);
    this.parent.sketch.ellipse(this.center.x, this.center.y, this.radius, this.radius)
  }

}


Collision2D.prototype._collidingPointPoint = function(point1, point2, margin) {
  margin = margin || 2
  return (
    point1.center.dist(point2.center) <= margin
  )
}

Collision2D.prototype._collidingPointBox = function(point, box) {
  return (
    point.x >= box._xmin &&
    point.x <= box._xmax &&
    point.y >= box._ymin &&
    point.y <= box._ymax
  )
}

Collision2D.prototype._collidingPointCircle = function(point, circle) {
  return (
    point.center.dist(circle.center) <= circle.radius
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

Collision2D.prototype._collidingBoxCircle = function(box, circle) {
  let tx = circle.cx
  let ty = circle.cy
  if (circle.cx < box._xmin) tx = box._xmin
  else if (circle.cx > box._xmax) tx = box._xmax
  if (circle.cy < box._ymin) ty = box._ymin
  else if (circle.cy > box._ymax) ty = box._ymax
  return (
    circle.center.dist(this.sketch.createVector(tx, ty)) <= circle.radius
  )
}

Collision2D.prototype._collidingCircleCircle = function(circle1, circle2) {
  return (
    circle1.center.dist(circle2.center) <= (circle1.radius + circle2.radius)
  )
}