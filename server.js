const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
const server = http.createServer(app);

const crashesPath = path.join(__dirname, 'crashes');

const upload = multer({
  dest: crashesPath,
}).single('upload_file_minidump');

app.post('/crashreports', upload, (request, response) => {
  const body = { ...request.body, filename: request.file.filename };
  const filePath = `${request.file.path}.json`;
  const crashReport = JSON.stringify(body);

  fs.writeFile(filePath, crashReport, error => {
    if (error) return console.error('Error Saving', crashReport);
    console.log('Crash Saved', filePath, crashReport);
  });

  response.end();
});

server.listen(3000, () => {
  console.log('Crash report server running on Port 3000.');
});
