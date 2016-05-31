var base_app = require('./base_express');
var config = require('./config');
var whois = require('./whois');
var search = require('./search');
var path = require('path');
var logger = require('./common/logger');
var app_attr = require('./app_attr');

var load_properties = require('./common/load_properties');

var whois_servers = load_properties.load(path.join(__dirname, './whois_server.properties'));
app_attr.setWhoisServers(whois_servers);

// whois.getDomainWhois('xunasdasdasdasdull.io', config.whois_server).then(function(whois) {
//     logger.info(whois.isAvailable());
// }, function(err) {
//
// });

// whois.getDomainArrWhois(search.getNumberArr(2),config.whois_server);
