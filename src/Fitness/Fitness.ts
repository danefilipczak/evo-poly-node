/**
 * This module is responsible for computing the fitness of a given genotype
 * 
 */
import { partCrossing } from '../VoiceLeading/VoiceLeading'

import { config } from '../Utils/Utils'

export const fitness = (genotype: number[][][]): number => {
    const score = phenotype(genotype);
    // the following are boolean fitness values - if any of them return true, we immediatley 
    // return a fitness of 0
    if (partCrossing(score)) {
        return 0
    } else {
        return parsimony(score);
    }
}

/**
 * a genotype is a 3D array of random numbers between 0 and 1.
 * we want to map those numbers into pitch space values or special tokens
 * representing a spread of the previous value ('...') or a rest (null).
 * 
 * 
 */
export const phenotype = (genotype: number[][][]): any[][][] => {
    return genotype.map((voice, i) => voice.map(measure => measure.map(gene => {
        // get an int representing a descreet token. 
        // the number of tokens is the ambitus + 2 special characters
        const int = Math.round(gene*(config.ambitus+2));
        return int <= config.ambitus ? int + config.ranges[i] : int === config.ambitus + 1 ? '...' : null
    })));
}