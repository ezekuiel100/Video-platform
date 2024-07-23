import express from "express";
const app = express();

import fs from "fs";
import cors from "cors";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "100mb" }));
app.use("/videos", express.static("./videos"));

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

app.get("/", (req, res) => {
  fs.readdir("./videos", (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao listar videos" });
    }

    const videoUrl = files.map((fileName) => ({
      fileName,
      url: `http://localhost:3000/videos/${fileName}`,
    }));

    res.json(videoUrl);
  });
});

app.listen("3000", () => console.log("Server is running on port 3000"));
