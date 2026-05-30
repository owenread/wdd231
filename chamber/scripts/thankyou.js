const LEVEL_LABELS = {
    np: 'NP Membership (Non-profit, Free)',
    bronze: 'Bronze Membership',
    silver: 'Silver Membership',
    gold: 'Gold Membership'
};

const params = new URLSearchParams(window.location.search);

const fields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Mobile Phone' },
    { key: 'orgName', label: 'Organization' },
    { key: 'membershipLevel', label: 'Membership Level', transform: v => LEVEL_LABELS[v] || v },
    { key: 'timestamp', label: 'Application Date' }
];

const grid = document.querySelector('#summary-grid');
const hasData = fields.some(f => params.get(f.key));

if (hasData) {
    grid.innerHTML = fields.map(f => {
        const raw = params.get(f.key);
        if (!raw) return '';
        const value = f.transform ? f.transform(raw) : raw;
        return `
            <div class="summary-row">
                <span class="summary-label">${f.label}</span>
                <span class="summary-value">${value}</span>
            </div>`;
    }).join('');
}