document.querySelectorAll(".search-field").forEach(searchField => {
    const input = searchField.querySelector(".search-field__input");
    const listSagests = searchField.querySelector(".search-field__list-sagests");

    input.addEventListener("focus", () => {
        input.classList.add("search-field__input_focus");
        listSagests.classList.add("search-field__list-sagests_focus");
    });

    window.addEventListener("click", (e) => {
        const clickedSearchField = e.target.closest(".search-field");

        if (clickedSearchField === searchField) return;

        input.classList.remove("search-field__input_focus");
        listSagests.classList.remove("search-field__list-sagests_focus");
    });
});

class SearchField {
    constructor(elementSearchField) {
        this.searchField = elementSearchField;
        this.listSagests = elementSearchField.querySelector(".search-field__list-sagests");
        this.input = elementSearchField.querySelector(".search-field__input");

        this.dataList = Array.of(this.listSagests.querySelectorAll(".search-field__sagest")).map(sagest => sagest.textContent);
        this.dataInput = this.input.value;
    }

    addSagest(value, options={earlier: false}) {
        const sagest = document.createElement("li");
        sagest.textContent = value;
        sagest.classList.add("search-field__sagest");

        if (options.earlier) {
            sagest.classList.add("search-field__sagest_earlier");
        }

        this.listSagests.appendChild(sagest)
    }

    clearListSagests() {
        this.listSagests.innerHTML = "";
    }

    unfocus() {
        this.input.classList.remove("search-field__input_focus");
        this.listSagests.classList.remove("search-field__list-sagests_focus");
    }
}
