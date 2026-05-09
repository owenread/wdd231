
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: true, link: 'https://byui-cse.github.io/cse110-ww-course' },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true, link: 'https://byui-cse.github.io/wdd130-ww-course' },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: true, link: 'https://byui-cse.github.io/cse111-ww-course' },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: false, link: 'https://byui-cse.github.io/cse210-ww-course' },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true, link: 'https://byui-cse.github.io/wdd131-ww-course' },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', completed: false, link: 'https://byui-cse.github.io/wdd231-ww-course' },
];


const courseGrid = document.querySelector('#course-grid') || document.querySelector('[id="course-cards"]');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter = 'all') {
    if (!courseGrid) return;

    const filtered = filter === 'all'
        ? courses
        : courses.filter(c => c.subject === filter);

    courseGrid.innerHTML = '';

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) card.classList.add('completed');

        card.innerHTML = `
            <span class="course-code">${course.subject} ${course.number}</span>
            <span class="course-credits">${course.credits} credits</span>
        `;
        card.title = course.title;
        courseGrid.appendChild(card);
    });

    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    if (creditTotal) creditTotal.textContent = total;
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCourses(btn.dataset.filter);
    });
});

renderCourses('all');