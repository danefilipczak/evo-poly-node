console.log('me')

import Population from './src/Population'
import { spawn } from 'child_process';
import { generateKeyPairSync } from 'crypto';

new Population([[[0, 1, 2]]], 1, 2);

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

const log = (population: number[][][][]): number[][][][] => {
    console.log(`highest fitness ${fitness(population[0])}`);
    return population;
}

const simulate = (population: number[][][][]) => {
    population = pipe(generate, evaluate, log)(population)
    population = evolve(population);
}

// const main = (score) => {
//     const population = new Population(score)
//     let fitness = -Infinity;
//     let count = 0;
//     let generation = 0;
//     while (fitness < terminationFitness) {
//         population.evaluate();
//         population.generate();
//         fitness = population.getMaxFitness();
//         generation++;
//         console.log(`generation #${generation}`);
//         console.log(`highest fitness ${fitness}`);
//     }
// }