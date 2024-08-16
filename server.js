const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('microphone check');
}) 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

