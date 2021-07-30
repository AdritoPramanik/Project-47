class Ground extends Box {

    constructor(x, y, w, h) {
      super(x, y, w, h);
      this.body.isStatic = true;
    }
  
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      noStroke();
      fill(242, 198, 103)
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      pop();
    }
  
  }