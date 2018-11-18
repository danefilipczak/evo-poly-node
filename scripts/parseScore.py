import sys
import json
import music21 as m21

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
        for k in range(0, int(measures[j].duration.quarterLength * 2)):
                struct[i][j].append(None)
        for note in measures[j].notes: 
            index = int(note.offset * 2)
            struct[i][j][index] = int(note.pitch.ps)
        
print(struct)

sys.stdout.flush()