const mongoose = require("mongoose");

const conn = async (req, res) => {
    try { 
        await mongoose
            .connect("mongodb+srv://apou:12345@cluster0.wehxy.mongodb.net/")
            .then(() => { 
                console.log("Connected");
            })
    } catch (error) {
        res.status(400).mjson({
            message: "Not Connected"
        });
    }
};

conn();