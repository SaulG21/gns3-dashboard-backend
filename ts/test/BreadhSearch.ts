var SSH2Shell = require('ssh2shell');
import { filterAddresses } from "../functions/FindBoundaries";

let tableArp:any;

var host = {
    server: {
        host: "172.30.3.129",
        userName: "gns3",
        password: "gns3server",
    },
    commands: [""]
};

let SSH = new SSH2Shell(host);

function getOutputSSH(ipAddress: string) {
    return new Promise((resolve, reject) => {
        host.commands = [`sudo curl --interface virbr0 https://${ipAddress}/restconf/data/Cisco-IOS-XE-arp-oper:arp-data/ -k -u "admin:admin" -H "Accept: application/yang-data+json"`];
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

const breadthSearch = async function (ipAddress: string) {
    if (!ipAddress) {
        return;
    }

    const visited = new Set<string>();
    const toVisit = new Set<string>();

    let topology: any = {}

    toVisit.add(ipAddress);

    for await (const item of Array.from(toVisit)) {
        console.log(item);
        var value:any = await getOutputSSH(item);
        var jsonOutput = ''
        const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
        const matches = value.match(jsonPattern);
        if (matches) {
            jsonOutput = matches.join('');
            // console.log(JSON.parse(jsonOutput));
            tableArp = JSON.parse(jsonOutput);
        };
        if (tableArp != undefined) {
            let list = filterAddresses(tableArp['arp-oper']);
            let neighbor: string[] = [];
            list.map((item) => {
                neighbor.push(item.address);
            })
            // console.log(`neighbors of ${ipAddress}: `, neighbor);
            topology[ipAddress] = neighbor;
            visited.add(item);
            neighbor.map((address: string) => {
                // toVisit.add(address);
                breadthSearch(address);
            });
            toVisit.delete(item);
        }
    };



    // console.log("nodes visited: ");
    // for (const nodeVisited of visited) {
    //   console.log(nodeVisited);
    // }

    // console.log("nodes to visit: ");
    // for (const nodeToVisit of toVisit) {
    //   console.log(nodeToVisit);
    // }

    if (topology) {
        console.log(topology);
    }

};

breadthSearch("192.168.122.21");