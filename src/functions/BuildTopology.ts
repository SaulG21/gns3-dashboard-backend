import { discoverTopology } from "./Discover";

const compareArrays = (a:string[], b:string[]) => {
    if(a.length === b.length &&  a.every((element, index) => element === b[index])){
        return true;
    }
    return false;
}

const isInArray = function (value:any, array:any[]){
    let flag = false;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (value === element){
            flag = true;
            return true;
        }
    }
    return false;
}

// export const BuildTopology = async function () {

//     let routers:Record<string, any> = {}

//     let data:any = await discoverTopology("192.168.122.21");

//     for  (let key in data) {
//         const routerList = Object.entries(routers);
//         if (routerList.length > 0){
//             routerList.map((router)=>{
//                 if (compareArrays(data[key], router[1].neighbor)){
//                     let copyInterfaces:any = router[1].interfaces;
//                     copyInterfaces.push(key);
//                     router[1].interfaces = copyInterfaces;
//                 } else {
//                     console.log("creating a new router in key:", key);
//                     routers[`Router${routerList.length+1}`] = {
//                         interfaces: [key],
//                         neighbor:data[key]
//                     };
//                 }
//             });
//         } else {
//             routers[`Router${routerList.length+1}`] = {
//                 interfaces: [key],
//                 neighbor:data[key]
//             };
//         }
//     }

//     console.log(routers)

// };

export const BuildTopology = async function () {
    let routers: Record<string, any> = {};
    let data: any = await discoverTopology("192.168.122.21");
  
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
    return routers;
    // console.log(routers);
  };

BuildTopology();