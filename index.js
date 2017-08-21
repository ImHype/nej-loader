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
        throw sourceError;
    }

    const {
        code: analysisCode,
        err: analysisError,
        dependencies,
        rawDependencies,
        patchList,
        functionBody
    } = analysis(content, {
        alias, filename
    });

    if (analysisCode === -1) {
        throw analysisError;
    }

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

    return [headCode, content].join('');
}

module.exports = nejLoader;