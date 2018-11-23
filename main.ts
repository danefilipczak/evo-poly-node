import * as Population from './src/Population/Population'
import * as Parse from './src/IO/Parse';
const path = require('path');

const simulate = (population: number[][][][]) => {
    population = Population.evolve(population);
}

(() => {
    let inputPath: string = path.join(__dirname, 'input', 'test', 'majorScale.mxl')
    const population = Population.initialize(Parse.fromFile(inputPath));
    simulate(population);
})();

