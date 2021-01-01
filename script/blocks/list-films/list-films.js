(function () {
    const LAST_SEARCHES = "LAST_SEARCHES";
    const DELIMITER = ";";
    const MAX_NUMBER_SAGGEST_LAST_SEARCH = 5;
    const NUMBER_SAGGEST = 10;
    const NUMBER_LAST_SEARCHES_SHOWN = 3;

    const listFilms = document.querySelector(".list-films");
    const listLastSearches = listFilms.querySelector(".list-films__list");

    const elementSearchField = listFilms.querySelector(".search-field");
    const searchMovieInput = elementSearchField.querySelector(".search-field__input");
    const searchMovieButton = elementSearchField.querySelector(".search-field__search-button");
    const listSagests = elementSearchField.querySelector(".search-field__list-sagests");
    
    const searchField = new SearchField(elementSearchField);

    function getLastSearches() {
        const stringLastSearches = localStorage.getItem(LAST_SEARCHES);

        if (stringLastSearches === null) {
            return [];
        }

        return stringLastSearches.split(DELIMITER);
    }

    function saveSearchTitle(searchTitle) {
        const arrLastSearches = [...getLastSearches().filter(lastSearch => lastSearch !== searchTitle), searchTitle];

        localStorage.setItem(LAST_SEARCHES, arrLastSearches.join(DELIMITER));
    }

    function showLastSearch() {
        listLastSearches.innerHTML = "";

        let arrLastSearches = getLastSearches();

        arrLastSearches.slice(Math.max(0, arrLastSearches.length - NUMBER_LAST_SEARCHES_SHOWN))
            .reverse()
            .forEach(lastSearch => {
                const li = document.createElement("li");
                li.classList.add("list-films__film");
                li.textContent = lastSearch;

                listLastSearches.appendChild(li);
            });
    }

    function handlerSearchMovie() {
        searchField.unfocus();
        saveSearchTitle(searchMovieInput.value);
        showLastSearch();
    }

    async function handlerShowingSagest() {
        const nameMovie = searchMovieInput.value;

        if (nameMovie === "") return;

        const moviesTitle = (await api.searchMovie(nameMovie)).results.map(res => res.title);

        searchField.clearListSagests();

        let arrLastSearches = getLastSearches()
            .filter(lastSearch => lastSearch.toLowerCase().includes(nameMovie.toLowerCase()));

        arrLastSearches = arrLastSearches.slice(Math.max(0, arrLastSearches.length - MAX_NUMBER_SAGGEST_LAST_SEARCH));

        arrLastSearches.reverse()
            .forEach(lastSearch => {
                searchField.addSagest(lastSearch, {earlier: true});
            });

        for (let i = 0; i < Math.min(moviesTitle.length, NUMBER_SAGGEST - arrLastSearches.length); i++) {
            searchField.addSagest(moviesTitle[i]);
        }
    }

    searchMovieInput.addEventListener("input", handlerShowingSagest);

    searchMovieInput.addEventListener("focus", handlerShowingSagest);

    searchMovieInput.addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
            handlerSearchMovie()
        }
    });

    searchMovieButton.addEventListener("click", handlerSearchMovie);

    listSagests.addEventListener("click", (e) => {
        const sagest = e.target.closest(".search-field__sagest");

        if (sagest === null) return;

        searchMovieInput.value = e.target.textContent;
        handlerSearchMovie();
    });

    window.addEventListener("load", showLastSearch);

    window.addEventListener("storage", showLastSearch);
}());
