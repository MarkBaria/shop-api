const http = require('http');
const app = require('./app')
const server = http.createServer(app);
const port = process.env.PORT || 3001

// server.listen(3001,console.log('app is running'));
server.listen(port,()=>{console.log('app are running on localhost:'+port)});