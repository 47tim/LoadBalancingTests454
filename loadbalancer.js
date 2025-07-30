// Timothy Hyde 2025
// The most basic barebones round robin load balancer one can make
// Simply routes 

const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

// REPLACE THESE IPS WITH UPDATED 
// anytime servers are restarted. Use 'private address'' shown on AWS EC2 dashboard. 
// Add :80 after the address 
// ex: http://address:80
const targets = ['XXXX', 'XXXX'];
let current = 0;

const server = http.createServer((req, res) => {

  const target = targets[current % targets.length];

  current++;

  proxy.web(req, res, { target }, err => {

    res.writeHead(502);
    res.end('error ' + err.message);

  });

});

// Had problems before adding the 0.0.0.0, not entirely sure why?
// Also shouldn't have it listen on port 80 for security reasons, this was for the one time testing on my own machine...
server.listen(80, '0.0.0.0', () => {

  console.log('port 80');

});





