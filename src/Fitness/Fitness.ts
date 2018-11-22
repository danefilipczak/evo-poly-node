/**
 * This module is responsible for computing the fitness of a given genotype
 * 
 */
import * as Devo from '../Devo/Devo';
import * as VoiceLeading from '../VoiceLeading/VoiceLeading';
import { config } from '../Utils/Utils';

export const evaluate = (genotype: number[][][]): number => {
    const score = Devo.phenotype(genotype);
    return ineligible(score) ? 0 : trial(score);
};

/**
 * Tests for boolean fitness parameters.
 * If any of these checks return true, we return a fitness score of 0 
 * and don't have to evaluate the rest.
 * 
 */
const ineligible = (score) => {
    return VoiceLeading.partCrossing(score);
}

const trial = (score: any[]): number => {
    return VoiceLeading.parsimony(score);
}

