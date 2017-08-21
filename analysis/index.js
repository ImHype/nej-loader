const isomorphicDefine = require('./isomorphicDefine');

function createCompiler(source) {
    const compileFunctionString = [
        'const {define, output} = isomorphicDefine(options);',
        'const NEJ = {define};',
        source,
        ';return output();'
    ].join('');
    return new Function('isomorphicDefine', 'options', compileFunctionString);
}

function analysis(source, {
    alias, filename
}) {
    let dependencyInfo, compiler;

    try {
        compiler = createCompiler(source);
    } catch (err) {
        
        return {
            code: -1,
            filename,
            err
        };
    }

    try {
        dependencyInfo = compiler(isomorphicDefine, {
            alias: alias,
            filename: filename
        });
    } catch (err) {
        return {
            code: -1,
            filename,
            err
        };
    }

    return dependencyInfo;
}

module.exports = analysis;
