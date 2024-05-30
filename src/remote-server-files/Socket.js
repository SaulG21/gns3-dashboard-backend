const net = require('net');
const { spawn } = require('child_process');

let server;

const startServer = () => {
    server = net.createServer((socket) => {
        console.log('Client connected');

        let ipAddress = '';

        socket.on('data', (data) => {
            const message = data.toString();

            ipAddress = message;
            console.log(`IP address updated to: ${ipAddress}`);

            const command = `sudo curl --interface virbr0 https://${ipAddress}/restconf/data/Cisco-IOS-XE-arp-oper:arp-data/ -k -u "admin:admin" -H "Accept: application/yang-data+json"`;

            const child = spawn(command, {
                shell: true,
                timeout:1000
            });

            child.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                socket.write(data);
            });

            child.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            child.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                socket.end();
            });

        });
    });

    server.listen(8000, '172.30.3.129', () => {
        console.log('Server listening on 172.30.3.129:8000');
    });
};

const stopServer = () => {
    console.log('Stopping server...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);

startServer();
