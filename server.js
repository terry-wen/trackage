// modules =================================================
const express = require('express');
const app = express();
// set our port
const port = 3000;
app.get('/', (req, res) => res.send('trackage time'));

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`trackage listening on port ${port}`));