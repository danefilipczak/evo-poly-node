import { flatten, sustain, isNumber } from '../Utils/Utils';

/**
 * 
 * return true if any of the parts cross each other on subsequent notes
 */
export const partCrossing = (score: any[][][]): boolean => {
    const score2D = score.map(voice => sustain(flatten(voice)));
    for (let i = 0; i < score2D.length-1; i++) {
        for (let j = 0; j < score2D[i].length; j++) {
            if (isNumber(score2D[i][j]) && isNumber(score2D[i+1][j])) {
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

