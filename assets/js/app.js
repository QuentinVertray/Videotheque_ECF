import Typed from "typed.js";
var typed = new Typed('#element', {
    strings: ['Here you can add every movie you want...', 'or not....'],
    typeSpeed: 30,
  });

var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller",
        genre: "Action"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi",
        genre: "Superhero"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven",
        genre: "Horror"
    },
    {
        title: "It: Chapter 1",
        years: 2019,
        authors: "Andy Muschietti",
        genre: "Horror"
    }
];

console.log(films);

function afficherFilms(films) {
    var tbody = document.getElementById("films-table-body");
    tbody.innerHTML = "";
    films.forEach(function (film) {
        var row = tbody.insertRow();
        var cellTitle = row.insertCell();
        var cellYear = row.insertCell();
        var cellAuthors = row.insertCell();
        var cellGenre = row.insertCell();
        var cellActions = row.insertCell();

        cellTitle.textContent = film.title;
        cellYear.textContent = film.years;
        cellAuthors.textContent = film.authors;
        cellGenre.textContent = film.genre;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = function () {
            if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
                var index = films.indexOf(film);
                if (index !== -1) {
                    films.splice(index, 1);
                    afficherFilms(films);
                }
            }
        };

        cellActions.appendChild(deleteButton);
    });
}

window.onload = function () {
    afficherFilms(films);

    var modal = document.getElementById("modal");
    var showFormButton = document.getElementById("showFormButton");
    var closeModal = document.getElementById("closeModal");
    var form = document.getElementById("filmForm");

    showFormButton.onclick = function () {
        modal.style.display = "block";
    };

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    form.onsubmit = function (event) {
        event.preventDefault();
        var title = document.getElementById("title").value.trim();
        var year = document.getElementById("year").value;
        var author = document.getElementById("author").value.trim();
        var genre = document.getElementById("genre").value.trim();

        var errors = [];
        if (title.length < 2) {
            errors.push("Le titre doit contenir au moins 2 caractères");
        }
        if (year < 1900 || year > new Date().getFullYear()) {
            errors.push("L'année doit être comprise entre 1900 et l'année en cours");
        }
        if (author.length < 5) {
            errors.push("Le réalisateur doit contenir au moins 5 caractères");
        }

        if (errors.length === 0) {
            films.push({
                title: title.charAt(0).toUpperCase() + title.slice(1),
                years: parseInt(year),
                authors: author.charAt(0).toUpperCase() + author.slice(1),
                genre: genre
            });

            modal.style.display = "none";
            afficherFilms(films);
        } else {
            alert("Erreur dans le formulaire : " + errors.join(", "));
        }
    };
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function sortByYearDescending(films) {
    return films.sort((a, b) => b.years - a.years);
}

function sortByTitleAlphabetical(films) {
    return films.sort((a, b) => a.title.localeCompare(b.title));
}

document.getElementById('filter').addEventListener('change', function() {
    var sortedFilms;
    if (this.value === 'decroissant') {
        sortedFilms = sortByYearDescending(films);
    } else if (this.value === 'alphabétique') {
        sortedFilms = sortByTitleAlphabetical(films);
    } else {
        sortedFilms = films;
    }

    afficherFilms(sortedFilms);
});