import Quote from "../model/quoteModel.js";
import mongoose from "mongoose";

// get all quotes

export const getQuotes = async (req, res) => {
  try {
    const quote = await Quote.find();

    res.json(quote);
  } catch (error) {
    res.json("internal server errror");
  }
};

//  post quotes

export const postQuotes = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Please fill them " });
    }

    const created = await Quote.create({ text: text.trim() });

    res.json(created);
  } catch (error) {
    res.json("internal server errror");
  }
};

// put request

export const QuotePut = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("Invalid Quoutes ID");
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    const updated = await Quote.findByIdAndUpdate(
      id,
      { text: text.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};





// delete Quotes 
export const Quotedelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("Invalid Quoutes ID");
    }

    const deleted = await Quote.findByIdAndDelete(id);

    res.json(deleted);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
