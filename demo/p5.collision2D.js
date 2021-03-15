function Collision2D(p) {

  this.sketch = p || window
  this.layers = {}
  this.layers.DEFAULT = {
    objects: [],
    styles: {
      fill: false,
      stroke: 100,
      strokeweight: 0.6,
      blendmode: 'DIFFERENCE'
    }
  }
  let THIS = this

  this.createCollisionPrimitive = function (type, ...args) {
    switch (type.toString().toUpperCase()) {
      case 'POINT':
        return new THIS._collisionPoint(THIS, ...args)
      case 'LINE':
        return new THIS._collisionLine(THIS, ...args)
      case 'BOX':
        return new THIS._collisionBox(THIS, ...args)
      case 'CIRCLE':
        return new THIS._collisionCircle(THIS, ...args)
      default:
        throw 'unknown primitive type'
    }
  }

  this.addObjToLayer = function(obj, layer) {
    this.layers[layer] = this.layers[layer] || {}
    this.layers[layer].objects = this.layers[layer].objects || []
    this.layers[layer].objects = this.layers[layer].objects.concat(obj)
  }

  this.clearLayer = function(layer) {
    this.layers[layer] = this.layers[layer] || {}
    this.layers[layer].objects = []
  }

  this.setLayerStyle = function(layer, styles) {
    this.layers[layer] = this.layers[layer] || {}
    this.layers[layer].styles = styles
  }

  this.checkColliding = function(obj1, obj2, margin) {
    let typeOfCollision = obj1.type + obj2.type
    switch (typeOfCollision) {

      case 'POINTPOINT':
        return THIS._collidingPointPoint(obj1, obj2, margin)
      case 'POINTLINE':
        return THIS._collidingPointLine(obj1, obj2, margin)
      case 'POINTBOX':
        return THIS._collidingPointBox(obj1, obj2, margin)
      case 'POINTCIRCLE':
        return THIS._collidingPointCircle(obj1, obj2, margin)

      case 'LINEPOINT':
        return THIS._collidingPointLine(obj2, obj1, margin)
      case 'LINELINE':
        return THIS._collidingLineLine(obj1, obj2, margin)
      case 'LINEBOX':
        return THIS._collidingLineBox(obj1, obj2, margin)
      case 'LINECIRCLE':
        return THIS._collidingLineCircle(obj1, obj2, margin)

      case 'BOXPOINT':
        return THIS._collidingPointBox(obj2, obj1, margin)
      case 'BOXLINE':
        return THIS._collidingLineBox(obj2, obj1, margin)
      case 'BOXBOX':
        return THIS._collidingBoxBox(obj1, obj2, margin)
      case 'BOXCIRCLE':
        return THIS._collidingBoxCircle(obj1, obj2, margin)

      case 'CIRCLEPOINT':
        return THIS._collidingPointCircle(obj2, obj1, margin)
      case 'CIRCLELINE':
        return THIS._collidingLineCircle(obj2, obj1, margin)
      case 'CIRCLEBOX':
        return THIS._collidingBoxCircle(obj2, obj1, margin)
      case 'CIRCLECIRCLE':
        return THIS._collidingCircleCircle(obj1, obj2, margin)

      default:
        console.warn(`ignoring unknown collision type: ${typeOfCollision}`)
        return false
  
    }
  }

  this.getColliding = function(layer1, layer2) {
    layer1 = this.layers[layer1]?.objects || []
    layer2 = this.layers[layer2]?.objects || []
    let l1 = layer1.length
    let l2 = layer2.length
    let listOfColliding = []
    for (let i = 0; i < l1; i++) {
      for (let j = 0; j < l2; j++) {
        if (this.checkColliding(layer1[i], layer2[j])) {
          listOfColliding.push([layer1[i], layer2[j]])
        }        
      }      
    }
    return listOfColliding
  }

  this.drawCollisionOverlays = function(layer = 'DEFAULT'){
    THIS.sketch.push()
    layer = THIS.layers[layer] || {}
    let defaultstyles = Object.assign({}, THIS.layers.DEFAULT.styles)
    let layerstyles = Object.assign(defaultstyles, layer.styles || {})
    THIS.sketch.blendMode(THIS.sketch[layerstyles.blendmode])
    if (!layerstyles.fill) {
      THIS.sketch.noFill()
    } else {
      THIS.sketch.fill(layerstyles.fill)
    }
    if (!layerstyles.stroke) {
      THIS.sketch.noStroke()
    } else {
      THIS.sketch.stroke(layerstyles.stroke)
      THIS.sketch.strokeWeight(layerstyles.strokeweight)
    }
    let layerobjs = layer.objects || []
    for (const obj of layerobjs) {
      obj.draw()
    }
    THIS.sketch.pop()
  }
}

Collision2D.prototype._collisionPrimitive = class {

  type = 'NONE'

  constructor(parent) {
    this.parent = parent
    this.parent.addObjToLayer(this, 'DEFAULT')
  }

}

Collision2D.prototype._collisionPoint = class extends Collision2D.prototype._collisionPrimitive {

  type = 'POINT'

  constructor(parent, ...args) {
    super(parent)
    if (args.length === 1 && args[0] instanceof p5.Vector) {
      this._position = args[0]
    } else if (args.length === 2) {
      this._position = this.parent.sketch.createVector(args[0], args[1])
    } else {
      throw 'unknown signature in constructor collisonPoint'
    }
    this.parent.addObjToLayer(this, this.type)
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

Collision2D.prototype._collisionLine = class extends Collision2D.prototype._collisionPrimitive {

  type = 'LINE'

  constructor(parent, ...args) {
    super(parent)
    if (args.length === 2 && args[0] instanceof p5.Vector && args[1] instanceof p5.Vector) {
      this._start = args[0]
      this._end = args[0]
    } else if (args.length === 4) {
      this._start = this.parent.sketch.createVector(args[0], args[1])
      this._end = this.parent.sketch.createVector(args[2], args[3])
    } else {
      throw 'unknown signature in constructor collisonLine'
    }
    this.parent.addObjToLayer(this, this.type)
  }

  get start() {
    return this._start
  }  
  get x1() {
    return this._start.x
  }  
  get y1() {
    return this._start.y
  }
  get end() {
    return this._end
  }  
  get x2() {
    return this._end.x
  }  
  get y2() {
    return this._end.y
  } 
  get delta() {
    return p5.Vector.sub(this._end, this._start)
  } 
  get dx() {
    return this._end.y - this._start.x
  }  
  get dy() {
    return this._end.y - this._start.y
  }
  get angle() {
    return this.parent.sketch.atan2(this._end.y - this._start.y, this._end.x - this._start.x)
  }

  set start(vec) {
    this._start.set(vec)
  }  
  set x1(x) {
    this._start.x = x
  }  
  set y1(y) {
    this._start.y = y
  }
  set end(vec) {
    this.end.set(vec)
  }  
  set x2(x) {
    this.end.x = x
  }  
  set y2(y) {
    this.end.y = y
  }
  set angle(a) {
    console.warn('setting angle of line is not yet implemented')
  }

  draw = function() {
    this.parent.sketch.line(this.x1, this.y1, this.x2, this.y2)
  }

}

Collision2D.prototype._collisionBox = class extends Collision2D.prototype._collisionPrimitive {

  type = 'BOX'

  constructor(parent, ...args) {
    super(parent)
    if (args.length === 2 && args[0] instanceof p5.Vector && args[1] instanceof p5.Vector) {
      this._center = args[0]
      this._size = args[1]
    } else if (args.length === 4) {
      this._center = this.parent.sketch.createVector(args[0], args[1])
      this._size = this.parent.sketch.createVector(args[2], args[3])
    } else {
      throw 'unknown signature in constructor collisonBox'
    }
    this.parent.addObjToLayer(this, this.type)
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

Collision2D.prototype._collisionCircle = class extends Collision2D.prototype._collisionPrimitive {

  type = 'CIRCLE'

  constructor(parent, ...args) {
    super(parent)
    if (args.length === 2 && args[0] instanceof p5.Vector) {
      this._center = args[0]
      this._radius = args[1]
    } else if (args.length === 3) {
      this._center = this.parent.sketch.createVector(args[0], args[1])
      this._radius = args[2]
    } else {
      throw 'unknown signature in constructor collisonCircle'
    }
    this.parent.addObjToLayer(this, this.type)
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

// POINT

Collision2D.prototype._collidingPointPoint = function(point1, point2, margin) {
  margin = margin || 2
  return (
    point1.center.dist(point2.center) <= margin
  )
}

Collision2D.prototype._collidingPointLine = function(point, line, margin) {
  margin = margin || 0.05
  let d1 = point.center.dist(line.start)
  let d2 = point.center.dist(line.end)
  let len = line.start.dist(line.end)
  return (
    d1 + d2 >= len - margin &&
    d1 + d2 <= len + margin
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

// LINE

Collision2D.prototype._collidingLineLine = function(line1, line2) {
  let x1 = line1.x1
  let x2 = line1.x2
  let x3 = line2.x1
  let x4 = line2.x2
  let y1 = line1.y1
  let y2 = line1.y2
  let y3 = line2.y1
  let y4 = line2.y2
  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
  return (
    uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1
  )
}

Collision2D.prototype._collidingLineBox = function(line, box) {
  let inside1 = this._collidingPointBox({x: line.x1, y: line.y1}, box)
  let inside2 = this._collidingPointBox({x: line.x2, y: line.y2}, box)
  if (inside1 || inside2) return true
  let left    = this._collidingLineLine(line, {x1: box._xmin, y1: box._ymin, x2: box._xmin, y2: box._ymax})
  let right   = this._collidingLineLine(line, {x1: box._xmax, y1: box._ymin, x2: box._xmax, y2: box._ymax})
  let top     = this._collidingLineLine(line, {x1: box._xmin, y1: box._ymin, x2: box._xmax, y2: box._ymin})
  let bottom  = this._collidingLineLine(line, {x1: box._xmin, y1: box._ymax, x2: box._xmax, y2: box._ymax})
  return (left || right || top || bottom)
}

Collision2D.prototype._collidingLineCircle = function(line, circle) {
  let inside1 = this._collidingPointCircle({center: line.start}, circle)
  let inside2 = this._collidingPointCircle({center: line.end}, circle)
  if (inside1 || inside2) return true
  let len = line.start.dist(line.end)
  let dot = (p5.Vector.sub(circle.center, line.start)).dot(p5.Vector.sub(line.end, line.start)) / (len * len)
  let closest = p5.Vector.add(line.start, p5.Vector.mult(line.delta, dot))
  let pointinsidecircle = this._collidingPointCircle({center: closest}, circle)
  if (!pointinsidecircle) return false
  let pointonline = this._collidingPointLine({center: closest}, line)
  return (pointonline)
}

// BOX

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

// CIRCLE

Collision2D.prototype._collidingCircleCircle = function(circle1, circle2) {
  return (
    circle1.center.dist(circle2.center) <= (circle1.radius + circle2.radius)
  )
}