const CodeSplit = require('./lib/SplitCode');
const AnalyseCode = require('./lib/ParseCode');
const TransformCode = require( './lib/TransformCode');
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
        code: codeSplitCode,
        err: codeSplitError,
        headCode,
        content
    } = CodeSplit({
        raw, filename
    });

    if (codeSplitCode === -1) {
        throw codeSplitError;
    }

    const {
        code: analysisCode,
        err: analysisError,
        dependencies,
        rawDependencies,
        patchList,
        functionBody
    } = AnalyseCode(content, {
        alias, filename
    });

    if (analysisCode === -1) {
        throw analysisError;
    }

    content = TransformCode({
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