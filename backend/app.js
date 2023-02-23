import express from "express";
import router from "./routes/Routes.js";
import bodyParser from "body-parser";
import connectionDB from "./data/db.js";

const app = express();
const PORT = 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.use('/perfil', express.static('uploads/perfil'))
app.use('/capa', express.static('uploads/capa'))

connectionDB();

