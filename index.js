const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
require('./routes/user')(app);
require('./config/db_conn');




app.listen(port, () => {
    console.log(`app is listening at ${port}`);
});