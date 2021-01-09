const app = require("./app");
const mongoose = require("mongoose");

require('dotenv').config();

const {PORT, MONGOURI} = process.env;


mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(PORT, () => {
        console.log("Application is running");
    }).on("error", (err) => {
        console.log(err);
    });
})
