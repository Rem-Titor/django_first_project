URL_VIEW_POSTS = 'http://127.0.0.1:5000/blog/posts/'
URL_VIEW_TAGS = 'http://127.0.0.1:5000/blog/tags/'
URL_POST_CREATE = 'http://127.0.0.1:5000/blog/post/create/'
URL_TAG_CREATE = 'http://127.0.0.1:5000/blog/tag/create/'
URL_TAG_DELETE = 'http://127.0.0.1:5000/blog/tag/delete/'
URL_TAG_UPDATE = 'http://127.0.0.1:5000/blog/tag/update/'


function dayAgo(jsonDate) {
    var now = Date.now();
    jsonToJs = new Date(jsonDate);
    var days = new Date(now - jsonToJs).getHours();
    return days;

}

function createPostCard(title, body, tags, pub) {
    var card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    card.setAttribute("style", "width: 18rem;");

    var cardContent = document.createElement("div");
    var cardHeader = document.createElement("div");
    var cardFooter = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");
    cardFooter.setAttribute("class", "card-footer");

    var cardTitle = document.createElement("h5");
    var cardText = document.createElement("p");
    var cardDelete = document.createElement("button");
    var cardUpdate = document.createElement("button");


    var cardDeleteText = document.createTextNode("Delete");
    var cardUpdateText = document.createTextNode("Update");
    var cardTextText = document.createTextNode(body);
    var cardTitleTitle = document.createTextNode(title);
    var cardTag = document.createTextNode("tags: " + tags);
    var cardPub = document.createTextNode("Posted " + dayAgo(pub) + " hours ago");


    cardContent.setAttribute("class", "card-body");
    cardTitle.setAttribute("class", "card-title");
    cardText.setAttribute("class", "card-text");
    cardDelete.setAttribute("class", "btn btn-danger mb-1");
    cardUpdate.setAttribute("class", "btn btn-primary mx-1 mb-1");

    cardUpdate.appendChild(cardUpdateText);
    cardDelete.appendChild(cardDeleteText);
    cardText.appendChild(cardTextText);
    cardTitle.appendChild(cardTitleTitle);
    cardHeader.appendChild(cardTag);
    cardFooter.appendChild(cardPub);


    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardUpdate);
    cardContent.appendChild(cardDelete);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return card;

}


function createTagCard(title, i) {
    var card = document.createElement("div");
    card.setAttribute("class", "card mb-3");
    card.setAttribute("style", "width: 18rem;");

    var cardContent = document.createElement("div");
    var cardHeader = document.createElement("div");
    var cardFooter = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");
    cardFooter.setAttribute("class", "card-footer");

    var cardTitle = document.createElement("h5");
    var cardText = document.createElement("p");
    var cardDelete = document.createElement("button");
    var cardUpdate = document.createElement("button");

    var cardDeleteText = document.createTextNode("Delete");
    var cardUpdateText = document.createTextNode("Update");

    var cardTitleTitle = document.createTextNode(title);

    cardContent.setAttribute("class", "card-body");
    cardTitle.setAttribute("class", "card-title");
    cardText.setAttribute("class", "card-text");
    cardDelete.setAttribute("class", "btn btn-danger mb-1");
    cardUpdate.setAttribute("class", "btn btn-primary mx-1 mb-1");


    cardDelete.appendChild(cardDeleteText);
    cardUpdate.appendChild(cardUpdateText);
    cardTitle.appendChild(cardTitleTitle);

    cardDelete.addEventListener("click", () => {deleteTag(i);})
    cardUpdate.addEventListener("click", () => {updateTagForm(i);})

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardUpdate);
    cardContent.appendChild(cardDelete);


    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return card;

}

function updateTagForm(i) {
    document.getElementById("content").innerHTML =
        "          <div class=\"form-group\" >\n" +
        "            <label>Tag name</label>\n" +
        "            <input id=\"tag data\" type=\"text\" class=\"form-control\" placeholder=\"enter tag name\">\n" +
        "          </div>\n" +
        "          <button  id=\"UpdateTag\" class=\"btn btn-primary mt-2\">Update</button>\n"
    document.getElementById("UpdateTag").addEventListener("click", () => {updateTag(i); })
}


function createTagForm() {
    document.getElementById("content").innerHTML =
        "          <div class=\"form-group\" >\n" +
        "            <label>Tag name</label>\n" +
        "            <input id=\"tag data\" type=\"text\" class=\"form-control\" placeholder=\"enter tag name\">\n" +
        "          </div>\n" +
        "          <button  onclick='createTag()' id=\"Create\" class=\"btn btn-primary mt-2\">Create</button>\n"
}

async function createTag() {
    var data = document.getElementById("tag data").value;
    fetch(URL_TAG_CREATE, {
        method: 'POST',
        body: JSON.stringify({'title': data}),
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json ; charset=UTF-8"
        },
    })
    .then(response => viewTags())
}

function deleteTag(id) {
    fetch(URL_TAG_DELETE + id, {
        method: 'DELETE',
    })

    .then(response => viewTags())
}

async function updateTag(id) {
    var data = document.getElementById("tag data").value;
    fetch(URL_TAG_UPDATE + id + '/', {
        method: 'PUT',
        body: JSON.stringify({'title': data}),
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json ; charset=UTF-8"
        },
    })
    .then(response => viewTags())
}


function viewPosts() {
    fetch(URL_VIEW_POSTS).then(async (response) => {
        const data = await response.json();

        var element = document.getElementById("content");
        element.innerHTML = '';

        for (var i = 0; i != data.length; i++) {
            element.appendChild(createPostCard(data[i].title, data[i].body, data[i].tags, data[i].date_pub));
        }
    })
}

function viewTags() {
    fetch(URL_VIEW_TAGS).then(async (response) => {
        const data = await response.json();

        var element = document.getElementById("content");
        element.innerHTML = '';

        for (var i = 0; i != data.length; i++) {
            var card = createTagCard(data[i].title, i);
            element.appendChild(card);
        }

    })
}


function viewNavbar() {

    var element = document.getElementById("menu");

    var menuContainer = document.createElement("div");
    var searchContainer = document.createElement("div")
    var createButtons = document.createElement("div");


    var postsNav = document.createElement("a");
    var tagsNav = document.createElement("a");
    var searchNav = document.createElement("form");
    var inputSearch = document.createElement("input");
    var searchButton = document.createElement("button");
    var createTagButton = document.createElement("button");
    var createPostButton = document.createElement("button");

    postsNav.setAttribute("class", " nav-link active  me-1 thickText text-dark");
    tagsNav.setAttribute("class", " nav-link active  verticalLines thickText text-dark ");
    menuContainer.setAttribute("class", "container-fluid justify-content-start");
    searchNav.setAttribute("class", "d-flex me-2");
    inputSearch.setAttribute("class", "form-control me-2");
    inputSearch.setAttribute("type", "search");
    inputSearch.setAttribute("placeholder", "Search");
    inputSearch.setAttribute("aria-label", "Search");
    searchButton.setAttribute("class", "btn btn-success");
    searchButton.setAttribute("type", "submit");
    createButtons.className = "btn-group-vertical ";
    createPostButton.className = "btn btn-primary ";
    createTagButton.className = "btn btn-primary";

    var textPosts = document.createTextNode('Posts');
    var textTags = document.createTextNode('Tags');
    var searchText = document.createTextNode('Search');


    postsNav.addEventListener('click', viewPosts);
    tagsNav.addEventListener('click', viewTags);
    createTagButton.addEventListener('click', createTagForm);

    createTagButton.textContent = "Create Tag";
    createPostButton.textContent = "Create Post";

    createButtons.appendChild(createPostButton);
    createButtons.appendChild(createTagButton);
    postsNav.appendChild(textPosts);
    tagsNav.appendChild(textTags);
    searchButton.appendChild(searchText);
    searchNav.appendChild(inputSearch);
    searchNav.appendChild(searchButton);
    searchContainer.appendChild(searchNav);

    menuContainer.appendChild(postsNav);
    menuContainer.appendChild(tagsNav);

    element.appendChild(menuContainer);
    element.appendChild(searchContainer);
    document.getElementById("create").appendChild(createButtons);
}


viewNavbar()