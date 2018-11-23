import { intervals, Interval } from './Intervals';
import Config from '../../configs/Config'

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const getConfig = (): Config => {
    for (const arg of process.argv) {
        if (arg.includes('--config=')) {
            return require(`../../configs/${arg.split('=')[1]}.json`)
        }
    }
    throw(new Error('you need to specify a config json via the command line argument --config'));
}

const validateMeter = (config: Config): Config => {
    if(!(config.meter.weights.length % config.meter.numerator === 0)) {
        throw new Error('The length of your meter weights needs to be a multiple of your meter\'s numerator');
    }
    return config;
}

const validateMutationRate = (config: Config): Config => {
    if(config.mutationRate > 1 || config.mutationRate < 0) {
        throw new Error('MutationRate needs to be between 0 and 1');
    }
    return config;
}

export const validateConfig = (config: Config):Config => {
    return pipe(validateMutationRate, validateMeter)(config);
}

export const config = validateConfig(getConfig());

export const isNumber = (x: any): boolean => {
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

// reduce an nD array to a 1D array
export const flatten = (input) => {
    return input.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

export const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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



