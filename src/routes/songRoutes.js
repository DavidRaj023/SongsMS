const express = require('express');
const router = new express.Router();
const controller = require('../controller/songsController')
const upload = require('../utils/upload');;

let routes = (app) => {
    try {
        router.post('/api/v1/addNewSong' , controller.addSong);
        router.post('/api/v1/addFromExcel', upload.single('file'), controller.insertFromExcel);
        app.use(router);    
    } catch (error) {
        console.log(error);
    }

};

module.exports = routes;