import { mkdir, readFile, writeFile, rm, cp, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const pagesDir = path.join(root, 'src/pages');
const css = await readFile(path.join(root, 'src/styles/global.css'), 'utf8');
const meta = {
  index: ['High Trust America','A conservative research and advocacy organization dedicated to rebuilding the conditions that make trust possible.'],
  understand: ['Understand','Study how America became a high-trust society, why trust declined, and where each state stands today.'],
  build: ['Build','Turn High Trust America research into a governing plan that leaders can actually use.'],
  advocate: ['Advocate','Support the policies and leaders that move America toward high trust—and oppose those that move it away.'],
  research: ['Research','High Trust America research will study the rise and decline of American high trust and produce practical state-level analysis.'],
  about: ['About','High Trust America is an openly conservative research and advocacy organization focused on making American life more worthy of trust.'],
  join: ['Join Us','Join the people building High Trust America: researchers, operators, policy builders, communicators, advocates, volunteers, and supporters.'],
  '404': ['Page Not Found','The requested High Trust America page could not be found.']
};

const brand = `<a href="/" class="brand" aria-label="High Trust America home"><span class="brand__seal" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/><path d="M21 18v28M43 18v28M21 31h22" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M30 18h4M30 46h4" fill="none" stroke="currentColor" stroke-width="2"/></svg></span><span class="brand__words"><strong>High Trust</strong><span>America</span></span></a>`;
const navItems = [['Understand','/understand'],['Build','/build'],['Advocate','/advocate'],['Research','/research'],['About','/about']];

function cleanBody(source){
  const start = source.indexOf('>\n', source.indexOf('<BaseLayout'));
  const end = source.lastIndexOf('</BaseLayout>');
  if(start < 0 || end < 0) throw new Error('Could not parse page body');
  return source.slice(start + 2, end).trim();
}
function pageTemplate(slug, title, description, body){
  const nav = navItems.map(([label,href]) => `<a href="${href}"${('/'+slug===href)?' class="is-active"':''}>${label}</a>`).join('');
  const pageTitle = slug === 'index' ? title : `${title} | High Trust America`;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="description" content="${description.replaceAll('"','&quot;')}"><meta name="theme-color" content="#0e1b2b"><meta property="og:title" content="${pageTitle}"><meta property="og:description" content="${description.replaceAll('"','&quot;')}"><meta property="og:type" content="website"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/assets/global.css"><title>${pageTitle}</title></head><body><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container site-header__inner">${brand}<button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle><span></span><span></span></button><nav class="site-nav" aria-label="Main navigation" data-site-nav>${nav}<a class="button button--small button--red" href="/join">Join us</a></nav></div></header><main id="main">${body}</main><footer class="site-footer"><div class="container site-footer__grid"><div>${brand}<p class="site-footer__mission">A conservative research and advocacy organization dedicated to rebuilding the conditions that make trust possible.</p></div><div class="site-footer__links"><span class="footer-label">Explore</span><a href="/understand">Understand</a><a href="/build">Build</a><a href="/advocate">Advocate</a><a href="/research">Research</a></div><div class="site-footer__links"><span class="footer-label">Organization</span><a href="/about">About</a><a href="/join">Join us</a><button class="link-button" data-coming-soon data-coming-soon-title="The founding prospectus is coming to the public site." data-coming-soon-copy="The founding document is complete. The public file download will be attached during the hosting and domain launch.">Founding prospectus</button><button class="link-button" data-coming-soon data-coming-soon-title="Social channels are coming." data-coming-soon-copy="Our social media accounts are not live yet. When they launch, the official links will appear here.">Social media</button></div></div><div class="container site-footer__bottom"><span>© 2026 High Trust America. Working organization.</span><span>Trust cannot be demanded. It must be earned.</span></div></footer><dialog id="coming-soon" class="coming-soon" aria-labelledby="coming-soon-title"><button class="coming-soon__close" type="button" data-close-coming-soon aria-label="Close">×</button><div class="eyebrow">In development</div><h2 id="coming-soon-title">Coming soon.</h2><p id="coming-soon-copy">This part of High Trust America is being built now. We would rather show real work when it is ready than fill the site with placeholders.</p><div class="coming-soon__rule"></div><p class="coming-soon__small">Understand what broke. Build what works. Advocate until it changes.</p></dialog><script src="/assets/site.js"></script></body></html>`;
}

await rm(out,{recursive:true,force:true});
await mkdir(path.join(out,'assets'),{recursive:true});
await writeFile(path.join(out,'assets/global.css'),css);
await writeFile(path.join(out,'assets/site.js'),`(()=>{const b=document.querySelector('[data-menu-toggle]'),n=document.querySelector('[data-site-nav]');if(b&&n)b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));n.classList.toggle('is-open',!o)});const d=document.getElementById('coming-soon');if(!d)return;const t=d.querySelector('#coming-soon-title'),c=d.querySelector('#coming-soon-copy');document.querySelectorAll('[data-coming-soon]').forEach(e=>e.addEventListener('click',x=>{x.preventDefault();t.textContent=e.getAttribute('data-coming-soon-title')||'Coming soon.';c.textContent=e.getAttribute('data-coming-soon-copy')||'This part of High Trust America is being built now. We would rather show real work when it is ready than fill the site with placeholders.';d.showModal?.()}));d.querySelector('[data-close-coming-soon]')?.addEventListener('click',()=>d.close());d.addEventListener('click',e=>{const r=d.getBoundingClientRect(),i=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;if(!i)d.close()})})();`);
await cp(path.join(root,'public'),out,{recursive:true});
for (const file of await readdir(pagesDir)) {
  if (!file.endsWith('.html')) continue;
  const slug = file.replace('.html','');
  const source = await readFile(path.join(pagesDir,file),'utf8');
  const body = cleanBody(source);
  const [title, description] = meta[slug] || [slug,'High Trust America'];
  await writeFile(path.join(out,slug==='index'?'index.html':`${slug}.html`),pageTemplate(slug,title,description,body));
}
console.log(`Built ${Object.keys(meta).length} pages to dist/`);
