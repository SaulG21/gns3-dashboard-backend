import express from "express";

const app = express();

import cors from 'cors';
import { BuildTopology } from "./src/functions/BuildTopology";
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server! jajsjs"));

app.get("/functions/build-topology", async (req, res) =>{
    const value = await BuildTopology();
    
    res.send(value);
});

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));