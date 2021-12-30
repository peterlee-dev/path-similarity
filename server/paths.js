const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
    machine: resolveApp('machine'),
    python: resolveApp('../../../opt/anaconda3/bin/python'),
    predict: resolveApp('machine/script.py'),
    training: resolveApp('machine/training.py'),
    test: resolveApp('machine/test.py')
};
