exports.get = function (req, res, next) {
    res.status(200).json({
        "domain": "vhost1.apify.dev"
    });
};