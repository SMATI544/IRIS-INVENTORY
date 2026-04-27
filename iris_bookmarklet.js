javascript:(function(){
var rows=[],maxQ=1;
// قراءة الجدول من الصفحة
document.querySelectorAll('table tbody tr').forEach(function(tr){
  var cells=tr.querySelectorAll('td');
  if(cells.length<3)return;
  var code=(cells[0].innerText||'').trim();
  var spec=(cells[1].innerText||'').trim();
  var qty=parseInt((cells[2].innerText||'0').trim())||0;
  var time=(cells[3]?cells[3].innerText:'').trim();
  if(code.startsWith('4'))rows.push({code:code,spec:spec,qty:qty,time:time});
});
if(!rows.length){alert('لم يتم إيجاد بيانات — تأكد من الضغط على Query أولاً');return;}
rows.sort(function(a,b){return b.qty-a.qty;});
maxQ=rows[0].qty||1;
var total=rows.length;
var totalQ=rows.reduce(function(s,r){return s+r.qty;},0);
var high=rows.filter(function(r){return r.qty>=100;}).length;
var low=rows.filter(function(r){return r.qty>0&&r.qty<100;}).length;
var zero=rows.filter(function(r){return r.qty===0;}).length;

var css='*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}'
+'#iov{position:fixed;inset:0;z-index:999999;background:#05080f;color:#dde4f0;font-family:system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden}'
+'#iov-top{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1a2236;background:#05080f;flex-shrink:0}'
+'#iov-top h1{font-size:17px;font-weight:800;letter-spacing:-0.5px}'
+'#iov-top h1 span{color:#ff4d0d}'
+'#iov-cls{background:none;border:1px solid #1a2236;border-radius:8px;padding:6px 12px;color:#6b7fa0;font-size:13px;cursor:pointer}'
+'#iov-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 0 20px}'
+'.krow{display:flex;gap:8px;padding:12px 16px;overflow-x:auto;scrollbar-width:none;flex-shrink:0}'
+'.krow::-webkit-scrollbar{display:none}'
+'.kc{flex-shrink:0;min-width:85px;background:#0a0f1a;border:1px solid #1a2236;border-radius:12px;padding:11px}'
+'.kc-l{font-size:9px;color:#6b7fa0;margin-bottom:5px;letter-spacing:.5px}'
+'.kc-v{font-family:monospace;font-size:20px;font-weight:700}'
+'.k1 .kc-v{color:#3b82f6}.k2 .kc-v{color:#22d3ee}.k3 .kc-v{color:#34d399}.k4 .kc-v{color:#fbbf24}.k5 .kc-v{color:#f87171}'
+'.srch{margin:0 16px 10px;background:#0a0f1a;border:1px solid #1a2236;border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:8px}'
+'.srch input{flex:1;background:none;border:none;outline:none;color:#dde4f0;font-size:14px}'
+'.ftags{display:flex;gap:7px;padding:0 16px 10px;overflow-x:auto;scrollbar-width:none}'
+'.ftags::-webkit-scrollbar{display:none}'
+'.ft{flex-shrink:0;padding:5px 12px;border-radius:20px;border:1px solid #1a2236;background:#0a0f1a;color:#6b7fa0;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap}'
+'.ft.on{background:#3b82f6;border-color:#3b82f6;color:#fff}'
+'.inf{display:flex;align-items:center;justify-content:space-between;padding:0 16px 8px;font-size:11px;color:#6b7fa0}'
+'.cards{padding:0 16px;display:flex;flex-direction:column;gap:8px}'
+'.cd{background:#0a0f1a;border:1px solid #1a2236;border-radius:12px;padding:13px 14px}'
+'.cd-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}'
+'.cd-code{font-family:monospace;font-size:12px;font-weight:600;color:#22d3ee}'
+'.cd-spec{font-size:15px;font-weight:700;color:#dde4f0;margin-top:2px}'
+'.cd-qty{font-family:monospace;font-size:26px;font-weight:700;line-height:1}'
+'.qh{color:#34d399}.qm{color:#fbbf24}.ql{color:#fb923c}.qz{color:#6b7fa0}'
+'.cd-bar{height:3px;background:#1a2236;border-radius:2px;overflow:hidden;margin-bottom:8px}'
+'.cd-bf{height:100%;border-radius:2px}'
+'.cd-bot{display:flex;justify-content:space-between;align-items:center}'
+'.cd-time{font-family:monospace;font-size:10px;color:#6b7fa0}'
+'.stag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px}'
+'.sh{background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.2)}'
+'.sm{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.2)}'
+'.sl{background:rgba(251,146,60,.1);color:#fb923c;border:1px solid rgba(251,146,60,.2)}'
+'.sz{background:rgba(248,113,113,.08);color:#f87171;border:1px solid rgba(248,113,113,.2)}'
+'.more{margin:12px 16px 0;width:calc(100% - 32px);padding:12px;border-radius:10px;border:1px dashed #243050;background:none;color:#6b7fa0;font-size:13px;cursor:pointer}';

var el=document.createElement('div');
el.id='iov';
el.innerHTML='<style>'+css+'</style>'
+'<div id="iov-top"><h1>IRIS.<span>tyres</span> — Buffer 4xx</h1><button id="iov-cls">✕</button></div>'
+'<div id="iov-body">'
+'<div class="krow">'
+'<div class="kc k1"><div class="kc-l">الأصناف</div><div class="kc-v">'+total+'</div></div>'
+'<div class="kc k2"><div class="kc-l">القطع</div><div class="kc-v">'+totalQ.toLocaleString()+'</div></div>'
+'<div class="kc k3"><div class="kc-l">وفير ≥100</div><div class="kc-v">'+high+'</div></div>'
+'<div class="kc k4"><div class="kc-l">منخفض</div><div class="kc-v">'+low+'</div></div>'
+'<div class="kc k5"><div class="kc-l">نفد</div><div class="kc-v">'+zero+'</div></div>'
+'</div>'
+'<div class="srch"><span style="color:#6b7fa0">🔍</span><input id="iov-q" type="search" placeholder="بحث كود أو مقاس..."></div>'
+'<div class="ftags">'
+'<button class="ft on" onclick="iF(\'all\',this)">الكل</button>'
+'<button class="ft" onclick="iF(\'high\',this)" style="color:#34d399">🟢 وفير</button>'
+'<button class="ft" onclick="iF(\'med\',this)" style="color:#fbbf24">🟡 متوسط</button>'
+'<button class="ft" onclick="iF(\'low\',this)" style="color:orange">🟠 منخفض</button>'
+'<button class="ft" onclick="iF(\'zero\',this)" style="color:#f87171">🔴 نفد</button>'
+'</div>'
+'<div class="inf"><span id="iov-cnt" style="font-family:monospace">'+total+' صنف</span></div>'
+'<div class="cards" id="iov-cards"></div>'
+'<button class="more" id="iov-more" onclick="iMore()"></button>'
+'</div>';
document.body.appendChild(el);
document.getElementById('iov-cls').onclick=function(){el.remove();};

var ALL=rows,FIL=rows.slice(),shown=30,AF='all';

function render(){
  var cards=document.getElementById('iov-cards');
  var more=document.getElementById('iov-more');
  document.getElementById('iov-cnt').textContent=FIL.length+' صنف';
  var slice=FIL.slice(0,shown);
  cards.innerHTML=slice.map(function(r){
    var q=r.qty,p=Math.round(q/maxQ*100);
    var qc=q===0?'qz':q<20?'ql':q<100?'qm':'qh';
    var sc=q===0?'sz':q<20?'sl':q<100?'sm':'sh';
    var sl=q===0?'⛔ نفد':q<20?'⚠ منخفض':q<100?'● متوفر':'✔ وفير';
    var bc=q===0?'#243050':q<20?'#fb923c':q<100?'#fbbf24':'#34d399';
    return '<div class="cd">'
      +'<div class="cd-top"><div><div class="cd-code">'+r.code+'</div><div class="cd-spec">'+r.spec+'</div></div>'
      +'<div class="cd-qty '+qc+'">'+q+'</div></div>'
      +'<div class="cd-bar"><div class="cd-bf" style="width:'+p+'%;background:'+bc+'"></div></div>'
      +'<div class="cd-bot"><div class="cd-time">🕐 '+r.time+'</div><div class="stag '+sc+'">'+sl+'</div></div>'
      +'</div>';
  }).join('');
  if(shown<FIL.length){more.style.display='block';more.textContent='+ المزيد ('+(FIL.length-shown)+' متبقي)';}
  else more.style.display='none';
}

window.iF=function(f,btn){
  AF=f;shown=30;
  document.querySelectorAll('.ft').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  filter();
};
window.iMore=function(){shown+=30;render();};

function filter(){
  var q=(document.getElementById('iov-q').value||'').toLowerCase();
  FIL=ALL.filter(function(r){
    var mq=!q||r.code.toLowerCase().indexOf(q)>-1||r.spec.toLowerCase().indexOf(q)>-1;
    var mf=AF==='all'?true:AF==='high'?r.qty>=100:AF==='med'?r.qty>=20&&r.qty<100:AF==='low'?r.qty>0&&r.qty<20:r.qty===0;
    return mq&&mf;
  });
  render();
}
document.getElementById('iov-q').oninput=filter;
render();
})();
