const express = require('express');
const bodyParser = require('body-parser');
const path = 'path';

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/sounds', (req, res) => {
  res.sendFile(path.join(__dirname, '../samples/drums/', 'drum.1.6.gg'));
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
