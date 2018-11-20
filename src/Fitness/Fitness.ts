/**
 * This module is responsible for computing the fitness of a given genotype
 * 
 */

import { config } from '../Utils'

export const fitness = (genotype: number[][][]): number => {
    // return score.reduce()
    return 4
}

export const phenotype = (genotype: number[][][]): any[][][] => {
    return genotype.map(part => part.map(measure => measure.map(gene => {
        const int = Math.round(gene*(config.ambitus+2));
        return int <= config.ambitus ? int : int === config.ambitus + 1 ? '...' : null
    })));
}