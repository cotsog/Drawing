var jsdom = require('jsdom');
require('whatwg-fetch');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.Node = global.window.Node;
global.navigator = {
    userAgent: 'node.js',
};
