const CodeSplit = require('./lib/SplitCode');
const AnalyseCode = require('./lib/ParseCode');
const TransformCode = require( './lib/TransformCode');
const SourceMap = require( './lib/SourceMap');
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
        content: sourceContent
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
    } = AnalyseCode(sourceContent, {
        alias, filename
    });

    if (analysisCode === -1) {
        throw analysisError;
    }

    const {content: targetContent, declarations} = TransformCode({
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

    const compiled = [headCode, targetContent].join('');
    if (this.sourceMap) {
        const sourceMap = SourceMap({
            headCode,
            sourceContent,
            targetContent,
            declarations,
            filename
        });

        return this.callback(null, compiled, sourceMap.toJSON());
    }
    return compiled;
}

module.exports = nejLoader;