import express from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const port = process.env.PORT;

app.get("/",(req,res) => {
    res.send("Hello from backend")
});

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})