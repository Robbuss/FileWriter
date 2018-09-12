class Form{

    constructor(){
        this.operations = ['read', 'create', 'delete']
    }

    read(){
        return document.getElementById('read')
    }

    create(){
        return document.getElementById('create')
    }

    delete(){
        return document.getElementById('delete')
    }        
    
    nameField(){
        return document.getElementById('fileNameField')
    }

    contentField(){
        return document.getElementById('fileContentField')
    }

    result(err, msg){
        if(err){
            return console.log(err)
        }
        console.log(msg)
    }
}
module.exports = Form