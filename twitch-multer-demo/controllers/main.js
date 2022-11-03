import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const controller = {
    index: (req, res) => {
        return res.render("form");
    },
    storeAvatar: (req, res) => {
        if(req.file) {
            const usersDBPath = path.resolve(__dirname, "../data/users.json");
            let usersDB = JSON.parse(fs.readFileSync(usersDBPath));
            usersDB = [...usersDB, {
                nick: req.body.nickname,
                avatar: req.file.filename,
            }];
            fs.writeFileSync(usersDBPath, JSON.stringify(usersDB, null, 2));
            return res.send("OK, se envió todo bien");
        } else {
            return res.send("Hey, el archivo no es válido");
        }
    },
    storeAvatarComoApi: (req, res) => {
        console.log({ 
            body: req.body,
            file: req.file 
        })
        return res.json({ 
            message : "ok",
            imageFile: `http://localhost:3000/uploads/${req.file.filename}`
        })
    }
}