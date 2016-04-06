var fs = require('fs'),
    ObjectDefinePropertyPolyfill,
    JSONPolyfill;

function PolyfillsPlugin(options) {
    this.options = options || {};
}

PolyfillsPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    if (this.options.ObjectDefineProperty) {
        ObjectDefinePropertyPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/Object/defineProperty/polyfill.js'), 'utf8') || '';
        compilation.assets[this.options.bundle]._source.children.unshift(ObjectDefinePropertyPolyfill);
    }
    if (this.options.JSON) {
        JSONPolyfill = fs.readFileSync(require.resolve('polyfill-service/polyfills/JSON/polyfill.js'), 'utf8') || '';
        compilation.assets[this.options.bundle]._source.children.unshift(JSONPolyfill);
    }
    callback();
  });
};

module.exports = PolyfillsPlugin;