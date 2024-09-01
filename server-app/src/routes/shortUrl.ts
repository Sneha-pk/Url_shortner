import express from "express";
import {
  createUrl,
  getAllUrl,
  getUrl,
  deleteUrl,
} from "../controllers/shortUrl";

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl);
router.get("/shortUrl/:id", getUrl); // Corrected path parameter syntax
router.delete("/shortUrl/:id", deleteUrl); // Corrected path parameter syntax

export default router;
