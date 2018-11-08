export default {
    elitism: 3,
    mutationRate: 0.1,
    populationSize: 100,
} as config;

interface config {
    elitism: number;
    mutationRate: number;
    populationSize: number;
}