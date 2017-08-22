const isomorphicDefine = require('../lib/define');
const expect = require('chai').expect;

describe('isomorphicDefine', function() {
    it('primitive', function () {
        const {define, output} = isomorphicDefine({
            alias: [
                {
                    key: 'lib',
                    value: '/xxx/'
                }
            ],
            filename: __filename
        });
        
        define([
            '{lib}index.js'
        ], function(a) {
            a = 1;
            return a;
        });

        const keyInfo = output();

        expect(keyInfo.filename).to.be.equal(__filename);
    });
});