var http = require('http'),
    request = require('request'),
    url = require('url');

var port = process.env.PORT || 8000,
    proxyURL = process.env.PROXY_URL || 'https://rhdhv--devfl.cs89.my.salesforce.com/',
	proxyURLContent = process.env.PROXY_URL_CONTENT || 'https://rhdhv--DevFL--c.cs89.content.force.com/',
    allowOrigin = process.env.ALLOW_ORIGIN || '*',
    allowMethods = process.env.ALLOW_METHODS || '*',
    allowHeaders = process.env.ALLOW_HEADERS || 'Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With'

http.createServer(function (req, res) {
  var r = '';
  if(req.url.indexOf('rtaImage') > -1){
    r = request(url.resolve(proxyURLContent, req.url));
  } else {
	r = request(url.resolve(proxyURL, req.url));
  }
 
  // Add CORS Headers
  r.on('response', function(_r) {
	_r.headers['Access-Control-Allow-Origin'] = allowOrigin;
    _r.headers['Access-Control-Allow-Methods'] = allowMethods;
    _r.headers['Access-Control-Allow-Headers'] = allowHeaders;
  });

  // Stream the response
  req.pipe(r).pipe(res);
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);

