const View = require('./View')
const fs = require('fs')
const { toPlainText,
        toJSonFile,
        toPlainTextWithOutput,
        toJSonFileWithOutput
      } = require('./helpers')

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

    if (!fileName) View.noInput()
    else if (fileName.includes('-h')) Controller.showHelp()
    else {

      fs.readdir(dirBuf, (error, files) => {
        if (error) View.failedMessage(error.message)
        else {
          // Jika file tidak ada
          if (!files.includes(fileName)) View.failedMessage("file doesn't exists")
          else {
            // Jika file ada check output directory
            if (!outputFile) {
              // Jika tidak ada output > convert di local directory default 'saveFile'
              if (!flagFormat) {
                toPlainText(dirPath, fileName)
              } else {

                if (flagFormat.toLowerCase().includes('text')) {
                  toPlainText(dirPath, fileName)
                  View.successMessage(fileName)
                } else if (flagFormat.toLowerCase().includes('json')) {
                  toJSonFile(dirPath, fileName)
                  View.successMessage(fileName)
                } else View.failedMessage("only support 'text' or 'json'")
              }
            } else {
              // Jika ada output, check output jika text/json convert sesuai output
              if (flagFormat.toLowerCase().includes('text')) {
                toPlainTextWithOutput(dirPath, fileName, outputFile)
                View.successMessage(fileName)
              } else if (flagFormat.toLowerCase().includes('json')) {
                toJSonFileWithOutput(dirPath, fileName, outputFile)
                View.successMessage(fileName)
              } else View.failedMessage("only support 'text' or 'json'")
            }
          }
        }
      })

    }
  }

}

module.exports = Controller