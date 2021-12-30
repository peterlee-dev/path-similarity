var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawnSync;
const { machine, python, predict, test, training } = require('../paths');
router.post('/path', function (req, res, next) {
    const { transformData, originPath, result, alphabet } = req.body;
    const dataPath = path.join(machine, `trainingData/${alphabet}/inputs.json`);
    const resultPath = path.join(machine, `trainingData/${alphabet}/outputs.json`);
    const datas = JSON.parse(fs.readFileSync(dataPath, { encoding: 'utf8' }) || '[]');
    const resultDatas = JSON.parse(fs.readFileSync(resultPath, { encoding: 'utf8' }) || '[]');
    const coord = [...Array(10)].map(el => [...Array(10)].map(el => 0));
    transformData.forEach((el, i) => {
        coord[el[0]][el[1]] = i + 1;
    });
    datas.push(coord);
    resultDatas.push(result);
    fs.writeFileSync(dataPath, JSON.stringify(datas));
    fs.writeFileSync(resultPath, JSON.stringify(resultDatas));
    res.send({ transformData, result, alphabet });
});
router.post('/result', function (req, res, next) {
    const { alphabet, transformData } = req.body;
    const coord = [...Array(10)].map(el => [...Array(10)].map(el => 0));
    transformData.forEach((el, i) => {
        coord[el[0]][el[1]] = i + 1;
    });
    const r = spawn(python, [predict, alphabet, JSON.stringify([coord])], { encoding: 'utf-8' });
    res.send({ predict: JSON.parse(r.stdout.toString())[0] });
});
router.post('/training', function (req, res, next) {
    const { alphabet } = req.body;
    const resultPath = path.join(machine, `trainingData/${alphabet}/outputs.json`);
    const resultDatas = JSON.parse(fs.readFileSync(resultPath, { encoding: 'utf8' }) || '[]');
    spawn(python, [training, alphabet], { encoding: 'utf-8' });
    res.send({ dataCount: resultDatas.length });
});
module.exports = router;
