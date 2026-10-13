import {LETTERS, SOLFEGE, QUALITIES, chord, noteLabel, staffSvg} from './music.js';

const $ = id => document.getElementById(id);
const fields = ['root', 'accidental', 'third', 'fifth', 'seventh'];
const defaults = {root:'C', accidental:'', third:'major', fifth:'perfect', seventh:'none'};
const combinations = {
  'major/perfect/none':'major', 'major/perfect/major':'major7', 'major/perfect/minor':'dominant7',
  'major/augmented/none':'augmented', 'major/diminished/minor':'dominantFlat5',
  'minor/perfect/none':'minor', 'minor/perfect/major':'minorMajor7', 'minor/perfect/minor':'minor7',
  'minor/diminished/none':'diminished', 'minor/diminished/minor':'halfDiminished', 'minor/diminished/diminished':'diminished7'
};
const lessonOrder = ['triades','tetrades','montagem','cifras'];
let selection = {...defaults}, saved = [], current, audioContext, voices = [], statusTimer, playbackToken=0, lessons, lessonKey = 'triades';
const backgroundAudio = new Audio();
backgroundAudio.loop = true;
backgroundAudio.volume = 0.16;

function readStorage(key, fallback) {
  try {const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback;} catch {return fallback;}
}
function writeStorage(key, value) {try {localStorage.setItem(key, JSON.stringify(value));} catch { /* Private browsing may disable storage. */ }}
const stored = readStorage('t-acordes-settings-v1', defaults);
if (stored && typeof stored === 'object') {
  for (const id of fields) if ([...$(id).options].some(option => option.value === stored[id])) selection[id] = stored[id];
}
const storedFavorites = readStorage('t-acordes-favorites-v1', []);
if (Array.isArray(storedFavorites)) saved = storedFavorites.filter(item => item && LETTERS.includes(item.root) && ['', '#', 'b'].includes(item.accidental) && combinations[`${item.third}/${item.fifth}/${item.seventh}`] && !['Cb','E#','Fb','B#'].includes(item.root+item.accidental)).slice(0,40);
for (const id of fields) $(id).value = selection[id];

function normalize(changed) {
  const messages = [];
  const forbidden = ['Cb', 'E#', 'Fb', 'B#'];
  for (const option of $('accidental').options) option.disabled = forbidden.includes(selection.root+option.value);
  if (forbidden.includes(selection.root+selection.accidental)) {
    selection.accidental = '';
    messages.push('Alteração ajustada para natural: esta fundamental não está no aplicativo original.');
  }
  $('fifth').querySelector('[value="augmented"]').disabled = selection.third === 'minor';
  if (selection.third === 'minor' && selection.fifth === 'augmented') {
    selection.fifth = 'perfect';
    messages.push('Quinta ajustada para justa: a terça menor não combina com a quinta aumentada neste laboratório.');
  }
  const allowedSevenths = Object.keys(combinations).filter(key => key.startsWith(`${selection.third}/${selection.fifth}/`)).map(key => key.split('/')[2]);
  for (const option of $('seventh').options) option.disabled = !allowedSevenths.includes(option.value);
  if (!allowedSevenths.includes(selection.seventh)) {
    selection.seventh = allowedSevenths[0];
    messages.push(selection.third==='major' && selection.fifth==='diminished' ? 'Sétima ajustada para menor, formando o acorde maior com quinta diminuta e sétima menor.' : 'Sétima ajustada para uma combinação disponível no aplicativo original.');
  }
  for (const id of fields) $(id).value = selection[id];
  $('constraint-note').textContent = messages.join(' ') || 'Os intervalos são medidos a partir da fundamental.';
  $('constraint-note').classList.toggle('adjusted', messages.length > 0);
  if (changed) writeStorage('t-acordes-settings-v1', selection);
}
function favoriteKey(value) {return fields.map(id=>value[id]).join('/');}
function render() {
  stopNotes(false);
  const quality = combinations[`${selection.third}/${selection.fifth}/${selection.seventh}`];
  current = chord(selection.root+selection.accidental, quality);
  const q = QUALITIES[quality];
  $('result-title').textContent = current.symbol;
  $('chord-name').textContent = `${noteLabel(current.root)} ${q.name.toLocaleLowerCase('pt-BR')}`;
  $('chord-kind').textContent = current.notes.length===3 ? 'TRÍADE · 3 NOTAS' : 'TÉTRADE · 4 NOTAS';
  $('staff').innerHTML = staffSvg(current.notes, 'treble', `Partitura de ${current.symbol}`);
  $('notes').replaceChildren(...current.notes.map((note, i) => {
    const chip = document.createElement('span'); chip.className='note-chip';
    chip.append(document.createTextNode(noteLabel(note)));
    const degree = document.createElement('small'); degree.textContent = ['FUNDAMENTAL','TERÇA','QUINTA','SÉTIMA'][i]; chip.append(degree); return chip;
  }));
  const names = ['Fundamental',selection.third==='major'?'Terça maior':'Terça menor', {perfect:'Quinta justa',augmented:'Quinta aumentada',diminished:'Quinta diminuta'}[selection.fifth], {major:'Sétima maior',minor:'Sétima menor',diminished:'Sétima diminuta'}[selection.seventh]];
  $('intervals').replaceChildren(...current.notes.map((note,i) => {
    const card = document.createElement('div'); card.className='interval-card';
    const degree = document.createElement('span'); degree.className='degree'; degree.textContent = noteLabel(note);
    const title=document.createElement('strong'); title.textContent=names[i];
    const detail=document.createElement('small'); detail.textContent=i===0?'Ponto de partida':`${q.intervals[i]} semitons`;
    card.append(degree,title,detail); return card;
  }));
  const isSaved = saved.some(item=>favoriteKey(item)===favoriteKey(selection));
  $('favorite').textContent=isSaved?'♥':'♡';
  $('favorite').setAttribute('aria-pressed',String(isSaved));
  $('favorite').setAttribute('aria-label',isSaved?'Remover acorde dos salvos':'Salvar acorde');
  $('favorite').title=isSaved?'Remover dos salvos':'Salvar acorde';
  renderFavorites();
}
function renderFavorites() {
  $('favorites-section').hidden=!saved.length;
  $('favorites').replaceChildren(...saved.map(item=>{
    const result=chord(item.root+item.accidental,combinations[`${item.third}/${item.fifth}/${item.seventh}`]);
    const button=document.createElement('button'); button.type='button'; button.className='saved-chord'; button.textContent=result.symbol;
    button.setAttribute('aria-label',`Carregar acorde ${result.symbol}`);
    button.addEventListener('click',()=>{selection={...item}; normalize(true); render(); $('result-title').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
    return button;
  }));
}
for (const id of fields) $(id).addEventListener('change',()=>{selection[id]=$(id).value; normalize(id); render();});
$('reset').addEventListener('click',()=>{selection={...defaults};normalize(true);render();});
$('favorite').addEventListener('click',()=>{
  const index=saved.findIndex(item=>favoriteKey(item)===favoriteKey(selection));
  if(index>=0)saved.splice(index,1);else if(saved.length<40)saved.push({...selection});else{$('audio-status').textContent='Você já salvou 40 acordes. Remova um para salvar outro.';return;}
  writeStorage('t-acordes-favorites-v1',saved); render();
});

function stopNotes(announce=true) {
  playbackToken++;
  clearTimeout(statusTimer);
  for(const oscillator of voices){try{oscillator.stop();}catch{ /* Already ended. */ }}
  voices=[];
  $('play-chord').removeAttribute('aria-busy'); $('play-arpeggio').removeAttribute('aria-busy');
  $('audio-status').textContent=announce?'Reprodução interrompida.':'Toque para ouvir as notas no navegador.';
}
async function play(arpeggio=false) {
  stopNotes(false);
  const token=playbackToken;
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextClass){$('audio-status').textContent='Este navegador não oferece áudio interativo. Experimente um navegador atualizado.';return;}
  try {
    audioContext??=new AudioContextClass();
    await audioContext.resume();
    if(token!==playbackToken)return;
    // Soft synthesized piano-like tones: fundamental and two quiet harmonics.
    const start=audioContext.currentTime+0.04;
    for(const [i,note] of current.notes.entries()) {
      const time=start+(arpeggio?i*0.34:0), duration=1.7;
      const frequency=440*2**((note.midi-69)/12);
      for(const [harmonic,weight] of [[1,.23],[2,.065],[3,.018]]) {
        const oscillator=audioContext.createOscillator(), envelope=audioContext.createGain();
        oscillator.type='sine';oscillator.frequency.value=frequency*harmonic;
        envelope.gain.setValueAtTime(0,time);envelope.gain.linearRampToValueAtTime(weight/current.notes.length,time+.012);
        envelope.gain.exponentialRampToValueAtTime(.0001,time+duration);
        oscillator.connect(envelope);envelope.connect(audioContext.destination);
        oscillator.start(time);oscillator.stop(time+duration+.05);voices.push(oscillator);
        oscillator.onended=()=>{oscillator.disconnect();envelope.disconnect();};
      }
    }
    $(arpeggio?'play-arpeggio':'play-chord').setAttribute('aria-busy','true');
    $('audio-status').textContent=`${arpeggio?'Arpejo':'Acorde'} ${current.symbol} em reprodução…`;
    statusTimer=setTimeout(()=>{voices=[];$('play-chord').removeAttribute('aria-busy');$('play-arpeggio').removeAttribute('aria-busy');$('audio-status').textContent='Reprodução concluída. Experimente outros intervalos.';},(1.8+(arpeggio?(current.notes.length-1)*.34:0))*1000);
  } catch {$('audio-status').textContent='Não foi possível iniciar o áudio. Toque novamente em Ouvir acorde.';}
}
$('play-chord').addEventListener('click',()=>play());
$('play-arpeggio').addEventListener('click',()=>play(true));
$('stop').addEventListener('click',()=>stopNotes());
async function playBackground() {
  try{await backgroundAudio.play();$('background-toggle').textContent='Pausar';$('background-status').textContent='';}
  catch{$('background-toggle').textContent='Reproduzir';$('background-status').textContent='Toque em Reproduzir para iniciar a trilha.';}
}
$('background').addEventListener('change',async()=>{
  const value=$('background').value; backgroundAudio.pause();
  $('background-toggle').disabled=value==='off';$('background-status').textContent='';
  if(value==='off'){backgroundAudio.removeAttribute('src');backgroundAudio.load();return;}
  backgroundAudio.src=value==='menu'?'./assets/audio/menu.ogg':`./assets/audio/bg${value}.ogg`; await playBackground();
});
$('background-toggle').addEventListener('click',()=>{if(backgroundAudio.paused)playBackground();else{backgroundAudio.pause();$('background-toggle').textContent='Reproduzir';}});
backgroundAudio.addEventListener('error',()=>{$('background-status').textContent='Não foi possível carregar esta trilha.';$('background-toggle').disabled=true;});

async function loadLessons() {
  if(lessons)return lessons;
  const response=await fetch('./assets/lessons.json');
  if(!response.ok)throw new Error('Falha no carregamento');
  lessons=await response.json();return lessons;
}
async function showLesson(key) {
  lessonKey=lessonOrder.includes(key)?key:'triades';
  document.querySelectorAll('[data-lesson]').forEach(button=>{const active=button.dataset.lesson===lessonKey;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'true':'false');});
  const content=$('lesson-content'); content.textContent='Carregando o conteúdo…';
  const requested=lessonKey;
  try{
    const data=await loadLessons();if(requested!==lessonKey)return;
    const lesson=data[lessonKey];if(!lesson)throw new Error('Capítulo ausente');
    const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`CAPÍTULO ${String(lessonOrder.indexOf(lessonKey)+1).padStart(2,'0')}`;
    const title=document.createElement('h2');title.textContent=lesson.title;
    content.replaceChildren(eyebrow,title);
    const segments=lesson.segments||[...(lesson.paragraphs||[]).map(text=>({type:'text',text})),...(lesson.images||[]).map(src=>({type:'image',src}))];
    let imageIndex=0;
    for(const segment of segments){
      if(segment.type==='text'){const paragraph=document.createElement('p');paragraph.textContent=segment.text;content.append(paragraph);}
      else if(segment.type==='image'){
        imageIndex++;
        const link=document.createElement('a');link.href=segment.src;link.target='_blank';link.rel='noopener noreferrer';link.title='Abrir diagrama em tamanho original';link.setAttribute('aria-label',`Abrir diagrama ${imageIndex} de ${lesson.title} em tamanho original (nova aba)`);
        const image=document.createElement('img');image.src=segment.src;image.alt=`Diagrama ${imageIndex}: ${lesson.title}`;image.loading='lazy';link.append(image);content.append(link);
      }
    }
    const next=document.createElement('button');next.type='button';next.className='secondary-button lesson-next';
    const nextKey=lessonOrder[lessonOrder.indexOf(lessonKey)+1];
    next.textContent=nextKey?'Próximo capítulo →':'Experimentar no laboratório →';
    next.addEventListener('click',()=>{if(nextKey){showLesson(nextKey);content.scrollIntoView({block:'start'});}else location.hash='criar';});content.append(next);
  }catch{content.replaceChildren();const message=document.createElement('p');message.textContent='Não foi possível carregar o conteúdo. Verifique sua conexão e tente novamente.';const retry=document.createElement('button');retry.type='button';retry.className='secondary-button';retry.textContent='Tentar novamente';retry.addEventListener('click',()=>showLesson(lessonKey));content.append(message,retry);}
}
document.querySelectorAll('[data-lesson]').forEach(button=>button.addEventListener('click',()=>showLesson(button.dataset.lesson)));
function route() {
  const hash=location.hash.slice(1), page=['criar','fundamentos','sobre'].includes(hash)?hash:'menu';
  document.body.dataset.page=page;
  for(const name of ['menu','criar','fundamentos','sobre']) $('page-'+name).hidden=name!==page;
  document.querySelectorAll('[data-page]').forEach(link=>{const active=link.dataset.page===page;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  document.title=page==='menu'?'T-Acordes':`${{criar:'Criar acorde',fundamentos:'Fundamentos',sobre:'Sobre o projeto'}[page]} · T-Acordes`;
  stopNotes(false);
  if(page==='fundamentos')showLesson(lessonKey);
}
window.addEventListener('hashchange',route);
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopNotes(false);backgroundAudio.pause();$('background-toggle').textContent='Reproduzir';}});
normalize();render();route();
