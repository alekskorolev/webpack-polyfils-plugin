var fs = require('fs'),
    ObjectDefinePropertyPolyfill,
    JSONPolyfill,
    html5ElementsPolyfill,
    indexOfPolyfill,
    bindPolyfill;

function PolyfillsPlugin(options) {
    PolyfillsPlugin.options = options || {};
}

PolyfillsPlugin.prototype.apply = function(compiler) {
    compiler.plugin("emit", function(compilation, callback) {
        if (compilation.assets[PolyfillsPlugin.options.bundle]) {
            if (PolyfillsPlugin.options.ObjectDefineProperty) {
                ObjectDefinePropertyPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/Object/defineProperty/polyfill.js'), 'utf8') || '';
                compilation.assets[PolyfillsPlugin.options.bundle]._source.children.unshift(ObjectDefinePropertyPolyfill);
            }
            if (PolyfillsPlugin.options.JSON) {
                JSONPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/JSON/polyfill.js'), 'utf8') || '';
                compilation.assets[PolyfillsPlugin.options.bundle]._source.children.unshift(JSONPolyfill);
            }
            if (PolyfillsPlugin.options.html5Elements) {
                html5ElementsPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/~html5-elements/polyfill.js'), 'utf8') || '';
                compilation.assets[PolyfillsPlugin.options.bundle]._source.children.unshift(html5ElementsPolyfill);
            }
            if (PolyfillsPlugin.options.indexOf) {
                indexOfPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/Array/prototype/indexOf/polyfill.js'), 'utf8') || '';
                compilation.assets[PolyfillsPlugin.options.bundle]._source.children.unshift(indexOfPolyfill);
            }
            if (PolyfillsPlugin.options.bind) {
                bindPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/Function/prototype/bind/polyfill.js'), 'utf8') || '';
                compilation.assets[PolyfillsPlugin.options.bundle]._source.children.unshift(bindPolyfill);
            }
            callback();
        }
    });
};

module.exports = PolyfillsPlugin;
