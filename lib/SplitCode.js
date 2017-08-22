const comment = {};
comment.lineOpen = function () {
    return /\/\//gm;
};

comment.lineClose = function () {
    return /\n/gm;
};

comment.blockOpen = function () {
    return /\/\*/gm;
};
comment.blockClose = function () {
    return /\*\//gm;
};


module.exports = function ({
    raw
}) {
    let reg = /([^A-Za-z0-9]*)((NEJ\.define)|(define))([\s\S]*?)\(/g;

    const iterator = regMatchIteratorCreater(reg, raw);
    
    for (let matched of iterator) {
        const startIndex = matched.index + matched[1].length;
        const headCode = raw.substr(0, startIndex);

        const openBlockComments = headCode.match(comment.blockOpen());
        const closeBlockComments = headCode.match(comment.blockClose());

        if (length(openBlockComments) !== length(closeBlockComments)) {
            continue;
        }

        const openLineComments = headCode.match(comment.lineOpen());
        const closeLineComments = headCode.match(comment.lineClose());

        if (length(openLineComments) > length(closeLineComments)) {
            continue;
        }

        return {
            headCode,
            content: raw.substr(startIndex),
        };
    }

    return {code: -1};
};


function * regMatchIteratorCreater (reg, text) {
    while (true) {
        let matched = reg.exec(text);
        if (matched) {
            yield matched;
        } else {
            return;
        }
    }
}

function length(list) {
    return list ? list.length : 0;
}