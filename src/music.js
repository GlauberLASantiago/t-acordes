export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const SOLFEGE = ['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'];
const NATURAL = [0, 2, 4, 5, 7, 9, 11];
export const ROOTS = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];
export const QUALITIES = {
  major: {name:'Maior', symbol:'', intervals:[0,4,7], degrees:[0,2,4], level:1, formula:'1 · 3 · 5'},
  minor: {name:'Menor', symbol:'m', intervals:[0,3,7], degrees:[0,2,4], level:1, formula:'1 · ♭3 · 5'},
  diminished: {name:'Diminuto', symbol:'dim', intervals:[0,3,6], degrees:[0,2,4], level:2, formula:'1 · ♭3 · ♭5'},
  augmented: {name:'Aumentado', symbol:'+', intervals:[0,4,8], degrees:[0,2,4], level:2, formula:'1 · 3 · ♯5'},
  dominant7: {name:'Maior com 7ª menor', symbol:'7', intervals:[0,4,7,10], degrees:[0,2,4,6], level:3, formula:'1 · 3 · 5 · ♭7'},
  major7: {name:'Maior com 7ª maior', symbol:'Maj7', intervals:[0,4,7,11], degrees:[0,2,4,6], level:3, formula:'1 · 3 · 5 · 7'},
  minor7: {name:'Menor com 7ª menor', symbol:'m7', intervals:[0,3,7,10], degrees:[0,2,4,6], level:3, formula:'1 · ♭3 · 5 · ♭7'},
  halfDiminished: {name:'Meio diminuto', symbol:'m7(b5)', intervals:[0,3,6,10], degrees:[0,2,4,6], level:4, formula:'1 · ♭3 · ♭5 · ♭7'},
  diminished7: {name:'Diminuto com 7ª diminuta', symbol:'dim7', intervals:[0,3,6,9], degrees:[0,2,4,6], level:4, formula:'1 · ♭3 · ♭5 · ♭♭7'},
  minorMajor7: {name:'Menor com 7ª maior', symbol:'m(Maj7)', intervals:[0,3,7,11], degrees:[0,2,4,6], level:4, formula:'1 · ♭3 · 5 · 7'},
  dominantFlat5: {name:'Maior com 5ª diminuta e 7ª menor', symbol:'7(b5)', intervals:[0,4,6,10], degrees:[0,2,4,6], level:4, formula:'1 · 3 · ♭5 · ♭7'}
};
export function parseNote(value) {
  const match = /^([A-G])([#b]{0,2})(-?\d+)?$/.exec(value);
  if (!match) throw new Error('Nota inválida: '+value);
  const letter = LETTERS.indexOf(match[1]);
  const accidental = [...match[2]].reduce((sum,c)=>sum+(c==='#'?1:-1),0);
  const octave = match[3]===undefined ? 4 : Number(match[3]);
  return {letter, accidental, octave, midi:12*(octave+1)+NATURAL[letter]+accidental, name:match[1]+match[2]};
}
export function noteLabel(note, system='solfege') {
  const n = typeof note==='string' ? parseNote(note) : note;
  return (system==='letters'?LETTERS[n.letter]:SOLFEGE[n.letter])+(n.accidental>0?'♯'.repeat(n.accidental):'♭'.repeat(-n.accidental));
}
export function chord(root, quality, inversion=0, octave=4) {
  const r=parseNote(root+octave), q=QUALITIES[quality];
  if (!q) throw new Error('Tipo de acorde inválido');
  const notes=q.intervals.map((interval,i)=>{
    const diatonic=r.letter+q.degrees[i];
    const letter=diatonic%7, o=octave+Math.floor(diatonic/7);
    const midi=r.midi+interval, accidental=midi-(12*(o+1)+NATURAL[letter]);
    return {letter, octave:o, accidental, midi, name:LETTERS[letter]+(accidental>0?'#'.repeat(accidental):'b'.repeat(-accidental))};
  });
  for(let i=0;i<inversion%notes.length;i++) {const n=notes.shift(); notes.push({...n,midi:n.midi+12,octave:n.octave+1});}
  return {root,quality,inversion,notes,symbol:root.replaceAll('#','♯').replaceAll('b','♭')+q.symbol};
}
export function pool(level) {return Object.keys(QUALITIES).filter(key=>QUALITIES[key].level<=level);}
export function pick(array, random=Math.random) {return array[Math.min(array.length-1,Math.floor(random()*array.length))];}
export function question(level=1, random=Math.random, previous=null) {
  const roots=level===1?['C','D','E','F','G','A','B']:ROOTS;
  let result;
  for(let i=0;i<12;i++) { result=chord(pick(roots,random),pick(pool(level),random)); if(!previous||result.symbol!==previous.symbol)break; }
  return result;
}
export function equalNotes(actual, expected, spelling=true) {
  if(actual.length!==expected.length)return false;
  const key=n=>spelling?`${n.letter}:${n.accidental}`:((n.midi%12)+12)%12;
  return actual.map(key).sort().join(',')===expected.map(key).sort().join(',');
}
export function frequency(midi) {return 440*2**((midi-69)/12);}
export function staffSvg(notes, clef='treble', label='Partitura do acorde') {
  // E4 is the bottom line in treble; G2 in bass. Each diatonic step is half a line space.
  const bottom=clef==='bass'?2*7+4:4*7+2;
  const positions=notes.map(n=>({n,y:150-(n.octave*7+n.letter-bottom)*7}));
  const lowest=Math.max(150,...positions.map(p=>p.y)), highest=Math.min(70,...positions.map(p=>p.y));
  const top=Math.min(20,highest-25), height=Math.max(205,lowest+35)-top;
  const lines=[0,1,2,3,4].map(i=>`<line x1="32" y1="${150-i*14}" x2="490" y2="${150-i*14}"/>`).join('');
  const ledger=new Set();
  for(const {y} of positions){for(let l=164;l<=y;l+=14)ledger.add(l);for(let l=80;l>=y;l-=14)ledger.add(l);}
  const accidentals=positions.filter(p=>p.n.accidental).map((p,i)=>`<text class="accidental" x="${232-i*19}" y="${p.y+6}">${p.n.accidental>0?'♯'.repeat(p.n.accidental):'♭'.repeat(-p.n.accidental)}</text>`).join('');
  return `<svg class="staff" viewBox="0 ${top} 520 ${height}" role="img" aria-label="${label}"><g class="staff-lines">${lines}${[...ledger].map(y=>`<line x1="257" y1="${y}" x2="300" y2="${y}"/>`).join('')}</g><text class="clef" x="48" y="${clef==='bass'?130:151}">${clef==='bass'?'𝄢':'𝄞'}</text>${accidentals}<g class="noteheads">${positions.map(({y})=>`<ellipse cx="279" cy="${y}" rx="11" ry="7.5" transform="rotate(-18 279 ${y})"/>`).join('')}</g></svg>`;
}
