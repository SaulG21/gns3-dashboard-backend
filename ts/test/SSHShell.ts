var SSH2Shell = require('ssh2shell')
var value: any;

//host configuration with connection settings and commands
var host = {
    server: {
        host: "172.30.3.129",
        userName: "gns3",
        password: "gns3server",
    },
    commands: [""]
};

let SSH = new SSH2Shell(host);

function getOutputSSH(commandList: string) {
    return new Promise((resolve, reject) => {
        host.commands = [commandList];
        const ssh = new SSH2Shell(host);
        ssh.connect((data: any, err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);/*  */
            }
        });
    });
}


// const commands = [ "echo $HOME", "ifconfig" ];
const commands = [`sudo curl --interface virbr0 https://192.168.122.21/restconf/data/Cisco-IOS-XE-arp-oper:arp-data/ -k -u "admin:admin" -H "Accept: application/yang-data+json"`];

const getOutput = async () => {
    for await (const item of commands) {
        console.log(item);
        value = await getOutputSSH(item);
        var jsonOutput = ''
        const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
        const matches = value.match(jsonPattern);
        if (matches) {
            jsonOutput = matches.join('');
            console.log(JSON.parse(jsonOutput));
        };
    };
}

var curlCommand = ``;

getOutput();