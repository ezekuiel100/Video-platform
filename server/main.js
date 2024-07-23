import express from "express";
const app = express();
import fs from "fs";

import cors from "cors";

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json({ limit: "100mb" }));

app.post("/upload", (req, res) => {
  const { file, fileName } = req.body;

  const filePath = `./videos/${fileName}`;

  const fileBuffer = Buffer.from(file, "base64");

  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar vídeo" });
    }

    res.status(201).json({ message: "Vídeo salvo com sucesso.", filePath });
  });
});

app.get({});

app.listen("3000", () => console.log("Server is running on port 3000"));
