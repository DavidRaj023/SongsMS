
const ExcelJs = require('exceljs');
const path = require('path');
const readXlsxFile = require("read-excel-file/node");

//Export All
const excelWriteAll = async(songs, headers, filePath) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Cloud_EMS');
    worksheet.columns = headers;

    songs.forEach(song => {
        worksheet.addRow(song).commit();
    });
    const data = await workbook.xlsx.writeFile(filePath);
    console.log(data);
}

const excelRead = async(req) =>{
    try {
        if (req.file == undefined) {
            throw new Error("Please upload an excel file!");
        }
        
        const filePath = path.join(__dirname, '../../resources/static/assets/uploads/')
        let file = filePath+ req.file.filename;

        let songsList = [];
        await readXlsxFile(file).then((rows) => {
            rows.shift();// skip header
            rows.forEach((row) => {
                let song = {
                    name: row[0],
                    type: row[1],
                    albumName: row[2],
                    composerName: row[3],
                    singerName: row[4],
                    genreNames: row[5],
                    hasLyrics: row[6],
                    durationInSec: row[7],
                    releaseDate: row[8]
                };
                songsList.push(song);
            });
        });
        return songsList;
    } catch (error) {
        console.log(error);
        throw new Error("Could not upload the file: " + req.file.originalname, error);
    }
};


module.exports = {
    excelWriteAll,
    excelRead
};