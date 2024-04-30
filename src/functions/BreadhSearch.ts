import { filterAddresses } from "./FindBoundaries";
import { makeRequest, parseDataToARP } from "../services/arp-request";
import { ArpInterface } from "../catalogs/arp/arp.catalog"

const breadthSearch = async function (graph:any,toVisit:Set<string>, visited:Set<string>) {
    return new Promise((resolve, reject)=>{
        if (toVisit.size == 0){
            reject("the node already has been visited");
            return;
        }
        Promise.all(Array.from(toVisit).map((nodeToVisit)=>{
            return new Promise((resolve, reject) => {
                if (visited.has(nodeToVisit)){
                    return;
                }
                let tableArp: ArpInterface;
                makeRequest(nodeToVisit)
                    .then(jsonValue => {
                        if (jsonValue) {
                            tableArp = parseDataToARP(jsonValue as string);
                            if (tableArp) {
                                let list = filterAddresses(tableArp['arp-oper']);
                                let neighbor: string[] = [];
                                list.map(async (item) => {
                                    neighbor.push(item.address);
                                    toVisit.add(item.address);
                                });
                                let keyValue:any = {}
                                keyValue[nodeToVisit] = neighbor;
                                visited.add(nodeToVisit);
                                toVisit.delete(nodeToVisit);
                                resolve(keyValue);
                                breadthSearch(graph, toVisit, visited);
                            }
                        } else {
                            resolve("");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            });
        })).then(promises =>{
        console.log(promises);
        });
    });
};

const main = async function (ipAddress: string) {
    if (!ipAddress) {
        return;
    }

    let topology:any = {}

    const toVisit = new Set<string>();
    const visited = new Set<string>();

    toVisit.add(ipAddress);

    console.log(await breadthSearch(topology, toVisit, visited));

};

main("192.168.122.21");