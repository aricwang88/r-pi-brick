**THIS PROJECT IS NO LONGER MAINTAINED by clebert.**

# r-pi-brick

> [Deprecated] A Node.js API for the [BrickPi](http://www.dexterindustries.com/BrickPi/).

## Getting Started

### Installation

```sh
npm install r-pi-brick --save
```

### Integration

```javascript
var brick = require('r-pi-brick');
```

## API

### Overview

- [Events](#events)
- [brick.init([maxRetries])](#brickinitmaxretries)
- [brick.isMotorEnabled(port)](#brickismotorenabledport)
- [brick.setMotorEnabled(enabled, port)](#bricksetmotorenabledenabled-port)
- [brick.getMotorPosition(port)](#brickgetmotorpositionport)
- [brick.getMotorPower(port)](#brickgetmotorpowerport)
- [brick.setMotorPower(power, port)](#bricksetmotorpowerpower-port)
- [brick.getMotorSpeed(port)](#brickgetmotorspeedport)
- [brick.MOTOR_PORT_A](#brickmotor_port_a)
- [brick.MOTOR_PORT_B](#brickmotor_port_b)
- [brick.MOTOR_PORT_C](#brickmotor_port_c)
- [brick.MOTOR_PORT_D](#brickmotor_port_d)

### Events

#### The `error` Event

```javascript
brick.on('error', function (error) {
    // ...
});
```

#### The `init` Event

```javascript
brick.on('init', function () {
    // ...
});
```

#### The `update` Event

```javascript
brick.on('update', function () {
    // ...
});
```

### brick.init([maxRetries])

Initializes the serial connection to the [BrickPi](http://www.dexterindustries.com/BrickPi/).
Updates all brick values, every 10 ms, via the serial connection.
Retries an update if a serial communication timeout occurs.
The number of maximum retries has a default value of 3.

Emits an error if the number of maximum retries is exceeded.

```javascript
brick.init(3);
```

### brick.isMotorEnabled(port)

Returns the enabled flag of the motor plugged into the specified port.

```javascript
var enabledA = brick.isMotorEnabled(brick.MOTOR_PORT_A);
var enabledB = brick.isMotorEnabled(brick.MOTOR_PORT_B);

var enabledC = brick.isMotorEnabled(brick.MOTOR_PORT_C);
var enabledD = brick.isMotorEnabled(brick.MOTOR_PORT_D);
```

### brick.setMotorEnabled(enabled, port)

Sets the enabled flag of the motor plugged into the specified port.

```javascript
brick.setMotorEnabled(true, brick.MOTOR_PORT_A);
brick.setMotorEnabled(true, brick.MOTOR_PORT_B);

brick.setMotorEnabled(false, brick.MOTOR_PORT_C);
brick.setMotorEnabled(false, brick.MOTOR_PORT_D);
```

### brick.getMotorPosition(port)

Returns the position of the motor, in 0.5-degree increments, plugged into the specified port.
The position is an integer in the range of -1073741823 to 1073741823.
Divide by 2 to get degrees.

```javascript
var positionA = brick.getMotorPosition(brick.MOTOR_PORT_A);
var positionB = brick.getMotorPosition(brick.MOTOR_PORT_B);

var positionC = brick.getMotorPosition(brick.MOTOR_PORT_C);
var positionD = brick.getMotorPosition(brick.MOTOR_PORT_D);
```

### brick.getMotorPower(port)

Returns the power of the motor plugged into the specified port.
The power is an integer in the range of -100 to 100.

```javascript
var powerA = brick.getMotorPower(brick.MOTOR_PORT_A);
var powerB = brick.getMotorPower(brick.MOTOR_PORT_B);

var powerC = brick.getMotorPower(brick.MOTOR_PORT_C);
var powerD = brick.getMotorPower(brick.MOTOR_PORT_D);
```

### brick.setMotorPower(power, port)

Sets the power of the motor plugged into the specified port.
The power must be an integer in the range of -100 to 100.

```javascript
brick.setMotorPower(100, brick.MOTOR_PORT_A);
brick.setMotorPower(100, brick.MOTOR_PORT_B);

brick.setMotorPower(-100, brick.MOTOR_PORT_C);
brick.setMotorPower(-100, brick.MOTOR_PORT_D);
```

### brick.getMotorSpeed(port)

Returns the speed of the motor, in degrees per second, plugged into the specified port.

```javascript
var speedA = brick.getMotorSpeed(brick.MOTOR_PORT_A);
var speedB = brick.getMotorSpeed(brick.MOTOR_PORT_B);

var speedC = brick.getMotorSpeed(brick.MOTOR_PORT_C);
var speedD = brick.getMotorSpeed(brick.MOTOR_PORT_D);
```

### brick.MOTOR_PORT_A

This port should be used together with port B.

### brick.MOTOR_PORT_B

This port should be used together with port A.

### brick.MOTOR_PORT_C

This port should be used together with port D.

### brick.MOTOR_PORT_D

This port should be used together with port C.

## Example

This example rotates two motors A and B alternately in opposite directions.

```sh
node node_modules/r-pi-brick/example/rotator.js
```

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
