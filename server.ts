import express from "express";

const app = express();

import cors from 'cors';
import { BuildTopology } from "./src/functions/BuildTopology";
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server! jajsjs"));

app.get("/functions/build-topology", async (req, res) =>{
    const data = await BuildTopology();
    console.log(data);
    res.send(data);
});

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));