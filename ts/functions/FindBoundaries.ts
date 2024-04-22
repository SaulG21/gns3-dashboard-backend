import { arpTable } from "../catalogs/arp/arp.catalog"
import { routerInfo } from "../catalogs/interfaces/interfaces.catalog"

export interface DataArpPops{
    address: string;
    enctype: string;
    interface: string;
    type: string;
    mode: string;
    hwtype: string;
    hardware: string;
    time: string;
};

// const hostName = routerInfo["Cisco-IOS-XE-native:native"].hostname;
// const dataArp = arpTable["Cisco-IOS-XE-arp-oper:arp-data"]["arp-vrf"][0]["arp-oper"];

// console.log(dataArp);

export const filterAddresses = function (arpData: DataArpPops[]) {

    const frequencyMap: Record<string, number> = {};
    arpData.forEach(entry => {
        const key = entry.hardware.slice(0,8);
        frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    });


    let mostFrequentCount = 0;
    let mostFrequentAddress: string | null = null;
    Object.entries(frequencyMap).forEach(([address, count]) => {
        if (count > mostFrequentCount) {
            mostFrequentCount = count;
            mostFrequentAddress = address;
        }
    });

    const uniqueEntries: DataArpPops[] = [];
    arpData.forEach(entry => {
        if (entry.hardware.slice(0,8) !== mostFrequentAddress || frequencyMap[entry.hardware] === 1) {
            uniqueEntries.push(entry);
        }
    });

    return uniqueEntries;
};

// export const uniqueMAC = filterAddresses(dataArp);
// console.log(`the ${hostName}'s neighbors are: `, uniqueMAC);