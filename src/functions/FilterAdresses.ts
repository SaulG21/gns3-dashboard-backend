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