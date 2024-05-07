import { resolve } from "path";
import { ArpInterface, arpTable } from "../catalogs/arp/arp.catalog";
import { makeRequest, parseDataToARP } from "../services/arp-request";
import { filterAddresses } from "./FindBoundaries";
import { rejects } from "assert";

interface Topology {
    [node: string]: string[];
}

// const discoverTopology = async (startNode: string): Promise<Topology> => {
//     const topology: Topology = {};
//     const visited: Set<string> = new Set();
//     const queue: string[] = [];

//     queue.push(startNode);
//     visited.add(startNode);

//     while (queue.length > 0) {
//         const currentNode = queue.shift()!;

//         const neighbors = await getNeighbors(currentNode);
//         if (neighbors.length > 0){
//             topology[currentNode] = neighbors;
//             // console.log(topology)
//             for (const neighbor of neighbors) {
//                 if (!visited.has(neighbor)) {
//                     visited.add(neighbor);
//                     queue.push(neighbor);
//                 }
//             }
//         }
//     }
//     return topology;
// };

export const discoverTopology = async (startNode: string): Promise<Topology> => {
    return new Promise(async(resolve, reject)=>{
        const topology: Topology = {};
        const visited: Set<string> = new Set();
        const queue: string[] = [];
    
        // console.log(startNode);
        queue.push(startNode);
        visited.add(startNode);
    
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
    
            const [neighbors, table] = await getNeighbors(currentNode);
            if (neighbors.length > 0){
                // console.log(neighbors);
                topology[currentNode] = neighbors;
                // console.log(topology)
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        // funa al router de mi compañero jorge xd
                        if (neighbor != '192.168.122.202'){
                            queue.push(neighbor);
                        }
                    }
                }
            }
        }
        resolve(topology);
    })
};

export const getNeighbors = async (node: string): Promise<[string[], ArpInterface | undefined]> => {
    // Send a request (e.g., ARP request) to the given node
    const jsonValue = await makeRequest(node);
    // console.log(await makeRequest(node));
    let tableArp: ArpInterface;
    if (jsonValue) {
        // Parse the response to get a list of neighbor nodes
        tableArp = parseDataToARP(jsonValue as string);
        // console.log(tableArp);
        // Return the list of neighbor nodes
        const list = filterAddresses(tableArp['arp-oper']);
        const neighbor: string[] = [];
        list.forEach((item) => {
            neighbor.push(item.address);
        });
        return [neighbor, tableArp];
    };
    return [[],undefined];
};

// discoverTopology("192.168.122.21").then(data=>{
//     console.log(data);
// });