import * as utils from '../Utils/Utils';

/**
 * 
 * return true if any of the parts cross each other on subsequent notes
 */
export const partCrossing = (score: any[][][]): boolean => {
    const score2D = score.map(voice => utils.sustain(utils.flatten(voice)));
    for (let i = 0; i < score2D.length-1; i++) {
        for (let j = 0; j < score2D[i].length; j++) {
            if (utils.isNumber(score2D[i][j]) && utils.isNumber(score2D[i+1][j])) {
                // if the upper part is lower than or equal to the lower part
                if(score2D[i][j] <= score2D[i+1][j]) {
                    return true;
                }
                // if the next note in the lower part is greater than the higher part
                if (j + 1 < score2D[i].length) {
                    if (score2D[i+1][j+1] > score2D[i][j]) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

export const parsimony = (score: any[][][]): number => {
    let total = 0;
    score.forEach(voice => {
        let parsimony = 0;
        const notes = utils.notes(utils.flatten(voice));
        for(var i = 1; i < notes.length; i++) {
            const delta = Math.abs(notes[i] - notes[i-1]) 
            const interval = utils.psToInterval(delta).prefix;
            const maxInterval = utils.psToInterval(utils.config.ambitus).prefix;
            parsimony += maxInterval - interval;
        }
        total += parsimony;
    })
    return total;
}

