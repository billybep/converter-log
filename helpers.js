const fs = require('fs')
const path = require('path')

const toPlainText = (dirPath, fileName) => {
  const data = JSON.stringify(fs.readFileSync(`${dirPath}/${fileName}`, 'utf-8'), null, 2)
  fs.writeFileSync(`saveFile/${fileName}.txt`, data)
}

const toJSonFile = (dirPath, fileName) => {  
  const doc = fs.readFileSync(`${dirPath}/${fileName}`, 'utf-8')
  const data = eval(JSON.stringify(doc))
  fs.writeFileSync(`saveFile/${fileName}.json`, data)
}

const toPlainTextWithOutput = (dirPath, fileName, outputFile) => {
  const getDir = outputFile.split('/')
  let createDir = ''
  console.log(getDir);

  getDir.forEach((directory, idx) => {
    if (getDir.length-2 !== idx && getDir[idx+1] != undefined ) {
      createDir += `${getDir[idx+1]}`
      createDir += `/`
    }
  })
  fs.mkdirSync(createDir, { recursive: true })
  const data = JSON.stringify(fs.readFileSync(`${dirPath}/${fileName}`, 'utf-8'), null, 2)
  fs.writeFileSync(path.join(__dirname, outputFile), data)
}

module.exports = {
  toPlainText,
  toJSonFile,
  toPlainTextWithOutput
}