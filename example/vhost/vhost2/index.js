exports.get = function (req, res, next) {
    res.status(200).json({
        "domain": "vhost2.apify.dev"
    });
};