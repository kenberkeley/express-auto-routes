let express = require("express");
let bodyParser = require("body-parser");
let vhost = require('vhost');
let path = require("path");

app = express();

// domains definition
let domains = [
    {
        domain: "vhost1.apify.dev",
        controllersPath: "vhost/vhost1"
    },
    {
        domain: "vhost2.apify.dev",
        controllersPath: "vhost/vhost2"
    },
    {
        domain: "vhost3.apify.dev",
        controllersPath: "vhost/vhost3"
    },
    {
        domain: /127.0.0.1|localhost/,
        controllersPath: "vhost/localhost"
    }
];

// run autoroutes on each domain, using vhost.
domains.forEach(function(domain) {
    let domainApp = express();

    domainApp.use(bodyParser.json());
    domainApp.use(bodyParser.urlencoded({extended: false}));

    let autoRoutes = require('..')(domainApp);
    autoRoutes(path.join(__dirname, domain.controllersPath), domain.domain);

    app.use(vhost(domain.domain, domainApp));
});

// 404
app.use(function(req, res, next) {
    var err = new Error();
    err.status = 404;
    err.msg = 'Not found';
    next(err);
});

// err handler
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json(err);
});

// run node vhost.js and visit localhost:8081 in your browser
console.log('[INFO] Example running at localhost:8081');

app.listen(8081);