const fs = require('fs');
const path = require('path')
const ext = '.txt'
const pathName = path.join(__dirname, 'files/')

const operations = {
    'btnCreate' : 'createFile',
    'btnDelete' : 'deleteFile',
}

createFile = (fileName) => {
    let contents = fileContentField.value
    fs.writeFile(pathName + fileName, contents, (err) => {
        result(err, 'created')
    })
    allFiles()
}

readFile = (fileName) => {
    fs.readFile(pathName + fileName, (err, data) => {
        result(err, 'read')
        fileContentField.value = data
        fileNameField.value = fileName.replace(ext, '')
    })
}

deleteFile = (fileName) => {
    fs.unlink(pathName + fileName, (err) => {
        result(err, 'deleted')
        fileNameField.value = ''
        fileContentField.value = ''
    })
    allFiles()
}

result = (err, operation) => {
    if(err){
        return console.log(err)
    }
    console.log("The file was succesfully " + operation)
}

addListeners = () => {
    for(o in operations){
        document.getElementById(o).addEventListener('click', (e) => {
            window[operations[e.target.id]](fileNameField.value + ext)
        })
    }
}

allFiles = () => {
    fs.readdir(pathName, function(err, filenames) {
        result(err, 'all files read')
        let fileListHTML = ''
        for(file in filenames){
            let name = filenames[file].replace(ext, '')
            fileListHTML += '<tr class="read" id="'+ file +'"><td>' + name + '</td><td>TXT<a/></td><td>1KB</td></tr>'
        }
        document.getElementById('fileList').innerHTML = fileListHTML
        document.querySelectorAll('.read').forEach((val)=>{
            val.addEventListener('click', () => {
                window['readFile'](filenames[val.id])
            })
        })
    })
}

// add actions to the buttons 
addListeners()

// read all files 
allFiles()
