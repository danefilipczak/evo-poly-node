# Installation

`npm install`

`npm install -g ts-node`

Requires python 3 to be installed and available via `python` on the command line.

`pip install music21`

optional: see music21 documentation for configuration of musicXML editors.


# Configuration 

`elitism: int` - the number of fittest genotypes that will persist after selection


`mutationRate: 0 < float < 1` - the probability of a single gene mutating


`populationSize: int` - the number of individuals competing with each other in a population


`ambitus: int` - the range of each voice in semitones (eg. 17 = a twelfth)


`ranges: int[]` - an array representing the lowest note in each voice's ambitus, beginning with the highest voice 


TODO:: 
put score parsing subprocess into an API. 
use https://www.npmjs.com/package/elementtree instead of music21
refactor config to use meter object:
    numerator:
    denominator:
    weights: [1, 0, 1, 0, 1, 0, 0]
