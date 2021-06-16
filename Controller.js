const View = require('./View')
const fs = require('fs')
const { toPlainText, toJSonFile, toPlainTextWithOutput } = require('./helpers')

let dirPath = "/var/log"
let dirBuf = Buffer.from(dirPath)


class Controller {

  static showHelp = _ => {
    View.commandHelp()
  }

  static noInput = _ => {
    View.noInput()
  }

  static readFile = (payload) => {

    const { fileName, flagFormat, outputFile } = payload

    if (fileName.includes('-h')) Controller.showHelp()
    else {

      fs.readdir(dirBuf, (err, files) => {
        if (err) console.log(err.message)
        else {
          // Jika file tidak ada
          if (!files.includes(fileName)) console.log("file doesn't exists");
          else {
            console.log('masuk ada file');
            // Jika file ada check output directory
            if (!outputFile) {
              // Jika tidak ada output > convert di local directory default 'saveFile'
              if (!flagFormat) {
                toPlainText(dirPath, fileName)
              } else {
                console.log('masuk ke flag format');
                if (flagFormat.toLowerCase().includes('text')) {
                  toPlainText(dirPath, fileName)
                } else if (flagFormat.toLowerCase().includes('json')) {
                  toJSonFile(dirPath, fileName)
                } else console.log("only support 'text' or 'json'")
              }
            } else {
              // Jika ada output, check output jika text/json convert sesuai output
              if (flagFormat.toLowerCase().includes('text')) {
                console.log('text')
                toPlainTextWithOutput(dirPath, fileName, outputFile)
              } else if (flagFormat.toLowerCase().includes('json')) {
                console.log('json')
              } else console.log("only support 'text' or 'json'")
            }
          }
        }
      })

    }
  }

}

module.exports = Controller