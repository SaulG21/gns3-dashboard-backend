import { ArpInterface } from "../catalogs/arp/arp.catalog";
import { getNeighbors } from "./GetNeighbors";

interface Topology {
    [node: string]: string[];
}

export const breadthFirstSearch = async (startNode: string): Promise<[Topology, Set<ArpInterface>]> => {
    return new Promise(async(resolve, reject)=>{
        const topology: Topology = {};
        const visited: Set<string> = new Set();
        const queue: string[] = [];
        const arpTablesSet: Set<ArpInterface> = new Set();

        queue.push(startNode);
        visited.add(startNode);
    
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
    
            const [neighbors, arpTableCurrentNode] = await getNeighbors(currentNode);
            if (neighbors.length > 0){
                topology[currentNode] = neighbors;
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        //Omits the router of my classmate
                        if (neighbor != '192.168.122.202' && neighbor != "1.1.1.1"){
                            queue.push(neighbor);
                            if (arpTableCurrentNode){
                                arpTablesSet.add(arpTableCurrentNode);
                            }
                        }
                    }
                }
            }
        }
        resolve([topology, arpTablesSet]);
    })
};