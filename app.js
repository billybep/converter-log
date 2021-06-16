'use strict'

const Controller = require('./Controller')
const input = process.argv.slice(2)
const command = input[0]
const fileName = input[1]
const flagFormat = input[3]
const outputFile = input[5]

const payload = {
  fileName,
  flagFormat,
  outputFile
}

switch (command) {
  case 'mytools':
    Controller.readFile(payload)
    break;

  default:
    Controller.noInput()
    break;
}