var express = require('express');

var home = require('./controllers/home');

var router = express.Router();

router.get('/', home.index);
router.post('/search', home.search);

router.post('/getWhoisServers', home.getWhoisServers);

module.exports = router;
