var net = require('net');

var client = net.createConnection(43, 'whois.nic.io', function() {

});

client.on('data', function(data) {

    console.log(data.toString());
    client.end();
});

client.on('end', function() {
    console.log('disconnected from server');
});

client.on('error', function(err) {
    console.log('连接出现错误');
    console.log(err);
    client.end();
});

client.on('timeout',function(){
  console.log('服务器连接超时');
});

client.on('connect', function() {
    console.log('connected to server');
    client.write('aiyou.io\r\n');
});
