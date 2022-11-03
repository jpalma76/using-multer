import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mainRoutes from './routes/main.js';

const app = express();

//using middleware 
app.use(express.urlencoded({ extended : false }));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());

//setting template engine
app.set("view engine", "ejs");

app.use("/", mainRoutes) 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
