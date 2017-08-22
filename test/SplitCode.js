const SplitCode = require('../lib/SplitCode');
const expect = require('chai').expect;

describe('SplitCode', function () {
    it('primitive', function () {
        const result = SplitCode({
            raw: `/** define(function() {}) **/define([], function(){})`
        });
        expect(!!~result.content.indexOf('define')).to.be.equal(true);
    });
});
