import express from "express"
import { getQuotes, postQuotes, Quotedelete, QuotePut } from "../controller/QuoteController.js";

const router = express.Router()


router.get("/", getQuotes);
router.post("/", postQuotes);
router.put("/:id", QuotePut);
router.delete("/:id", Quotedelete)





export default router 