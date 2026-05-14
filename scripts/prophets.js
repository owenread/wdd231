
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);         
    const data = await response.json();    


    displayProphets(data.prophets);          
}

getProphetData();                           


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        let card = document.createElement('section');
        let imgWrapper = document.createElement('div');
        let portrait = document.createElement('img');
        let cardBody = document.createElement('div');
        let fullName = document.createElement('h2');
        let dobDetail = document.createElement('p');
        let pobDetail = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        dobDetail.classList.add('card-detail');
        dobDetail.innerHTML = `<span class="label">Born: </span>${prophet.birthdate}`;

        pobDetail.classList.add('card-detail');
        pobDetail.innerHTML = `<span class="label">Birthplace: </span>${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        imgWrapper.classList.add('img-wrapper');
        imgWrapper.appendChild(portrait);

        cardBody.classList.add('card-body');
        cardBody.appendChild(fullName);
        cardBody.appendChild(dobDetail);
        cardBody.appendChild(pobDetail);

        card.appendChild(imgWrapper);
        card.appendChild(cardBody);

        cards.appendChild(card);
    });
};