const spawn = require('child_process').spawnSync;
const path = require('path');
const pythonPath = path.join(__dirname, '../../../opt/anaconda3/bin/python');
const trainingPath = path.join(__dirname, 'training.py');
const d = spawn(
    pythonPath,
    [
        path.join(__dirname, 'training.py'),
        'a'
        // '[0, 0, 0, 0, 0, 0, 0, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 12, 11, 31, 0, 0, 0, 0, 0, 14, 13, 0, 0, 30, 0, 0, 0, 0,0, 15, 0, 0, 0, 29, 0, 0, 0, 0, 0, 16, 0, 0, 0, 28, 0, 0, 0, 0, 0, 17, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 18, 0,0, 26, 0, 0, 0, 0, 0, 0, 19, 0, 24, 25, 0, 0, 0, 0, 0, 0, 20, 0, 23, 0, 0, 0, 0, 0, 0, 0, 21, 22, 0, 0]'
    ],
    { encoding: 'utf-8' }
);
console.log(d);
// console.log(JSON.parse(d.stdout.toString()));
// const result = spawn(pythonPath, [scriptPath]);
// result.stdout.on('data', function (data) {
//     console.log(data.toString());
// });
// result.stderr.on('data', function (err) {
//     console.log(err.toString());
// });
