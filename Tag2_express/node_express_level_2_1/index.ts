import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

app.get("/people", (req, res) => {});
app.get("/starship", (req, res) => {});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
