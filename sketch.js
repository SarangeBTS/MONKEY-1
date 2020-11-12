
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var BG, OG;
var gamestate="play"


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(500,500);
 monkey = createSprite(60,420) 
 monkey.addAnimation("sprite_0.png",monkey_running);
 monkey. scale = 0.2
  
  ground = createSprite(250,490,1000,20);
  ground.velocityX = -4
  
   BG = createGroup();
  OG = createGroup();
}


function draw() {
background("white");
  
  if(gamestate==="play"){
  
  if(ground.x<0){
     ground.x = 500; 
     }
  
  if(keyDown("space")  ){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.5; 
  
  monkey.collide(ground);
  
  food();
  obstacles();
  
  textSize(30);
  fill("orange");
  text("Surviving time:"+ score, 200,50);
  score = score+ Math.round(frameRate()/65);
  
  if(BG.isTouching(monkey) ){
    BG.destroyEach();
  }
  
  if(OG.isTouching(monkey) ){
   gamestate="END"
  }
  }
  
  if(gamestate==="END"){
  text("GAME OVER",200,250) 
    OG.destroyEach();
    BG.destroyEach();
    monkey.destroy();
    ground.destroy();
  }
  
  
 drawSprites(); 
}





function obstacles(){
  if(frameCount % 300 === 0 ){
     stone = createSprite(450,420)
     stone.addImage(obstacleImage);
     stone.velocityX = -4
     stone.scale = 0.3
    
     OG.add(stone);
     stone.lifetime = 125;
     }
}



function food(){
  if(frameCount % 80 === 0){
    banana= createSprite(450,200);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4
    
    banana.y = Math.round(random(100,250));
    BG.add(banana); 
    banana.lifetime = 125;
  }
}