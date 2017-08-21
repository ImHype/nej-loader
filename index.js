const Source = require('./source');
const analysis = require('./analysis');
const transform = require( './transform');
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

    let {
        headCode,
        content
    } = new Source().source(raw);
    
    const {
        code,
        dependencies,
        rawDependencies,
        patchList,
        functionBody
    } = analysis(content, {
        alias, filename
    });

    if (code !== -1) {
        content = transform({
            dependencies,
            rawDependencies,
            patchList,
            functionBody
        }, {
            alias: outputAlias,
            outputAlias,
            replaceArgs,
            isPatch
        });
    }

    return [headCode, content].join('');
}

module.exports = nejLoader;