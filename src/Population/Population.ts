// import Phenotype from './Phenotype';
import Score from '../Score';
// import { fitness } from './Fitness';
import { config } from '../Utils/Utils';
import { pipe } from '../Utils/Utils';
import * as Fitness from '../Fitness/Fitness';
import * as Devo from '../Devo/Devo';

export let template;

interface evaluatedGenotype {
    fitness: number | null;
    genotype: number[][][];
}

/**
 * Make an initial population from a single template score
 */
export const initialize = (temp: any[][]): number[][][][] => {
    template = temp;
    const seedling = Devo.seedling(template);
    return reproduce([seedling]);
}

export const mutate = (genotype: number[][][]): number[][][] => {
    return genotype.map(voice => voice.map(measure => measure.map(gene => {
        return Math.random() < config.mutationRate ? Math.random() : gene;
    })))
}

/**
 * Fill depletedPopulation up to config.populationSize with mutations
 * 
 */
const reproduce = (depletedPopulation: number[][][][]): number[][][][] => {
    
}

const evaluate = (population: number[][][][]): evaluatedGenotype[] => {
    return population.map(genotype => {
        return {
            genotype,
            fitness: Fitness.evaluate(genotype)
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
    return pipe(evaluate, log, select, reproduce)(population)
}