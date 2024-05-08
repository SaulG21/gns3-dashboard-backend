import { discoverTopology } from "./Discover";

export const BuildTopology = async function () {
    let routers: Record<string, any> = {};
    let [data, arpRoutersSet]: any = await discoverTopology("192.168.122.21");
    for (let key in data) {
      const routerList = Object.entries(routers);
      let routerFound = false;
  
      for (let [routerKey, router] of routerList) {
        // Check if the current router's neighbor list is a subset of the existing router's neighbor list
        const isSubset = router.neighbor.every((neighbor: string) => data[key].includes(neighbor));
  
        if (isSubset) {
          // Merge the interfaces and neighbor lists
          router.interfaces.push(key);
          router.neighbor = [...new Set([...router.neighbor, ...data[key]])];
          routerFound = true;
          break;
        }
      }
  
      if (!routerFound) {
        routers[`Router${routerList.length + 1}`] = {
          interfaces: [key],
          neighbor: data[key]
        };
      }
    }
    return [routers, Array.from(arpRoutersSet)];
    // console.log(routers);
  };

BuildTopology();