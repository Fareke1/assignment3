const express = require('express');
const bodyParser = require('body-parser');
const http =require('http');
const sampleRoutes = require('./route/sample');
const {connectToMongoDB} = require('./mongodb')

const app = express();
const server = http.createServer(app);


app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



app.use(bodyParser.json());

app.use('/api',sampleRoutes);

const PORT = process.env.PORT || 3005;
// Start the server


connectToMongoDB()
  .then(() =>{
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) =>{
    console.log('Failed to connect to MongoDB:',error);
    process.exit(1);
  })