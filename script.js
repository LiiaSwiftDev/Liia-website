const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    const select = document.querySelector('select[name="service"]');
    if (select) {
      const option = [...select.options].find(o => o.text.toLowerCase().includes(service.toLowerCase()));
      if (option) select.value = option.value || option.text;
    }
  });
});
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name');
  const email = data.get('email');
  const service = data.get('service');
  const details = data.get('details');
  // Replace this placeholder with your real email before publishing.
  const recipient = 'app.team.liia@gmail.com';
  const subject = encodeURIComponent(`Website enquiry: ${service}`);
  const body = encodeURIComponent(`Hi Liia,\n\nMy name: ${name}\nMy email: ${email}\nService: ${service}\n\nProject details:\n${details}\n`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

// Pricing currency selection. Amounts are explicitly set per currency, not live FX conversions.
document.querySelectorAll('.currency-option').forEach(button => {
  button.addEventListener('click', () => {
    const currency = button.dataset.currency;
    document.querySelectorAll('.currency-option').forEach(option => {
      const active = option.dataset.currency === currency;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.price-amount, .addon-amount').forEach(amount => {
      amount.textContent = amount.dataset[currency.toLowerCase()];
    });
    document.querySelectorAll('.price-currency, .addon-currency').forEach(label => {
      label.textContent = currency;
    });
  });
});

// EasyMath project image lightbox.
(() => {
 const trigger=document.querySelector('.easymath-visual');
 const modal=document.querySelector('#easymath-preview-modal');
 if(!trigger||!modal)return;
 const closeButton=modal.querySelector('.preview-modal-close');
 const open=()=>{modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('preview-open');closeButton.focus();};
 const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('preview-open');trigger.focus();};
 trigger.addEventListener('click',open);
 trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 closeButton.addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open'))close();});
})();

// Matching previews for the remaining Recent Work projects.
[['.clarity-visual','#clarity-preview-modal'],['.city-sights-visual','#city-sights-preview-modal'],['.tracker-visual','#project-tracker-preview-modal']].forEach(([selector,id])=>{
 const trigger=document.querySelector(selector),modal=document.querySelector(id);if(!trigger||!modal)return;
 const button=modal.querySelector('.preview-modal-close');
 const open=()=>{modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('preview-open');button.focus();};
 const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('preview-open');trigger.focus();};
 trigger.addEventListener('click',open);trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 button.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open'))close();});
});
