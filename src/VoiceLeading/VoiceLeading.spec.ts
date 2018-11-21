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
})