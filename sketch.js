var trex ,trex_running;

var flor, flor_ing;
var flor_inv;

var cloud,cloud_ing;
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
//var grupo_lua;


var trex_collide;

var inv;

var restart,restart_ing;
var game_over,game_overING;

var time;

var som_die;
var som_jump;
var som_checkpoint;



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

  som_die = loadSound("die.mp3");
  som_jump = loadSound("jump.mp3");
  som_checkpoint = loadSound("checkpoint.mp3");
  
}

function setup(){

  createCanvas(windowWidth,windowHeight);

  game_over = createSprite (300,height/2 + 70);
  game_over.addImage ("Perdeu playboy",game_overING);
  game_over.visible = false;
  game_over.scale = 0.5;

  restart = createSprite (300,height/2 + 100);
  restart.addImage ("acabou pra você",restart_ing);
  restart.visible = false;
  restart.scale = 0.5;
  
  flor = createSprite (300,height/1 - 50,600,10);
  flor.addImage (flor_ing);
  
  flor_inv = createSprite (300,height/1 - 30,600,10);
  flor_inv.visible = false;

  //sprite de Trex
  trex = createSprite(50,height/1 - 50,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.3;

  grupo_obstacle = createGroup ();
  grupo_nuvens = createGroup ();
  grupo_star = createGroup ();
  //grupo_lua = createGroup ();


  trex.addAnimation ("perdeu", trex_collide);
}

function draw(){

  console.log (trex.y);

  background("black");

  if (time % 1 == 0){

    lua = createSprite (270,100);
    lua.addImage (lua_ing);
    lua.visible = true;
    lua.scale = 0.2;
    lua.lifetime = 10;
    
  }

  if (time > 0 && time % 2 == 0){

    lua.visible = false;
    grupo_star.destroyEach ();


    background("white");

    fill ("black");
    text ("Distancia Percorrida: " + score + " Metros", 25, 23);

    text ("Tempo: " + time + " T-Rex Time", 25, 40);
    
  }


  fill ("yellow");
  text ("Distancia Percorrida: " + score + " Metros", 25, 23);

  text ("Tempo: " + time + " T-Rex Time", 25, 40);
  
  

  //console.log (trex.y);
  //console.log (frameCount);
  //console.log (Math.PI);

  if (gamestate == JOGAR){
    if (score % 100 == 0 && score > 0 ){
      som_checkpoint.play ();
    }

    if (mousePresseOver (inv) && trex.y >= 297 || touches.lenght > 0){

    som_jump.play ();
    //som_jump.setVolume (2);

    trex.velocityY = -13;
    touches = [];
    // ]; 
    
    }

    if (flor.x < 0){
      flor.x = flor.width/2;
     }

    score = score + Math.round(frameRate ()/60);
    time = Math.round(score/300);

    trex.velocityY = trex.velocityY + 0.8;
    flor.velocityX = -( 3 + 2 * score/200);

    inv = createSprite (300,200,600,600);
    inv.visible = false;

    game_over.visible = false;
    restart.visible = false;

    spawnCloud ();
    spawnStar ();
    spawnCactus ();
   

    if (grupo_obstacle.isTouching (trex)) {

     som_die.play ();

     gamestate = ENCERRAR;
   }

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
    lua.visible = false;
    

    if (mousePressedOver(restart)){
      reiniciar();
    }

  }

  //lua.depth = cloud.depth;
  //cloud.depth = cloud.depth + 1;

  // Lugar do mouse e pro texto seguir o mouse
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

  if (frameCount % Math.round (random  (60,160) ) == 0) {

    obstacle = createSprite (width,height - 50,20,50);
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

function reiniciar(){

  console.log ("Acabou");
  gamestate = JOGAR;

  grupo_obstacle.destroyEach();
  grupo_nuvens.destroyEach();
  grupo_star.destroyEach ();

  trex.changeAnimation ("running",trex_running);

  score = 0;
  time = 0;

}






