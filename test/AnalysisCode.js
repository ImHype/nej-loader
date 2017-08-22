const analysis = require('../lib/AnalysisCode');
const expect = require('chai').expect;

describe('analysis', function () {
    it('primitive', function () {
        const keyInfo = analysis(`define([
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


        expect(keyInfo.filename).to.be.equal(__filename);
    });
});

