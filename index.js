var base_app = require('./base_app');
var config = require('./config');
var whois = require('./whois');

var logger = require('./common/logger');

whois.getDomainWhois('xunasdasdasdasdull.io', config.whois_server).then(function(whois) {
    logger.info(whois.isAvailable());
}, function(err) {

});
