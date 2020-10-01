var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage;

var foodGroup, obstacleGroup;

var ground;

var score = 0,
  survivalTime = 0;

var gameState = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(125, 300, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(300, 380, 600, 40);
  ground.shapeColor = rgb(149, 59, 9);

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");

  textSize(20);
  fill("white");
  stroke("white");
  text("SCORE: " + score, 250, 35);
  text("SURVIVAL TIME: " + survivalTime, 215, 60);

  if (gameState === "play") {
    survivalTime = Math.floor(frameCount / frameRate());

    if (keyDown("space") && monkey.y >= 313.95) {
      monkey.velocityY = -17;
    }

    monkey.velocityY += 0.8;

    monkey.collide(ground);

    food();
    obstacles();

    if (monkey.isTouching(foodGroup)) {
      score += 1;
      foodGroup.destroyEach();
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    textSize(40);
    text("GAME OVER!", 175, 200);
    monkey.destroy();
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }

  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(610, Math.round(random(120, 200)), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifetime = 250;
    banana.scale = 0.08;

    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(610, 330, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 250;
    obstacle.scale = 0.3;

    obstacleGroup.add(obstacle);
  }
}