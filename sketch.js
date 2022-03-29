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

var score = 0;
var JOGAR = 1;
var ENCERRAR = 0;
var gamestate = JOGAR;

var grupo_obstacle;
var grupo_nuvens;
var grupo_star;


var trex_collide;

var inv;

var restart,restart_ing;
var game_over,game_overING;

var time;



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

  trex_collide = loadAnimation ("trex_collided.png");

  restart_ing = loadImage ("RESTART.png");
  game_overING = loadImage ("gameOver.png");
  
}

function setup(){
  createCanvas(600,200);
  
  lua = createSprite (270,100);
  lua.addImage (lua_ing);
  lua.scale = 0.2;
  
  flor = createSprite (300,180,600,10);
  flor.addImage (flor_ing);
  
  flor_inv = createSprite (300,200,600,10);
  flor_inv.visible = false;

  


  //sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.3;

  grupo_obstacle = createGroup ();
  grupo_nuvens = createGroup ();
  grupo_star = createGroup ();

  game_over = createSprite (300,100);
  game_over.addImage ("Perdeu playboy",game_overING);
  game_over.visible = false;
  game_over.scale = 0.5;

  restart = createSprite (160,100);
  restart.addImage ("acabou pra você",restart_ing);
  restart.visible = false;
  restart.scale = 0.5;

  

  trex.addAnimation ("perdeu", trex_collide);
}

function draw(){

  background("black");

  if (time > 0 && time % 2 == 0){

    background("white");

    fill ("black");
    text ("Distancia Percorrida: " + score + " Metros", 25, 23);

    text ("Tempo: " + time + " Dinossauro time", 25, 40);

    grupo_star.destroyEach ();
    lua.destroy ();
    }


  fill ("White");
  text ("Distancia Percorrida: " + score + " Metros", 25, 23);

  text ("Tempo: " + time + " Dinossauro time", 25, 40);
  
  

  //console.log (trex.y);
  //console.log (frameCount);
  //console.log (Math.PI);

  if (gamestate == JOGAR){


    if (mousePressedOver (inv) && trex.y >= 180){

    trex.velocityY = -13;
    }

    if (flor.x < 0){
      flor.x = flor.width/2;
     }

    score = score + Math.round(frameRate ()/60);

    time = Math.round(score/300);

    trex.velocityY = trex.velocityY + 0.8;
    flor.velocityX = -( 3 + 2 * score/50);

    inv = createSprite (300,200,600,600);
    inv.visible = false;

    spawnCloud ();
    spawnStar ();
    spawnCactus ();

    //if (grupo_obstacle.isTouching (trex)) {
     // gamestate = ENCERRAR;
    //}

   } else if (gamestate == ENCERRAR){

    flor.velocityX = 0;

    grupo_nuvens.setVelocityXEach (0);
    grupo_obstacle.setVelocityXEach (0);
    grupo_star.setVelocityXEach (0);

    grupo_nuvens.setLifetimeEach (-1);
    grupo_obstacle.setLifetimeEach (-1);
    grupo_star.setLifetimeEach (-1);

    trex.velocityY = 0;
    trex.changeAnimation ("perdeu", trex_collide);

    restart.visible = true;
    game_over.visible = true;

  }
  

  //lua.depth = cloud.depth;
  //cloud.depth = cloud.depth + 1;

  text(mouseX + "," + mouseY,mouseX,mouseY);
  
  trex.collide (flor_inv);

  drawSprites();
}

function spawnCloud (){

  if (frameCount %60 == 0){

   cloud = createSprite (575,10);
   cloud.velocityX = -3;
   cloud.addImage (cloud_ing);
   cloud.scale = 0.9;
   cloud.y = Math.round (random (10,100));
   grupo_nuvens.add(cloud);
  
  }

  
}

function spawnStar (){

  if (frameCount %60 == 0){  

    star = createSprite (574,10);
    star.velocityX = -2;
    star.addAnimation ("estrela", star_ing);
    star.scale = 0.5;
    star.y = Math.round (random (10,100));
    star.lifetime = 400;
    grupo_star.add(star);
  }
  

}

function spawnCactus (){

  var rand = Math.round (random (1,6));

  if (frameCount % Math.round (random  (60,200) ) == 0) {

    obstacle = createSprite (540,180,20,50);
    obstacle.scale = 0.4;
  
    
    

    switch (rand){
      
      case 1: obstacle.addImage (obstacle_1);
      break;

      case 2: obstacle.addImage (obstacle_2);
      break;

      case 3: obstacle.addImage (obstacle_3);
      break;

      case 4: obstacle.addImage (obstacle_4);
      break;

      case 5: obstacle.addImage (obstacle_5);
      break;

      case 6: obstacle.addImage (obstacle_6);
      break;
      default: break;
      
    }

    

    obstacle.velocityX = -(3 + 3*score/200);

    obstacle.lifetime = 200;

    grupo_obstacle.add(obstacle);

    if (obstacle.isTouching (grupo_obstacle)){

      obstacle.x = frameCount % Math.round (random (60,200))== 0;
      
    }
  }
}



