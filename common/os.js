var os = require('os');

console.log('os.EOL');
console.log(os.EOL);

console.log('cpu的架构');
console.log(os.arch());

console.log('cpu 的核心');
console.log(os.cpus());

//  这个是啥
console.log('os.endianness()');
console.log(os.endianness());

console.log('可用的内存');
console.log('os.freemem()');
console.log(os.freemem());

console.log('os.homedir()');
console.log(os.homedir());

console.log('os.hostname()');
console.log(os.hostname());

// 这个是啥
console.log('os.loadavg()');
console.log(os.loadavg());

console.log('os.networkInterfaces()');
console.log(os.networkInterfaces());

console.log('os.platform()');
console.log(os.platform());

console.log('os.release()');
console.log(os.release());

console.log('os.tmpdir()');
console.log(os.tmpdir());

console.log('os.totalmem()');
console.log(os.totalmem());

console.log('os.type()');
console.log(os.type());

console.log('os.uptime()');
console.log(os.uptime());

console.log('os.userInfo()');
console.log(os.userInfo());
