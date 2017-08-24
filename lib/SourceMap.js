const {SourceMapGenerator} = require('source-map');

module.exports = function ({
    filename = '',
    headCode = '',
    sourceContent = '',
    targetContent = '',
    declarations = [],
} = {}) {
    const sourceCode = headCode + sourceContent;
    const sourceMap = new SourceMapGenerator();
    const headCodeCount = countLine(headCode);
    const sourceDepsLineCount = countLine(getSourceDepsLine(sourceContent));
    const commonLineCount = headCodeCount + 1 + 1;

    const sourceContentStartLine = commonLineCount + sourceDepsLineCount;
    const targetContentStartLine = commonLineCount + declarations.length;
    const targetContentCount = countLine(targetContent) - (1 + declarations.length);

    sourceMap.setSourceContent(filename, sourceCode);

    let i = 0;
    while (i < targetContentCount) {
        sourceMap.addMapping({
            source: filename,
            original: {
                line: sourceContentStartLine + i,
                column: 0
            },
            generated: {
                line: targetContentStartLine + i,
                column: 0
            }
        });
        i++;
    }
    return sourceMap;
};

function getSourceDepsLine(code) {
    const matched = /define\s*\([^{]*/g.exec(code);
    return (matched && matched[0]) || '';
}

function countLine (string) {
    return count(string, '\n');
}

function count(string, substr) {
    var num, pos;
    num = pos = 0;
    if (!substr.length) {
        return 1 / 0;
    }
    
    /* eslint-disable */
    while (pos = 1 + string.indexOf(substr, pos)) {
        /* eslint-enable */
        num++;
    }
    return num;
}