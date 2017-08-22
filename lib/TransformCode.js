const WrapFunctionBody = require( './WrapFunctionBody');
const GenerateVariables = require( './GenerateVariables');
const AnalysisDependenciesArgs = require( './AnalyseDependenciesArgs');
const TransformPlaceholderArgs = require( './TransformPlaceholderArgs');

module.exports = function({
    filename = '',
    dependencies = [],
    rawDependencies = [],
    patchList = [],
    functionBody = ''
}, {
    alias,
    replaceArgs,
    isPatch
}) {

    let args = TransformPlaceholderArgs({
        rawDependencies,
        args: AnalysisDependenciesArgs(functionBody),
        replaceArgs
    });

    const variableDefineStr = GenerateVariables({
        dependencies,
        filename,
        patchList,
        args
    }, {
        isPatch,
        alias
    });

    return WrapFunctionBody({
        functionBody,
        variableDefineStr,
        filename
    });
};