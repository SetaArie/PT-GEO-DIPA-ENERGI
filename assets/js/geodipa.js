(function(){
AOS.init({duration:800,once:true});
new PureCounter();

const c=document.getElementById('fx'),x=c.getContext('2d');let W,H,P=[];
function rs(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight}rs();addEventListener('resize',rs);
function mk(){const e=Math.random()<.4;return{x:Math.random()*W,y:H+10,r:e?Math.random()*2+.5:Math.random()*40+20,v:e?Math.random()*1.5+.6:Math.random()*.6+.2,e,a:Math.random()*.4+.1,d:Math.random()*6}}
for(let i=0;i<70;i++){const p=mk();p.y=Math.random()*H;P.push(p)}
(function loop(t){x.clearRect(0,0,W,H);P.forEach((p,i)=>{p.y-=p.v;p.x+=Math.sin(t/900+p.d)*.5;
 if(p.e){x.fillStyle=`rgba(${224+p.d*3|0},${60+p.d*20|0},40,${p.a+.4})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
 else{const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(95,174,46,${p.a*.55})`);g.addColorStop(1,'rgba(95,174,46,0)');x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
 if(p.y<-60)P[i]=mk()});requestAnimationFrame(loop)})(0);

document.querySelectorAll('.navbar .nav-link').forEach(a=>a.dataset.t=a.textContent);

const navLinks=[...document.querySelectorAll('.navbar .nav-link')];
const navSecs=navLinks.map(a=>document.querySelector(a.getAttribute('href')));
function spy(){if(document.body.classList.contains('view-privasi')){navLinks.forEach(a=>a.classList.remove('active'));return}let cur=-1;const lim=innerHeight*.35;
 navSecs.forEach((sec,i)=>{if(sec&&sec.getBoundingClientRect().top<=lim)cur=i});
 navLinks.forEach((a,i)=>{a.classList.toggle('active',i===cur);if(i===cur)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
addEventListener('scroll',spy,{passive:true});addEventListener('resize',spy);spy();

const L=[['Tanah &amp; Batuan Penutup','0 – 0,5 km','Lapisan atas yang menutupi reservoir. Di sini lokasi sumur dan pembangkit dibangun dengan lahan yang relatif kecil.'],
['Batuan Penudung (Caprock)','0,5 – 1 km','Lapisan kedap yang menahan uap tetap bertekanan di dalam reservoir, seperti tutup panci raksasa.'],
['Reservoir Panas Bumi','1 – 2,5 km','Air dan uap panas bersuhu tinggi terjebak di batuan berpori. Sumur produksi dibor sampai ke sini untuk mengalirkan uap ke permukaan.'],
['Sumber Panas (Magma)','&gt; 2,5 km','Dapur panas dari aktivitas vulkanik yang memanaskan reservoir secara terus-menerus, sehingga energinya tidak habis.']];
const bt=document.getElementById('layers'),info=document.getElementById('layerInfo'),bands=document.querySelectorAll('.earth .band');
L.forEach((l,i)=>{const b=document.createElement('button');b.className='layer-btn';b.innerHTML=`<b>${l[0]}</b><small>${l[1]}</small>`;b.onclick=()=>pick(i);bt.appendChild(b)});
function pick(i){[...bt.children].forEach((b,j)=>b.classList.toggle('on',i===j));bands.forEach((b,j)=>b.classList.toggle('on',i===j));info.innerHTML=`<h5 class="serif mb-1">${L[i][0]}</h5><p class="mute mb-0">${L[i][2]}</p>`}
pick(0);

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%'}}),{threshold:.5});
document.querySelectorAll('.bar span').forEach(s=>io.observe(s));

document.querySelectorAll('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('open')));

const gm=document.getElementById('gmap');
document.querySelectorAll('.maptabs button').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.maptabs button').forEach(x=>x.classList.toggle('on',x===b));
 gm.src=gm.src.replace(/([?&])t=[a-z]/,'$1t='+b.dataset.t)}));

const os=document.querySelector('.org-scroll');
if(os){const ctr=()=>{os.scrollLeft=(os.scrollWidth-os.clientWidth)/2};ctr();addEventListener('load',ctr)}

function route(first){const on=location.hash==='#kebijakan-privasi';const was=document.body.classList.contains('view-privasi');
 document.body.classList.toggle('view-privasi',on);
 const pv=document.getElementById('kebijakan-privasi');pv.setAttribute('aria-hidden',on?'false':'true');
 if(on){document.title='Kebijakan Privasi | PT Geo Dipa Energi';scrollTo(0,0)}
 else if(was){document.title='GeoDipa Energi | Dari Perut Bumi untuk Negeri';const t=location.hash&&document.querySelector(location.hash);t?t.scrollIntoView():scrollTo(0,0);spy()}}
addEventListener('hashchange',()=>route());route(true);
})();
