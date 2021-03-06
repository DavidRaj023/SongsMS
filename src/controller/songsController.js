const { sql,poolPromise } = require('../services/dbService')
const fs = require('fs');
const constants = require('../utils/constant');
const util = require('../utils/util');
const path = require('path');
const {excelWriteAll, excelWrite, excelRead} = require('../utils/excel');
const createPDF = require('../utils/pdf');

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
          res.send(song.name + " Successfully Added");
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
        const filePath = path.join(__dirname, constants.TEMP_UP_FILE);
        util.deleteFile(filePath);
        for (let i = 0; i < songsList.length; i++){
          const song = songsList[i];
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
        }
        res.status(201).send({
            message: "Added",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Faile to upload excel sheet data into database",
            error: error.message,
        });
    }
  }

  async exportExcel(req, res){
    try {
        const pool = await poolPromise
        const result = await pool.request().query(constants.QUERY_GETALLDATA);
        var songs = result.recordset;
        const file = await excelWriteAll(songs, constants.HEADER, constants.EXPORT_EXCEL);
        res.status(200).send({
            message: constants.SUCCESS_EXCEL_EXPORT,
            file: constants.EXPORT_EXCEL
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  }

  async exportPDF(req, res){
    try {
        if(req.body != null) {
          const songId = req.body.songId;
          const searchQuery = constants.QUERY_GET + songId;
          console.log(searchQuery);
          const pool = await poolPromise
          const result = await pool.request().query(searchQuery);

          const song = result.recordset[0];

          const Template = path.join(__dirname, '../../resources/Song_Template.pdf');
          
          const fileName = await createPDF(song, Template);
          res.send("Pdf Created in: " + fileName);
        } else {
          res.send('Please enter the valid song id !')
        }        
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
  }
  

  async searchSongs(req, res){
    try {
      const searchQuery = constants.QUERY_GETALLWHERE+ req.body.filter + ' = \'' + req.body.value + '\' ' + "ORDER BY name DESC";
      console.log(searchQuery);
      const pool = await poolPromise
      const result = await pool.request().query(searchQuery);
      const songs = result.recordset;
      if(songs.length == 0){
        res.status(200).send({
        result: "No match Found"
        })
      }
      console.log(songs);

      res.status(200).send({
        result: songs
      })

    } catch (error) {
      console.log(error);
    }
  }

  async searchExport(req, res){
    try {
      const searchQuery = constants.QUERY_GETALLWHERE+ req.body.filter + ' = \'' + req.body.value + '\'';
      const pool = await poolPromise
      const result = await pool.request().query(searchQuery);
      const songs = result.recordset;
      if(songs.length == 0){
        res.status(200).send({
        result: "No match Found"
        })
      }
      await excelWriteAll(songs, constants.HEADER, constants.EXPORT_SEARCH);
      res.status(200).send({
            message: constants.SUCCESS_EXCEL_EXPORT,
      });

    } catch (error) {
      console.log(error);
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
