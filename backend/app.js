import express from "express";
import expressWs from "express-ws";
import bodyParser from "body-parser";
import connectionDB from "./data/db.js";
import userRoutes from "./routes/userRoutes.js";
import { getMessageRoutes } from "./routes/messageRoutes.js";

const app = express();
const wsInstance = expressWs(app)
const PORT = 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/perfil', express.static('uploads/perfil'));
app.use('/capa', express.static('uploads/capa'));

app.get('/', (req, res) => res.send('API Working'));

app.use('/api/users', userRoutes);
app.use('/api/message', getMessageRoutes(wsInstance.getWss()));
 
connectionDB();

