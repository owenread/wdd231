const memberDisplay = document.querySelector('#member-display');
const btnGrid = document.querySelector('#btn-grid');
const btnList = document.querySelector('#btn-list');

const LEVEL_LABELS = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

const LEVEL_CLASSES = {
    1: 'level-member',
    2: 'level-silver',
    3: 'level-gold'
};

let currentView = 'grid';
let membersData = [];

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        membersData = await response.json();
        renderMembers(currentView);
    } catch (err) {
        memberDisplay.innerHTML = `<p class="error-msg">Unable to load member data. Please try again later.</p>`;
        console.error('Failed to load members:', err);
    }
}

function buildGridCard(member) {
    const levelLabel = LEVEL_LABELS[member.membershipLevel] || 'Member';
    const levelClass = LEVEL_CLASSES[member.membershipLevel] || 'level-member';

    return `
    <div class="member-card">
      <div class="member-card-img-wrap">
        <img
          src="images/${member.image}"
          alt="${member.name} logo"
          width="120"
          height="120"
          loading="lazy"
        >
      </div>
      <div class="member-card-body">
        <h2>${member.name}</h2>
        <span class="membership-badge ${levelClass}">${levelLabel}</span>
        <p class="member-desc">${member.description}</p>
        <address>
          <span>${member.address}</span>
          <span>${member.phone}</span>
        </address>
        <a href="${member.website}" target="_blank" class="member-link"> 
          Visit Website
        </a>
      </div>
    </div>`;
}

function buildListRow(member) {
    const levelLabel = LEVEL_LABELS[member.membershipLevel] || 'Member';
    const levelClass = LEVEL_CLASSES[member.membershipLevel] || 'level-member';

    return `
    <div class="member-row">
      <div class="member-row-name">
        <strong>${member.name}</strong>
        <span class="membership-badge ${levelClass}">${levelLabel}</span>
      </div>
      <div class="member-row-address">${member.address}</div>
      <div class="member-row-phone">${member.phone}</div>
      <div class="member-row-link">
        <a href="${member.website}" target="_blank"  class="member-link"> 
          Website
        </a>
      </div>
    </div>`;
}

function renderMembers(view) {
    if (!membersData.length) return;

    if (view === 'grid') {
        memberDisplay.className = 'member-grid';
        memberDisplay.innerHTML = membersData.map(buildGridCard).join('');
    } else {
        memberDisplay.className = 'member-list';
        memberDisplay.innerHTML = membersData.map(buildListRow).join('');
    }
}

function setView(view) {
    currentView = view;
    renderMembers(view);

    btnGrid.classList.toggle('active', view === 'grid');
    btnList.classList.toggle('active', view === 'list');
    btnGrid.setAttribute('aria-pressed', String(view === 'grid'));
    btnList.setAttribute('aria-pressed', String(view === 'list'));
}

btnGrid.addEventListener('click', () => setView('grid'));
btnList.addEventListener('click', () => setView('list'));

loadMembers();