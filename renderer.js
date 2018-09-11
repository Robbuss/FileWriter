const fs = require('fs');
const path = require('path')
const ext = '.txt'
const pathName = path.join(__dirname, 'files/')

const operations = {
    'btnCreate' : 'createFile',
    'btnRead' : 'readFile',
    'btnDelete' : 'createFile'
}

createFile = (file) => {
    let contents = fileContents.value
    fs.writeFile(file, contents, (err) => {
        result(err, 'created')
    })
}

readFile = (file) => {
    fs.readFile(file, (err, data) => {
        result(err, 'read')
        fileContents.value = data
    })
}

deleteFile = (file) => {
    fs.unlink(file, (err) => {
        result(err, 'deleted')
        fileName.value = ''
        fileContents.value = ''
    })
}

result = (err, operation) => {
    if(err){
        return console.log(err)
    }
    console.log("The file was succesfully " + operation)
}

for(o in operations){
  document.getElementById(o).addEventListener('click', () => {
    window[operations[o]](pathName + fileName.value + ext)
  })
}