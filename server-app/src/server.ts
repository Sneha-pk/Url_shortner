import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotenv.config();
connectDB();

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Use the router middleware
app.use("/api/", shortUrl);

app.get("/", (req, res) => {
  res.send("Hello World.");
});
app.use("/api/", shortUrl);

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
