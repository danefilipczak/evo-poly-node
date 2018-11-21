import * as utils from './Utils';

describe('Utils', ()=> {
    it('should be able to sustain a sequence', ()=>{
        let seq1 = [null, '...', 1, null, 2, '...'];
        let sus1 = utils.sustain(seq1);
        expect(sus1).toEqual([ null, '...', 1, 1, 2, 2 ]);
    })
})