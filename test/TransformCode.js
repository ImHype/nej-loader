const AnalysisCode = require('../lib/AnalysisCode');
const TransformCode = require('../lib/TransformCode');

const expect = require('chai').expect;

describe('Transform', function () {
    it('primitive', function () {
        const keyInfo = AnalysisCode(`define([
            '{lib}index.js',
            './b.js',
            '//a.js',
            'http://a.com/a.js'
        ], function(a) {
            a = 1;
            return a;
        });`, {
                alias: [
                    {
                        key: 'lib',
                        value: '/xxx/'
                    }
                ],
                filename: __filename
            }
        );

        const str = TransformCode(keyInfo, {
            alias: [],
            features: [],
            replaceArgs: [],
            isPatch: false
        });

        expect(!!~str.indexOf('require')).to.be.equal(true);
    });
});
