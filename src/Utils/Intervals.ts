export interface Interval {
    prefix: number;
    suffix: string;
}

export const intervals = [
    {
        prefix: 1,
        suffix: 'perfect',
    },
    {
        prefix: 2,
        suffix: 'minor',
    },
    {
        prefix: 2,
        suffix: 'major',
    },
    {
        prefix: 3,
        suffix: 'minor',
    },
    {
        prefix: 3,
        suffix: 'major',
    },
    {
        prefix: 4,
        suffix: 'perfect',
    },
    {
        prefix: 5,
        suffix: 'diminished',
    },
    {
        prefix: 5,
        suffix: 'perfect',
    },
    {
        prefix: 6,
        suffix: 'minor',
    },
    {
        prefix: 6,
        suffix: 'major',
    },
    {
        prefix: 7,
        suffix: 'minor',
    },
    {
        prefix: 7,
        suffix: 'major',
    }

] as Interval[];