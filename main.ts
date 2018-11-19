import { evolve, initialize } from './src/Population/Population'
import { spawn } from 'child_process';
const config = require('./config.json');
const path = require('path');

(() => {
    let scorePath: string = path.join(__dirname, 'input', 'majorScale.mxl')
    console.log(`parsing input file ${scorePath}`);

    const parseScore = spawn('python', ["scripts/parseScore.py", scorePath])
    // parseScore
    parseScore.on('exit', () => {
        console.log('finished parsing score')
    }).on('error', err => {
        console.warn('error parsing score', err)
    }).stdout.on('data', data => {
        console.log('data', data.toString());
        // const prototype = JSON.parse(data.toString())
    })
})();

// const simulate = (population: number[][][][]) => {
//     population = evolve(population);
// }