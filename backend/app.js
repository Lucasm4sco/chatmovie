import express from "express";
import router from "./routes/Routes.js";

const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use(router);
app.use(express.json()); 