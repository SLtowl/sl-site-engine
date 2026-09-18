const directions = [
  ['quiet-monolith','Quiet Monolith','Make the object the only bright presence; intentionally withhold room context until section two.'],
  ['architectural-room','Architectural Room','Lead with place and atmosphere; the object is less dominant in the first reading.'],
  ['material-index','Material Index','Explain construction before emotion; more precise, deliberately less cinematic.'],
  ['type-and-object','Type & Object','Fuse word and silhouette into one graphic gesture; product detail arrives later.'],
  ['product-console','Product Console','Treat inspection as the hero action; denser and more interface-like than the editorial options.'],
  ['object-archive','Object Archive','Frame the product as a documented design object; slower and intentionally museum-like.'],
  ['sound-field','Sound Field','Visualize the room-scale idea around the object; more expressive, but still tied to the product promise.'],
  ['paper-review','Paper Review','Use editorial argument and material writing as the lead; asks the user to read before acting.'],
  ['crop-study','Crop Study','Create physical impact with an aggressive product crop; sacrifices the complete silhouette on entry.'],
  ['direct-catalogue','Direct Catalogue','Expose product, materials and action immediately; clearest commercial option with the least mystery.'],
];

const list = document.querySelector('.direction-list');
const image = document.querySelector('#reference-image');
const indexLabel = document.querySelector('#current-index');
const nameLabel = document.querySelector('#direction-name');
const ideaLabel = document.querySelector('#direction-idea');
const tabs = [...document.querySelectorAll('[data-view]')];
let current = 0;
let view = 'hero';

directions.forEach(([id,name],index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.dataset.index=String(index);
  button.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><strong>${name}</strong>`;
  button.addEventListener('click',()=>select(index));
  list.append(button);
});

function select(index){
  current=(index+directions.length)%directions.length;
  const [id,name,idea]=directions[current];
  image.src=`screenshots/${String(current+1).padStart(2,'0')}-${id}-${view}.png`;
  image.alt=`${name}, ${view === 'hero' ? 'hero' : 'second section'}, rendered in browser`;
  indexLabel.textContent=String(current+1).padStart(2,'0');
  nameLabel.textContent=name;
  ideaLabel.textContent=idea;
  [...list.querySelectorAll('button')].forEach((button,index)=>button.classList.toggle('is-active',index===current));
}

tabs.forEach(tab=>tab.addEventListener('click',()=>{
  view=tab.dataset.view;
  tabs.forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));});
  select(current);
}));
document.querySelector('#previous').addEventListener('click',()=>select(current-1));
document.querySelector('#next').addEventListener('click',()=>select(current+1));
addEventListener('keydown',event=>{if(event.key==='ArrowLeft')select(current-1);if(event.key==='ArrowRight')select(current+1)});
select(0);
