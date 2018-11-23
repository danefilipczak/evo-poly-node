/**
 * convert musicXML to internal score representation format and vice-versa
 */

import * as utils from '../Utils/Utils';

const fs = require('fs');
const et = require('elementtree');

const ElementTree = et.ElementTree;
const element = et.Element;
const subElement = et.SubElement;

let divisions;

// const soprano = etree.findall('part')[0]
// console.log(soprano.findall('measure')[0]);
// console.log(etree.findall('measure'))
const stepMap = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11
}

const formatPitch = pitch => {
    const nn = stepMap[pitch.findtext('step')] + (12 * (parseInt(pitch.findtext('octave')) + 1))
    let alter = pitch.findtext('alter');
    alter = alter !== undefined ? parseInt(alter) : 0;
    return nn + alter;
}

const isContinuation = (note) => {
    const ties = note.findall('tie');
    if(ties.length > 1) {
        return true;
    }
    if(ties.length === 0) {
        return false;
    }
    if(ties[0].attrib.type === 'stop' || ties[0].attrib.type === 'continue') {
        return true;
    }
}

const getPs = note => {
    const pitch = note.find('pitch');
    return isContinuation(note) ? '...' : pitch === null ? null : formatPitch(pitch)
}

const formatMeasure = (measure, divisions): ExtractedMeasure => {
    return {
        notes: measure.findall('note').map(note => ({
            duration: parseInt(note.findall('duration')[0].text),
            ps: getPs(note),
        })),
        divisions: divisions,
    }
    
}

// extract the needed data from the xml element tree
const elementTreeToJSON = (etree): ExtractedMeasure[][] => {
    return etree.findall('part').map(part => {
        let divisions;
        return part.findall('measure').map(measure => {
            // update division value if one exists (usually only on the first measure).
            divisions = measure.find('attributes') ? parseInt(measure.find('attributes').findtext('divisions')) : divisions;
            return formatMeasure(measure, divisions);
        })
    })
}

interface ExtractedNote {
    duration: number;
    ps: number | null | string;
}

interface ExtractedMeasure {
    notes: ExtractedNote[];
    divisions: number;
}

const constructMeasure = (measure: ExtractedMeasure): any[] => {
    const result = [];
    const numDivisions = utils.config.meter.weights.length;
    const measureQuarterLength = utils.config.meter.numerator * 4 / utils.config.meter.denominator;
    const divisionQuarterLength = measureQuarterLength / numDivisions;
    measure.notes.forEach(note => {
        const quarterLength = note.duration / measure.divisions;
        const spread = quarterLength / divisionQuarterLength;
        result.push(note.ps)
        let j = 1;
        while (j < spread) {
            result.push('...');
            j++;
        }
    })
    return result;
}

const templateFromJSON = (json: ExtractedMeasure[][]): any[][] => {
    return json.map(voice => voice.map(measure => removeEmptyMeasure(constructMeasure(measure))));
}

// return null if the measure doesn't contain any numbers
const removeEmptyMeasure = (measure: any[]): any[] | null => {
    return measure.reduce((prev, curr) => {
        return utils.isNumber(curr) ? false : prev;
    }, true ) ? null : measure;
}

export const fromFile = (path: string) => {
    const data = fs.readFileSync(path).toString();
    return templateFromXML(data);
}

export const templateFromXML = (data: string): any[][] => {
    return utils.pipe(elementTreeToJSON, templateFromJSON)(et.parse(data));
}



