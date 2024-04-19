import { DataArpPops } from "./functions/FindBoundaries"
import { RouterARPInterface } from "./catalogs/arp/arp.catalog"
import MakeRequest from "./functions/MakeRequest";
import { filterAddresses } from "./functions/FindBoundaries"

const main = async function () {
    let tableArp:any;
    await MakeRequest("192.168.122.21")
      .then(jsonValue => {
        // console.log(jsonValue); // Use the returned JSON data here
        tableArp = JSON.parse(jsonValue);
        // console.log(tableArp);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(tableArp['arp-oper']);
    console.log("vecinos",filterAddresses(tableArp['arp-oper']))
};

main();