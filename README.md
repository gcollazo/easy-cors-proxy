# easy-cors-proxy

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This simple node.js app proxies a given `PROXY_URL` and adds all the necessary CORS headers. This is useful when creating client side application that need to access APIs on domains other than the one the app is being served from.

The simplest way to get this running is to click on the "Deploy to Heroku" button which will run the app for free in most cases.

## Environment Variables

### PROXY_URL

The URL of the server you want to proxy. Example: `http://example.com:80`.

### ALLOW_ORIGIN

The HTTP Origin you want to allow. Default value: `*`.

### ALLOW_METHODS

The HTTP Methods you want to allow. Default value: `*`.

### ALLOW_HEADERS

The HTTP Headers you want to allow. Multiple values separated by comma. Default value: `X-Requested-With`.
