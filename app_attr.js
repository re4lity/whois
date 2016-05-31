var whois_servers;


exports.setWhoisServers = function(obj) {
    whois_servers = obj;
};

exports.getWhoisServers = function() {
    return whois_servers;
};
