(() => {
  const list = document.querySelector('#project-list');
  if (!list) return;
  const arabic = document.documentElement.lang === 'ar';
  const words = arabic ? {
    explore: '\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0645\u0634\u0631\u0648\u0639', close: '\u0625\u063a\u0644\u0627\u0642',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629', story: '\u0642\u0635\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639',
    website: '\u0646\u0645\u0648\u0630\u062c \u0645\u0648\u0642\u0639 \u062a\u0641\u0627\u0639\u0644\u064a', creative: '\u0627\u062a\u0635\u0627\u0644 \u0648\u0625\u0628\u062f\u0627\u0639'
  } : { explore:'Explore project', close:'Close project', overview:'Overview', story:'Project story', website:'Interactive website', creative:'Communication & creative work' };
  const records = new WeakMap();
  const modal = document.createElement('dialog');
  modal.className = 'pg-dialog';
  modal.setAttribute('aria-labelledby', 'pg-dialog-title');
  document.body.append(modal);
  let opener;
  function openProject(card, trigger) {
    const record = records.get(card);
    if (!record) return;
    opener = trigger;
    modal.replaceChildren();
    const header = document.createElement('header'); header.className='pg-dialog-header';
    const label = document.createElement('p'); label.textContent=record.kind; label.className='pg-kind';
    const close = document.createElement('button'); close.type='button';close.className='pg-dialog-close';close.textContent='\u00d7';close.setAttribute('aria-label', words.close);
    close.addEventListener('click',()=>modal.close());header.append(label,close);
    const layout=document.createElement('div');layout.className='pg-dialog-layout';
    const artwork=document.createElement('div');artwork.className='pg-dialog-art';
    if (record.image) { const image=record.image.cloneNode(true);image.loading='eager';artwork.append(image); }
    const content=document.createElement('div');content.className='pg-dialog-copy';
    const title=document.createElement('h2');title.id='pg-dialog-title';title.textContent=record.title;
    content.append(title);
    const tabs=document.createElement('div');tabs.className='pg-dialog-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',record.title);
    const overview=document.createElement('div');overview.className='pg-dialog-panel';overview.id='pg-overview';overview.setAttribute('role','tabpanel');overview.tabIndex=0;
    const description=document.createElement('p');description.textContent=record.description;overview.append(description);
    const tags=document.createElement('div');tags.className='pg-tags';
    record.tags.forEach(tag=>tags.append(tag.cloneNode(true)));overview.append(tags);
    const actions=document.createElement('div');actions.className='pg-dialog-actions';
    record.links.forEach(link=>actions.append(link.cloneNode(true)));overview.append(actions);
    const sections=[{name:words.overview, panel:overview}];
    if (record.story) {
      const story=document.createElement('div');story.id='pg-story';story.className='pg-dialog-panel';story.setAttribute('role','tabpanel');story.tabIndex=0;
      [...record.story.children].filter(node=>node.tagName!=='SUMMARY').forEach(node=>story.append(node.cloneNode(true)));
      sections.push({name:words.story,panel:story});
    }
    const buttons=[];
    function select(index,focus=false) {
      sections.forEach((section,i)=>{section.panel.hidden=i!==index;buttons[i].setAttribute('aria-selected',String(i===index));buttons[i].tabIndex=i===index?0:-1;});
      if(focus)buttons[index].focus();
    }
    sections.forEach((section,index)=>{
      const button=document.createElement('button');button.type='button';button.textContent=section.name;button.setAttribute('role','tab');button.id=`pg-tab-${index}`;button.setAttribute('aria-controls',section.panel.id);section.panel.setAttribute('aria-labelledby',button.id);
      button.addEventListener('click',()=>select(index));
      button.addEventListener('keydown',event=>{let next;if(event.key==='Home')next=0;if(event.key==='End')next=sections.length-1;if(event.key==='ArrowRight')next=(index+(arabic?-1:1)+sections.length)%sections.length;if(event.key==='ArrowLeft')next=(index+(arabic?1:-1)+sections.length)%sections.length;if(next!==undefined){event.preventDefault();select(next,true);}});
      buttons.push(button);tabs.append(button);
    });
    content.append(tabs,...sections.map(section=>section.panel));select(0);
    layout.append(artwork,content);modal.append(header,layout);
    document.documentElement.classList.add('pg-modal-open');modal.showModal();close.focus();
  }
  modal.addEventListener('close',()=>{document.documentElement.classList.remove('pg-modal-open');opener?.focus();});
  modal.addEventListener('click',event=>{if(event.target!==modal)return;const box=modal.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)modal.close();});
  function enhance() {
    list.querySelectorAll(':scope > .project-card').forEach((card,index) => {
      if (card.dataset.gridReady) return;
      card.dataset.gridReady = 'true';
      const image = card.querySelector(':scope > img, :scope > a > img');
      if (image) {
        const media = document.createElement('div'); media.className = 'pg-media';
        const parent = image.parentElement;media.append(image);
        if (parent !== card) parent.remove();card.prepend(media);
      }
      const title = card.querySelector(':scope > h3');
      const description = card.querySelector(':scope > p');
      const story=card.querySelector(':scope > .project-details');
      const tags=[...card.querySelectorAll(':scope > .content-tag')];
      const links=[...card.querySelectorAll(':scope > .project-link, :scope > .collection-link')];
      const website=(card.dataset.category||'').split(/\s+/).includes('websites');
      const kindText=website?words.website:words.creative;
      records.set(card,{title:title?.textContent||'',description:description?.textContent||'',image,story:story?.cloneNode(true),tags:tags.map(t=>t.cloneNode(true)),links:links.map(l=>l.cloneNode(true)),kind:kindText});
      const number=document.createElement('span');number.className='pg-number';number.setAttribute('aria-hidden','true');number.textContent=String(index+1).padStart(2,'0');card.append(number);
      const body=document.createElement('div');body.className='pg-body';
      const kind=document.createElement('p');kind.className='pg-kind';kind.textContent=kindText;body.append(kind);
      if(title)body.append(title);if(description){description.classList.add('pg-description');body.append(description);}
      const tagRow=document.createElement('div');tagRow.className='pg-tags';tags.forEach(tag=>tagRow.append(tag));body.append(tagRow);
      const actions=document.createElement('div');actions.className='pg-actions';links.forEach(link=>actions.append(link));
      const explore=document.createElement('button');explore.type='button';explore.className='pg-explore';explore.textContent=words.explore;explore.setAttribute('aria-haspopup','dialog');explore.addEventListener('click',()=>openProject(card,explore));actions.append(explore);body.append(actions);
      [...card.children].filter(node=>!node.matches('.pg-media,.pg-number')).forEach(node=>{if(node.matches('details')){node.hidden=true;body.append(node);}else body.append(node);});
      card.append(body);
    });
  }
  enhance();document.addEventListener('aor:projects-updated',enhance);
  new MutationObserver(enhance).observe(list,{childList:true});
  list.classList.add('pg-ready'); // styled and filtered: safe to show
})();
