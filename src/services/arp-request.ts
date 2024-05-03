import * as net from 'net';

export async function makeRequest(ipAddress:string){
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(8000, '172.30.3.129', () => {
      // console.log('Connected to remote server');
      client.write(ipAddress);
    });

    let responseData = '';

    client.on('data', (data) => {
      responseData += data.toString();
    });

    client.on('end', () => {
      resolve(responseData);
      // console.log(responseData);
      // console.log('Connection closed');
    });

    client.on('error', (err) => {
      console.error('Error:', err);
      reject(err);
    });
  });
}

export const parseDataToARP = function (data:string) {
  const jsonPattern = /\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g;
  const matches = data.match(jsonPattern);
    if (matches) {
      data = matches.join('');
      const tableArp = JSON.parse(data);
      return tableArp;
    }
    return {
      error: "An error has been ocurred with data:string"
    }
};

makeRequest("1.1.1.1");