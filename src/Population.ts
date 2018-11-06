import Phenotype from './Phenotype';
import Score from './Score';
import { fitness } from './Fitness';
import config from '../config';
import { pipe } from './Utils';

interface evaulatedScore {
    fitness: number;
    score: number[][][];
}

// export default class {
//     /**
//      * 
//      * @param template a 3d array that describes a score as notes, measures, and parts. 
//      * @param populationSize 
//      * @param elitism how many of the best survive at each generation
//      */
//     constructor (template: number[][][], populationSize: number, elitism: number) {
//         Object.assign(this, {template, populationSize, elitism});
//         console.log(this.template);
//     }
// }

const generate = (population: number[][][][]): number[][][][] => {
    return population;
}

/**
 * 
 * sort a population in order of fitness and return only the fittest specimens
 */
const evaluateNAIVE = (population: number[][][][]): number[][][][] => {
    // can this be made faster through memoization ?
    return population.sort((a, b) => fitness(a) - fitness(b)).slice(0, 3)
}

const evaluate = (population: number[][][][]): evaulatedScore[] => {
    return population.map(score => {
        return {
            score,
            fitness: fitness(score)
        }
    })
}

const select = (evaluatedPopulation: evaulatedScore[]): number[][][][] => {
    return evaluatedPopulation.sort((a, b) => {
        return a.fitness - b.fitness;
    }).map(evaluatedScore => {
        return evaluatedScore.score
    }).slice(0, config.elitism);
}

const log = (population: number[][][][]): number[][][][] => {
    console.log(fitness(population[0]))
    return population;
}

export const evolve = (population: number[][][][]): number[][][][] => {
    return pipe(generate, evaluate, select, log)(population)
}