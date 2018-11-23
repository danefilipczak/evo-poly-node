import * as Population from './src/Population/Population'
import * as Parse from './src/IO/Parse';
const path = require('path');

// if (process.platform === "win32") {
//     require("readline").createInterface({
//         input: process.stdin,
//         output: process.stdout
//     }).on("SIGINT", function () {
//         process.emit("SIGINT");
//     });
// }

process.on("SIGINT", function () {
    //stop the evolution, export the best;
    console.log('shittung down')
    process.exit();
});

const simulate = (population: number[][][][]) => {
    population = Population.evolve(population);
}

(() => {
    let inputPath: string = path.join(__dirname, 'input', 'test', 'majorScale.mxl')
    const population = Population.initialize(Parse.fromFile(inputPath));
    simulate(population);
})();

