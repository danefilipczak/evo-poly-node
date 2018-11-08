console.log('me')

import { evolve } from './src/Population'
import { spawn } from 'child_process';
import { generateKeyPairSync } from 'crypto';

const terminationFitness = 0;

const main = () => {
    let scorePath: string = '.input/frereJaques'
    process.argv.forEach(arg=>{
        if(arg.startsWith('--score=')) {
            scorePath = arg.split('=')[1];
        }
    });

    console.log(`parsing input file ${scorePath}`);

    const parseScore = spawn('python', ["scripts/parseScore.py", scorePath])
    // parseScore
    parseScore.on('exit', () => {
        console.log('finished parsing score')
    }).on('error', err => {
        console.warn('error parsing score', err)
    }).stdout.on('data', data => {
        console.log('data', data.toString());
        // const template = JSON.parse(data.toString())
    })
}


main();

const simulate = (population: number[][][][]) => {
    population = evolve(population);
}