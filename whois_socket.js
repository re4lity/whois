var net = require('net');
var Q = require('q');
var logger = require('./common/logger');

exports.getWhois=getWhois;

function getWhois(domain, port, host) {
    var deferred = Q.defer();
    var socket = net.createConnection(port, host);

    socket.on('connect', function() {
        // 发送要查询的域名
        socket.write(domain + '\r\n');
    });
    socket.on('data', function(data) {
        deferred.resolve(data);
    });
    socket.on('end', function() {

    });
    socket.on('error', function() {
        logger.info(domain + ' domain socket has error ');
        deferred.reject(new WhoisException(domain + ' socket error'));
    });
    socket.on('timeout', function() {
        logger.infO(domain + ' domain socket has timeout ');
        deferred.reject(new WhoisException(domain + ' socket timeout'));
    });
    return deferred.promise;
}

function WhoisException(message) {
    this.message = message;
    this.name = 'RouteException';
}
