
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var score;
var ground1
var invisibleground;
var collectsound;
var survivaltime = 0;
var gamestate = 1;
var end = 2;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  collectsound = loadSound("collect.mp3");
 
}



function setup() {
  createCanvas(400,400);

  
  ground1 = createSprite(400,370,820,10);
  ground1.velocityX = -4;
  ground1.x = ground1.width/2
  
  invisibleground = createSprite(400,370,820,10);
  invisibleground.visible = false;
  
  
  
  monkey = createSprite(100,340);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
 
  //banana = addImage(bananaImage);
  

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
  drawSprites();
  spawnbanana();
  spawnobstacle();
  
  
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivaltime , 100,50);
  
  
  if(ground1.x<0)
  {
    ground1.x = ground1.width/2
    
  }
  
  
  if(keyDown("space") && monkey.collide(invisibleground))
  {
    monkey.velocityY = -17; 
      
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleground);

  
  if(monkey.isTouching(bananaGroup))
 {
     bananaGroup.destroyEach();
     collectsound.play();
 }
  
 if(monkey.isTouching(obstacleGroup))
    
  {   
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    text("Game Over" , 150,200);
    monkey.velocityY = 0;
    survivaltime = 0;
    gamestate = end;
   
   }

  if(gamestate === end)
  {
    
   frameCount = -1;
   //survivaltime = 0; 
    
  }
  
  
}



function spawnbanana()

{
  if(frameCount % 95 === 0 )
    {
      banana = createSprite(400,Math.round(random(180,260)));
      banana.addImage(bananaImage);
      banana.velocityX = -4;
      banana.scale = 0.1;
      banana.lifetime = 90;
      bananaGroup.add(banana);
    }
  
  
  
}


function spawnobstacle()

{
  if(frameCount % 300 === 0)
    
  {
    obstacle = createSprite(400,340);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    
  }
  
  
  
}







