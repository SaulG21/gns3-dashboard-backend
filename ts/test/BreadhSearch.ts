var SSH2Shell = require('ssh2shell');
import { filterAddresses } from "../functions/FindBoundaries";
import { getARPTable } from "../services/arp-request";

let tableArp: any;

const breadthSearch = async function (ipAddress: string) {
    if (!ipAddress) {
        return;
    }

    const visited = new Set<string>();
    const toVisit = new Set<string>();

    let topology: any = {}

    toVisit.add(ipAddress);

    for await (const item of Array.from(toVisit)) {
        const value: any = await getARPTable(item);
        if(value){
            // console.log("holaaaaaaa");
            // console.log(value);
            var jsonOutput = ''
            const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
            const matches = value.match(jsonPattern);
            // console.log(matches);
            if (matches) {
                jsonOutput = matches.join('');
                tableArp = JSON.parse(jsonOutput);
            };
            if (tableArp) {
                let list = filterAddresses(tableArp['arp-oper']);
                let neighbor: string[] = [];
                list.map((arpItem) => {
                    neighbor.push(arpItem.address);
                    breadthSearch(arpItem.address);
                })
                topology[item] = neighbor;
                visited.add(item);
                neighbor.map((address: string) => {
                    toVisit.add(address);
                });
                toVisit.delete(item);
                console.log(tableArp);             
            };
        };
    };

    if (topology) {
        console.log(topology);
    }
};

breadthSearch("192.168.122.21");