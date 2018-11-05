import Phenotype from './Phenotype';
import Score from './Score';

export default class {
    template: number[][][];
    /**
     * 
     * @param template a 3d array that describes a score as notes, measures, and parts. 
     * @param populationSize 
     * @param elitism how many of the best survive at each generation
     */
    constructor (template: number[][][], populationSize: number, elitism: number) {
        Object.assign(this, {template, populationSize, elitism});
        console.log(this.template);
    }
}