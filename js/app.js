
function $(s){return document.querySelector(s)}
function renderVendors(list, containerId){
  const el=$(containerId); if(!el) return;
  if(list.length===0){el.innerHTML='<div class=card style=padding:30px;text-align:center;color:#6b7a90> No vendor found. Try another name, @handle or phone.</div>';return;}
  el.innerHTML=list.map(v=>`
    <div class="card" style="padding:18px;display:flex;gap:14px;align-items:flex-start">
      <div class="score-ring" style="--p:${v.score}%"><span>${v.score}%</span></div>
      <div style="flex:1">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <strong style="font-size:1.05rem">${v.name}</strong>
          <span class="badge ${v.status.toLowerCase()}">${v.status.toUpperCase()}</span>
        </div>
        <div style="color:var(--muted);font-size:.85rem;margin:4px 0">${v.handle} • ${v.phone} • ${v.category} • ${v.location}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">${v.checks.map(c=>`<span style="font-size:.72rem;background:#f2f6fb;padding:4px 8px;border-radius:999px">${c}</span>`).join('')||'<span style=color:#999;font-size:.8rem>No security checks passed</span>'}</div>
      </div>
    </div>
  `).join('');
}
function verifySearch(q){
  q=q.toLowerCase().trim(); if(!q) return VENDORS;
  return VENDORS.filter(v=> (v.name+v.handle+v.phone+v.website+v.category).toLowerCase().includes(q));
}
document.addEventListener('DOMContentLoaded',()=>{
  const yearEl=$('#year'); if(yearEl) yearEl.textContent=new Date().getFullYear();
  const hamburger=$('#hamburger'); const mobile=$('#mobileMenu');
  if(hamburger){hamburger.addEventListener('click',()=>mobile.classList.toggle('open'))}
  // home search
  const homeInput=$('#homeSearchInput'); const homeBtn=$('#homeSearchBtn');
  if(homeBtn){homeBtn.addEventListener('click',()=>{const val=homeInput.value; localStorage.setItem('lastSearch',val); window.location.href='verify.html?q='+encodeURIComponent(val);});}
  if(homeInput){homeInput.addEventListener('keydown',e=>{if(e.key==='Enter'){localStorage.setItem('lastSearch',homeInput.value); window.location.href='verify.html?q='+encodeURIComponent(homeInput.value);}})}
  // verify page
  const verifyInput=$('#verifyInput'); const verifyBtn=$('#verifyBtn'); const results=$('#results');
  const params=new URLSearchParams(window.location.search); const initialQ=params.get('q')||localStorage.getItem('lastSearch')||'';
  if(verifyInput){verifyInput.value=initialQ; if(initialQ){renderVendors(verifySearch(initialQ),'#results');}}
  function doVerify(){const val=verifyInput.value; renderVendors(verifySearch(val),'#results'); localStorage.setItem('lastSearch',val);}
  if(verifyBtn) verifyBtn.addEventListener('click',doVerify);
  if(verifyInput) verifyInput.addEventListener('keydown',e=>{if(e.key==='Enter')doVerify()});
  // directory
  if($('#directoryList')){renderVendors(VENDORS,'#directoryList'); const f=$('#filterStatus'); if(f){f.addEventListener('change',()=>{let list=VENDORS; if(f.value!=='All') list=VENDORS.filter(v=>v.status===f.value); renderVendors(list,'#directoryList');})}}
  // reports storage
  const reportForm=$('#reportForm');
  if(reportForm){reportForm.addEventListener('submit',e=>{e.preventDefault(); const data=Object.fromEntries(new FormData(reportForm).entries()); const reports=JSON.parse(localStorage.getItem('reports')||'[]'); reports.push({...data,date:new Date().toISOString()}); localStorage.setItem('reports',JSON.stringify(reports)); $('#reportSuccess').style.display='block'; reportForm.reset(); setTimeout(()=>$('#reportSuccess').style.display='none',4000);});}
  // contact
  const contactForm=$('#contactForm');
  if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault(); $('#contactSuccess').style.display='block'; contactForm.reset();});}
  // quiz
  const quizWrap=$('#quizWrap');
  if(quizWrap){
    let idx=0, score=0;
    function renderQ(){
      if(idx>=QUIZ.length){quizWrap.innerHTML=`<div class="card" style="padding:28px;text-align:center"><h2>Completed! You scored ${score}/${QUIZ.length}</h2><p style="color:var(--muted);margin:10px 0">${score>=5?'Excellent! You understand vendor security.':'Keep learning - check our Learn page.'}</p><div style="margin-top:14px"><span class="badge verified">SCORE ${Math.round(score/QUIZ.length*100)}%</span></div><button class="btn btn-dark" style="margin-top:18px" onclick="location.reload()">Retake Quiz</button></div>`;return;}
      const item=QUIZ[idx];
      quizWrap.innerHTML=`<div class="card" style="padding:22px"><div style="display:flex;justify-content:space-between;margin-bottom:12px"><span class="badge verified">QUESTION ${idx+1}/${QUIZ.length}</span><span style="font-weight:700">Score: ${score}</span></div><h3 style="margin-bottom:14px">${item.q}</h3><div style="display:grid;gap:10px">${item.opts.map((o,i)=>`<div class="quiz-opt" data-i="${i}">${o}</div>`).join('')}</div><div id="explain" style="display:none;margin-top:14px;padding:12px;background:#f7f9fc;border-radius:12px;font-size:.9rem"></div></div>`;
      quizWrap.querySelectorAll('.quiz-opt').forEach(opt=>{
        opt.addEventListener('click',()=>{
          const chosen=parseInt(opt.dataset.i); const correct=item.ans;
          quizWrap.querySelectorAll('.quiz-opt').forEach(o=>o.style.pointerEvents='none');
          if(chosen===correct){opt.classList.add('correct');score++;} else {opt.classList.add('wrong'); quizWrap.querySelector(`[data-i="${correct}"]`).classList.add('correct');}
          const ex=$('#explain'); ex.style.display='block'; ex.innerHTML=`<strong>${chosen===correct?'Correct!':'Wrong.'}</strong> ${item.explain}`;
          setTimeout(()=>{idx++;renderQ();},1600);
        })
      })
    }
    renderQ();
  }
});
