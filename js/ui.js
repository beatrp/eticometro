// Interações: avisos (toast), chips, respostas do treino e conclusão de fases
function toast(m){var t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2200)}
function gain(before,msg){toast(msg);if(lvi(xp())>lvi(before))setTimeout(function(){toast('NÍVEL ACIMA: '+XPL[lvi(xp())][0])},2300)}
function tog(i,k,v){var a=S.d[i][k],j=a.indexOf(v);j<0?a.push(v):a.splice(j,1);render()}
function chips(i,k,list,val){return '<div class="chips">'+list.map(function(x){var v=val?x[0]:x,l=val?x[1]:x;return '<button class="chip" aria-pressed="'+(S.d[i][k].indexOf(v)>=0)+'" onclick="tog('+i+',\''+k+'\',\''+v.replace(/"/g,'&quot;')+'\')">'+l+'</button>'}).join('')+'</div>'}
function ans(q,v){if(S.q[q]!==undefined)return;var b=xp();S.q[q]=v;render();if(v===QZ[q].r)gain(b,'+10 XP')}
function fin(n){var b=xp();S.done[n]=true;gain(b,'+'+dxp(S.d[n])+' XP de raciocínio');go('M')}
