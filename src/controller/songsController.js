const { sql,poolPromise } = require('../services/dbService')
const fs = require('fs');
const constants = require('../utils/constant');
const util = require('../utils/util');
const {excelWriteAll, excelWrite, excelRead} = require('../utils/excel');

class MainController {
  async addSong(req, res){
    try {
        if(req.body != null) {
          const song = req.body;
          await validate(song.name);
          const pool = await poolPromise;
          const result = await pool.request()
          .input('name',sql.VarChar , song.name)
          .input('type',sql.VarChar , song.type)
          .input('albumName',sql.VarChar , song.albumName)
          .input('composerName',sql.VarChar , song.composerName)
          .input('singerName',sql.VarChar , song.singerName)
          .input('genreNames',sql.VarChar , song.genreNames)
          .input('hasLyrics',sql.VarChar , song.hasLyrics)
          .input('durationInSec',sql.Int , song.durationInSec)
          .input('releaseDate',sql.Date , song.releaseDate)
          .query(constants.QUERY_INSERT);
          res.send(result);
        } else {
          res.send('Please fill all the details!')
        }        
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
  }
  
  async insertFromExcel(req, res){
    try {
        const songsList = await excelRead(req);
        console.log(songsList);
        filePath = path.join(__dirname, constants.TEMP_UP_FILE);
        // util.deleteFile(filePath);
        res.status(201).send({
            message: "constants.SUCCESS_EXCEL_UPLOADED + req.file.originalname",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "constants.ERROR_EXCEL_IMPORT",
            error: "error.message",
        });
    }
  }
}

const validate = async(value) =>{
  try {
    const pool = await poolPromise
    const result = await pool.request()
    .query(constants.QUERY_GETALLNAME)
    var data = result.recordset;
    const check = util.findFromSet(value, data);
    if(check){
      throw new Error("The song name "+ value) + " has been already tacken";
    }
  } catch (error) {
      throw new Error(error);
  }
}

const controller = new MainController();
module.exports = controller;
