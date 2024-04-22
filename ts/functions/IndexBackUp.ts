import { DataArpPops } from "./FindBoundaries"
import { RouterARPInterface } from "../catalogs/arp/arp.catalog"
import MakeRequest from "./functions/MakeRequest";
import { filterAddresses } from "./functions/FindBoundaries"



const breadthSearch = async function (ipAddres: string) {
  let tableArp: any;
  if (!ipAddres) {
    return;
  }
  await MakeRequest(ipAddres)
  .then(jsonValue => {
    // console.log(jsonValue); // Use the returned JSON data here
    if(!jsonValue){
      return;
    }
    tableArp = JSON.parse(jsonValue);
  })
  .catch(error => {
    console.error(error);
  })
  if(tableArp){
    // console.log("arp-table: ", tableArp['arp-oper']);
    console.log(`neighbors of ${ipAddres}: `, filterAddresses(tableArp['arp-oper']));
  } else {
    return;
  }
};

breadthSearch("192.168.10.29");