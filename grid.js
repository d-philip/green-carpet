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
const seconds = 2*60;
let car1, car2;

var cars = [];

function setup() {
  createCanvas(1040,1040);
  counter = seconds;
  frameRate(60);

  //positive speed cars
  cars[0] = new Car(80, 180, 0, 0, 'x', 1);
  cars[1] = new Car(100, 350, 1, 0, 'x', 2);
  cars[2] = new Car(100, 520, 2, 0, 'x', 1);
  cars[3] = new Car(80, 690, 3, 0, 'x', 3);
  cars[4] = new Car(80, 860, 4, 0, 'x', 1);
  cars[5] = new Car(180 - 20, 100, 0, 0, 'y', 1);
  cars[6] = new Car(350 - 20, 80, 0, 1, 'y', 3);
  cars[7] = new Car(520 - 20, 80, 0, 2, 'y', 2);
  cars[8] = new Car(690 - 20, 100, 0, 3, 'y', 2);
  cars[9] = new Car(860 - 20, 120, 0, 4, 'y', 1);
  cars[10] = new Car(100, 180, 0, 0, 'x', 2);
  cars[11] = new Car(80, 350, 1, 0, 'x', 3);
  cars[12] = new Car(100, 350, 1, 0, 'x', 2);
  cars[13] = new Car(100, 690, 3, 0, 'x', 1);
  cars[14] = new Car(100, 860, 4, 0, 'x', 2);
  cars[15] = new Car(180 - 20, 100, 0, 0, 'y', 3);
  cars[16] = new Car(350 - 20, 100, 0, 1, 'y', 2);
  cars[17] = new Car(520 - 20, 100, 0, 2, 'y', 3);
  cars[18] = new Car(860 - 20, 80, 0, 4, 'y', 3);
  cars[19] = new Car(860 - 20, 100, 0, 4, 'y', 2);

  //negative speed cars
  cars[20] = new Car(width - 80, height - 180 - 20, 0, 0, 'x', -1);
  cars[21] = new Car(width - 100, height - 350 - 20, 1, 0, 'x', -3);
  cars[22] = new Car(width - 100, height - 520 - 20, 2, 0, 'x', -1);
  cars[23] = new Car(width - 80, height - 690 - 20, 3, 0, 'x', -1);
  cars[24] = new Car(width - 80, height - 860 - 20, 4, 0, 'x', -2);

  cars[25] = new Car(width - 180, height - 100, 0, 0, 'y', -1);
  cars[26] = new Car(width - 350, height - 80, 0, 1, 'y', -2);
  cars[27] = new Car(width - 520, height - 80, 0, 2, 'y', -3);
  cars[28] = new Car(width - 690, height - 100, 0, 3, 'y', -2);
  cars[29] = new Car(width - 860, height - 120, 0, 4, 'y', -1);

  cars[30] = new Car(width - 100, height - 180 - 20, 0, 0, 'x', -3);
  cars[31] = new Car(width - 80, height - 350 - 20, 1, 0, 'x', -3);
  cars[32] = new Car(width - 100, height - 350 - 20, 1, 0, 'x', -1);
  cars[33] = new Car(width - 100, height - 690 - 20, 3, 0, 'x', -2);
  cars[34] = new Car(width - 100, height - 860 - 20, 4, 0, 'x', -2);

  cars[35] = new Car(width - 180, height - 100, 0, 0, 'y', -1);
  cars[36] = new Car(width - 350, height - 100, 0, 1, 'y', -2);
  cars[37] = new Car(width - 520, height - 100, 0, 2, 'y', -1);
  cars[38] = new Car(width - 860, height - 80, 0, 4, 'y', -3);
  cars[39] = new Car(width - 860, height - 100, 0, 4, 'y', -3);
}

function draw() {
  //Draws background and buildings
  background(60);
  fill(220);
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

  //Draws cars
  for(var i = 0; i < cars.length; i++){
    cars[i].display();
  }


  //car v car collision detection
  var blocked = false;
  for(var i = 0; i < cars.length; i++){
    blocked = false;
    for(var j = 0; j < cars.length; j++){
      if(i!=j && lookahead(cars[i],cars[j])){ //If any car blocks path, set blocked to true and stop any movement
        blocked = true;
      }
    }
    if(!(blocked)){
      cars[i].move();
    }
  }

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

function lookahead(car1,car2){ //Car1 is the "chase car", whose position and direction is being compared to car2
  if(car1.speed >= 0 && car2.speed >= 0){ //check if both cars are moving in a positive direction
    if(car1.direction == 'x' && car2.direction == 'x' && car1.y == car2.y && (car1.x < car2.x && (car2.x - car1.x) < 20)){ //check if both are moving along the same x axis, if car1 is behind car2, and if car1 is too close to car2
        return true;
    }
    else if(car1.direction == 'y' && car2.direction == 'y' && car1.x == car2.x && (car1.y < car2.y && (car2.y - car1.y) < 20)){ //check if both are moving along the same y axis, if car1 is behind car2, and if car1 is too close to car2
        return true;
    }
  }
  else if(car1.speed <= 0 && car2.speed <= 0){
    if(car1.direction == 'x' && car2.direction == 'x' && car1.y == car2.y && (car1.x > car2.x && (car1.x - car2.x) < 20)){ //check if both are moving along the same x axis, if car1 is behind car2, and if car1 is too close to car2
        return true;
    }
    else if(car1.direction == 'y' && car2.direction == 'y' && car1.x == car2.x && (car1.y > car2.y && (car1.y - car2.y) < 20)){ //check if both are moving along the same y axis, if car1 is behind car2, and if car1 is too close to car2
        return true;
    }
  }
  return false;
}

class Car{
  constructor(x, y, row, col, direction, speed){
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
    this.multi=0;
    this.speed = speed;
    this.c = color(153, 204, 225);
    this.direction = direction;
  }

  move(){
  //looping around edges and randomizing speed
  if(this.x >= width-20){
    this.x = 30;
    this.multi = 0;
    this.speed = Math.floor(Math.random()*3);
  }else if(this.x < 0+20){
    this.x = width-30;
    this.multi = 4;
    this.speed = -(Math.floor(Math.random()*3));
  }else if(this.y >= height-20){
    this.y = 30;
    this.multi = 0;
    this.speed = Math.floor(Math.random()*3);
  }else if(this.y < 0+20){
    this.y = height-30;
    this.multi = 4;
    this.speed = -(Math.floor(Math.random()*3));
  }

if(this.speed > 0){
  if(this.direction == 'x'){
    if(this.multi<=4){
      if(this.x>=130+(170*this.multi)){
        if(stopLightStatus[this.multi][this.row]==3){
          this.x += this.speed;
          this.multi+=1;
        }
      }
      else{ this.x += this.speed;}
    }
    else{ this.x += this.speed;}
  }
  if(this.direction == 'y'){
    if(this.multi<=4){
      if(this.y>=130+(170*this.multi)){
        if(stopLightStatus[this.col][this.multi]==0){
          this.y += this.speed;
          this.multi+=1;
        }
      }
        else{ this.y += this.speed;}
    }
    else{ this.y += this.speed;}
  }
}
else{
  if(this.direction == 'x'){
    if(this.multi>=0){
      if(this.x>=width-130-(170*this.multi)){
        if(stopLightStatus[this.multi][this.row]==1){
          this.x += this.speed;
          this.multi-=1;
        }
      }
      else{ this.x += this.speed;}
    }
    else{ this.x += this.speed;}
  }
  if(this.direction == 'y'){
    if(this.multi>=0){
      if(this.y>=height-130+(170*this.multi)){
        if(stopLightStatus[this.col][this.multi]==2){
          this.y += this.speed;
          this.multi-=1;
        }
      }
        else{ this.y += this.speed;}
    }
    else{ this.y += this.speed;}
  }
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
  constructor(x, y, row, col, direction, speed){
    super(x, y, row, col, direction, speed);
    this.c = color(225, 175, 100);
  }
}
