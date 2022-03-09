var trex ,trex_running;

var flor, flor_ing;
var flor_inv;

var cloud, cloud_ing;
var star, star_ing;
var lua,lua_ing;

var obstacle;
var obstacle_1; 
var obstacle_2; 
var obstacle_3; 
var obstacle_4; 
var obstacle_5;   
var obstacle_6;

var score;



function preload(){

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  flor_ing = loadImage ("ground2.png");

  cloud_ing = loadImage ("cloud.png");
  star_ing = loadAnimation ("estrelas.gif");
  lua_ing = loadImage ("lua.png");

  obstacle_1 = loadImage ("obstacle1.png");
  obstacle_2 = loadImage ("obstacle2.png");
  obstacle_3 = loadImage ("obstacle3.png");
  obstacle_4 = loadImage ("obstacle4.png");
  obstacle_5 = loadImage ("obstacle5.png")
  obstacle_6 = loadImage ("obstacle6.png");

  
}

function setup(){
  createCanvas(600,200);
  
  lua = createSprite (270,100);
  lua.addImage (lua_ing);
  lua.scale = 0.2;
  
  flor = createSprite (300,180,600,10);
  flor.addImage (flor_ing);
  flor.velocityX = -2;
  
  flor_inv = createSprite (300,200,600,10);
  flor_inv.visible = false;

//sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.3;
  
  
}

function draw(){
  
  background("black");

  //console.log (trex.y);
  //console.log (frameCount);
  //console.log (Math.PI);
  

  text(mouseX + "," + mouseY,mouseX,mouseY);

  if (mousePressedOver (trex) && trex.y >= 180){

    trex.velocityY = -11;
  }

  if (flor.x < 0){
    flor.x = flor.width/2;
  }

  trex.velocityY = trex.velocityY + 0.8;
  
  trex.collide (flor_inv);

  score = 0;
  score = score + Math.round (frameCount/1);
  fill ("White");
  text ("Distancia Percorrida: " + score + " Metros", 25, 23);
  

  spawnCloud ();
  spawnStar ();
  spawnCactus ();

  drawSprites();
}

function spawnCloud (){

  if (frameCount %60 == 0){

  cloud = createSprite (575,10);
  cloud.velocityX = -3;
  cloud.addImage (cloud_ing);
  cloud.scale = 0.9;
  cloud.y = Math.round (random (10,100));
  
  }

  //lua.depth = cloud.depth;
  //cloud.depth = cloud.depth + 1;

  
}

function spawnStar (){

  if (frameCount %60 == 0){  

    star = createSprite (574,10);
    star.velocityX = -2;
    star.addAnimation ("estrela", star_ing);
    star.scale = 0.5;
    star.y = Math.round (random (10,100));
    star.lifetime = 400;

  }

}

function spawnCactus (){

  var rand = Math.round (random (1,6));

  if (frameCount % Math.round (random  (60,200) ) == 0) {

    obstacle = createSprite (540,170,20,50);
    

    switch (rand){
      
      case 1: obstacle.addImage (obstacle_1);
      obstacle.scale = 0.6;
      break;

      case 2: obstacle.addImage (obstacle_2);
      obstacle.scale = 0.3;
      break;

      case 3: obstacle.addImage (obstacle_3);
      obstacle.scale = 0.6;
      break;

      case 4: obstacle.addImage (obstacle_4);
      obstacle.scale = 0.6;
      break;

      case 5: obstacle.addImage (obstacle_5);
      obstacle.scale = 0.6;
      break;

      case 6: obstacle.addImage (obstacle_6);
      obstacle.scale = 0.275;
      break;
      default: break;
      
    }

    obstacle.velocityX = -3;

    obstacle.lifetime = 200;

  }

  if (score %250 == 0){

    obstacle.velocityX = obstacle.velocityX - 3;

  }
}


  
