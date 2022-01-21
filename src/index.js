const express = require('express');
const path = require('path');

const songsRouter = require('./routes/songRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
songsRouter(app);

app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
})
