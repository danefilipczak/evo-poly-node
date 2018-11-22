'''
    This script defines a process for parseing musicXML into the format used by node
'''

import sys
import json
import music21 as m21
import math

# receive path to score as path via argv from node
# scorePath = sys.argv[1]
scorePath = 'C:\\projects\\evo-poly-node\\input\\majorScale.mxl'

with open('./configs/test.json', 'r') as f:
    config = json.load(f)

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

## if a measure is entierly None, we redefine it as None so that we can overwrite it later
for voice in struct:
    for i in range(0, len(voice)):
        empty = True
        for note in voice[i]:
            if isinstance(note, int):
                empty = False
        if empty:
            voice[i] = None

print(json.dumps(struct))

sys.stdout.flush()