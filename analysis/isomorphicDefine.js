const formatURI = require('./formatURI');
const formatARG = require('./formatARG');
const getAlias = require('./getAlias');
const parsePlugin = require('./parsePlugin');
const filterPatchList = require('./filterPatchList');

function isomorphicDefine({alias = [], filename = ''}) {
    const aliasJSON = alias.reduce((prev, item) => {
        return Object.assign(prev, {
            [item.key]: item.value
        });
    }, {});

    const config = {
        root: Object.assign({}, {
            platform: './platform/'
        }, aliasJSON)
    };
    
    let rawDependencies, dependencies, patchList, functionBody, aliasList;

    return {
        define(...args) {
            args = formatARG(args);
            
            rawDependencies = args[1];
            functionBody = args[2].toString();

            aliasList = rawDependencies.map(dependency => {
                const {target} = parsePlugin(dependency);
                return getAlias(config, target);
            });

            dependencies = rawDependencies.map(dependency => {
                const {type, target} = parsePlugin(dependency);
                return formatURI(config, {
                    basefile: filename, type, target
                });
            });

            patchList = filterPatchList(dependencies, aliasList);
        },
        output() {
            return {
                filename,
                dependencies,
                rawDependencies,
                patchList,
                functionBody
            };
        }      
    };
}

module.exports = isomorphicDefine;