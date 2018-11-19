import sys
import json
import music21 as m21
import math

# scorePath = sys.argv[1]
scorePath = 'C:\\projects\\evo-poly-node\\input\\majorScale.mxl'

with open('./config.json', 'r') as f:
    config = json.load(f)

print(config)

score = m21.converter.parse(scorePath)


struct = []
for i in range(0, len(score.parts)):
    struct.append([])
    measures = score.parts[i].getElementsByClass(m21.stream.Measure)
    for j in range(0, len(measures)):
        struct[i].append([])
        # populate all the eighth notes with None
        measureSize = int(measures[j].duration.quarterLength * 2)
        for k in range(0, measureSize):
                struct[i][j].append(None)
        for note in measures[j].notes:
            index = int(note.offset * 2)
            struct[i][j][index] = int(note.pitch.ps)
            # the number of spread operators needed is the note's quarterLength - 0.5 (an eigth note)
            numSpreads = round((note.quarterLength - 0.5) * 2)
            for l in range(1, numSpreads + 1):
                measure = j + math.floor((index+l) / measureSize)
                position = (index+l) % measureSize
                struct[i][measure][position] = '...'


        
print(struct)

sys.stdout.flush()