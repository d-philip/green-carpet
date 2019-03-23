var x,y;
//Matrix for randomizing initial states of the stoplight at each intersection
var stopLightStatus =[[Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)]];
var counter;
//Number of seconds to wait before switching times fps
const seconds = 5*60;
let carx, cary, amb;

function setup() {
  createCanvas(1040,1040);
  counter = seconds;
  //Randomly generates initial states for each stop light
  frameRate(60);
  carx = new Car(600, 850, 'x', -1);
  cary = new Car(510, 100, 'y', 1.5);
  amb = new Ambulance(100,500,'x',3);
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
  amb.display();

  carx.move();
  cary.move();
  amb.move();

  counter++;
  //Changes each stoplight after seconds amount of time
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

//Decides whether the light should be green or red
function chooseColor(i,j,pos){
  if(stopLightStatus[i][j] == pos){
      return true;
  }
  else {
      return false;
  }
}

function changeLight(){

}

class Car{
  constructor(x, y, direction, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.c = color(100, 150, 200);
    this.direction = direction;
  }
  move(){
    if(this.direction == 'x'){
      this.x += this.speed;
    }
    else{
      this.y += this.speed;
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
}

class Ambulance extends Car{
  constructor(x, y, direction, speed){
    super(x, y, direction, speed);
    super.c = color(225, 185, 100);
  }
}
