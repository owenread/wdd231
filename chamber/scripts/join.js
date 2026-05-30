
const ts = document.querySelector('#timestamp');
if (ts) ts.value = new Date().toLocaleString();


const overlays = document.querySelectorAll('.modal-overlay');

document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.querySelector(`#${btn.dataset.modal}`);
        if (target) {
            target.classList.add('open');
            target.querySelector('.modal-close').focus();
        }
    });
});

overlays.forEach(overlay => {
    overlay.querySelector('.modal-close').addEventListener('click', () => {
        overlay.classList.remove('open');
    });
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        overlays.forEach(o => o.classList.remove('open'));
    }
});