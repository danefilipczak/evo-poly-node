process.argv.push('--config=test')

import * as Devo from './Devo';
import { config } from '../Utils/Utils';

describe('Devo', () => {
    it('should be able to parse a genotype into a phenotype', () => {
        const step = 1 / (config.ambitus + 2);
        const gen = [
            [[ step * 0 ], [ step * 1 ]],
            [[ step * 2 ], [ step * 4 ]],
            [[ 1 - step ], [ 1 ]]
        ]

        const phen = [
            [[ 60 ], [ 61 ]],
            [[ 57 ], [ 59 ]],
            [[ '...' ], [ null ]] 
        ]
        
        expect(Devo.phenotype(gen)).toEqual(phen);
    })

    it('should be able to merge a template into a score', () => {
        const template = [[[3, 2, 1], null]];
        const score = [[[1, '...', 3], [1, 2, 3]]]
        expect(Devo.merge(score, template)).toEqual([ [ [ 3, 2, 1 ], [ 1, 2, 3 ] ] ]);
    })

    it('should be able to translate from a genotype to a phenotype and back', ()=>{
        
        for (let i = 0; i < 10; i ++) {

            let genotype = [
                [[null, null], [null, null]],
                [[null, null], [null, null]],
                [[null, null], [null, null]],
            ]
            
            genotype = genotype.map(voice => voice.map(measure => measure.map(gene => {
                return Math.round(Math.random() * (config.ambitus + 2)) / (config.ambitus + 2);
            })))

            const result = Devo.genotype(Devo.phenotype(genotype));

            genotype.forEach((voice, i) => voice.forEach((measure, j) => measure.forEach((gene, k) => {
                // floating point precision means we have to use toBeCloseTo instead of toEqual
                expect(gene).toBeCloseTo(result[i][j][k])
            })));

        }

        
        
    })
})