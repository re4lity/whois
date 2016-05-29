var whois_socket = require('./whois_socket');
var logger = require('./common/logger');
var Q = require('q');

exports.getDomainWhois = function(domain, host) {
    var deferred = Q.defer();
    whois_socket.getWhois(domain, 43, host).then(function(data) {
        logger.info(data.toString());
        var whois = new Whois(data);
        deferred.resolve(whois);
    }, function(err) {
        logger.info(err);
        deferred.reject(err);
    });
    return deferred.promise;

};

/**
 * data 是buffer 类型
 * @param {[type]} data [description]
 */
function Whois(data) {
    this.data = data;
    this.isAvailable = isAvailable;
}


/**
 * 各个服务器返回的格式是不一样的，
 * 但是如果是已经注册了的域名的话，在返回的信息中有个过期时间的字段，暂时用这个办法区分域名是不是可以注册的
 * @return {[type]} [description]
 */
function isAvailable() {
    var data = this.data;
    var str = data.toString();
    return !str.toLowerCase().includes('expir');
}
