function replaceWrapFunctionHead (result, str) {
    return result.replace(/^\s*function[^(]*\([^)]*\)\s*\{/, str);
}

module.exports = function ({
    functionBody,
    variableDefineStr
}) {
    let source = replaceWrapFunctionHead(functionBody, () => {
        return 'function module_exports () {' + '\n' + (variableDefineStr || '');
    });
    
    source += 'module.exports = module_exports.apply(this);';

    return source;
};
