// Interações: avisos (toast + região viva), chips, respostas do treino e conclusão de fases
function say(m){var l=document.getElementById('live');if(l){l.textContent='';setTimeout(function(){l.textContent=m},30)}}
function toast(m){var t=document.createElement('div');t.className='toast';t.setAttribute('aria-hidden','true');t.textContent=m;document.body.appendChild(t);say(m);setTimeout(function(){t.remove()},2400)}
function gain(before,msg){toast(msg);if(lvi(xp())>lvi(before))setTimeout(function(){toast('NÍVEL ACIMA: '+XPL[lvi(xp())][0])},2500)}
function tog(i,k,v){var a=S.d[i][k],j=a.indexOf(v);j<0?a.push(v):a.splice(j,1);render()}
function chips(i,k,list,val,lab){return '<div class="chips" role="group" aria-label="'+esc(lab)+'">'+list.map(function(x,ix){var v=val?x[0]:x,l=val?x[1]:x;return '<button type="button" id="c-'+i+'-'+k+'-'+ix+'" class="chip" aria-pressed="'+(S.d[i][k].indexOf(v)>=0)+'" onclick="tog('+i+',\''+k+'\',\''+String(v).replace(/"/g,'&quot;')+'\')">'+esc(l)+'</button>'}).join('')+'</div>'}
function ans(q,v){if(S.q[q]!==undefined)return;var b=xp();S.q[q]=v;render();if(v===QZ[q].r)gain(b,'Correta! +'+XP_QUIZ+' XP');else say('Resposta incorreta. A correta é: '+QZ[q].o[QZ[q].r])}
function fin(n){var b=xp(),again=!!S.done[n],diff=commit(n);go('M');
 if(!again)gain(b,'Fase concluída: +'+diff+' XP de participação');else if(diff>0)gain(b,'Fase atualizada: +'+diff+' XP');else if(diff<0)toast('Fase atualizada: '+diff+' XP');else toast('Fase atualizada')}
function copyText(t,ok){try{navigator.clipboard.writeText(t).then(function(){toast(ok)},function(){toast('Não foi possível copiar. Selecione o texto manualmente.')})}catch(e){toast('Não foi possível copiar. Selecione o texto manualmente.')}}
