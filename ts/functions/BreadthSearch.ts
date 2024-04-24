import MakeRequest from "./MakeRequest";
import { filterAddresses } from "./FindBoundaries";
import { ArpInterface } from "../catalogs/arp/arp.catalog"

const breadthSearch = async function (ipAddress: string) {
  if (!ipAddress) {
    return;
  }

  const visited = new Set<string>();
  const toVisit = new Set<string>();

  let topology:any={}

  toVisit.add(ipAddress);

  const processNode = async (nodeToVisit: string) => {
    let tableArp: any;
    await MakeRequest(nodeToVisit)
      .then(jsonValue => {
        if (jsonValue) {
          tableArp = JSON.parse(jsonValue);
        }
      })
      .catch(error => {
        console.error(error);
      });

    if (tableArp!=undefined) {
      let list = filterAddresses(tableArp['arp-oper']);
      let neighbor:string[] = [];
      list.map((item)=>{
        neighbor.push(item.address);
      })
      console.log(`neighbors of ${ipAddress}: `, neighbor);
      topology[ipAddress]=neighbor;
      visited.add(nodeToVisit);
      neighbor.map((address:string)=>{
        // toVisit.add(address);
        breadthSearch(address);
      });
      toVisit.delete(nodeToVisit);
      return tableArp;
    }
    
  };

  await Promise.all(Array.from(toVisit).map(processNode));

  console.log("nodes visited: ");
  for (const nodeVisited of visited) {
    console.log(nodeVisited);
  }

  console.log("nodes to visit: ");
  for (const nodeToVisit of toVisit) {
    console.log(nodeToVisit);
  }

  if (topology) {
    console.log(topology);
  }

};

breadthSearch("192.168.122.21");