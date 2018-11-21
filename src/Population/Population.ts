// import Phenotype from './Phenotype';
import Score from '../Score';
// import { fitness } from './Fitness';
import { config } from '../Utils/Utils';
import { pipe } from '../Utils/Utils';

interface evaluatedGenotype {
    fitness: number | null;
    genotype: number[][][];
}

/**
 * Make an initial population from a single template score
 */
export const initialize = (score: number[][][]): number[][][][] => {
    return Array.apply(null, new Array(config.populationSize)).map(() => mutate(score));
}

export const mutate = (genotype: number[][][]): number[][][] => {
    return genotype.map(voice => voice.map(measure => measure.map(gene => {
        return Math.random() < config.mutationRate ? Math.random() : gene;
    })))
}

const generate = (population: number[][][][]): number[][][][] => {
    return population;
}

const evaluate = (population: number[][][][]): evaluatedGenotype[] => {
    return population.map(genotype => {
        return {
            genotype,
            fitness: fitness(genotype)
        }
    })
}

const select = (evaluatedPopulation: evaluatedGenotype[]): evaluatedGenotype[] => {
    return evaluatedPopulation.sort((a, b) => {
        return a.fitness - b.fitness;
    }).slice(0, config.elitism);
}

const log = (evaluatedPopulation: evaluatedGenotype[]): evaluatedGenotype[] => {
    console.log(evaluatedPopulation[0].fitness);
    return evaluatedPopulation;
}

export const evolve = (population: number[][][][]): number[][][][] => {
    return pipe(generate, evaluate, select, log)(population)
}