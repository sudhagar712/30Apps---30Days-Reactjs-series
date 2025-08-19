import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    text:{type: String, required:true, trim:true, minlength:1}
},{timestamps: true})


const Quote = mongoose.model("Quote", quoteSchema)

export default Quote;