/**
 * Function String -> Args Array
 * @param fn function
 * @returns {Array} 传参数组
 */
function getArgsFromFunctionBody(fn) {
    const argStr = ((fn.match(/^.*?\s*[^(]*\(\s*([^)]*)\)/m) || [])[1]) || null;
    if (argStr) {
        return argStr.split(',').map(item => {
            return item.replace(/\s*/g, '');
        });
    }
    return [];
}

module.exports = getArgsFromFunctionBody;