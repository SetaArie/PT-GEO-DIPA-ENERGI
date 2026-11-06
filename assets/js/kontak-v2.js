(function(){
AOS.init({duration:800,once:true});
document.querySelectorAll('.navbar .nav-link').forEach(function(a){a.dataset.t=a.textContent});
// ISI di sini kalau sudah punya Access Key dari web3forms.com (gratis). Kosong = pakai FormSubmit.
var WEB3FORMS_KEY='31f05260-93fd-4c75-a82c-68f3a191a88c';
var f=document.getElementById('kontakForm'),btn=document.getElementById('kirim'),out=document.getElementById('hasil');
function tampil(tipe,teks){out.className='alert alert-'+tipe+' mb-0';out.textContent=teks}
if(location.search.indexOf('terkirim=1')>-1){tampil('success','Terima kasih, pesan Anda sudah terkirim. Kami akan segera menghubungi Anda.');history.replaceState(null,'',location.pathname)}
f.addEventListener('submit',function(e){
  if(!f.checkValidity()){e.preventDefault();f.classList.add('was-validated');tampil('warning','Mohon lengkapi semua kolom bertanda * dan centang persetujuan privasi.');return}
  var s=f.elements.subjek.value;
  if(WEB3FORMS_KEY){
    e.preventDefault();btn.disabled=true;btn.textContent='Mengirim...';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:'Pesan baru dari website GeoDipa: '+s,from_name:'Website GeoDipa',
        name:f.elements.nama.value,email:f.elements.email.value,no_hp:f.elements.no_hp.value,subjek:s,message:f.elements.pesan.value})})
    .then(function(r){return r.json()}).then(function(r){
      if(r.success){tampil('success','Terima kasih, pesan Anda sudah terkirim. Kami akan segera menghubungi Anda.');f.reset();f.classList.remove('was-validated')}
      else{tampil('danger','Pesan belum terkirim: '+(r.message||'coba lagi sebentar.'))}})
    .catch(function(){tampil('danger','Pesan belum terkirim. Periksa koneksi internet Anda lalu coba lagi.')})
    .finally(function(){btn.disabled=false;btn.textContent='Kirim Pesan'});
    return;
  }
  document.getElementById('nextUrl').value=location.origin+location.pathname+'?terkirim=1';
  var sj=f.querySelector('[name=_subject]');if(sj)sj.value='Pesan baru dari website GeoDipa: '+s;
  btn.disabled=true;btn.textContent='Mengirim...';
});
})();
