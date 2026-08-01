import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
execSync('node build-v2.mjs',{stdio:'inherit'});
const root=path.join(process.cwd(),'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
http.createServer(async(req,res)=>{try{let p=new URL(req.url,'http://localhost').pathname;if(p==='/' )p='/index.html';let f=path.join(root,p);try{const s=await stat(f);if(s.isDirectory())f=path.join(f,'index.html')}catch{if(!path.extname(f))f+='.html'}const data=await readFile(f);res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(data)}catch{const data=await readFile(path.join(root,'404.html'));res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(data)}}).listen(4321,()=>console.log('High Trust Society Foundation dev server: http://localhost:4321'));
