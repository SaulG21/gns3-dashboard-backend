var SSH2Shell = require('ssh2shell');
import { filterAddresses } from "../functions/FindBoundaries";

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
        var jsonOutput = ''
        const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
        ssh.connect((data: any, err: any) => {
            if (err) {
                reject(err);
            } else {
                const matches = data.toString().match(jsonPattern);
                if (matches) {
                    jsonOutput = matches.join('');
                    console.log(jsonOutput)
                }
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

    const processNode = async (nodeToVisit: string) => {
        let tableArp: any;
        await getOutputSSH(nodeToVisit)
            .then(jsonValue => {
                if (jsonValue) {
                    tableArp = JSON.parse(jsonValue);
                }
            })
            .catch(error => {
                console.error(error);
            });
        if (tableArp != undefined) {
            let list = filterAddresses(tableArp['arp-oper']);
            let neighbor: string[] = [];
            list.map((item) => {
                neighbor.push(item.address);
            })
            // console.log(`neighbors of ${ipAddress}: `, neighbor);
            topology[ipAddress] = neighbor;
            visited.add(nodeToVisit);
            neighbor.map((address: string) => {
                // toVisit.add(address);
                breadthSearch(address);
            });
            toVisit.delete(nodeToVisit);
            return tableArp;
        }

    };

    await Promise.all(Array.from(toVisit).map(processNode));
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