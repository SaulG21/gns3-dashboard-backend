import express from "express";

const app = express();

import cors from 'cors';
import { createTopology } from "./src/functions/CreateTopology";
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello from server! jajsjs"));

app.get("/functions/build-topology", async (req, res) =>{
    const data = await createTopology();
    console.log(data);
    res.send(data);
});

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));