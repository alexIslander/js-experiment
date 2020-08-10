"use strict";
// console.log("Hello world");
// const one = 1;
// const two = 2;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(`1 + 2 =${one + two}`);
// const express = require('express');
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 5000;
const one = 1;
const two = 2;
// app.get('/', (req, res) => res.send('hello world ayeeeeeeeeee'));
app.get("/", (req, res) => res.send(`1 + 2 = ${one + two}`));
app.listen(port);
console.log(`[app] : http://localhost:${port}`);
