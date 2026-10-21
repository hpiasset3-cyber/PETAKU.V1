const SH='shell-v1',TL='tiles-v1';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SH).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const isTile=u=>/\/\d{1,2}\/\d+\/\d+(\.(png|jpe?g|webp))?$/.test(u.pathname);
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(isTile(u)){e.respondWith(caches.open(TL).then(async c=>{
  const m=await c.match(r.url);if(m)return m;
  try{let res;try{res=await fetch(r.url,{mode:'cors'})}catch(_){res=await fetch(r)}
   if(res.ok||res.type==='opaque')c.put(r.url,res.clone());return res}
  catch(_){return new Response('',{status:504})}}));return}
 e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const k=res.clone();caches.open(SH).then(c=>c.put(r,k))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})))});
