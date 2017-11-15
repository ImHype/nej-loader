const transformer = require('transform-cjs-nej');
const loaderUtils = require ('loader-utils');

function nejLoader(raw) {
    const filename = this.resourcePath;
    
    const {
        alias,
        outputAlias,
        replaceArgs,
        isPatch
    } = loaderUtils.getOptions(this) || {};

    this.cacheable && this.cacheable();

    const {
        compiled, sourceMap
    } = transformer({
        filename, raw
    }, {
        alias,
        outputAlias,
        replaceArgs,
        isPatch,
        needSourceMap: this.sourceMap
    });
    
    if (sourceMap) {
        var callback = this.async();
        return callback(null, compiled, sourceMap);
    }

    return compiled;
}

module.exports = nejLoader;