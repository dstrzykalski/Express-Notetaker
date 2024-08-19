const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes/apiRoutes'));
app.use(require('./routes/htmlRoutes'));


app.listen(PORT, () => {
    console.log('microphone check');
});