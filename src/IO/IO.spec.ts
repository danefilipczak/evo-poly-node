process.argv.push('--config=test')

import * as Parse from './Parse';

describe('IO', () => {
    it('should be able to parse a musicXML score into a template', () => {
        const result = [[[72,"...",70,"...",69,"...",67,"..."],[66,"...",63,"...",62,"...",60,"..."]],[null,null],[null,null],[null,null]]
        expect(Parse.fromFile('input/test/gHarmMinor.musicxml')).toEqual(result);
        const result1 = [[[null,72,"...",71,"...",67,"...",69],["...",null,"...",69,"...","...",null,"..."]]];
        expect(Parse.fromFile('input/test/tiedNotes.musicxml')).toEqual(result1);
    })
})
