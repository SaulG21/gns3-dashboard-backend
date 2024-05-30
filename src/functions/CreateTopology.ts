//here it imports the BFS implementation.
import { breadthFirstSearch } from "./BreadthFirstSearch";

export const createTopology = async function () {
    let routers: Record<string, any> = {};
    // Discovers all routers in the network conected.
    let [data, arpRoutersSet]: any = await breadthFirstSearch("192.168.122.21");
    for (let key in data) {
      const routerList = Object.entries(routers);
      let routerFound = false;
  
      for (let [routerKey, router] of routerList) {
        // Checks if the current router's neighbor list is a subset of the existing router's neighbor list
        const isSubset = router.neighbor.every((neighbor: string) => data[key].includes(neighbor));
  
        if (isSubset) {
          // Merges the interfaces and neighbor lists
          router.interfaces.push(key);
          router.neighbor = [...new Set([...router.neighbor, ...data[key]])];
          routerFound = true;
          break;
        }
      }
  
      // if the router is not found it creates a new router item.
      if (!routerFound) {
        routers[`Router${routerList.length + 1}`] = {
          interfaces: [key],
          neighbor: data[key]
        };
      }
    }
    // It returns an array with all edges and all arp-tables.
    return [routers, Array.from(arpRoutersSet)];
  };
