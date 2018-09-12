
const fs = require('fs');
const path = require('path')

class File{
    constructor(form){
        this.ext = '.txt'
        this.pathName = path.join(__dirname, '../files/')
        this.form = form
        this.name = null
        this.content = null
        this.all()
    } 

    get name(){
        return this.form.nameField().value
    }

    set name(value) {
        this.form.nameField().value = value
    }

    get content(){
        return this.form.contentField().value
    }

    set content(value){
        this.form.contentField().value = value
    }

    create(name, content) {
        fs.writeFile(this.pathName + name + this.ext, content, (err) => {
            this.form.result(err, 'File created')
        })
        this.all()
    }

    read(name){
        fs.readFile(this.pathName + name, (err, data) => {
            this.form.result(err, 'File read')
            this.name = name.replace(this.ext, '')
            this.content = data
        })
    }

    delete(name){
        fs.unlink(this.pathName + name + this.ext, (err) => {
            this.form.result(err, 'File deleted')
            this.name = ''
            this.content = ''
        })
        this.all()            
    }

    all(){
        fs.readdir(this.pathName, (err, filenames) => {
            this.form.result(err, filenames.length + ' filed loaded.')
            let fileListHTML = ''
            for(i in filenames){
                let name = filenames[i].replace(this.ext, '')
                fileListHTML += '<tr class="read" id="'+ i +'"><td>' + name + '</td><td>TXT<a/></td><td>1KB</td></tr>'
            }
            document.getElementById('fileList').innerHTML = fileListHTML

            document.querySelectorAll('.read').forEach((val)=>{
                val.addEventListener('click', () => {
                    this.read(filenames[val.id])
                })
            })
        })
    }

}
module.exports = File