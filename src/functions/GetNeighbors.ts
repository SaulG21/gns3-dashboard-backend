import { ArpInterface } from "../catalogs/arp/arp.catalog";
import { makeRequest, parseDataToARP } from "../services/arp-request";
import { filterAddresses } from "./FilterAdresses";


export const getNeighbors = async (node: string): Promise<[string[], ArpInterface | undefined]> => {
    // Sends a request to the given node
    const jsonValue = await makeRequest(node);
    let tableArp: ArpInterface;
    if (jsonValue) {
        // Parses the response to get a list of neighbor nodes
        tableArp = parseDataToARP(jsonValue as string);
        // Returns the list of neighbor nodes
        const list = filterAddresses(tableArp['arp-oper']);
        const neighbor: string[] = [];
        list.forEach((item) => {
            neighbor.push(item.address);
        });
        return [neighbor, tableArp];
    };
    return [[],undefined];
};