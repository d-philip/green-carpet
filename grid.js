

var x,y;
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
const seconds = 5*60;
let carx, cary, car1, car2;

var cars = [];

function setup() {
  createCanvas(1040,1040);
  counter = seconds;
  frameRate(60);
  carx = new Car(100, 180, 'x', 1);
  cary = new Car(160, 100, 'y', 1);



  cars[0] = new Car(100, 350, 'x', 2);
  cars[1] = new Car(200, 350, 'x', 1);
  cars[2] = new Car(900, 350, 'x', 0);
  cars[3] = new Car(1000, 350, 'x', -3);
  cars[4] = new Car(800, 350, 'x', -1);
  cars[5] = new Car(340, 350, 'y', 4);
  cars[6] = new Car(340, 720, 'y', 1);
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

  for(var i = 0; i < cars.length; i++){
    cars[i].display();
  }


  //car v car collision detection
  var blocked = false;
  for(var i = 0; i < cars.length; i++){
    blocked = false;
    for(var j = 0; j < cars.length; j++){
      if(i!=j && lookahead(cars[i],cars[j])){
        blocked = true;
      }
    }
    if(!(blocked)){
      cars[i].move();
    }
  }


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


function lookahead(car1,car2){
  if(car1.speed >= 0 && car2.speed >= 0){
    if(car1.direction == 'x' && car2.direction == 'x' && car1.y == car2.y && (car1.x < car2.x && (car2.x - car1.x) < 20)){
        return true;
    }
    else if(car1.direction == 'y' && car2.direction == 'y' && car1.x == car2.x && (car1.y < car2.y && (car2.y - car1.y) < 20)){
        return true;
    }
  }
  else if(car1.speed <= 0 && car2.speed <= 0){
    if(car1.direction == 'x' && car2.direction == 'x' && car1.y == car2.y && (car1.x > car2.x && (car1.x - car2.x) < 20)){
        return true;
    }
    else if(car1.direction == 'y' && car2.direction == 'y' && car1.x == car2.x && (car1.y > car2.y && (car1.y - car2.y) < 20)){
        return true;
    }
  }
  return false;
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

}
