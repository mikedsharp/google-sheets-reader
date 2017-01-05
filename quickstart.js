var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1kS7juEJ9G4uxKSplOf5HnWsWC3f6F66moVzKMeTFqxI');
var sheet;

async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('./client_secret_2.json');
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 2,
      'max-row': 4,
      'return-empty': true
    }, function(err, cells) {
      var cellLike = cells[1];
      var lastLike = cells[2]; 
      var cellDislike = cells[27];
      var lastDislike = cells[28]; 


      cellLike.value = parseInt(cellLike.value) + 1; 
      cellDislike.value = parseInt(cellDislike.value) + 1; 
      lastLike.value = new Date(Date.now()).toString(); 
      lastDislike.value = new Date(Date.now()).toString(); 

      sheet.bulkUpdateCells(cells, step); //async
    });
  }
]);