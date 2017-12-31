var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var csv=require('csvtojson');

app.use(fileUpload());

app.get('/', express.static('public'));

app.post('/upload', function(req, res) {
  if (!req.files)
    res.status(400).send('No files were uploaded.');
 
  let sampleFile = req.files.userfile;
 
  sampleFile.mv('sample.csv', function(err) {
    if (err)
      res.status(500).send(err);
	
	csv()
		.fromFile('sample.csv')
		.on('end_parsed',(jsonObj)=>{
			res.json(jsonObj);
		})
		.on('done',(error)=>{
			//res.status(500).send(err);
		})
    
	
	
  });
});

app.listen(3000);