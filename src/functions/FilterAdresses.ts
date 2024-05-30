// It defines an interface to match with ARP table items.
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

// The main function recieves an ARP table.
export const filterAddresses = function (arpData: DataArpPops[]) {
    // It creates a frecuency map to know which interfaces are own of the router.
    const frequencyMap: Record<string, number> = {};
    arpData.forEach(entry => {
        // Here it splits the fisrt 8 characters to check the MAC address.
        const key = entry.hardware.slice(0,8);
        frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    });

    let mostFrequentCount = 0;
    let mostFrequentAddress: string | null = null;
    // It iterates the frecuencyMap to know which MAC address substring is the most frecuent.
    Object.entries(frequencyMap).forEach(([address, count]) => {
        if (count > mostFrequentCount) {
            mostFrequentCount = count;
            mostFrequentAddress = address;
        }
    });

    // It defines a new array that will contain the unique MAC addresses.
    const uniqueEntries: DataArpPops[] = [];
    arpData.forEach(entry => {
        if (entry.hardware.slice(0,8) !== mostFrequentAddress || frequencyMap[entry.hardware] === 1) {
            uniqueEntries.push(entry);
        }
    });

    // It returns the new array.
    return uniqueEntries;
};