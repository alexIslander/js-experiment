import express from "express";
import { Listing, listings } from "./listings";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", (_req, res) => {
    res.send("node-graphql-v1-server is running...");
  });

app.get("/listings", (_req, res) => {
    res.send(listings);
  });

app.post('/add-listing', (req, res) => {
    const newListItem: Listing = req.body;
    listings.push(newListItem);
    return res.sendStatus(204);
});

app.delete('/delete-listing', (req, res) => {
    const id: string = req.body.id;

    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
        return res.send(listings.splice(i, 1));
        }
    }
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);