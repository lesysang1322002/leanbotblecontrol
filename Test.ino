#include <Leanbot.h>                    // use Leanbot library

String command;
const int speed = 1000;

void setup() {
  Leanbot.begin();                      // initialize Leanbot
}


void loop() {
  serialCheckCommand();
}

void serialCheckCommand(){
  if(Serial.available() > 0){
    command = Serial.readStringUntil('\n');
    Serial.println(command);
    if(command.StartsWith("Forward")) Forward();
    else if(command.StartsWith("Backward")) Backward();
    else if(command.StartsWith("Left")) Left();
    else if(command.StartsWith("Right")) Right();
  }
}

void Forward(){
  int distance = command.substring(8).toInt();
  LbMotion.runLR(speed, speed);
  LbMotion.waitDistance(distance);
  LbMotion.stopAndwait();
}

void Backward(){
  int distance = command.substring(9).toInt();
  LbMotion.runLR(-speed, -speed);
  LbMotion.waitDistance(distance);
  LbMotion.stopAndwait();
}

void Left(){
  int angle = command.substring(5).toInt();
  LbMotion.runL(-speed, +speed);
  LbMotion.waitRotationDeg (angle);
  LbMotion.stopAndwait();
}

void Right(){
  int angle = command.substring(6).toInt();
  LbMotion.runL(+speed, -speed);
  LbMotion.waitRotationDeg (angle);
  LbMotion.stopAndwait();
}