document.addEventListener('DOMContentLoaded', function() {
    visibility_of_sections('news');

    document.querySelector('.news').addEventListener('click', function() {
        visibility_of_sections('news');
    });

    document.querySelector('.services').addEventListener('click', function() {
        visibility_of_sections('services');
    });

    document.querySelector('.contacts').addEventListener('click', function() {
        visibility_of_sections('contacts');
    });
});

function visibility_of_sections(showSection) {
    const newsSection = document.getElementById('newsSection');
    const servicesSection = document.getElementById('servicesSection');
    const contactSection = document.getElementById('contactSection');

    newsSection.style.display = 'none';
    servicesSection.style.display = 'none';
    contactSection.style.display = 'none';

    switch (showSection) {
        case 'news':
            newsSection.style.display = 'block';
            renderNews();
            break;
        case 'services':
            servicesSection.style.display = 'block';
            renderServices();
            break;
        case 'contacts':
            contactSection.style.display = 'block';
            renderContacts();
            break;
        default:
            newsSection.style.display = 'block';
            renderNews();
    }
}

function renderNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    newsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-4 mb-4';
        card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5>${item.title}</h5>
                        <p class="card-text">${item.text}</p>
                        <a href="#" class="btn btn-primary">Узнать больше »</a>
                    </div>
                    <div class="card-footer text-muted">
                        ${item.date} ${item.comments}
                    </div>
                </div>
            `;
        newsContainer.appendChild(card);
    });
}

function renderContacts() {
    const contactsContainer = document.getElementById('contacts-container');
    contactsContainer.innerHTML = '';

    contacts.forEach(item => {
        const contact = document.createElement('div');
        contact.className = 'col-md-12';
        contact.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.text}</p>`
        contactsContainer.appendChild(contact);
    })
}
document.querySelector('.contacts').addEventListener('click', renderContacts);

function renderServices() {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';

    services.forEach(item => {
        const module = document.createElement('div');
        module.className = 'col-md-12';
        module.innerHTML = `
        <div class="mb-5">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>`
        servicesContainer.appendChild(module);
    })
}