class Box {

    constructor(x, y, width, height, gap=false) {
      var options = {
        restitution: 0.5,
        isStatic: true,
        inertia : Infinity
      }
      this.body = Matter.Bodies.rectangle(x, y, width, height, options);
      Matter.World.add(world, this.body);
      this.width = width;
      this.height = height;
      this.gap = gap
  
      if (this.gap)
          this.body.isSensor = true
    }
  
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      if (this.gap) {
          noFill()
          noStroke()
      } else {
          fill(134, 187, 72)
      }
      rectMode(CENTER);
      rect(0, 0, this.width, this.height)
      pop();
    }
  
    move() {
        let pushVec = Matter.Vector.create(-2, 0)
        Matter.Body.translate(this.body, pushVec)
    }
  
  }