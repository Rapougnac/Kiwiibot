const { createRequire } = require('module');
const { fileURLToPath } = require('url');
const { dirname } = require('path');


function metaURL() {
    if (typeof metaURL !== 'string') throw new Error("metaURL must be a string");
    const require = createRequire(metaURL);
    const __filename = fileURLToPath(metaURL);
    const __dirname = dirname(__filename);
    return { require, __filename, __dirname };
}

module.exports = { metaURL };