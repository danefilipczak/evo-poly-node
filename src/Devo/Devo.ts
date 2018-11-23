/**
 * This module is responsible for mapping between phenotypical and genotypical expressions, 
 * as well as a few other utilities. 
 */

import * as utils from '../Utils/Utils';

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
        const int = Math.round(gene * (utils.config.ambitus + 2));
        return int <= utils.config.ambitus ? int + utils.config.ranges[i] : int === utils.config.ambitus + 1 ? '...' : null
    })));
}

/**
 * 
 * The inverse of phenotype()
 */

export const genotype = (phenotype: any[][][]): number[][][] => {
    return phenotype.map((voice, i) => voice.map(measure => measure.map(gene => {
        const numTokens = utils.config.ambitus + 2;
        const step = 1 / numTokens;
        return utils.isNumber(gene) ? step * (gene - utils.config.ranges[i]) : gene === '...' ? 1 - step : 1;
    })))
}

/**
 * 
 * @param score 
 * @param template a template is identical to a score except for that its measures can be null, 
 * which signifies that the user has not supplied any
 * input and we should use the score data.
 */
export const merge = (score: any[][][], template: any[][]) => {
    return score.map((voice, i) => voice.map((measure, j) => {
        return template[i][j] === null ? measure : template[i][j];
    }))
}

/**
 * 
 * return a random genotype that does not violate any boolean fitness values when merged with template.
 * This is useful for not waiting around forever for the algorithm to find values that satisfy 
 * the boolean fitness criteria
 */
// export const seedling = (template: any[][]): number[][][] => {
//     // create a random genotype with the same size as template
//     const seed = 
//     return utils.pipe(removePartCrossing)(merge(seed, template));  
// }




