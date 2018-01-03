var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var csv=require('csvtojson');
var jsonfile = require('jsonfile');

app.use(fileUpload());

app.get('/', express.static('public'));

app.get('/download.json', function (req, res) {
    res.sendFile('files/data.json', { root: __dirname });
});

app.post('/upload', function(req, res) {
  if (!req.files)
    res.status(400).send('No files were uploaded.');
 
  let sampleFile = req.files.userfile;
  var file = 'files/data.json';
  sampleFile.mv('sample.csv', function(err) {
    if (err)
      res.status(500).send(err);
	
	csv()
		.fromFile('sample.csv')
		.on('end_parsed',(jsonObj)=>{
			jsonfile.writeFile(file, jsonObj, function (err) {
			  console.error(err)
			});
			res.json(jsonObj);
		})
		.on('done',(error)=>{
			//res.status(500).send(err);
		})
    
	
	
  });
});

app.listen(3000);