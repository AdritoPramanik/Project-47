class Bird {

    constructor(x, y, r) {
      const options = {
        restitution: 0.5,
      }
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.Body.setMass(this.body, this.body.mass * 2);
      Matter.World.add(world, this.body);
      this.r = r;
    }
  
    display() {
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      noFill()
      noStroke()
      circle(0, 0, this.r)
      imageMode(CENTER);
      image(dotImg, 0, 0, this.r * 2 + 15, this.r * 2);
      pop();
  
    }
  }