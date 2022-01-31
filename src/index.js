const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const songsRouter = require('./routes/songRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
songsRouter(app);

const filePath = path.join(__dirname, '../resources/index.html');

app.get("/", (req, res) => {
  res.sendFile(filePath);
});

// app.post("/", (req, res) => {
//     console.log(req.body);
// })
app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
})



