import express from "express";

const app = express();

import cors from 'cors';
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server! jajsasjs"));
app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));