import { filterAddresses } from "./FindBoundaries";
import { makeRequest, parseDataToARP } from "../services/arp-request";
import { ArpInterface } from "../catalogs/arp/arp.catalog";

const breadthSearch = async function (graph: any, toVisit: Set<string>, visited: Set<string>): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (toVisit.size === 0) {
            resolve(graph);
            return;
        }

        const nodeToVisit = toVisit.values().next().value;

        if (!visited.has(nodeToVisit)) {
            visited.add(nodeToVisit);

            let tableArp: ArpInterface;
            const jsonValue = await makeRequest(nodeToVisit);

            if (jsonValue) {
                tableArp = parseDataToARP(jsonValue as string);
                if (tableArp) {
                    const list = filterAddresses(tableArp['arp-oper']);
                    const neighbor: string[] = [];
                    list.forEach((item) => {
                        neighbor.push(item.address);
                        if (!visited.has(item.address)) {
                            toVisit.add(item.address);
                        }
                    });
                    graph[nodeToVisit] = neighbor;
                    toVisit.delete(nodeToVisit);
                    console.log(graph);
                    const promises = Array.from(toVisit).map((node) => {
                        return new Promise((resolve, reject) => {
                            if (visited.has(node)) {
                                resolve({});
                            } else {
                                makeRequest(node)
                                    .then((jsonValue) => {
                                        if (jsonValue) {
                                            resolve(parseDataToARP(jsonValue as string));
                                        } else {
                                            resolve({});
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        reject(error);
                                    });
                            }
                        });
                    });

                    await Promise.all(promises)
                        .then(() => breadthSearch(graph, toVisit, visited))
                        .then(resolve)
                        .catch(reject);
                }
            }
        } else {
            await breadthSearch(graph, toVisit, visited)
                .then(resolve)
                .catch(reject);
        }
    });
};

const main = async function (ipAddress: string) {
    if (!ipAddress) {
        return;
    }
    const topology: any = {};
    const toVisit = new Set<string>();
    const visited = new Set<string>();
    toVisit.add(ipAddress);
    const result = await breadthSearch(topology, toVisit, visited);
    console.log(result);
};

main("192.168.122.21");