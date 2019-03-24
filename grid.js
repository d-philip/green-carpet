var counter;
//Matrix for randomizing initial states of the stoplight at each intersection
var stopLightStatus =[[Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)],
                      [Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4),Math.floor(Math.random()*4)]];

var stopLightRightOrDown = [120,290,460,630,800];
//For determining which intersections the ambulance should travel through
var pathArray =[[0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]];

//Number of seconds to wait before switching times fps
const seconds = 5*60;
let car1, car2, ambulance;

var cars = [];

//Stores coords for ambulance to travel to
var xCoord = [];
var yCoord = [];
//Counter for indexing into ambulance travel coord data
coordCount = 0;
ambulanceCount = 0;

function setup() {
  createCanvas(1040,1040);
  counter = seconds;
  frameRate(60);

  ambulance = new Ambulance(505, 60, 0, 2, 'y', 3);

  cars[0] = new Car(80, 180, 0, 0, 'x', 1);
  cars[1] = new Car(100, 350, 1, 0, 'x', 2);
  cars[2] = new Car(100, 520, 2, 0, 'x', 1);
  cars[3] = new Car(80, 690, 3, 0, 'x', 3);
  cars[4] = new Car(80, 860, 4, 0, 'x', 1);
  cars[5] = new Car(180, 100, 0, 0, 'y', 1);
  cars[6] = new Car(350, 80, 0, 1, 'y', 3);
  cars[7] = new Car(520, 80, 0, 2, 'y', 2);
  cars[8] = new Car(690, 100, 0, 3, 'y', 2);
  cars[9] = new Car(860, 120, 0, 4, 'y', 1);
  cars[10] = new Car(100, 180, 0, 0, 'x', 2);
  cars[11] = new Car(80, 350, 1, 0, 'x', 3);
  cars[12] = new Car(100, 350, 1, 0, 'x', 2);
  cars[13] = new Car(100, 690, 3, 0, 'x', 1);
  cars[14] = new Car(100, 860, 4, 0, 'x', 2);
  cars[15] = new Car(180, 100, 0, 0, 'y', 3);
  cars[16] = new Car(350, 100, 0, 1, 'y', 2);
  cars[17] = new Car(520, 100, 0, 2, 'y', 3);
  cars[18] = new Car(860, 80, 0, 4, 'y', 3);
  cars[19] = new Car(860, 100, 0, 4, 'y', 2);
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

  //Enables clicked intersections
  for(var i = 0; i < 5; i++){
    for(var j = 0; j < 5; j++){
      if(pathArray[i][j] == 1){
        fill(255,215,0);
        rect(150+i  *170,150 + j* 170,50,50);
      }
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

  //Draws Ambulance
  //ambulance.display();
  //ambulance.move();

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

//Decides whether the light should be green or red
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
  if(this.x >= width){
    this.x = 0;
    this.multi = 0;
    this.speed = Math.floor(Math.random()*3);
  }else if(this.x <= 0){
    this.x = width;
    this.multi = 0;
    this.speed = -Math.floor(Math.random()*3);
  }else if(this.y >= width){
    this.y = 0;
    this.multi = 0;
    this.speed = Math.floor(Math.random()*3);
  }else if(this.y <= 0){
    this.y = width;
    this.multi = 0;
    this.speed = -Math.floor(Math.random()*3);
  }

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
  move(){

    ambulanceCount++;
    //Finds the direction that the ambulance will approach the next light from
    if(xCoord.length - ambulanceCount > 2){
      //Moving left
      if(xCoord[ambulanceCount + 1] - xCoord[ambulanceCount + 2] == -1){
        futureDir3 = 1;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir3;
      }
      //Moving right
      else if(xCoord[ambulanceCount + 1] - xCoord[ambulanceCount + 2] == 1){
        futureDir3 = 3;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir3;
      }
      //Moving down
      else if(yCoord[ambulanceCount + 1] - yCoord[ambulanceCount + 2] == -1){
        futureDir3 = 0;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir3;
      }
      //Moving up
      else{
        futureDir3 = 2;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir3;
      }
    }

    //Determines the direction that the ambulance will aproach the light two in the future from
    if(xCoord.length - ambulanceCount > 1){
      //Moving left
      if(xCoord[ambulanceCount] - xCoord[ambulanceCount + 1] == -1){
        futureDir2 = 1;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir2;
      }
      //Moving right
      else if(xCoord[ambulanceCount] - xCoord[ambulanceCount + 1] == 1){
        futureDir2 = 3;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir2;
      }
      //Moving down
      else if(yCoord[ambulanceCount] - yCoord[ambulanceCount + 1] == -1){
        futureDir2 = 0;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir2;
      }
      //Moving up
      else{
          futureDir2 = 2;
          stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir2;
      }
    }
    //Finds the direction that the ambulance will approach the next light from
    if(xCoord.length - ambulanceCount > 0){
      //Moving left
      if(xCoord[ambulanceCount - 1] - xCoord[ambulanceCount] == -1){
        futureDir1 = 1;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir1;
      }
      //Moving right
      else if(xCoord[ambulanceCount - 1] - xCoord[ambulanceCount] == 1){
        futureDir1 = 3;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir1;
      }
      //Moving down
      else if(yCoord[ambulanceCount - 1] - yCoord[ambulanceCount] == -1){
        futureDir1 = 0;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir1;
      }
      //Moving up
      else{
        futureDir1 = 2;
        stopLightStatus[xCoord[ambulanceCount]][yCoord[ambulanceCount]] = futureDir1;
      }
    }
  }
}


function mousePressed(){
  if(mouseX > 150 && mouseX < 200) mouseCol = 0;
  else if(mouseX > 320  && mouseX < 370) mouseCol = 1;
  else if(mouseX > 490  && mouseX < 540) mouseCol = 2;
  else if(mouseX > 660  && mouseX < 710) mouseCol = 3;
  else if(mouseX > 830  && mouseX < 880) mouseCol = 4;
  else mouseCol = -1;

  if(mouseY > 150 && mouseY < 200) mouseRow = 0;
  else if(mouseY > 320  && mouseY < 370) mouseRow = 1;
  else if(mouseY > 490  && mouseY < 540) mouseRow = 2;
  else if(mouseY > 660  && mouseY < 710) mouseRow = 3;
  else if(mouseY > 830  && mouseY < 880) mouseRow = 4;
  else mouseRow = -1;

  if(mouseRow != -1 && mouseCol != -1){
    pathArray[mouseCol][mouseRow] = 1;
    yCoord[coordCount] = mouseRow;
    xCoord[coordCount] = mouseCol;
    coordCount++;
  }

}
