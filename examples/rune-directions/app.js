const requested = Number(new URLSearchParams(location.search).get('d') || 1);
const direction = Number.isInteger(requested) && requested >= 1 && requested <= 10 ? requested : 1;
const active = document.querySelector(`[data-concept="${direction}"]`);
active?.classList.add('is-active');
document.body.dataset.direction = String(direction).padStart(2, '0');
document.title = `${active?.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() || 'RUNE 01'} — Direction ${String(direction).padStart(2, '0')}`;
