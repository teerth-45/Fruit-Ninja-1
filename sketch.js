var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, fruit, enemy;
var swordImg, enemyA;
var fruit1Img, fruit2Img, fruit3Img, fruit4Img;

var score = 0;

var fruitGroup, enemyGroup;

var gameOver;

function preload() {
  swordImg = loadImage("sword.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  enemyA = loadAnimation("alien1.png", "alien2.png");
  gameOver = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 600);

  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImg);
  sword.scale = 1;
  sword.x=300;
  sword.y=300;

  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw() {
  background(255);
  text("Score: " + score, 500, 50);

  if (gameState === PLAY) {
    createFruit();
    createEnemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      sword.addImage(swordImg);
      score = score + 1;
    } else if (enemyGroup.isTouching(sword)) {
      gameState=END; 
      sword.addImage(gameOver);
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      fruitGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);
    }
  }
  
  drawSprites();
}

function createFruit() {
  if (World.frameCount % 50 === 0) {
    var fruit = createSprite(600, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r === 1) {
      fruit.addImage("fruit1", fruit1Img);
    } else if (r === 2) {
      fruit.addImage("fruit2", fruit2Img);
    } else if (r === 3) {
      fruit.addImage("fruit3", fruit3Img);
    } else {
      fruit.addImage("fruit4", fruit4Img);
    }
    fruit.y = Math.round(random(30, 340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
}

function createEnemy() {
  if (World.frameCount % 250 === 0) {
    var enemy = createSprite(600, 400, 20, 20);
    enemy.addAnimation("moving", enemyA);
    enemy.scale = 1;
    enemy.y = Math.round(random(30, 340));
    enemy.velocityX = -7;
    enemy.setLifetime = 100;
    enemyGroup.add(enemy);
  }
}