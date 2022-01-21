const fs = require('fs')

exports.deleteFile = (path) => {
    try {
        fs.unlinkSync(path);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

exports.findFromSet = (value, recordset) =>{
    try {
        console.log('from utill')
        var data = [];
        for (var i = 0; i < recordset.length; i++){
            data.push(recordset[i].name);
		}
        console.log('utill ends')
        return data.some(item => item.toLowerCase() == value.toLowerCase());
    } catch (error) {
        
    }
}
