const Engine = Matter.Engine;
const World= Matter.World;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Events = Matter.Events;

var ground
var bird
var engine
var columns = []
var score = 0
var canFly = true
var dotImg

function preload() {
  dotImg = loadImage('bird.png')
}

function generateColumn() {
    box1Height = Math.ceil(random(50, 300))
    gapHeight = Math.ceil(random(150, 200))
    box2Height = height - (box1Height + gapHeight)
    var column = new Column(box1Height, gapHeight, box2Height)
    columns.push(column)
}

function generateAllColumns() {
    generateColumn()
    setInterval(function() {
        generateColumn()
    }, 3000)
}

function setup() {
    var canvas = createCanvas(displayWidth, displayHeight - 110)
    engine = Engine.create()
    world = engine.world
    ground = new Ground(width / 2, height - 10, width, 20)
    bird = new Bird(150, 300, 20)
    generateAllColumns()
}

function draw() {
    background(51)

    if (canFly !== true) {
        setTimeout(function() {
            noLoop()
        }, 2000)
    }
    Matter.Engine.update(engine)
    ground.display()
    bird.display()
    var groundCollide = Matter.SAT.collides(bird.body, ground.body)
    if (groundCollide.collided) {
        canFly = false
    }

    columns.forEach(function (column, i) {
        if (column !== undefined) {
            var box1Collide = Matter.SAT.collides(bird.body, column.box1.body)
            var box2Collide = Matter.SAT.collides(bird.body, column.box2.body)
            var gapCollide = Matter.SAT.collides(bird.body, column.gap.body)

            if (box1Collide.collided || box2Collide.collided)
                canFly = false

            if ((column.box1.body.position.x + column.box1.width / 2) < 0 &&
                (column.box2.body.position.x + column.box2.width / 2) < 0 &&
                (column.gap.body.position.x + column.gap.width / 2) < 0) {
                console.log('removed column ' + i)
                Matter.World.remove(world, column.box1)
                Matter.World.remove(world, column.gap)
                Matter.World.remove(world, column.box2)
                columns[i] = undefined
                score= score+1;
                console.log(columns)
            } else {
                if (canFly) {
                    column.move()
                }
                column.display()
            }
        }
    })

    function checkUndefined(x) {
        return x !== undefined
    }

    columns = columns.filter(checkUndefined);

    push()
    textSize(32)
    fill(255)
    textAlign(CENTER)
    text("Score : "+score, width/2, 50)
    pop()

}
function mouseClicked() {
  console.log('HI')
    if (canFly === true ) {
        var pushVec = Matter.Vector.create(0, -0.1)
        var posVec = Matter.Vector.create(bird.body.position.x, bird.body.position.y)
        Body.applyForce(bird.body, posVec, pushVec)
    }
}
