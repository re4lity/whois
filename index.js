var base_app = require('./base_app');
var config = require('./config');
var whois = require('./whois');
var search = require('./search');

var logger = require('./common/logger');

// whois.getDomainWhois('xunasdasdasdasdull.io', config.whois_server).then(function(whois) {
//     logger.info(whois.isAvailable());
// }, function(err) {
//
// });

whois.getDomainArrWhois(search.getNumberArr(2),config.whois_server);
