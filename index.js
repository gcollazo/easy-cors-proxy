var http = require('http'),
    request = require('request'),
    url = require('url');

var port = process.env.PORT || 8000,
    proxyURL = process.env.PROXY_URL || 'http://registry.npmjs.org:80/';

http.createServer(function (req, res) {
  var r = request(url.resolve(proxyURL, req.url));

  // Add CORS Headers
  r.on('response', function(_r) {
    _r.headers['Access-Control-Allow-Origin'] = '*';
    _r.headers['Access-Control-Allow-Methods'] = '*';
    _r.headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
  });

  // Stream the response
  req.pipe(r).pipe(res);
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);
