'use strict';

var EventEmitter = require('events').EventEmitter;
var SerialPort   = require('./serialport').SerialPort;
var ts           = require('typesystem');
var utils        = require('./utils');

var brick = module.exports = new EventEmitter();

var isPort = function (value) {
    return ts.isInteger(value) && value >= 0 && value <= 3;
};

var isPower = function (value) {
    return ts.isInteger(value) && value >= -100 && value <= 100;
};

var Motor = function () {
    this.enabled  = false;
    this.position = NaN;
    this.power    = 0;
    this.speed    = NaN;
};

var motors = [
    new Motor(),
    new Motor(),
    new Motor(),
    new Motor()
];

brick.MOTOR_PORT_A = 0;
brick.MOTOR_PORT_B = 1;
brick.MOTOR_PORT_C = 2;
brick.MOTOR_PORT_D = 3;

brick.isMotorEnabled = function (port) {
    return motors[ts.checkArgument(port, isPort)].enabled;
};

brick.setMotorEnabled = function (enabled, port) {
    motors[ts.checkArgument(port, isPort)].enabled = ts.checkArgument(enabled, ts.isBoolean);

    return brick;
};

brick.getMotorPosition = function (port) {
    return motors[ts.checkArgument(port, isPort)].position;
};

brick.getMotorPower = function (port) {
    return motors[ts.checkArgument(port, isPort)].power;
};

brick.setMotorPower = function (power, port) {
    motors[ts.checkArgument(port, isPort)].power = ts.checkArgument(power, isPower);

    return brick;
};

brick.getMotorSpeed = function (port) {
    return motors[ts.checkArgument(port, isPort)].speed;
};

var maxRetries;
var serialPort;

var transmit = function (address, retries) {
    var motor1 = (address === 1) ? motors[0] : motors[2];
    var motor2 = (address === 1) ? motors[1] : motors[3];

    var data = utils.packData(utils.createData(motor1, motor2), address);

    return serialPort.write(data).then(serialPort.read).then(function (data) {
        if (data) {
            utils.updatePositions(motor1, motor2, data);

            var time = Date.now();

            utils.updateSpeed(motor1, time);
            utils.updateSpeed(motor2, time);
        } else if (retries === maxRetries) {
            throw new Error('Maximum number of retries exceeded.');
        } else {
            return transmit(address, retries + 1, maxRetries);
        }
    });
};

var update = function () {
    transmit(1, 0, maxRetries).then(function () {
        return transmit(2, 0, maxRetries);
    }).then(function () {
        brick.emit('update');

        setTimeout(update, 10);
    }).catch(function (error) {
        brick.emit('error', error);
    });
};

brick.init = function () {
    if (serialPort) {
        throw new Error('This module is already initialized.');
    }

    maxRetries = ts.checkArgument(arguments[0], ts.isInteger, 3);
    serialPort = new SerialPort(10);

    serialPort.open().then(function () {
        brick.emit('init');

        update();
    }).catch(function (error) {
        brick.emit('error', error);
    });
};
