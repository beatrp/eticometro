// Estado da sessão (em memória), pontuação (XP e critérios) e navegação
var S,app=document.getElementById('app');
function fresh(){S={step:'intro',ok:false,ap:0,back:'A',op:{},a:{},q:{},c:['','',''],done:{},d:DIL.map(function(){return{opt:null,pa:[],pr:[],pe:[],tx:'',cf:null,ct:''}})}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function lv(n){return n>=3?3:n}
function wc(s){return s.trim().split(/\s+/).filter(Boolean).length}
function sc(d){var w=wc(d.tx),cw=wc(d.ct);return{p:lv(d.pa.length),c:lv(d.pr.length),f:w>=45?3:w>=20?2:w>=8?1:0,x:lv(d.pe.length),k:d.cf?(cw>=6?3:2):0}}
function dxp(d){var s=sc(d);return(s.p+s.c+s.f+s.x+s.k)*10}
function ndone(){return Object.keys(S.done).length}
function qok(){return QZ.filter(function(z,i){return S.q[i]===z.r}).length}
function xp(){var t=qok()*10;for(var i in S.done)t+=dxp(S.d[i]);return t}
function lvi(x){var l=0;XPL.forEach(function(v,i){if(x>=v[1])l=i});return l}
function go(s){S.step=s;render();window.scrollTo(0,0)}
function gl(){if(S.step!=='G')S.back=S.step;go('G')}
