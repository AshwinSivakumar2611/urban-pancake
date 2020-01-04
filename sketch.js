var PLAY = 1;
var END = 0;
var gameState;

var backgroundState = 2;

var player,playerBird;
var ground,/*invisibleGround*/ groundImage;

var obstaclesGroup;

var score = 0;

var gameOver, restart;
var hitSound,click,introMusic,music;
var pipe,pipe1,pipe4up,pipe4down,pipe3down,pipe3up,pipe5;

var title,button,runGame,texT;

function preload() {
  playerBird = loadImage("../images/BIRD.PNG");
  gameOverImg = loadImage("../images/gameOver.PNG");
  restartImg = loadImage("../images/restart.PNG");
  hitSound = loadSound("sounds/hit.mp3");
  backGROUND = loadImage("../images/BACKGROUND.PNG");
  pipe = loadImage("../images/Pipe.PNG");
  pipeDown = loadImage("../images/PIPEDOWN.PNG");
  click = loadSound("sounds/CLICK.mp3");
  pipe1 = loadImage("../images/pipe1.PNG");
  pipe4up = loadImage("../images/pipe4up.PNG");
  pipe4down = loadImage("../images/pipe4down.PNG");
  pipe3down = loadImage("../images/pipe3down.PNG");
  pipe3up = loadImage("../images/Pipe3up.PNG");
  introMusic = loadSound("sounds/INTRO.mp3");
  music = loadSound("sounds/Get_Outside.mp3");
  pipe5 = loadImage("../images/Pipe5.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight-5);

  runGame = createButton('RUN GAME');
  runGame.position(width-700,height-340);

  runGame.mousePressed(()=>{

    texT = createElement('h1');
    texT.html("(Press SPACE to jump)");
    texT.position(width-885,height-270);

    backgroundState = 3;

    player = createSprite(width-1240,height-470, 20, 40);
    player.setCollider("circle", 0, 0, 450);
    //player.debug=true;
    player.addImage(playerBird);
    player.scale=(0.1)/2;
  
    gameOver = createSprite(width-725, height-365);
    gameOver.addImage(gameOverImg);

    restart = createSprite(width-725, height-320);
    restart.addImage(restartImg);
    restart.depth=obstaclesGroup.depth+1;

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    /*invisibleGround = createSprite(400, 610, 1370, 10);
    invisibleGround.x = invisibleGround.width / 2;
    invisibleGround.velocityX = -(6 + 3 * score / 100);
    invisibleGround.visible = false;*/

    obstaclesGroup = new Group();
    obstaclesGroup.debug=true;

    score = 0;

    introMusic.loop();

    title = createElement('h1');
    button = createButton('START FLAPPING!');

    title.html("FLAPPY BIRD🦅");
    title.position(width-865,height-520);

    button.position(width-780,height-340);

    button.mousePressed(()=>{
      gameState=PLAY;
      introMusic.stop();
      click.play();

      music.loop();
      texT.hide();
    }); 

  runGame.hide();

  });

}

function draw() {

  textSize(50);
  fill("red");
  
  if (backgroundState === 2){
    background("white");
  }  
  
  if (backgroundState === 3){
    background(backGROUND);
  }

  if (gameState === PLAY) {

    text("SCORE : "+score, width-400, height-575);
    
    title.hide();
    button.hide();

    score = score + Math.round(getFrameRate() / 60);
    //count = 10;
    //invisibleGround.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") || touches.length>0) {
      player.velocityY = -12;
    }
    if (keyWentDown("space") || touches.length>0){
      hitSound.play();
    }

    player.velocityY = player.velocityY + 0.8

    //if (invisibleGround.x < 0) {
    //  invisibleGround.x = invisibleGround.width / 2;
    //}

    spawnObstacles();
    obstaclesGroup.debug=true;

    if (obstaclesGroup.isTouching(player) || player.y>608 || player.y < 8){
      gameState = END;
    }

  } else if (gameState === END) {

    //music.stop();
    text("SCORE : "+score, width-860, height-400);

    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    //invisibleGround.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart) || touches.length>0) {
      reset();
    }
  }


  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 4));

    if (rand===1){
    
      var obstacle1d = createSprite(width,height-196.5,30,530); 
      obstacle1d.shapeColor="red";
      obstacle1d.velocityX = -8;
      obstacle1d.lifetime = 300;

      obstacle1d.addImage(pipe1);
      obstacle1d.scale=0.3;
    
      obstaclesGroup.add(obstacle1d)
    }
    if (rand===2){
      var obstacle2 = createSprite(width,height-117,30,300);
      obstacle2.shapeColor="white";
      obstacle2.velocityX = -8;
      obstacle2.lifetime = 300;

      var obstacle2d = createSprite(width,height-515,30,200); 
      obstacle2d.shapeColor="white";
      obstacle2d.velocityX = -8;
      obstacle2d.lifetime = 300;

      obstacle2d.addImage(pipeDown);
      obstacle2d.scale=0.3;

      obstacle2.addImage(pipe);
      obstacle2.scale=0.3;

      obstaclesGroup.add(obstacle2);
      obstaclesGroup.add(obstacle2d)
    }
    if (rand===3){
      var obstacle3 = createSprite(width,height-5,30,60);
      obstacle3.shapeColor="black";
      obstacle3.velocityX = -8;
      obstacle3.lifetime = 300;

      obstacle3.addImage(pipe3up);
      obstacle3.scale=0.3;

      var obstacle3d = createSprite(width,height-468,30,400);
      obstacle3d.shapeColor="black";
      obstacle3d.velocityX = -8;
      obstacle3d.lifetime = 300;

      obstacle3d.addImage(pipe3down);
      obstacle3d.scale=0.3;

      obstaclesGroup.add(obstacle3);
      obstaclesGroup.add(obstacle3d)
    }
    if (rand===4){
      var obstacle4 = createSprite(width,height-645,30,150);
      obstacle4.shapeColor="blue";
      obstacle4.velocityX = -8;
      obstacle4.lifetime = 300;

      obstacle4.addImage(pipe4down);
      obstacle4.scale=0.3;

      var obstacle4d = createSprite(width,height-175,30,590);
      obstacle4d.shapeColor="blue";
      obstacle4d.velocityX = -8;
      obstacle4d.lifetime = 300;

      obstacle4d.addImage(pipe4up);
      obstacle4d.scale=0.3;

      obstaclesGroup.add(obstacle4);
      obstaclesGroup.add(obstacle4d)
    }


  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  player.x=width-1240;
  player.y=height-470; 

  obstaclesGroup.destroyEach();

  score = 0;

}