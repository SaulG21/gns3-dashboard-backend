import * as net from 'net';

export async function getARPTable(ipAddress:string){
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(8000, '172.30.3.129', () => {
      console.log('Connected to remote server');
      client.write(ipAddress);
    });

    let responseData = '';

    client.on('data', (data) => {
      responseData += data.toString();
    });

    client.on('end', () => {
      resolve(responseData);
      console.log('Connection closed');
    });

    client.on('error', (err) => {
      console.error('Error:', err);
      reject(err);
    });
  });
}

// getARPTable()
//   .then((value) => {
//     console.log('asdasdasd');
//     console.log(value);
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });