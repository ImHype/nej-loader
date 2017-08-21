const compile = require( './compile');
const getVariable = require( './getVariable');
const getArgsFromFunctionBody = require( './getArgsFromFunctionBody');
const replacePlaceholderArgs = require( './replacePlaceholderArgs');

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

    let args = replacePlaceholderArgs({
        rawDependencies,
        args: getArgsFromFunctionBody(functionBody),
        replaceArgs
    });

    const variableDefineStr = getVariable({
        dependencies,
        filename,
        patchList,
        args
    }, {
        isPatch,
        alias
    });

    return compile({
        functionBody,
        variableDefineStr,
        filename
    });
};