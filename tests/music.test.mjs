import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chord,parseNote,equalNotes,frequency,ROOTS,QUALITIES,staffSvg,question} from '../src/music.js';
test('tríades maiores e menores têm grafia musical correta',()=>{assert.deepEqual(chord('C','major').notes.map(n=>n.name),['C','E','G']);assert.deepEqual(chord('F#','major').notes.map(n=>n.name),['F#','A#','C#']);assert.deepEqual(chord('Eb','minor').notes.map(n=>n.name),['Eb','Gb','Bb']);});
test('sétima diminuta usa sétimo grau e bemol duplo',()=>{assert.deepEqual(chord('C','diminished7').notes.map(n=>n.name),['C','Eb','Gb','Bbb']);});
test('todos os acordes preservam intervalos e ordem crescente',()=>{for(const root of ROOTS)for(const [quality,q]of Object.entries(QUALITIES)){const c=chord(root,quality);assert.deepEqual(c.notes.map(n=>n.midi-c.notes[0].midi),q.intervals);for(let inv=0;inv<c.notes.length;inv++){const ns=chord(root,quality,inv).notes;assert.ok(ns.every((n,i)=>!i||n.midi>ns[i-1].midi));}}});
test('comparação distingue grafia enarmônica e aceita notas fora de ordem',()=>{assert.ok(equalNotes(['G','C','E'].map(parseNote),chord('C','major').notes));assert.ok(!equalNotes(['C','D#','G'].map(parseNote),chord('C','minor').notes));assert.ok(equalNotes(['C','D#','G'].map(parseNote),chord('C','minor').notes,false));});
test('afinação e partitura',()=>{assert.equal(frequency(69),440);assert.ok(staffSvg(chord('C','major').notes).includes('role="img"'));assert.ok(!staffSvg(chord('B','major').notes).includes('NaN'));});
test('dificuldades geram perguntas válidas',()=>{for(let level=1;level<=4;level++)for(let i=0;i<30;i++)assert.ok(QUALITIES[question(level).quality].level<=level);});
