/*Cú pháp câu lệnh điêu khiển:
  Forward + distance  + cm
  Backward + distance  + cm
  Turn Left + angle + degree
  Turn Right + angle + degree
  Ví dụ: 
  Forward 10 cm
  Backward 10 cm
  Turn Left 90 degree
  Turn Right 90 degree
*/

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
    if(command.startsWith("Forward")) Forward();
    else if(command.startsWith("Backward")) Backward();
    else if(command.startsWith("Left")) Left();
    else if(command.startsWith("Right")) Right();
  }
}

void Forward(){
  int distance = 10;
  LbMotion.runLR(speed, speed);
  LbMotion.waitDistanceMm(distance*10);
  LbMotion.stopAndWait();
}

void Backward(){
  int distance = command.substring(9).toInt();
  LbMotion.runLR(-speed, -speed);
  LbMotion.waitDistanceMm(distance*10);
  LbMotion.stopAndWait();
}

void Left(){
  int angle = command.substring(5).toInt();
  LbMotion.runLR(-speed, +speed);
  LbMotion.waitRotationDeg (angle);
  LbMotion.stopAndWait();
}

void Right(){
  int angle = command.substring(6).toInt();
  LbMotion.runLR(+speed, -speed);
  LbMotion.waitRotationDeg (angle);
  LbMotion.stopAndWait();
}