// import Phenotype from './Phenotype';
import Score from '../Score';
// import { fitness } from './Fitness';
const config = require('../../config.json');
import { pipe } from '../Utils';

interface Phenotype {
    fitness: number | null;
    genotype: number[][][];
}

/**
 * Make an initial population from a single template score
 */
export const initialize = (score: number[][][]): number[][][][] => {
    return Array(config.populationSize).map( () => mutate(score));
}

export const mutate = (genotype: number[][][]): number[][][] => {
    return genotype.map(part => {
        return part.map(measure => {
            return measure.map(gene => {
                return Math.random() < config.mutationRate ? Math.random() : gene;
            })
        })
    })
}

const generate = (population: number[][][][]): number[][][][] => {
    return population;
}

/**
 * 
 * sort a population in order of fitness and return only the fittest
 */
// const evaluateNAIVE = (population: number[][][][]): number[][][][] => {
//     // can this be made faster through memoization ?
//     return population.sort((a, b) => fitness(a) - fitness(b)).slice(0, 3)
// }

const evaluate = (population: Phenotype[]): Phenotype[] => {
    return population.map(phenotype => {
        return {
            ...phenotype,
            fitness: fitness(phenotype)
        }
    })
}

const select = (evaluatedPopulation: Phenotype[]): Phenotype[] => {
    return evaluatedPopulation.sort((a, b) => {
        return a.fitness - b.fitness;
    }).slice(0, config.elitism);
}

const log = (population: number[][][][]): number[][][][] => {
    console.log(fitness(population[0]))
    return population;
}

export const evolve = (population: number[][][][]): number[][][][] => {
    return pipe(generate, evaluate, select, log)(population)
}