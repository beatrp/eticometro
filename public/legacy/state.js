// Estado da sessão (somente em memória), pontuação de participação e navegação.
// S.d = rascunho em edição; S.done[i] = cópia confirmada da fase (é o que conta para XP e relatório).
var S;
function blank(){return{opt:null,pa:[],pr:[],pe:[],tx:'',cf:null,nopt:null,ct:''}}
function fresh(){S={step:'intro',prev:null,ok:false,ap:0,back:'A',op:{},a:{},q:{},c:['','',''],done:{},d:DIL.map(blank)}}
function clone(d){return{opt:d.opt,pa:d.pa.slice(),pr:d.pr.slice(),pe:d.pe.slice(),tx:d.tx,cf:d.cf,nopt:d.nopt,ct:d.ct}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function filled(s){return String(s||'').trim().length>0}
// XP de participação por fase: concluir vale 50; escrever a justificativa e responder à objeção valem 10 cada.
// Não depende de quantos itens foram marcados nem do tamanho do texto.
var XP_PHASE=50,XP_STEP=10,XP_QUIZ=10;
function dxp(d){if(!d||d.opt===null||!d.cf)return 0;return XP_PHASE+(filled(d.tx)?XP_STEP:0)+(filled(d.ct)?XP_STEP:0)}
function ndone(){return Object.keys(S.done).length}
function nregular(){return Object.keys(S.done).filter(function(i){return +i!==N-1}).length}
function bossOpen(){return nregular()>=3||!!S.done[N-1]}
function canReport(){return ndone()>=3}
function qok(){return QZ.filter(function(z,i){return S.q[i]===z.r}).length}
function quizxp(){return qok()*XP_QUIZ}
function phasexp(){var t=0;for(var i in S.done)t+=dxp(S.done[i]);return t}
function xp(){return quizxp()+phasexp()}
function lvi(x){var l=0;XPL.forEach(function(v,i){if(x>=v[1])l=i});return l}
// Confirma a fase: grava a cópia e devolve a diferença real de XP (nunca acumula).
function commit(n){var before=S.done[n]?dxp(S.done[n]):0;S.done[n]=clone(S.d[n]);return dxp(S.done[n])-before}
function dirty(n){return !!S.done[n]&&JSON.stringify(S.done[n])!==JSON.stringify(S.d[n])}
function started(){return S.ok&&(ndone()>0||Object.keys(S.a).length>0||Object.keys(S.q).length>0)}
function go(s){S.prev=S.step;S.step=s;render();window.scrollTo(0,0)}
function gl(){if(S.step!=='G')S.back=S.step;go('G')}
function reset(){if(started()&&!window.confirm('Apagar todas as respostas e recomeçar? Isso não pode ser desfeito.'))return;fresh();go('intro');say('Respostas apagadas')}
