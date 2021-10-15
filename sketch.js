var hypnoticBall, database;
var position;


function preload() {
  cityImage=loadImage("Images/cityImage.png");
  HotAirBallon=loadAnimation("Images/hotAirBallon01.png");
  HotAirBallon2=loadAnimation("Images/hotAirBallon01.png","Images/hotAirBallon02.png","Images/hotAirBallon03.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(800,800);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addAnimation("hotAirBallon",HotAirBallon);
  hypnoticBall.shapeColor = "red";

  var ballPosition = database.ref("ball/position")
  ballPosition.on("value",readPosition)
}

function draw(){
  background(cityImage);
  if(position!==undefined) {
    if(keyDown(LEFT_ARROW)){
      writePosition(-3,0);
      hypnoticBall.addAnimation("HotAirBallon2",HotAirBallon2);
      hypnoticBall.changeAnimation("HotAirBallon2");
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(3,0);
      hypnoticBall.addAnimation("HotAirBallon2",HotAirBallon2);
      hypnoticBall.changeAnimation("HotAirBallon2");
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-3);
      hypnoticBall.addAnimation("HotAirBallon2",HotAirBallon2);
      hypnoticBall.changeAnimation("HotAirBallon2");
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+3);
      hypnoticBall.addAnimation("HotAirBallon2",HotAirBallon2);
      hypnoticBall.changeAnimation("HotAirBallon2");
    }
    drawSprites();
  }
  text(hypnoticBall.x+ ","+hypnoticBall.y,hypnoticBall.x+100,hypnoticBall.y);
}

function writePosition(x,y){
  database.ref("ball/position").set({
    "x":position.x+x,
    "y":position.y+y,
  })
}

function readPosition(data){
  position=data.val();
  hypnoticBall.x=position.x;
  hypnoticBall.y=position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
