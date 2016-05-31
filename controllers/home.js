var config = require('../config');
var app_attr = require('../app_attr');
var whois = require('../whois');


exports.index = function(req, res, next) {
    res.render('index');
};

exports.search = function(req, res, next) {
    console.log(req.body);
    var domain_name = req.body.domain_name;
    var domain_server = req.body.domain_server;
    var whois_servers = app_attr.getWhoisServers();
    var server_host = whois_servers.get(domain_server);
    whois.getDomainWhois(domain_name + domain_server, server_host).then(function(whois) {
        var result = {};
        result.isAvailable = whois.isAvailable();
        res.status(200).json(result);
    }, function(data) {

    });
    console.log(server_host);
    res.status(200);
};

exports.getWhoisServers = function(req, res, next) {

    var result = {};
    var whois_servers = app_attr.getWhoisServers();
    result.keys = whois_servers.keys();

    res.status(200).json(result);
};
