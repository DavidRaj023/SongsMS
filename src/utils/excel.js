
const ExcelJs = require('exceljs');
const path = require('path');
const readXlsxFile = require("read-excel-file/node");

const workbook1 = new ExcelJs.Workbook();
const worksheet1 = workbook1.addWorksheet('EMS');
    

const excelWriteAll = async(employees, headers, filePath) => {
    const workbook2 = new ExcelJs.Workbook();
    const worksheet2 = workbook2.addWorksheet('Cloud_EMS');
    worksheet2.columns = headers;

    employees.forEach(emp => {
        worksheet2.addRow(emp);
    });
    const data = await workbook2.xlsx.writeFile(filePath);
}

const excelWrite = async(employee, headers, filePath) => {
    worksheet1.columns = headers;
    worksheet1.addRow(employee);
    await workbook1.xlsx.writeFile(filePath);
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
    excelWrite,
    excelRead
};