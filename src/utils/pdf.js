const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');

async function createPdf(song, input) {
  try {
      const filePath = path.join(__dirname, '../../resources/outputs/');
      const fileName = filePath + song.name + "_" + Date.now() +'.pdf';

      const pdfDoc = await PDFDocument.load(await readFile(input));
      const form = pdfDoc.getForm();
      //const fieldNames = pdfDoc.getForm().getFields();
      console.log(song.name);
      form.getTextField('Field1').setText(song.name);
      form.getTextField('Field2').setText(song.albumName);
      form.getTextField('Field3').setText(song.composerName);
      form.getTextField('Field4').setText(song.singerName);
      form.getTextField('Field5').setText(song.genreNames);
      form.getTextField('Field6').setText(song.hasLyrics);
      form.getTextField('Field7').setText('' + song.durationInSec);

      const releaseDate = '' + song.releaseDate;

      form.getTextField('Field8').setText('' + releaseDate.slice(0, -30) );
      form.getTextField('Field9').setText('Created by demo application');
      
      const pdfBytes = await pdfDoc.save();
      await writeFile(fileName, pdfBytes);
      console.log('PDF created!'); 
      return fileName;
  } catch (error) {
      console.log(error);
      return new Error(error);
  }
}

module.exports = createPdf;