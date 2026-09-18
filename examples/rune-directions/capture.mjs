import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url));
const screenshots = path.join(root, 'screenshots');
const port = 4187;
const ids = ['quiet-monolith','architectural-room','material-index','type-and-object','product-console','object-archive','sound-field','paper-review','crop-study','direct-catalogue'];
const mime = new Map([['.css','text/css; charset=utf-8'],['.html','text/html; charset=utf-8'],['.js','text/javascript; charset=utf-8'],['.json','application/json'],['.png','image/png'],['.ttf','font/ttf'],['.woff2','font/woff2'],['.txt','text/plain; charset=utf-8']]);

await mkdir(screenshots,{recursive:true});
const server=http.createServer(async(request,response)=>{
  try{
    const pathname=decodeURIComponent(new URL(request.url,`http://127.0.0.1:${port}`).pathname);
    let target=path.resolve(root,`.${pathname==='/'?'/index.html':pathname}`);
    if(target!==root&&!target.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return}
    const info=await stat(target);
    if(!info.isFile())throw new Error('not a file');
    response.writeHead(200,{'Content-Type':mime.get(path.extname(target))||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-store'});
    createReadStream(target).pipe(response);
  }catch{response.writeHead(404).end('Not found')}
}).listen(port,'127.0.0.1');

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light'});
const page=await context.newPage();
const report=[];

for(let index=0;index<ids.length;index+=1){
  const number=String(index+1).padStart(2,'0');
  await page.goto(`http://127.0.0.1:${port}/?d=${index+1}`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  for(const view of ['hero','next']){
    await page.evaluate(viewName=>scrollTo(0,viewName==='hero'?0:innerHeight),view);
    await page.waitForTimeout(150);
    const file=`${number}-${ids[index]}-${view}.png`;
    const target=path.join(screenshots,file);
    await page.screenshot({path:target,animations:'disabled'});
    const buffer=await readFile(target);
    const metadata=await sharp(buffer).metadata();
    const repeat=await page.screenshot({animations:'disabled'});
    const [left,right]=await Promise.all([sharp(buffer).ensureAlpha().raw().toBuffer(),sharp(repeat).ensureAlpha().raw().toBuffer()]);
    let changed=0;
    for(let pixel=0;pixel<left.length;pixel+=4){
      if(left[pixel]!==right[pixel]||left[pixel+1]!==right[pixel+1]||left[pixel+2]!==right[pixel+2]||left[pixel+3]!==right[pixel+3])changed+=1;
    }
    report.push({id:ids[index],view,file:`screenshots/${file}`,width:metadata.width,height:metadata.height,changedPixelRatio:changed/(metadata.width*metadata.height),sha256:createHash('sha256').update(buffer).digest('hex')});
  }
}

await page.setViewportSize({width:1600,height:1000});
await page.goto(`http://127.0.0.1:${port}/browser.html`,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.locator('.direction-list button').nth(4).click();
if(await page.locator('#direction-name').textContent()!=='Product Console')throw new Error('Direction list did not select Product Console');
await page.locator('[data-view="next"]').click();
if(!(await page.locator('#reference-image').getAttribute('src'))?.endsWith('05-product-console-next.png'))throw new Error('Section 02 tab did not preserve the selected direction');
await page.locator('#next').click();
if(await page.locator('#direction-name').textContent()!=='Object Archive')throw new Error('Next direction control failed');
await page.locator('#previous').click();
if(await page.locator('#direction-name').textContent()!=='Product Console')throw new Error('Previous direction control failed');
await page.locator('.direction-list button').first().click();
await page.locator('[data-view="hero"]').click();
await page.screenshot({path:path.join(root,'browser.png'),animations:'disabled'});

await page.setViewportSize({width:1600,height:840});
await page.goto(`http://127.0.0.1:${port}/process.html`,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:path.resolve(root,'..','..','assets','process.png'),animations:'disabled'});

await writeFile(path.join(root,'capture-report.json'),`${JSON.stringify(report,null,2)}\n`);
await context.close();
await browser.close();
await new Promise(resolve=>server.close(resolve));
console.log(`Captured ${report.length} exact references, browser, and process visual.`);
