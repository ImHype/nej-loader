/**
 * update Args
 * @param sourceDeps
 * @param deps
 * @param args
 * @param replaceArgs
 */
function replacePlaceholderArgs({
    rawDependencies,
    args,
    replaceArgs = {}
}) {
    // clone
    const dependencies = [...rawDependencies];
    // clone
    args = [...args];

    args = [...args].map((item, i) => {
        const dependency = dependencies[i];
        if (replaceArgs[dependency]) {
            return replaceArgs[dependency];
        }
        return item;
    });

    return args;
}

module.exports = replacePlaceholderArgs;