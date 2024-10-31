const mongoose = require("mongoose");
require("dotenv").config();

const ConnectWithDb = () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((error) => {
            console.log("DB facing issues");
            console.log(error);
            process.exit(1);
        });
};

module.exports = ConnectWithDb;
