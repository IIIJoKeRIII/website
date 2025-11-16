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

function goToIndexNews(index){
    history.pushState({page: "index-news"}, ``, `${basePath}news/${index}`);
    searchNews(index)
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

/*----------Генерируем страницы Новости, контакты, услуги----------*/
let max_index = 0

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
    newsData.forEach((item, index) => {
        const card = document.createElement('div');
        max_index++
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5>${item.title}</h5>
                            <p class="card-text">${item.text}</p>
                            <a href="" class="btn btn-primary" onclick="goToIndexNews(${index})">Узнать больше »</a>
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

/*----------Ищем страницы с новостями----------*/

function searchNews(index){
    const content = document.getElementById("content");
    const news = newsData[index]

    content.innerHTML = `
        <section class="container">
        <button class="btn btn-primary" onclick="goToPageNews()" style="margin-top: 1.5em"><-Назад к новостям</button>
        <h1>${news.title}</h1>
        <p class="text-muted">${news.date}</p>
        <p>${news.text}</p>
        </section>`
        ;
}

/*----------Ищем страницы с новостями----------*/

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
        else if (pageShow >= 0 && pageShow <= max_index) {
            goToIndexNews(Number(pageShow));
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