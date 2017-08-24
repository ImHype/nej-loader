const SourceMap = require('../lib/SourceMap');
const {writeFileSync} = require('fs');
const AnalysisCode = require('../lib/ParseCode');
const TransformCode = require('../lib/TransformCode');
const SplitCode = require('../lib/SplitCode');

const raw = `define(['{lib}index.js',
'./b.js',
'//a.js',
'http://a.com/a.js'
], function(a) {
a = 1;
return a;
});`;
const filename = __filename;
let {
    headCode,
    content
} = SplitCode({
    raw, filename
});

const keyInfo = AnalysisCode(content, {
    alias: [
        {
            key: 'lib',
            value: '/xxx/'
        }
    ],
    filename
});

const {content: targetContent, declarations} = TransformCode(keyInfo, {
    alias: [],
    features: [],
    replaceArgs: [],
    isPatch: false
});
    
const sourceMap = SourceMap({
    filename,
    headCode,
    sourceContent: raw,
    targetContent,
    declarations
});

writeFileSync('./__fixure__/index.js.map', JSON.stringify(sourceMap.toJSON()));
writeFileSync('./__fixure__/index.js', headCode + targetContent + '\n//@ sourceMappingURL=./index.js.map');