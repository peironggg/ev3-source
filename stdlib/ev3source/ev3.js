var ev3dev = require('../ev3dev-lang/bin/index.js');

/**
 * Hello world!
 *
 * @alias ev3_hello
 */
exports.hello = function() {
  console.log("Hello there! Welcome to LEGO ev3 (adapted by CS1101S)!");
};

/**
 * Checks if the peripheral is connected.
 *
 * @param {peripheral} obj - The peripheral to check.
 * @returns {boolean} true if the peripheral is connected, false otherwise
 * @alias ev3_connected
 */
exports.connected = function(obj) {
  return (typeof obj.connected === 'boolean') && obj.connected;
};

/**
 * Gets the motor connected to port A.
 *
 * @returns {peripheral} The motor connected to port A
 * @alias ev3_motorA
 */
exports.motorA = function() {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_A);
  return motor;
};

/**
 * Gets the motor connected to port B.
 *
 * @returns {peripheral} The motor connected to port B
 * @alias ev3_motorB
 */
exports.motorB = function() {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_B);
  return motor;
};

/**
 * Gets the motor connected to port C.
 *
 * @returns {peripheral} The motor connected to port C
 * @alias ev3_motorC
 */
exports.motorC = function() {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_C);
  return motor;
};

/**
 * Gets the motor connected to port D.
 *
 * @returns {peripheral} The motor connected to port D
 * @alias ev3_motorD
 */
exports.motorD = function() {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_D);
  return motor;
};

/**
 * Causes the motor to rotate for a specified number of rotations at the specified speed.
 *
 * Note: this works by sending instructions to the motors. This will return almost immediately, without waiting for the motor to actually run for the specified distance. If you wish to wait, use {@link ev3_pause}.
 *
 * @param {peripheral} motor - The motor
 * @param {number} rotations - The number of rotations to turn, in pulses of the rotary encoder
 * @param {number} speed - The speed to run at, in tacho counts per second
 * @alias ev3_runForDistance
 */
exports.runForDistance = function(motor, rotations, speed) {
  motor.runForDistance(rotations, speed);
};

/**
 * Causes the motor to rotate for a specified duration at the specified speed.
 *
 * Note: this works by sending instructions to the motors. This will return almost immediately, without waiting for the motor to actually run for the specified duration. If you wish to wait, use {@link ev3_pause}.
 *
 * @param {peripheral} motor - The motor
 * @param {number} time - The duration to turn, in milliseconds
 * @param {number} speed - The speed to run at, in tacho counts per second
 * @alias ev3_runForTime
 */
exports.runForTime = function(motor, time, speed) {
  motor.runForTime(time, speed);
};

/**
 * Causes the motor to rotate to the given absolute position (as reported by
 * {@link ev3_motorGetPosition}) with the given speed.
 *
 * Note: this works by sending instructions to the motors. This will return almost immediately, without waiting for the motor to reach the given absolute position. If you wish to wait, use {@link ev3_pause}.
 *
 * @param {peripheral} motor - The motor
 * @param {number} position - The absolute position to turn to
 * @param {number} speed - The speed to run at, in tacho counts per second
 * @alias ev3_runToAbsolutePosition
 */
exports.runToAbsolutePosition = function(motor, position, speed) {
  motor.runToAbsolutePosition(position, speed);
};

/**
 * Causes the motor to rotate until the position reaches <code>{@link ev3_motorGetPosition}()
 *  + position</code> with the given speed.
 *
 * Note: this works by sending instructions to the motors. This will return almost immediately, without waiting for the motor to reach the given absolute position. If you wish to wait, use {@link ev3_pause}.
 *
 * @param {peripheral} motor - The motor
 * @param {number} position - The amount to turn
 * @param {number} speed - The speed to run at, in tacho counts per second
 * @alias ev3_runToRelativePosition
 */
exports.runToRelativePosition = function(motor, position, speed) {
  motor.runToRelativePosition(position, speed);
};

/**
 * Gets the motor's current position, in pulses of the rotary encoder.
 *
 * @param {peripheral} motor - The motor
 * @returns {number} The current position.
 * @alias ev3_motorGetPosition
 */
exports.motorGetPosition = function(motor) {
  return motor.position;
}

/**
 * Gets the motor's current speed, in tacho counts per second.
 *
 * @param {peripheral} motor - The motor
 * @returns {number} The current speed.
 * @alias ev3_motorGetSpeed
 */
exports.motorGetSpeed = function(motor) {
  return motor.speed;
}

/**
 * Sets the speed the motor will run at the next time {@link ev3_motorStart}
 * is called.
 *
 * @param {peripheral} motor - The motor
 * @param {number} speed - The speed to run at, in tacho counts per second
 * @alias ev3_motorSetSpeed
 */
exports.motorSetSpeed = function(motor, speed) {
  motor.speedSp = speed;
}

/**
 * Causes the motor to start with the previously set speed and stop action
 * (see {@link motorSetSpeed} and {@link motorSetStopAction}).
 *
 * @param {peripheral} motor - The motor
 * @alias ev3_motorStart
 */
exports.motorStart = function(motor) {
  motor.start();
};

/**
 * Causes the motor to stop using the previously set stop action.
 *
 * @param {peripheral} motor - The motor
 * @alias ev3_motorStop
 */
exports.motorStop = function(motor) {
  motor.stop();
};

/**
 * Sets the stop action of the motor.
 *
 * Possible stop actions are:
 *
 * <ul><li><code>"coast"</code>: power will be removed from the motor and it will freely coast to a stop.</li>
 * <li><code>"brake"</code>: power will be removed from the motor and a passive electrical load will be placed on the motor. This load will absorb the energy from the rotation of the motors and cause the motor to stop more quickly than coasting.</li>
 * <li><code>"hold"</code>: actively try to hold the motor at the current position. If an external force tries to turn the motor, the motor will ‘push back’ to maintain its position.</li></ul>
 *
 * @param {peripheral} motor - The motor
 * @param {string} stopAction - The stop action to use
 * @alias ev3_motorSetStopAction
 */
exports.motorSetStopAction = function(motor, stopAction) {
  motor.setStopAction(stopAction);
}

/**
 * Causes the motor to stop using the previously set stop action.
 *
 * @param {peripheral} motor - The motor
 * @alias ev3_stop
 */
exports.stop = exports.motorStop;

/**
 * Gets the colour sensor connected any of ports 1, 2, 3 or 4.
 *
 * @returns {peripheral} The colour sensor.
 * @alias ev3_colorSensor
 */
exports.colorSensor = function() {
  var colorSensor = new ev3dev.ColorSensor();
  return colorSensor;
};

/**
 * Gets the amount of red seen by the colour sensor.
 *
 * @param {peripheral} colorSensor - The colour sensor.
 * @returns {number} The amount of red, in sensor-specific units.
 * @alias ev3_colorSensorRed
 */
exports.colorSensorRed = function(colorSensor) {
  return colorSensor.red;
}

/**
 * Gets the amount of green seen by the colour sensor.
 *
 * @param {peripheral} colorSensor - The colour sensor.
 * @returns {number} The amount of green, in sensor-specific units.
 * @alias ev3_colorSensorGreen
 */
exports.colorSensorGreen = function(colorSensor) {
  return colorSensor.green;
}

/**
 * Gets the amount of blue seen by the colour sensor.
 *
 * @param {peripheral} colorSensor - The colour sensor.
 * @returns {number} The amount of blue, in sensor-specific units.
 * @alias ev3_colorSensorBlue
 */
exports.colorSensorBlue = function(colorSensor) {
  return colorSensor.blue;
}

/**
 * Gets the reflected light intensity seen by the colour sensor.
 *
 * @param {peripheral} colorSensor - The colour sensor.
 * @returns {number} The reflected light intensity, as a percentage from 0 to 100.
 * @alias ev3_reflectedLightIntensity
 */
exports.reflectedLightIntensity = function(colorSensor) {
  return colorSensor.reflectedLightIntensity;
};

/**
 * Gets the ambient light intensity seen by the colour sensor.
 *
 * @param {peripheral} colorSensor - The colour sensor.
 * @returns {number} The ambient light intensity, as a percentage from 0 to 100.
 * @alias ev3_ambientLightIntensity
 */
exports.ambientLightIntensity = function(colorSensor) {
  return colorSensor.ambientLightIntensity;
};

/**
 * Gets the touch sensor connected to port 1.
 *
 * @returns {peripheral} The touch sensor.
 * @alias ev3_touchSensor1
 */
exports.touchSensor1 = function() {
  var touchSensor = new ev3dev.TouchSensor(ev3dev.INPUT_1);
  return touchSensor;
};

/**
 * Gets the touch sensor connected to port 2.
 *
 * @returns {peripheral} The touch sensor.
 * @alias ev3_touchSensor2
 */
exports.touchSensor2 = function() {
  var touchSensor = new ev3dev.TouchSensor(ev3dev.INPUT_2);
  return touchSensor;
};

/**
 * Gets the touch sensor connected to port 3.
 *
 * @returns {peripheral} The touch sensor.
 * @alias ev3_touchSensor3
 */
exports.touchSensor3 = function() {
  var touchSensor = new ev3dev.TouchSensor(ev3dev.INPUT_3);
  return touchSensor;
};

/**
 * Gets the touch sensor connected to port 4.
 *
 * @returns {peripheral} The touch sensor.
 * @alias ev3_touchSensor4
 */
exports.touchSensor4 = function() {
  var touchSensor = new ev3dev.TouchSensor(ev3dev.INPUT_4);
  return touchSensor;
};

/**
 * Gets whether the touch sensor is pressed.
 *
 * @param {peripheral} touchSensor - The touch sensor.
 * @returns {number} A value based on the amount of pressure detected by the touch sensor.
 * @alias ev3_touchSensorPressed
 */
exports.touchSensorPressed = function(touchSensor) {
  return touchSensor.getValue(0);
};

/**
 * Gets the ultrasonic sensor connected any of ports 1, 2, 3 or 4.
 *
 * @returns {peripheral} The ultrasonic sensor.
 * @alias ev3_ultrasonicSensor
 */
exports.ultrasonicSensor = function() {
  var ultrasonicSensor = new ev3dev.UltrasonicSensor();
  return ultrasonicSensor;
};

/**
 * Gets the distance read by the ultrasonic sensor in centimeters.
 *
 * @param {peripheral} ultrasonicSensor - The ultrasonic sensor.
 * @returns {number} The distance, in centimeters.
 * @alias ev3_ultrasonicSensorDistance
 */
exports.ultrasonicSensorDistance = function(ultrasonicSensor) {
  return ultrasonicSensor.distanceCentimeters;
};

/**
 * Gets the gyro sensor connected any of ports 1, 2, 3 or 4.
 *
 * @returns {peripheral} The gyro sensor.
 * @alias ev3_gyroSensor
 */
exports.gyroSensor = function() {
  var gyroSensor = new ev3dev.GyroSensor();
  return gyroSensor;
};

/**
 * Gets the rate of rotation detected by the gyro sensor.
 *
 * @param {peripheral} gyroSensor - The gyro sensor.
 * @returns {number} The rate of rotation, in degrees per second.
 * @alias ev3_gyroSensorRate
 */
exports.gyroSensorRate = function(gyroSensor) {
  return gyroSensor.rate;
};

/**
 * Gets the absolute angle detected by the gyro sensor, measured from when
 * the sensor was last switched to angle mode either by this method or by
 * {@link ev3_gyroSensorAngleMode}.
 *
 * @param {peripheral} gyroSensor - The gyro sensor.
 * @returns {number} The angle, in degrees.
 * @alias ev3_gyroSensorAngle
 */
exports.gyroSensorAngle = function(gyroSensor) {
  return gyroSensor.angle;
};

/**
 * Sets the gyro sensor to rate mode.
 *
 * @param {peripheral} gyroSensor - The gyro sensor.
 * @alias ev3_gyroSensorRateMode
 */
exports.gyroSensorRateMode = function(gyroSensor) {
  gyroSensor.mode = "GYRO-RATE";
};

/**
 * Sets the gyro sensor to angle mode. Angles reported will be relative to the position
 * the sensor was in when the sensor was last switched to angle mode.
 *
 * @param {peripheral} gyroSensor - The gyro sensor.
 * @alias ev3_gyroSensorAngleMode
 */
exports.gyroSensorAngleMode = function(gyroSensor) {
  gyroSensor.mode = "GYRO-ANG";
};

/**
 * Pauses for a period of time.
 *
 * @param {number} time - The time to wait, in milliseconds.
 * @alias ev3_pause
 */
exports.pause = function(time) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < time) {}
};

/**
 * Runs task() until terminateCondition() is true.
 *
 * @param {function} terminateCondition
 * @param {function} task
 * @alias ev3_runUntil
 */
exports.runUntil = function(terminateCondition, task) {
  while (!terminateCondition()) {
    task();
  }
};

var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

/**
 * Causes the robot to emit a sequence of beeps.
 *
 * The beep sequence is an array of <code>[frequency, length (ms), delay (ms), ...]</code>.
 * For example, <code>[1000, 500, 500, 250, 500, 0]</code> would cause the robot
 * to emit a 1000 Hz beep for 500 ms, wait 500 ms, then emit a 250 Hz beep for 500 ms.
 *
 * @param {Array} beeps - The beep sequence.
 * @alias ev3_playSequence
 */
exports.playSequence = function(beeps) {
  if (beeps.length < 3) {
    return;
  }

  var args = ["-f", beeps[0].toString(),
              "-l", beeps[1].toString(),
              "-D", beeps[2].toString()];
  for (var i = 0; i + 2 < beeps.length; i += 3) {
    args.push("-n");
    args.push("-f");
    args.push(beeps[i].toString());
    args.push("-l");
    args.push(beeps[i + 1].toString());
    args.push("-D");
    args.push(beeps[i + 2].toString());
  }
  execFile("beep", args);
};

/**
 * Causes the robot to speak.
 *
 * @param {string} script - The text to speak.
 * @alias ev3_speak
 */
exports.speak = function(script) {
  exec("espeak --stdin --stdout <<'EOF' | aplay\n" + script + "\nEOF\n");
};

var fs = require('fs');
var inputFile = fs.openSync("/dev/input/by-path/platform-gpio-keys.0-event", "r");
var buffer = new Buffer(16);
var lastButton;
var KEY_UP = 103
var KEY_DOWN = 108
var KEY_LEFT = 105
var KEY_RIGHT = 106
var KEY_ENTER = 28

/**
 * Waits until a button on the robot is pressed.
 *
 * The button that is pressed can be checked by {@link ev3_buttonEnterPressed},
 * {@link ev3_buttonUpPressed}, {@link ev3_buttonDownPressed}, {@link ev3_buttonLeftPressed}
 * and {@link ev3_buttonRightPressed}.
 *
 * @alias ev3_waitForButtonPress
 */
exports.waitForButtonPress = function() {
  var type, code, value;
  while (!((type == 1) && (value == 0))) {
    fs.readSync(inputFile, buffer, 0, 16, null);
    type = buffer.readUInt16LE(8);
    code = buffer.readUInt16LE(10);
    value = buffer.readUInt32LE(12);
  }
  lastButton = code;
};


/**
 * Checks if the button that released the last {@link ev3_waitForButtonPress}
 * was the enter (middle) button.
 *
 * @returns {boolean}
 * @alias ev3_buttonEnterPressed
 */
exports.buttonEnterPressed = function() {
  return lastButton == KEY_ENTER;
};

/**
 * Checks if the button that released the last {@link ev3_waitForButtonPress}
 * was the up button.
 *
 * @returns {boolean}
 * @alias ev3_buttonUpPressed
 */
exports.buttonUpPressed = function() {
  return lastButton == KEY_UP;
};

/**
 * Checks if the button that released the last {@link ev3_waitForButtonPress}
 * was the down button.
 *
 * @returns {boolean}
 * @alias ev3_buttonDownPressed
 */
exports.buttonDownPressed = function() {
  return lastButton == KEY_DOWN;
};

/**
 * Checks if the button that released the last {@link ev3_waitForButtonPress}
 * was the left button.
 *
 * @returns {boolean}
 * @alias ev3_buttonLeftPressed
 */
exports.buttonLeftPressed = function() {
  return lastButton == KEY_LEFT;
};

/**
 * Checks if the button that released the last {@link ev3_waitForButtonPress}
 * was the right button.
 *
 * @returns {boolean}
 * @alias ev3_buttonRightPressed
 */
exports.buttonRightPressed = function() {
  return lastButton == KEY_RIGHT;
};
