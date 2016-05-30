var whois_socket = require('./whois_socket');
var logger = require('./common/logger');
var Q = require('q');
var Eventproxy = require('eventproxy');
var fs = require('fs');
var _async = require('async');
var config = require('./config');

function getDomainWhois(domain, host) {
    var deferred = Q.defer();
    whois_socket.getWhois(domain, 43, host).then(function(data) {
        // logger.info(data.toString());
        var whois = new Whois(domain, data);
        deferred.resolve(whois);
    }, function(err) {
        logger.info(err);
        deferred.reject(err);
    });
    return deferred.promise;
}

function getDomainArrWhois(domainArr, host) {

    var ep = new Eventproxy();
    var resultStr = '';
    ep.after('whois_over', domainArr.length, function() {
        fs.writeFile('./result/result.text', resultStr, function() {
            console.log('whois 结果写入文件完毕');
        });
    });
    var index = -1;
    var temp_interval = setInterval(function() {
        index += 1;
        if (index === domainArr.length) {
            clearInterval(temp_interval);
        } else {
            getDomainWhois(domainArr[index] + '.com', host).then(function(whois) {

                ep.emit('whois_over');

                logger.info(domainArr[index] + '.com');
                // buffer 好像不可以直接写字符串
                resultStr += whois.domain + ' is ' + whois.isAvailable() + '\n';
            }, function(err) {
                ep.emit('whois_over');
                console.log(er);

            });
        }
    }, config.query_interval);
}

exports.getDomainWhois = getDomainWhois;
exports.getDomainArrWhois = getDomainArrWhois;

/**
 * data 是buffer 类型
 * @param {[type]} data [description]
 */
function Whois(domain, data) {
    this.domain = domain;
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
