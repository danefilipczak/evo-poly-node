process.argv.push('--config=test')

import * as VoiceLeading from './VoiceLeading';

describe('VoiceLeading', ()=>{
    it('should be able to detect part crossing', ()=> {

        const score1 = [[[60, 62, 63]],[[60, 60, 60]]];
        expect(VoiceLeading.partCrossing(score1)).toEqual(true);

        const score2 = [[[60, 62, 63]],[[59, 60, 60]]];
        expect(VoiceLeading.partCrossing(score2)).toEqual(false);

        const score3 = [[['...', 62, 63]],[[60, 60, 60]]];
        expect(VoiceLeading.partCrossing(score3)).toEqual(false);

        const score4 = [[['...', 62, 63]],[[60, 59, null]], [[59, 58, 59]]];
        expect(VoiceLeading.partCrossing(score4)).toEqual(true);

    })

    it('should be able to calculate the overall parsimony of a score', ()=> {
        
        const score1 = [[[1, 2, 3], [3, 2, 1]]];
        const score2 = [[[3, 2, 1], [1, 0, -1]]];
        expect(VoiceLeading.parsimony(score1)).toEqual(51);
        expect(VoiceLeading.parsimony(score2)).toEqual(51);

        const score3 = [[[null, '...', 31]], [[null, 41, 42]]]
        expect(VoiceLeading.parsimony(score3)).toEqual(10);
        
    })
})