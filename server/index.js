const express = require('express');

const app = express();


app.use(require('cors')());
app.use(express.json());

// use to set random value of app's 'secret' key
require('./vendors/utils')(app);

require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(3000);
