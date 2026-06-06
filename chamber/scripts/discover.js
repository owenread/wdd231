import { places } from '../data/discover.mjs';

const grid = document.querySelector('#discover-grid');

if (grid) {
    places.forEach(place => {
        const card = document.createElement('article');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" class="discover-btn">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

const visitMsg = document.querySelector('#visit-message');

if (visitMsg) {
    const lastVisit = localStorage.getItem('discoverLastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMsg.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);

        if (daysSince < 1) {
            visitMsg.textContent = 'Back so soon! Awesome!';
        } else if (daysSince === 1) {
            visitMsg.textContent = 'You last visited 1 day ago.';
        } else {
            visitMsg.textContent = `You last visited ${daysSince} days ago.`;
        }
    }

    localStorage.setItem('discoverLastVisit', String(now));
}

// No one will probably read this but this was one of the most fun parts of this project!