/**
 * convert musicXML to internal score representation format and vice-versa
 */

import * as utils from '../Utils/Utils';
import { getPackedSettings } from 'http2';

const fs = require('fs');
const et = require('elementtree');

const ElementTree = et.ElementTree;
const element = et.Element;
const subElement = et.SubElement;

const data = fs.readFileSync('input/gHarmMinor.musicxml').toString();
const etree = et.parse(data);

const soprano = etree.findall('part')[0]
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

const getPs = note => {
    const pitch = note.find('pitch');
    return pitch === null ? null : formatPitch(pitch)
}

const formatMeasure = measure => {
    return measure.findall('note').map(note => ({
        quarterLength: note.findall('duration')[0].text,
        ps: getPs(note),
    }))
}

const score = etree.findall('part').map(part => {
    return part.findall('measure').map(measure => {
        return formatMeasure(measure);
    })
})

console.log(JSON.stringify(score, null, 4))

