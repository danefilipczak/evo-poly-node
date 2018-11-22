import * as Population from './src/Population/Population'
import { spawn } from 'child_process';
import { config } from './src/Utils/Utils'
const path = require('path');

let template;

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
        template = data.toString();
        onLoad(template);
    })
})();

const onLoad = (template: any[][][]) => {
    const population = Population.initialize(template);
    simulate(population);
}

const simulate = (population: number[][][][]) => {
    population = Population.evolve(population);
}