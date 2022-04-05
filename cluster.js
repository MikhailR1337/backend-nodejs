const cluster = require('cluster');
const os = require('os');

const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`master pid is: ${pid} \n`);
    console.log(`CPUs counts is: ${cpusCount} \n`);
    for (i = 0; i < cpusCount - 1; i += 1) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            console.log(`worker is died, his pid: ${worker.process.pid}`);
            cluster.fork();
        })
        worker.send('Hello from Master');
        worker.on('message', (msg) => {
            console.log(`This is message from worker this pid ${worker.process.pid}: ${JSON.stringify(msg)} \n`);
        })
    };

}

if (cluster.isWorker) {
    require('./worker.js');
    process.on('message', (msg) => {
        console.log(`Message from Master: ${msg}`);
    })
    process.send({ text: 'hello', pid });
}