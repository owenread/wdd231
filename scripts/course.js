const courses = [
    {
        subject: 'CSE', number: 110, title: 'Introduction to Programming',
        credits: 2, certificate: 'Web and Computer Programming', completed: true,
        link: 'https://byui-cse.github.io/cse110-ww-course',
        description: 'An introduction to programming concepts using Python, covering variables, loops, conditionals, and basic problem solving.',
        technology: ['Python']
    },
    {
        subject: 'WDD', number: 130, title: 'Web Fundamentals',
        credits: 2, certificate: 'Web and Computer Programming', completed: true,
        link: 'https://byui-cse.github.io/wdd130-ww-course',
        description: 'Foundational web development using HTML and CSS to build structured, styled, and accessible web pages.',
        technology: ['HTML', 'CSS']
    },
    {
        subject: 'CSE', number: 111, title: 'Programming with Functions',
        credits: 2, certificate: 'Web and Computer Programming', completed: true,
        link: 'https://byui-cse.github.io/cse111-ww-course',
        description: 'Builds on CSE 110 with a focus on writing reusable functions, working with data structures, and solving complex problems.',
        technology: ['Python']
    },
    {
        subject: 'CSE', number: 210, title: 'Programming with Classes',
        credits: 2, certificate: 'Web and Computer Programming', completed: true,
        link: 'https://byui-cse.github.io/cse210-ww-course',
        description: 'Introduces object-oriented programming principles including classes, inheritance, encapsulation, and polymorphism.',
        technology: ['C#']
    },
    {
        subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals',
        credits: 2, certificate: 'Web and Computer Programming', completed: true,
        link: 'https://byui-cse.github.io/wdd131-ww-course',
        description: 'Introduces JavaScript to create dynamic, interactive web pages with DOM manipulation and event handling.',
        technology: ['HTML', 'CSS', 'JavaScript']
    },
    {
        subject: 'WDD', number: 231, title: 'Frontend Web Development I',
        credits: 2, certificate: 'Web and Computer Programming', completed: false,
        link: 'https://byui-cse.github.io/wdd231-ww-course',
        description: 'Expands on dynamic web skills with responsive design, APIs, JSON, and modern JavaScript patterns.',
        technology: ['HTML', 'CSS', 'JavaScript']
    },
];

const courseGrid = document.querySelector('#course-grid') || document.querySelector('[id="course-cards"]');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.querySelector('#course-modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('#modal-close');

function showCourseModal(course) {
    modalContent.innerHTML = `
        <span class="modal-subject">${course.subject} ${course.number}</span>
        <h2>${course.title}</h2>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <a href="${course.link}" target="_blank" rel="noopener noreferrer">View Course →</a>
    `;
    modal.showModal();
}

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
        card.addEventListener('click', () => showCourseModal(course));
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

modalClose.addEventListener('click', () => modal.close());

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});