export default interface Config {
    elitism: number;
    mutationRate: number;
    populationSize: number;
    ambitus: number;
    ranges: number [];
    meter: {
        numerator: number;
        denominator: number;
        weights: number[];
    }
}