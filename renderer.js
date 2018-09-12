const fs = require('fs');
const path = require('path')
const File = require('./classes/File.js')
const Form = require('./classes/Form.js')

let form = new Form()
let file = new File(form)

addListeners = (file) => {
    for(i in file.form.operations){
        let operation = file.form.operations[i]
        let elem = file.form[operation]()
        if(elem){
            elem.addEventListener('click', (e) => {
                file[operation](file.name, file.content)
                file.all()
           })
        }
    }
}

// add actions to the buttons 
addListeners(file)
