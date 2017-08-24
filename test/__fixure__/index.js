function module_exports () {
    var a = require('../../../../../xxx/index');
    require('./b');
    require('../../../../../a');
    require('http:/a.com/a.js');
    a = 1;
    return a;
}module.exports = module_exports.apply(this);///Users/june/Works/nej-loader/test/SourceMap.js
//@ sourceMappingURL=./index.js.map