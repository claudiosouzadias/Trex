var trex ,trex_running;
var flor, flor_ing;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  flor_ing = loadImage ("ground2.png")
}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.3;
  
  flor = createSprite (300,180,600,10);
  flor.addImage (flor_ing);
  flor.velocityX = -2;

}

function draw(){
  
  background("lightblue")

  if (keyDown("space")){
    trex.velocityY = -10;
  }

  if (flor.x < 0){
    flor.x = flor.width/2;
  }

  trex.velocityY = trex.velocityY + 0.8;
  
  trex.collide (flor);

  console.log (trex.y);

  drawSprites();
}