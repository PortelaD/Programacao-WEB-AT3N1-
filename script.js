let movies = [];
let myList = [];
let favorites = [];

function renderMovies(moviesList) {
    const moviesListDiv = document.getElementById("moviesList");
    moviesListDiv.innerHTML = "";
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    moviesListDiv.appendChild(movieContainer);
    moviesList.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            <img src="${movie.poster}" alt="${movie.titulo}" style="max-width: 200px; height: auto;">
            <h3>${movie.titulo} (${movie.ano}) - ${movie.genero.join(", ")}</h3>
        `;
        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add("actions-container");
        const addButton = document.createElement("button");
        addButton.classList.add("add-button");
        addButton.textContent = "Adicionar a minha lista";
        addButton.addEventListener("click", () => {
            addToList(movie);
        });
        actionsContainer.appendChild(addButton);

        const favoriteIcon = document.createElement("i");
        favoriteIcon.classList.add("favorite-icon", "far", "fa-heart");
        actionsContainer.appendChild(favoriteIcon);

        favoriteIcon.addEventListener("click", () => {
            toggleFavorite(movie, favoriteIcon);
        });

        movieDiv.appendChild(actionsContainer);
        movieContainer.appendChild(movieDiv);
    });
}

function addToList(movie) {
    if (!myList.includes(movie)) {
        myList.push(movie);
        renderMyList();
    }
}

function removeFromList(movie) {
    myList = myList.filter(m => m !== movie);
    renderMyList();
}

function toggleFavorite(movie, icon) {
    const isFavorite = favorites.some(fav => fav.titulo === movie.titulo && fav.ano === movie.ano && fav.genero.join(", ") === movie.genero.join(", "));

    if (isFavorite) {
        favorites = favorites.filter(fav => fav.titulo !== movie.titulo || fav.ano !== movie.ano || fav.genero.join(", ") !== movie.genero.join(", "));
        icon.classList.remove("fas");
        icon.classList.add("far");
    } else {
        favorites.push(movie);
        icon.classList.remove("far");
        icon.classList.add("fas");
    }
}



function renderMyList() {
    const myListDiv = document.getElementById("myList");
    myListDiv.innerHTML = "";
    myList.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `<h3>${movie.titulo} (${movie.ano}) - ${movie.genero.join(", ")}</h3>`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover da minha lista";
        removeButton.addEventListener("click", () => {
            removeFromList(movie);
        });
        movieDiv.appendChild(removeButton);
        myListDiv.appendChild(movieDiv);
    });
}

function searchMovies() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.titulo.toLowerCase().includes(searchInput));
    renderMovies(filteredMovies);
}

function filterMovies() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    const filteredMovies = categoryFilter ? movies.filter(movie => movie.genero.includes(categoryFilter)) : movies;
    renderMovies(filteredMovies);
}

fetch('filmes.json')
    .then(response => response.json())
    .then(data => {
        movies = data;
        renderMovies(movies);
    })
    .catch(error => {
        console.error('Error:', error);
    });
