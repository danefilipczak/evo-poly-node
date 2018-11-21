process.argv.push('--config=test')

import { phenotype } from './Fitness';
import { config } from '../Utils/Utils';

describe('Fitness', () => {
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
        
        expect(phenotype(gen)).toEqual(phen);
    })
})