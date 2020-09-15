var http = require('http'),
    request = require('request'),
    url = require('url');

var port = process.env.PORT || 8000,
    proxyURL = process.env.PROXY_URL || 'http://registry.npmjs.org:80/',
    allowOrigin = process.env.ALLOW_ORIGIN || '*',
    allowMethods = process.env.ALLOW_METHODS || '*',
    allowHeaders = process.env.ALLOW_HEADERS || 'X-Requested-With'

http.createServer(function (req, res) {
  var hostname = url.parse(req.headers.referer || '').hostname || '';
  
  console.log(hostname.endsWith('.fandom.com') || hostname.endsWith('.wikia.org'));
  if (hostname.endsWith('.fandom.com') || hostname.endsWith('.wikia.org')) {
    var apiPath = '/api/v1';
    var reqUrl = req.url.startsWith(apiPath) ? req.url : apiPath + req.url;
    var r = request(proxyURL + reqUrl);

    // Add CORS Headers
    r.on('response', function(_r) {
      _r.headers['Access-Control-Allow-Origin'] = allowOrigin;
      _r.headers['Access-Control-Allow-Methods'] = allowMethods;
      _r.headers['Access-Control-Allow-Headers'] = allowHeaders;
    });

    // Stream the response
    req.pipe(r).pipe(res);
    
  } else {
    
    // Return empty JSON data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{}');
    res.end();
    
  }
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);
