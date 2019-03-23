var x,y;
var multi;
var counter;
//Matrix for randomizing initial states of the stoplight at each intersection
var stopLightStatus =[[Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)]];

var stopLightRightOrDown = [120,290,460,630,800];
var stopLightLeftOrUp = [230,400,570,740,910];

//Number of seconds to wait before switching times fps
const seconds = 1*60;
let carx, cary;

function setup() {
  createCanvas(1040,1040);
  counter = seconds;
  frameRate(60);
  carx = new Car(100, 180, 'x', 2);
  cary = new Car(160, 100, 'y', 1);
  multi=0;
}

function draw() {
  //Draws background and buildings
  background(80);
  fill(255);
  for(var i = 0; i < 6; i++){
    for(var j = 0; j < 6; j++){
      rect(170*i+30 ,170*j+30, 120,120);
    }
  }

  //Draws stoplights
  for(var i = 0; i < 5; i++){
    for(var j = 0; j < 5; j++){
      //Draws Top light (0)
      fill(chooseColor(i,j,0) ? 0 : 255,chooseColor(i,j,0) ? 255 : 0,0);
      rect(150 + 170*i,140+ 170 * j,52,10);
      //Draws Right light (1)
      fill(chooseColor(i,j,1) ? 0 : 255,chooseColor(i,j,1) ? 255 : 0,0);
      rect(200 + 170 * i,150 + 170*j,10,52);
      //Draws Bottom light (2)
      fill(chooseColor(i,j,2) ? 0 : 255,chooseColor(i,j,2) ? 255 : 0,0);
      rect(150 + 170*i,200+ 170 * j,52,10);
      //Draws Left light (3)
      fill(chooseColor(i,j,3) ? 0 : 255,chooseColor(i,j,3) ? 255 : 0,0);
      rect(140 + 170 * i,150 + 170*j,10,52);
    }
  }

  //Draws cars and moves them
  carx.display();
  cary.display();

  carx.move();
  cary.move();

  //Changes each stoplight after seconds amount of time
  counter++;
  if(counter >= seconds){
    for(var i = 0; i < 5; i++){
      for(var j = 0; j < 5; j++){
        if(stopLightStatus[i][j] == 3){
          stopLightStatus[i][j] = 0;
        }
        else{
          stopLightStatus[i][j] = stopLightStatus[i][j] + 1;
        }
      }
    }
    counter = 0;
  }

}

//Decides whether he light should be green or red
function chooseColor(i,j,pos){
  if(stopLightStatus[i][j] == pos){
      return true;
  }
  else {
      return false;
  }
}

class Car{
  constructor(x, y, direction, speed){
    this.x = x;
    this.y = y;
    this.multi=0;
    this.speed = speed;
    this.c = color(100, 150, 200);
    this.direction = direction;
  }
  
  move(){
    
    if(this.direction == 'x'){
      if(this.multi<=6){
      if(this.x>=130+(170*this.multi)){
        if(stopLightStatus[this.multi][0]==3){
          this.x += this.speed;
          this.multi+=1;
        }
        
      }

       else{ this.x += this.speed;
        
        }

    }
  }
     if(this.direction == 'y'){
      if(this.multi<=4){
      if(this.y>=130+(170*this.multi)){
        if(stopLightStatus[0][this.multi]==0){
          this.y += this.speed;
          this.multi+=1;
        }
        
      }

       else{ this.y += this.speed;
        
        }

    }
  }

    
  }

  brake(){
    if(this.speed > 0)
    {
      this.speed -= 0.3;
    }
  }

  display(){
    fill(this.c);
    rect(this.x, this.y, 10, 10);
  }

  //Assigns a numeric value to the direction of movement
  direction(){
    //Moving right
    if(direction == 'x' && speed >= 0){
      return 3;
    }
    //Moving left
    else if(direction == 'x' && speed < 0){
      return 1;
    }
    //Moving down
    else if(direction == 'y' && speed >= 0){
      return 0;
    }
    //moving up
    else return 2;
  }
}

class Ambulance extends Car{

}
