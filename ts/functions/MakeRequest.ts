import * as ssh from 'ssh2';
// import * as fs from 'fs';

export default function MakeRequest (ipAdd: string){
  return new Promise<string>((resolve, reject) => {
    const server_ip = '172.30.3.129';
    const username = 'gns3';
    const password = 'gns3server';
    const root_password = 'gns3server';
    const ip_router = ipAdd;
    // const outputFilePath = `../catalogs/arp/${ip_router}-arp.json`;
    let jsonValue = "";

    const client = new ssh.Client();
    client.on('ready', async () => {
      client.shell((error, stream) => {
        if (error) {
          reject(error);
          return;
        }
        let output = '';
        let jsonOutput = '';
        const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g; // Regular expression to match the JSON object globally

        stream.on('data', (data: Buffer) => {
          output += data.toString();
        });

        stream.write(`sudo curl --interface virbr0 https://${ip_router}/restconf/data/Cisco-IOS-XE-arp-oper:arp-data/ -k -u "admin:admin" -H "Accept: application/yang-data+json"\n`);
        stream.write(`${root_password}\n`);

        stream.on('close', async () => {
          const matches = output.match(jsonPattern);
          if (matches) {
            jsonOutput = matches.join('');
          }

          // fs.writeFile(outputFilePath, jsonOutput, (err: any) => {
          //   if (err) {
          //     console.error(`Error writing file: ${err}`);
          //   } else {
          //     console.log(`JSON output saved to ${outputFilePath}`);
          //   }
          // });

          jsonValue = jsonOutput;
          resolve(jsonValue.toString()); // Resolve the Promise with the JSON data
          client.end();
        });

        // Add a timeout to close the connection after 5 seconds
        setTimeout(() => {
          client.end();
        }, 1000);
      });
    }).connect({
      host: server_ip,
      username: username,
      password: password,
    });
  });
};

// MakeRequest("192.168.122.21")
//   .then(jsonValue => {
//     console.log(jsonValue); // Use the returned JSON data here
//   })
//   .catch(error => {
//     console.error(error);
//   });