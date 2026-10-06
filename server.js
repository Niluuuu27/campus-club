const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });


// Schema
const memberSchema = new mongoose.Schema({
    name: String,
    regNo: String,
    club: String
});


// Model
const Member = mongoose.model("Member", memberSchema);


// Display webpage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// Add member
app.post("/members", async (req, res) => {

    try {

        const member = new Member({
            name: req.body.name,
            regNo: req.body.regNo,
            club: req.body.club
        });

        await member.save();

        res.send(`
            <h2>Member Added Successfully!</h2>
            <a href="/">Add Another Member</a>
        `);

    } catch (error) {

        res.send("Error adding member");

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});