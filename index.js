const source = require('./source');
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
        code: sourceCode,
        err: sourceError,
        headCode,
        content
    } = source(raw, filename);

    if (sourceCode === -1) {
        console.error(sourceError);
        return [headCode, content].join('');
    }

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
            functionBody,
            filename
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