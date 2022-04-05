const express = require('express');

const app = express();

const port = 3000;

app
    .get('/', (_, res) => {
        for (i = 0; i < 1e7; i += 1) {};
        res.end(`Hello from NodeJs`);
    })
    .listen(port, () => {
        console.log(`server pid: ${process.pid} \n`);
    })