import { DataArpPops } from "./functions/FindBoundaries"
import { RouterARPInterface } from "./catalogs/arp/arp.catalog"
import MakeRequest from "./functions/MakeRequest";
import { filterAddresses } from "./functions/FindBoundaries"


const breadthSearch = async function (ipAddres: string) {
  
  if (!ipAddres) {
    return;
  }
  const visited = new Set<string>();
  const toVisit = new Set<string>();
  toVisit.add(ipAddres);
  let tableArp: any;

  toVisit.forEach(
    async(nodeToVisit:string)=>{
      await MakeRequest(nodeToVisit)
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
        visited.add(ipAddres);
        toVisit.delete(ipAddres);
    }
  );

  console.log("nodes visited: ")
  for (const nodeVisited of visited) {
    console.log(nodeVisited);
  };

  console.log("nodes to visit: ")
  for (const nodeToVisit of toVisit) {
    console.log(nodeToVisit);
  };

};

breadthSearch("192.168.122.21");