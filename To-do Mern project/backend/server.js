import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js"
import QuoteRoutes from "./routes/QuoteRoutes.js"

dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json())

const PORT = process.env.PORT || 9000

// test api 
app.get("/", (req,res)=> {
    res.send("hello guys i love u  ")
})

app.use("/api/quote", QuoteRoutes)

connectDB();

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})


