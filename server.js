const express = require('express');
const fs = require('fs');
const path = require('path');
//const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('microphone check');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
