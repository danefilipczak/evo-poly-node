import { intervals, Interval } from './Intervals';

const getConfig = () => {
    for (const arg of process.argv) {
        if (arg.includes('--config=')) {
            return require(`../../configs/${arg.split('=')[1]}.json`)
        }
    }
    console.log('you need to specify a config json via the command line argument --config')
}

export const isNumber = (x: any) => {
    return typeof x === 'number'
}

/**
 * 
 * for a flat sequence, project its ps values forward,
 * but only once the sequence has begun
 */
export const sustain = (x: any[]): any[] => {
    const seq = [...x];
    let phraseBegun = false;
    for (let i = 0; i < seq.length; i++) {
        if(!isNumber(seq[i]) && !phraseBegun) {
            continue;
        }
        phraseBegun = true;
        if(!isNumber(seq[i])) {
            seq[i] = seq[i-1];
        }
    }
    return seq;
}

export const notes = (seq: any[]): number[] => {
    return seq.reduce((prev, curr) => isNumber(curr) ? [...prev, curr] : prev, [])
}

export const config = getConfig();

// reduce an nD array to a 1D array
export const flatten = (input) => {
    return input.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
/**
 * convert an interval value expressed in semitones to an interval object
 * 
 */
export const psToInterval = (delta: number): Interval => {
    const octave = Math.floor(delta / 12)
    const interval = intervals[Math.round(delta%12)];
    return {
        ...interval,
        prefix: interval.prefix + (7 * octave),
    };
}

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

