const basePath = "/website/"

function goToPageNews(){
    history.pushState({page: "news"}, ``, `${basePath}news`);
    showPages("news")
}

function goToPageServices(){
    history.pushState({page: "services"}, ``, `${basePath}services`);
    showPages("services")
}

function goToPageContacts(){
    history.pushState({page: "contacts"}, ``, `${basePath}contacts`);
    showPages("contacts")
}

function goToStartPage(){
    history.pushState({page: "news"}, ``, `${basePath}`);
    showPages("news")
}

function goToErrorPage(){
    showPages("error")
}

function showPages(pageName){
    switch(pageName){
        case "":
            showContentNews()
            break;
        case "news":
            showContentNews()
            break;
        case "services":
            showContentServices()
            break;
        case "contacts":
            showContentContacts()
            break;
        case "error":
            document.getElementById("content").innerHTML = "<h1 class='text-center'> Такой страницы нет :(";
    }
}

function showContentNews() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const newsSection = document.createElement("section");
    newsSection.className = "container";
    newsSection.id = "newsSection";

    const zag = document.createElement("h1");
    zag.className = "text-center";
    zag.innerHTML = "Новости";

    const row = document.createElement("div");
    row.className = "row";

    let id = 0;

    newsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.id = id++;
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
        row.appendChild(card);
    });
    newsSection.appendChild(zag);
    newsSection.appendChild(row);
    content.appendChild(newsSection);
}

function showContentServices() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const text = document.createElement("h1")
    text.className = "text-center";
    text.innerHTML = "Услуги"
    content.appendChild(text);
}

function showContentContacts() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const text = document.createElement("h1")
    text.className = "text-center";
    text.innerHTML = "Контакты"
    content.appendChild(text);
}

window.onpopstate = function (event){
    if (event.state && event.state.page) {
        showPages(event.state.page);
    } else {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        showPages(page || 'news');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    let pageShow;
    if (sessionStorage.redirect) {
        const requestedPath = sessionStorage.redirect;
        console.log(requestedPath);
        sessionStorage.removeItem('redirect');

        pageShow = requestedPath.substring(requestedPath.lastIndexOf('/') + 1);

        if (pageShow == 'news') {
            goToPageNews();
        }
        else if (pageShow ==  'contacts') {
            goToPageContacts();
        }
        else if (pageShow == 'services') {
            goToPageServices();
        }
        else{
            goToErrorPage();
        }
    }
    else{
        const pageName = window.location.hash.substring(1);
        showPages(pageName || 'news');
    }
});